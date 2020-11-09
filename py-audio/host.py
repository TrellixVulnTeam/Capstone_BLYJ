import subprocess
from pathlib import Path
import sd
from queue import Queue
from enum import Enum
import threading
import sys
import io
import yaml
import os.path, time
from watchdog.observers import Observer
from watchdog.events import PatternMatchingEventHandler
# Change this path to whatever yours is
CAPSTONE_PATH = Path('/home/evan/Lehigh/cse281/Capstone/')
MEDIAPIPE_PATH = CAPSTONE_PATH / 'mediapipe/'

job_queue = Queue()
config_dict = {}
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
    read_yaml()
    voice_thread = threading.Thread(target=sd.record, args=(job_queue, CAPSTONE_PATH / 'py-audio/deepspeech-0.8.1-models.pbmm'))
    video_thread = threading.Thread(target=mediapipe_thread, args=(job_queue,))
    video_thread.start()
    voice_thread.start()
    patterns = [file_path]
    print 'patterns = {patterns}'.format(patterns=', '.join(patterns))
    event_handler = MyEventHandler(patterns=patterns)
    observer = Observer()
    observer.schedule(event_handler, watched_dir, recursive=True)
    observer.start()

    while True:
        # receive from the queue and print
        method, data = job_queue.get()
        print(method, data)
        # TODO: Add a config file of some kind. Will is using a python config file, which would be easy. The problem is,
        # TODO: execute -> config_dict[data] 
    observer.join()

def read_yaml()
    with open('configuration.yml') as f:
        try:
            config_dict = yaml.full_load(f)
        except yaml.YAMLError as e:
            print(e)
class MyEventHandler(PatternMatchingEventHandler):
    def on_moved(self, event):
        super(MyEventHandler, self).on_moved(event)

    def on_created(self, event):
        super(MyEventHandler, self).on_created(event)

    def on_deleted(self, event):
        super(MyEventHandler, self).on_deleted(event)

    def on_modified(self, event):
        super(MyEventHandler, self).on_modified(event)
        read_yaml()