from collections.abc import Mapping
from flask import Flask, request, url_for, redirect, render_template
import pandas as pd
import pickle
from flask_cors import CORS
app = Flask(__name__) 
CORS(app)

model = pickle.load(open("testing5.pkl", "rb"))

@app.route('/')
def template_deploy():
    return render_template("index.html")

@app.route('/predict',methods=['POST','GET'])
def predict():
    input_1 = request.form['1']
    input_two = request.form['2']
    input_three = request.form['3']
    input_four = request.form['4']
    input_five = request.form['5']
    input_six = request.form['6']
    input_seven = request.form['7']
    input_eight = request.form['8']
 
    setup_df = pd.DataFrame([pd.Series([input_1, input_two, input_three, input_four, input_five, input_six, input_seven, input_eight])])
    diabetes_prediction=model.predict_proba(setup_df)
    output='{0:.{1}f}'.format(diabetes_prediction[0][1], 2)
    output = str(float(output)*100)+'%'
    if output>str(0.5):
        return render_template('result.html',pred=f'You have the following chance of having diabetes based on our KNN model.\nProbability of having Diabetes is {output}')
    else:
        return render_template('result.html',pred=f'You have a low chance of diabetes which is currently considered safe (this is only an example, please consult a certified doctor for any medical advice).\n Probability of having diabetes is {output}')

if __name__ == '__main__':
    app.run(debug=True)
