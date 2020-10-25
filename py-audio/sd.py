import numpy as np
import sounddevice as sd
import soundfile as sf
from deepspeech import Model

fs = 16_000
sd.default.device = 'HyperX 7.1 Audio'
print('Beginning recording')

duration = 6  # seconds
audio: np.ndarray = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
sd.wait()
myrecording_flat = audio.flatten()
print(myrecording_flat)

# Create deepspeech model
model = Model('./deepspeech-0.8.1-models.pbmm')

print(model.stt(myrecording_flat))


# data, fs = sf.read('./audio/email.wav')
# print(data, fs)
sd.play(audio, fs)
sd.wait()

