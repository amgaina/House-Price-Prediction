import json
import pickle
import numpy as np

__locations = None
__data_columns = None
_model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(_model.predict([x])[0],2)

def get_location_names():
    return __locations

def load_saved_artifacts():
    print("Loading saved Artifacts____")
    global __data_columns
    global __locations
    global _model

    with open("./artifacts/columns1.json", 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]
    with open("./artifacts/Banglore_home_prices_model1.pickle", "rb") as f:
        _model = pickle.load(f)
    print("Loading saved artifacts is done.")


if __name__ == "__main__":
    load_saved_artifacts()
    print("Estimated price for the 1st Phase JP Nagar is ", get_estimated_price("1st Phase JP Nagar", 1000, 2, 2) )
    print(get_location_names())