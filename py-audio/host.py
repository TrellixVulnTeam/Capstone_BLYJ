import subprocess
from pathlib import Path
import sd
from queue import Queue
from enum import Enum
import threading
import sys
import io

# Change this path to whatever yours is
CAPSTONE_PATH = Path('/home/evan/Lehigh/cse281/Capstone/')
MEDIAPIPE_PATH = CAPSTONE_PATH / 'mediapipe/'

job_queue = Queue()

def mediapipe_thread(job_queue):
    shell_command = f'GLOG_logtostderr=1 bazel-bin/mediapipe/examples/desktop/hand_tracking/hand_tracking_gpu   --calculator_graph_config_file=mediapipe/graphs/hand_tracking/hand_tracking_mobile.pbtxt'
    # print(shell_command)
    process = subprocess.Popen(shell_command, cwd=MEDIAPIPE_PATH, shell=True, stderr=subprocess.STDOUT, stdout=subprocess.PIPE)  
    for line in iter(process.stdout.readline, b''):
        line_str: str = line.decode(sys.stdout.encoding)
        if "GESTURE" in line_str:
            gesture = line_str.split("GESTURE")[1].strip()
            job_queue.put(("GESTURE", gesture))

if __name__ == "__main__":
    # Start two threads, one for VOICE input, one for hand recognition input (VIDEO).
    voice_thread = threading.Thread(target=sd.record, args=(job_queue, CAPSTONE_PATH / 'py-audio/deepspeech-0.8.1-models.pbmm'))
    video_thread = threading.Thread(target=mediapipe_thread, args=(job_queue,))
    video_thread.start()
    voice_thread.start()

    while True:
        # receive from the queue and print
        method, data = job_queue.get()
        print(method, data)
        # TODO: Add a config file of some kind. Will is using a python config file, which would be easy. The problem is,
