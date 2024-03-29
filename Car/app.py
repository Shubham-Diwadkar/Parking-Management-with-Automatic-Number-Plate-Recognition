from flask import Flask, request, jsonify
import cv2
import numpy as np
import easyocr
from datetime import datetime
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
# app.config['MONGO_URI'] = "mongodb://localhost:27017/Parking-Management-Database"
client = MongoClient('mongodb://localhost:27017/')
db = client['Parking-Management-Database']
collection = db['license_plate_data_updated']

# Check MongoDB connection
if client.db is not None:
    print("Connected to MongoDB successfully!!!")
else:
    print("Failed to connect to MongoDB!!!")

# Load the pre-trained Cascade Classifier for license plate detection
plate_cascade = cv2.CascadeClassifier('Darshan_imrpoved_casscader_model.xml')  # Assuming the model file is in the same directory as your app.py
print("pla",plate_cascade)
# Create an EasyOCR reader
reader = easyocr.Reader(['en'])

# Function to detect number plates in an image
def detect_number_plate(img, name, phone_number, email, vehicleType, timeDuration, price):
    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    print("Grey",gray)

    # Detect license plates in the image
    plates = plate_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=5, minSize=(100, 30))

    print("Plates: ",plates)

    # Get current date and time
    current_time = datetime.now()
    time_in = current_time.strftime("%Y-%m-%d %H:%M:%S")

    # Create a list to store the data
    data = []

    # Process each detected license plate
    for (x, y, w, h) in plates:
        # Crop the detected license plate region
        plate_img = gray[y:y + h, x:x + w]

        # Use EasyOCR to perform text detection on the license plate region
        result = reader.readtext(plate_img)

        # Print the detected text with highest accuracy
        if result:
            text = max(result, key=lambda x: x[2])[1]  # Get the text with highest confidence score

            # Append data to the list
            data.append({
                'name': name,
                'email': email,
                'phoneNumber': phone_number,
                'vehicleType': vehicleType,
                'numberPlateDetectedText': text,
                'timeIn': time_in,
                'timeDuration': timeDuration,
                'price': price
            })

    # Insert data into MongoDB collection
    # if data:
    #     mongo.db.license_plate_data.insert_many(data)

    print("Data: ",data)
    
    return data

@app.route('/')
def index():
    return 'Welcome to the license plate detection API'

@app.route('/api/upload', methods=['POST'])
def upload():
    name = request.form['name']
    phone_number = request.form['phoneNumber']
    email = request.form['email']
    vehicleType = request.form['vehicleType']
    timeDuration = request.form['timeDuration']
    price = request.form['price']

    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    print("Image", img)
    data = detect_number_plate(img, name, phone_number, email, vehicleType, timeDuration, price)

    print("Printing: ",data)

    try:
        if data:
            collection.insert_many(data) # Insert data into MongoDB collection
    except Exception as e:
        print("Error:", e)   

    # Return success response
    return jsonify({'message': 'Number plate detected and data stored successfully.'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8000)
