import subprocess
from pathlib import Path
import sd
from queue import Queue
from enum import Enum
import threading
import sys
import io
import json
import os.path, time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
import pyautogui
from Levenshtein.StringMatcher import StringMatcher
import string
from TTS import vocodeSpeak     # Thanks Jitong!


def read_config():
    global config_entries, CONFIG_FILE_PATH
    with open(CONFIG_FILE_PATH, 'r') as f:
        config = json.load(f)
        print(config)
        config_entries = config

class ConfigChangeHandler(PatternMatchingEventHandler):
    def on_modified(self, event):
        print("Config Modified, Reloading.")
        read_config()

# Change this path to whatever yours is
CAPSTONE_PATH = Path('/home/evan/Lehigh/cse281/Capstone/')
MEDIAPIPE_PATH = CAPSTONE_PATH / 'mediapipe/'
CONFIG_FILE_PATH = CAPSTONE_PATH / 'electron-new/config.json'

job_queue = Queue()
config_entries = []

def mediapipe_thread(job_queue):
    shell_command = f'GLOG_logtostderr=1 bazel-bin/mediapipe/examples/desktop/hand_tracking/hand_tracking_gpu   --calculator_graph_config_file=mediapipe/graphs/hand_tracking/hand_tracking_mobile.pbtxt'
    try:
        process = subprocess.Popen(shell_command, cwd=MEDIAPIPE_PATH, shell=True, stderr=subprocess.STDOUT, stdout=subprocess.PIPE)  
        print("created process: ", shell_command)
        for line in iter(process.stdout.readline, b''):
            line_str: str = line.decode(sys.stdout.encoding)
            if "GESTURE" in line_str:
                gesture = line_str.split("GESTURE")[1].strip()
                job_queue.put(("GESTURE", gesture))
    finally:
        process.terminate()

def do_action(mapping):
    action = mapping['action']
    action_data = mapping['action_data']

    if action == 'TYPE_STARWARS':
        pyautogui.write("starwars")
    elif action == 'OPEN_TERMINAL':
        pyautogui.hotkey('ctrl', 'alt', 't')
    elif action == 'TYPE':
        pyautogui.write(action_data['type_text'])
    elif action == 'TTS':
        vocodeSpeak(action_data['tts_speaker'], action_data['tts_text'])
    elif action == 'COMMAND':
        pass
	elif action == 'HOTKEY':
		# might be wise to sanitize input or do a try/catch
		pyautogui.hotkey(*(action_data['hotkey'].split()))
	elif action == 'CLICK_LOCATION'
		pyautogui.moveTo(action_data['location'][0], action_data['location'][1])
		pyautogui.click()


if __name__ == "__main__":
    # Read the config.
    read_config()

    # Setup watchdog for the config file
    pattern = str(CONFIG_FILE_PATH)
    event_handler = ConfigChangeHandler(patterns=[pattern])
    observer = Observer()
    observer.schedule(event_handler, CONFIG_FILE_PATH.parent)
    observer.start()

    # Start two threads, one for VOICE input, one for hand recognition input (VIDEO).
    # FIXME: Temporarily disabled voice as it wasn't working
    voice_thread = threading.Thread(target=sd.record, args=(job_queue, CAPSTONE_PATH / 'py-audio/deepspeech-0.8.1-models.pbmm'))
    video_thread = threading.Thread(target=mediapipe_thread, args=(job_queue,))
    video_thread.start()
    voice_thread.start()

    gesture = ""
    gesture_counter = 0
    # Map action types -> when they last occured, so we don't spam them.
    delay_map = {}
    while True:
        # receive from the queue and print
        method, data = job_queue.get()
        print(method, data)

        if method == "GESTURE":
            if data != gesture:
                gesture = data
                gesture_frame_counter = 0
            else:
                gesture_frame_counter += 1
                # Require 10 results in a row of the same gesture for this to function.
                if gesture_frame_counter >= 10:
                    # Now search the config dict to see what we should do
                    for mapping in config_entries:
                        if mapping['input'] == gesture:
                            action = mapping['input']
                            # print(action)
                            # Delay at least 10 seconds
                            if action in delay_map:
                                if time.time() - delay_map[action] > 10:
                                    do_action(mapping)
                                    delay_map[action] = time.time()
                            else:
                                # If the mapping doesn't exist yet, just do the action.
                                do_action(mapping)
                                delay_map[action] = time.time()
        elif method == "VOICE":
            # NO delay because this happens a lot less frequently.
            for mapping in config_entries:
                if mapping['input'] == 'VOICE':
                    # Check the levenshtein ratio is greater than 0.9. I.e. The strings are more than 90% similar.
                    mapped_voice_input: str = mapping['input_data']['voice_input']
                    # Clean up both strings to improve accuracy. Make them lowercase and remove all punctuation.
                    mapped_voice_input = mapped_voice_input.lower().translate(str.maketrans('', '', string.punctuation))
                    user_voice_input = data.lower().translate(str.maketrans('', '', string.punctuation))
                    sm = StringMatcher(seq1=user_voice_input, seq2=mapped_voice_input)
                    print("User voice input:", user_voice_input)
                    print("Mapped voice input:", mapped_voice_input)
                    print(sm.distance(), sm.ratio())
                    if sm.ratio() >= 0.9:
                        # Do the action
                        do_action(mapping)

        # TODO: Add a config file of some kind. Will is using a python config file, which would be easy. The problem is,
        # TODO: execute -> config_entries[data] 
    observer.join()

