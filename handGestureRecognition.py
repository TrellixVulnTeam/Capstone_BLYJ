import os
os.environ["KERAS_BACKEND"] = "plaidml.keras.backend"

# TensorFlow and tf.keras
import keras
# Helper libraries
import numpy as np
import matplotlib.pyplot as plt
import cv2
import pandas as pd

# Sklearn
from sklearn.model_selection import train_test_split # Helps with organizing data for training
from sklearn.metrics import confusion_matrix # Helps present results as a confusion-matrix
from keras.models import Sequential
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.layers import Dense, Flatten
imagepaths = []

def grab_data(directory_path="E:/research/leapgestrecog"):
# Go through all the files and subdirectories inside a folder and save path to images inside list
    for root, dirs, files in os.walk(directory_path, topdown=False):
        for name in files:
            path = os.path.join(root, name)
            if path.endswith("png"): # We want only the images
                imagepaths.append(path)

    print(len(imagepaths)) # If > 0, then a PNG image was loaded

def plot_image(path):
  img = cv2.imread(path) # Reads the image into a numpy.array
  img_cvt = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) # Converts into the corret colorspace (RGB)
  print(img_cvt.shape) # Prints the shape of the image just to check
  plt.grid(False) # Without grid so we can see better
  plt.imshow(img_cvt) # Shows the image
  plt.xlabel("Width")
  plt.ylabel("Height")
  plt.title("Image " + path)

class gesture_recognition():

    def __init__(self):
        self.X = []  # Image data
        self.y = []  # Labels
        self.X_train = []
        self.X_test =[]
        self.y_train = []
        self.y_test = []
        self.model = Sequential()
    def store_data(self):
        # Loops through imagepaths to load images and labels into arrays
        for path in imagepaths:
            img = cv2.imread(path)  # Reads image and returns np.array
            img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # Converts into the corret colorspace (GRAY)
            img = cv2.resize(img, (320, 120))  # Reduce image size so training can be faster
            self.X.append(img)
            print(path)
        # Processing label in image path
            category = path.split("/")[2]
            category = category.split("\\")[2]
            label = int(category.split("_")[0])-1  # We need to convert 10_down to 00_down, or else it crashes
            print(label)
            self.y.append(label)

        # Turn X and y into np.array to speed up train_test_split
        self.X = np.array(self.X, dtype="uint8")
        self.X = self.X.reshape(len(imagepaths), 120, 320, 1)  # Needed to reshape so CNN knows it's different images
        self.y = np.array(self.y)
        print("Images loaded: ", len(self.X))
        print("Labels loaded: ", len(self.y))
        print(self.y[0], imagepaths[0])  # Debugging
        ts = 0.3 # Percentage of images that we want to use for testing. The rest is used for training.
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.X, self.y, test_size=ts, random_state=42)
    def create_model(self):
        self.model.add(Conv2D(32, (5, 5), activation='relu', input_shape=(120, 320, 1)))
        self.model.add(MaxPooling2D((2, 2)))
        self.model.add(Conv2D(64, (3, 3), activation='relu'))
        self.model.add(MaxPooling2D((2, 2)))
        self.model.add(Conv2D(64, (3, 3), activation='relu'))
        self.model.add(MaxPooling2D((2, 2)))
        self.model.add(Flatten())
        self.model.add(Dense(128, activation='relu'))
        self.model.add(Dense(10, activation='softmax'))
    # Configures the model for training
        self.model.compile(optimizer='adam', # Optimization routine, which tells the computer how to adjust the parameter values to minimize the loss function.
              loss='sparse_categorical_crossentropy', # Loss function, which tells us how bad our predictions are.
              metrics=['accuracy']) # List of metrics to be evaluated by the model during training and testing.
    # Trains the model for a given number of epochs (iterations on a dataset) and validates it.
    def train(self):
        self.model.fit(self.X_train, self.y_train, epochs=5, batch_size=64, verbose=2, validation_data=(self.X_test, self.y_test))
    # Save entire model to a HDF5 file
        self.model.save('handrecognition_model.h5')
        test_loss, test_acc = self.model.evaluate(self.X_test, self.y_test)

        print('Test accuracy: {:2.2f}%'.format(test_acc*100))
        predictions = self.model.predict(self.X_test) # Make predictions towards the test set
        np.argmax(predictions[0]), self.y_test[0] # If same, got it right


# Function to plot images and labels for validation purposes
#def validate_9_images(predictions_array, true_label_array, img_array):
    # Array for pretty printing and then figure size
 #   class_names = ["down", "palm", "l", "fist", "fist_moved", "thumb", "index", "ok", "palm_moved", "c"]
 #   plt.figure(figsize=(15, 5))

  #  for i in range(1, 10):
        # Just assigning variables
   #     prediction = predictions_array[i]
   #     true_label = true_label_array[i]
   #     img = img_array[i]
   #     img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)

        # Plot in a good way
    #    plt.subplot(3, 3, i)
   #     plt.grid(False)
  #      plt.xticks([])
  #      plt.yticks([])
  #      plt.imshow(img, cmap=plt.cm.binary)

   #     predicted_label = np.argmax(prediction)  # Get index of the predicted label from prediction

        # Change color of title based on good prediction or not
  #      if predicted_label == true_label:
  #          color = 'blue'
  #      else:
  #          color = 'red'

 #       plt.xlabel("Predicted: {} {:2.0f}% (True: {})".format(class_names[predicted_label],
  #                                                            100 * np.max(prediction),
  #                                                            class_names[true_label]),
  #                 color=color)
 #   plt.show()
 #   validate_9_images(predictions, y_test, X_test)
# H = Horizontal
# V = Vertical
#y_pred = np.argmax(predictions, axis=1) # Transform predictions into 1-D array with label number
#pd.DataFrame(confusion_matrix(y_test, y_pred),
 #            columns=["Predicted Thumb Down", "Predicted Palm (H)", "Predicted L", "Predicted Fist (H)", "Predicted Fist (V)", "Predicted Thumbs up", "Predicted Index", "Predicted OK", "Predicted Palm (V)", "Predicted C"],
  #           index=["Actual Thumb Down", "Actual Palm (H)", "Actual L", "Actual Fist (H)", "Actual Fist (V)", "Actual Thumbs up", "Actual Index", "Actual OK", "Actual Palm (V)", "Actual C"])






if __name__ == '__main__':
    grab_data()
    gest = gesture_recognition()
    gest.store_data()
    gest.create_model()
    gest.train()