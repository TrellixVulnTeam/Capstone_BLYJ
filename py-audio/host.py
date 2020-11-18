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
    if mapping['action_type'] == 'TYPE_STARWARS':
        pyautogui.write("starwars")
    elif mapping['action_type'] == 'OPEN_TERMINAL':
        pyautogui.hotkey('ctrl', 'alt', 't')


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
    # voice_thread = threading.Thread(target=sd.record, args=(job_queue, CAPSTONE_PATH / 'py-audio/deepspeech-0.8.1-models.pbmm'))
    video_thread = threading.Thread(target=mediapipe_thread, args=(job_queue,))
    video_thread.start()
    # voice_thread.start()

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
                gesture_counter = 0
            else:
                gesture_counter += 1
                # Require 10 results in a row of the same gesture for this to function.
                if gesture_counter >= 10:
                    # Now search the config dict to see what we should do
                    for mapping in config_entries:
                        if mapping['input_type'] == 'GESTURE' and mapping['input'] == gesture:
                            action_type = mapping['action_type']
                            # print(action_type)
                            # Delay at least 10 seconds
                            if action_type in delay_map:
                                if time.time() - delay_map[action_type] > 10:
                                    do_action(mapping)
                                    delay_map[action_type] = time.time()
                            else:
                                # If the mapping doesn't exist yet, just do the action.
                                do_action(mapping)
                                delay_map[action_type] = time.time()



        # TODO: Add a config file of some kind. Will is using a python config file, which would be easy. The problem is,
        # TODO: execute -> config_entries[data] 
    observer.join()
