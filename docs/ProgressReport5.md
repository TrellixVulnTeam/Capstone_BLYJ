# Progress Report 5

## Summary of Work Completed

Preliminary looking into datasets and OpenCV. There have been some good discussions about possible ways to combine serveral datasets which have different input and output formats. Felix is currently doing research on different transofrmations you can make on the input data in order to make it easier to train on, like FFT and edge detection.

Work For the future:
 - Camera bindings for c++
   - And a way to segment the continuous stream (?)
 - See what the camera bindings output, find a way to preprocess that so it's the same format as the dataset we'll use to train. (depends on the bindings output, and the datset input)
 - Find a dataset which we can train a model
 - Design the model
 - Take model output, and use OS calls to do stuff with the host operating system.

### Goals completed this week

We had several discussions about the project, and I think we're in a better place than last week. As mentioned, we did not attempt the OpenCV part yet.

### Goals not met this week

We ended up not pursuing OpenCV just yet. We've realized that the machine learning portion of this project is the most important part, so we're focusing on finding papers and datasets which we can delve into.

### Challenges faced this week

None

### Goals for next week

Over spring break we're not going to be working except for some of the softer stuff. Currently, we have a few papers and datasets we'd like to look into more.

- [IBM datset](http://www.research.ibm.com/dvsgesture/)
  - More of a full body dataset. Includes video from the waist up.
- [**Ego Gesture Dataset**](http://www.nlpr.ia.ac.cn/iva/yfzhang/datasets/egogesture.html)
  - Seems extremely promising. Several interesting gestures and motions are included. Explore this one futher, and make sure to read the paper.
  - One potential issue is that they rely on a RGB-D camera. This is a special kind of depth recognition which is not going to be a available for typical computer/phone.
- [TBN Dataset](https://medium.com/twentybn/gesture-recognition-using-end-to-end-learning-from-a-large-video-database-2ecbfb4659ff)
  - Only have done preliminary research into this. Unsure as to it's viability
- [Gesture recognition toolkit](https://github.com/nickgillian/grt)
  - I have considerably more faith in this library after reading the paper about it [here](http://www.jmlr.org/papers/volume15/gillian14a/gillian14a.pdf). It talks about several potential problems like how we can segment gestures from a continuous stream of data (which is nontrivial). The only real difficulty in using this is that we're either going to need to witch into a c++ shop, or we'll need to come up with a method for calling it from python.

## Individual Member Contributions

For each group member, list the individual contributions, and a link to proof in the form of a commit to your group repository. At the end, provide an estimate for how many hours these contributions took to complete.

### Evan Hruskar

- Compiled dataset information, see current commit
- Coordinated machine learning pipeline process with Felix. He's going to be doing the preprocessing.
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs

### Felix Quintana

- Contribution 1 [proof](link) 
- Contribution 2 [proof](link) 
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs

### Jitong Ding

- Contribution 1 [proof](link) 
- Contribution 2 [proof](link) 
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs

### William Chen

- Set up the openve with Xcode on Mac
- Contribution 2 [proof](link) 
- Contribution 3 [proof](link)

Estimated time allocated this week: X Hrs
