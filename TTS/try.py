from TTS import TTS
import random

if __name__ == "__main__":
    word = "Wow! It works! I got it!"

    vocodesVoices = {
        "altman": "sam-altman",
        "arnold": "arnold-schwarzenegger",
        "attenborough": "david-attenborough",
        "ayoade": "richard-ayoade",
        "bart": "bart-simpson",
        "ben_stein": "ben-stein",
        "betty_white": "betty-white",
        "bill_clinton": "bill-clinton",
        "bill_gates": "bill-gates",
        "bill_nye": "bill-nye",
        "bob_barker": "bob-barker",
        "boss": "the-boss",
        "brimley": "wilford-brimley",
        "broomstick": "boomstick",
        "bush": "george-w-bush",
        "carter": "jimmy-carter",
        "christopher_lee": "christopher-lee",
        "cooper": "anderson-cooper",
        "craig_ferguson": "craig-ferguson",
        "cramer": "jim-cramer",
        "cranston": "bryan-cranston",
        "crypt_keeper": "crypt-keeper",
        "david_cross": "david-cross",
        "degrasse": "neil-degrasse-tyson",
        "dench": "judi-dench",
        "devito": "danny-devito",
        "dr_phil": "dr-phil-mcgraw",
        "earl_jones": "james-earl-jones",
        "fred_rogers": "fred-rogers",
        "gottfried": "gilbert-gottfried",
        "hillary_clinton": "hillary-clinton",
        "homer": "homer-simpson",
        "krabs": "mr-krabs",
        "larry_king": "larry-king",
        "lisa": "lisa-simpson",
        "luckey": "palmer-luckey",
        "mcconnell": "mitch-mcconnell",
        "nimoy": "leonard-nimoy",
        "nixon": "richard-nixon",
        "oliver": "john-oliver",
        "palin": "sarah-palin",
        "paul_graham": "paul-graham",
        "paula_deen": "paula-deen",
        "penguinz0": "moistcr1tikal",
        "rickman": "alan-rickman",
        "rosen": "michael-rosen",
        "scout": "scout",
        "shapiro": "ben-shapiro",
        "shohreh": "shohreh-aghdashloo",
        "simmons": "j-k-simmons",
        "snake": "solid-snake",
        "sonic": "sonic",
        "spongebob": "spongebob-squarepants",
        "squidward": "squidward",
        "takei": "george-takei",
        "thiel": "peter-thiel",
        "trevor": "trevor-philips",
        "tucker": "tucker-carlson",
        "tupac": "tupac-shakur",
        "vegeta": "vegeta",
        "wiseau": "tommy-wiseau",
        "wizard": "wizard",
        "yugi": "yami-yugi",
}
entry_list = list(vocodesVoices.items())
random_entry = random.choice(entry_list)

# for i in range(len(entry_list)):
print(random_entry[0])
tts = TTS(word,random_entry[1])
tts.vocodeSpeak()