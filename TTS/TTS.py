from Crypto import Random
import requests
import json
from requests.exceptions import HTTPError
from pydub import AudioSegment
from pydub.playback import play
import random
import string

#from urllib import request, parse
class TTS:

    def __init__(self, utterance, speaker):
        self.utterance = utterance
        self.speaker = speaker

    def generate_word(self,length):
        VOWELS = "aeiou"
        CONSONANTS = "".join(set(string.ascii_lowercase) - set(VOWELS))
        word = ""
        for i in range(length):
            if i % 2 == 0:
                word += random.choice(CONSONANTS)
            else:
                word += random.choice(VOWELS)
        return word

    def vocodeSpeak(self):


        if(self.utterance):
            print("Playing " + str(self.utterance)+"!")
            #filename = str(hex(int(Random.get_random_bytes(48),16))) + ".wav"
            name = self.generate_word(6)
            filename = name + ".wav"
            url = "https://mumble.stream/speak"
            header = {"Accept": "application/json","Content-Type": "application/json"}
            data = json.dumps({
                "speaker": self.speaker,
				"text": self.utterance
            })
            # data = {
            #     "speaker": self.speaker,
			# 	"text": self.utterance
            # }
            # data=parse.urlencode(data).encode()
            # req =  request.Request(url, data=data)
            # req.add_header("Accept", "application/json")
            # req.add_header("Content-Type", "application/json")
            # resp = request.urlopen(req)
            # content = resp.read()
            # print(content)
            try: 
                response = requests.post(url,data=data,headers=header)
                response.raise_for_status()
            except HTTPError as http_err:
                print(f'HTTP error occurred: {http_err}')  # Python 3.6
            except Exception as err:
                print(f'Other error occurred: {err}')  # Python 3.6
            else:
                print('Success!')
                text = response.content
                
                f = open(filename, "wb")
                f.write(text)
                f.close()
                song = AudioSegment.from_wav(filename)
                play(song)
                
                
            #     print(response.text)
