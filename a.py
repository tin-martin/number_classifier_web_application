from keras.datasets import mnist
from tensorflow import keras
import matplotlib.pyplot as plt
#plot the first image in the dataset
(X_train, Y_train), (X_test, Y_test) = mnist.load_data()

X_train = X_train.reshape(60000,28,28,1)
X_test = X_test.reshape(10000,28,28,1)
from tensorflow.keras.utils import to_categorical
#one-hot encode target column

print(Y_train.shape)
Y_train = to_categorical(Y_train,num_classes=10)
Y_test = to_categorical(Y_test,num_classes=10)

from keras.models import Sequential
from keras.layers import Dense, Conv2D, Flatten
from keras.activations import relu
#create model
model = Sequential()
#add model layers
model.add(Conv2D(64, kernel_size=3, activation='relu', input_shape=(28,28,1)))
model.add(Conv2D(32, kernel_size=3, activation='relu'))
model.add(Flatten())
model.add(Dense(10, activation='softmax'))
#compile model using accuracy to measure model performance
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train,Y_train,validation_data=(X_test,Y_test))
model.save('/Users/martintin/Desktop/project/MNIST_website/')