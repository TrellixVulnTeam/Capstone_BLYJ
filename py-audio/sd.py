import numpy as np
import sounddevice as sd
import soundfile as sf
from queue import Queue
from collections import deque
import sys
import math
from deepspeech import Model
from typing import List
import pyautogui
from enum import Enum
import pyttsx3
from pathlib import Path

engine = pyttsx3.init('espeak')

fs = 16_000
# sd.default.device = 'HyperX 7.1 Audio'
sd.default.device = 7
insert_index = 0
arr: np.ndarray = np.zeros((1_000_000,), dtype='int16')
ringbuffer = deque(maxlen=40)
buffer_stage = []
q: List[np.ndarray] = Queue()

quiet_buffers = 0
silence_threshold = 500
silence_length = 0.5 * fs  # 1/2 second silence required between words
silence_length = 100  # 10 buffers must be silent.
speaking = False

def audio_callback(indata: np.ndarray, frames: int, time, status) -> None:
    """
    This is called (from a separate thread) for each audio block.
    indata is either very low like 1-5 or is ~130
    """
    global insert_index, arr, quiet_buffers, buffer_stage, speaking, ringbuffer
    if status:
        print(status, file=sys.stderr)
    if any(indata):
        quiet = all(abs(point) < silence_threshold for point in indata)

        # Check if we're satisfying all conditions to record voice.
        # We've had a period of silence, and the current buffer is not quiet.
        # SILENCE -> SPEAKING
        if quiet_buffers > silence_length and not quiet:
            print(f'Begining speaking after {quiet_buffers} silence buffers')
            speaking = True
        # If we've been silent for a little while that means we're not speaking.
        # SPEAKING -> SILENCE
        elif quiet_buffers > silence_length and quiet:
            # If we were speaking, write this out to the queue
            if speaking:
                q.put((ringbuffer.copy(), buffer_stage.copy()))
                ringbuffer.clear()
                buffer_stage.clear()
                speaking = False
        
        # SPEAKING -> SPEAKING and SILENCE -> SILENCE
        if speaking:
            buffer_stage.append(indata.copy())
        else:
            ringbuffer.append(indata.copy())

        # Update the count of quiet samples. Could do this by buffer as well.
        if quiet:
            quiet_buffers += 1
        else:
            quiet_buffers = 0

def click_image(image: str, offset_right=0):
    loc = pyautogui.locateCenterOnScreen('./images/' + image)
    if loc is None:
        print(f'Could not find image: {image}')
    else:
        pyautogui.click((loc[0] + offset_right, loc[1]))

def joke():
    engine.say("What is the difference between a good joke and a bad joke timing.")
    engine.runAndWait()

special_map = {
    # Basic text stuff
    'enter': 'enter',
    # Email specific
    'email': (click_image, 'write_button.png'),
    'send': (click_image, 'send_button.png'),
    # Tab positions
    'recipient': 0,
    'subject': 1,
    'body': 2,
    'tell me a joke': (joke,),
}

def record(job_queue: Queue, model_path: Path):
    print('Beginning recording')
    stream = sd.InputStream(channels=1, samplerate=fs, dtype='int16', callback=audio_callback)
    with stream:
        model = Model(str(model_path))
        tab_index = 0
        while True:
            pre_buffer, data = q.get()
            buffer = list(pre_buffer)
            buffer.extend(data)
            # print(len(pre_buffer), len(data))
            # compress the data into one array
            flat_data = np.concatenate(buffer).ravel()
            # print(flat_data.shape)
            output = model.stt(flat_data)
            job_queue.put(("VOICE", output))
            # if output in special_map:
            #     item = special_map[output]
            #     if isinstance(item, str):
            #         # FIXME: reset tab index on send
            #         # This is some kind of hotkey / other thing
            #         pyautogui.hotkey(item)
            #     elif isinstance(item, int):
            #         # tab manipulation
            #         tabs = item - tab_index
            #         tab_index = item
            #         if tabs > 0:
            #             for _ in range(abs(tabs)):
            #                 pyautogui.hotkey('tab')
            #         elif tabs < 0:
            #             for _ in range(abs(tabs)):
            #                 pyautogui.hotkey('shift', 'tab')
            #     elif isinstance(item, tuple):
            #         # It's a function, just call it with its args
            #         item[0](*item[1:])
            # else:
            #     # Just send it as string input
            #     pyautogui.write(output)

if __name__ == "__main__":
    print('Beginning recording')
    stream = sd.InputStream(channels=1, samplerate=fs, dtype='int16', callback=audio_callback)
    with stream:
        model = Model('/home/evan/Lehigh/cse281/Capstone/py-audio/deepspeech-0.8.1-models.pbmm')
        tab_index = 0
        while True:
            pre_buffer, data = q.get()
            buffer = list(pre_buffer)
            buffer.extend(data)
            # print(len(pre_buffer), len(data))
            # compress the data into one array
            flat_data = np.concatenate(buffer).ravel()
            # print(flat_data.shape)
            output = model.stt(flat_data)
            print(output)
