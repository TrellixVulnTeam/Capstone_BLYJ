# Piezoelectric Micromachined Ultrasonic Transducers (PMUT) for Hand Gesture Recognition 

## Project Description

### Motivation
With recent virtual reality (VR) releases such as the Oculus Rift S and Oculus Quest, an complete stand alone VR headset, and augemented/mixed reality (AR) devices like Microsoft's Hololens, non-invasive motion detection has become a more desired feature for these devices. In particular, we would like to pursue hand gesture/movement detection. Hand gesture recongnizition isn't an entire new concept. Oculus Quest in particlar rolled out an update to incorperate computer vision to detect common simple gestures such as pinching. However, as discussed in a paper on the challenges in multimodal gesture recognition (http://jmlr.org/papers/volume17/14-468/14-468.pdf), computer vision based gesture detection has its limits. In particular, the difficulty arises in dynamic detection. This includes smooth motions such as sticking all your fingers up but one; it's more or less anything more complex then static gestures like pointing, clentching a fist, pinching, and other gestures of that manner. Some research has previously been done into this field to explore better solution which will be discussed futher in the background section. Particually suggest wearable sensor based technologies as suggested in the paper. With recent breakthroughs in ultrasound technology, such wearable technologies have become more and more viable. 

### Some Background
A quality ultrasound sensor powerful enough to penetrate the human body have been considered to big and clunky for anything more than the traditional sense in the medical industry, but recent innovations have allowed it to be as small as 3.5 mm <sup>3</sup> and able to reach as far as 1.5 meters. 
Piezoelectric Micromachined Ultrasonic tranducers (PMUT) recently have in academic circles to suggest the technology needed to provide a viable portable, small form factor, wearable sensor to detect gestures due to the innovation in ultrasound technology I mentioned previously. PMUTs are still relativly new in the market but showed its merit in the cell phone market with the integreation of fingerprint sensors below the surface of the screen. PMUTs are responsible for this gimic feature, currently being sold buy Qualcomm.
#### Current Work Being Done
Currently there are a handful of companies that are working on similar technologies. In Feburary of 2019, Facebook aquired a company called CNTRL Labs that work on similar technology based off of infared technology and electrodes that both do well at hand motion detection/tracking and capturing of the user's intent(such as how hard one is clentching his or her fist).

### Calling for Funding
To allow us to detect these hand gestures, we need a PMUT sensor to detect muscles and tendons underneath the skin. Currently, as a group we are researching what particular technology that should be used for this. We have DK-CH101 development kit in mind for $200 dollars, but are currently double checking the technology is able to do the job for us. The exact product can be found here: https://www.invensense.com/products/dk-ch101/

### Development Plans
Currently, are devlopment plans are TBD due to the pending particular peice of hardware we are going to use. We know we need to use a PMUT sensor, but still decided the needed frequency, the microcontroller etc. 

### Concerns
- Machine learning on time series data frames. (Sliding window ?)
- Supervised learning, where do we get the training data?
- What's the advantage over using computer vision and just running ML on that instead?
  - Less dimmensionality? Research fidelity of PMUT.
- How to get the tracking done exactly?
