from flask import Flask, render_template, request,redirect,url_for
from tensorflow import keras
import matplotlib.pyplot as plt
import numpy as np
import sys
from numpy import loadtxt
app = Flask(__name__)

#global img_arr
img_arr = None

@app.route('/json',methods = ['POST','GET'])
def json():
    data = request.get_json()
    global img_arr
    img_arr = data['img_arr']
    return redirect(url_for('prediction'))

@app.route('/',methods = ['POST','GET'])
def index():
    return render_template('index.html')

@app.route('/prediction')
def prediction():
    model = keras.models.load_model('model.h5')
    sample = np.array(img_arr)
    sample = np.rot90(sample, k=3, axes=(0, 1))
    sample = np.fliplr(sample)
    sample = sample.reshape(1,28,28,1)

    preds = model.predict(sample)

    i=0
    for i in range(preds.shape[1]):
        if(preds[0][i] == np.ndarray.max(preds,1)):
            break
    print("------------------------------------------------------")
    print("Prediction: {i}".format(i=i))
    print("------------------------------------------------------")
    return render_template('predictions.html',prediction=i)

if(__name__=="__main__"):
    app.run(debug=True)



    
#python -m venv env
#source env/bin/activate

"""
export FLASK_APP=app
export FLASK_ENV=env
flask run
"""
