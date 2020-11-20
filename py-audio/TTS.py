import requests
import json
from requests.exceptions import HTTPError
import random
import string
from tempfile import TemporaryFile
import sounddevice as sd
import soundfile as sf
import librosa

def generate_word(length):
    VOWELS = "aeiou"
    CONSONANTS = "".join(set(string.ascii_lowercase) - set(VOWELS))
    word = ""
    for i in range(length):
        if i % 2 == 0:
            word += random.choice(CONSONANTS)
        else:
            word += random.choice(VOWELS)
    return word

def vocodeSpeak(speaker: str, utterance: str):
    if(utterance):
        print("Playing " + str(utterance)+"!")
        url = "https://mumble.stream/speak"
        header = {"Accept": "application/json","Content-Type": "application/json"}
        data = json.dumps({
            "speaker": speaker,
            "text": utterance
        })
        try: 
            response = requests.post(url,data=data,headers=header)
            response.raise_for_status()
        except HTTPError as http_err:
            print(f'HTTP error occurred: {http_err}')  # Python 3.6
        except Exception as err:
            print(f'Other error occurred: {err}')  # Python 3.6
        else:
            wav_file = response.content

            f = TemporaryFile()
            # f = open("file.wav", "w+b")
            f.write(wav_file)
            f.seek(0)
            # sound_data, sr = sf.read(f)
            sound_data, sr = librosa.load(f, sr=16_000) # Downsample 22_050 to 16_000 to avoid some strange issues.
            f.close()
            sd.play(sound_data, samplerate=sr)
            sd.wait()

if __name__ == "__main__":
    vocodeSpeak("spongebob-squarepants", "Good Morning!")
    vocodeSpeak("mitch-mcconnell", "President Trump has every legal right to challenge the results of this election.")
    # sound_data, sr = sf.read("file.wav")
    # print(sr)
    # sd.play(sound_data, samplerate=sr)
    # sd.wait()starwars