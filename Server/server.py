from flask import Flask,request, jsonify
import utils

app = Flask(__name__)

# Load artifacts when starting the application
utils.load_saved_artifacts()

@app.route("/get_location_names", methods=["GET"])
def get_location_names():
    locations = utils.get_location_names()
    response = jsonify({
        'locations': locations
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route("/predict_home_price", methods=["POST"])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])
    response = jsonify({
        'estimated_price': utils.get_estimated_price(location, total_sqft, bhk, bath)
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == "__main__":
    print("Starting Python Flask Server for House Price Prediction")
    app.run()
