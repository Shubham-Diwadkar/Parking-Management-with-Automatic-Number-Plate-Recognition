const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017/Parking-Management-Database")
  .then(() => {
    console.log("Connection Successful with Parking-Management database!!");
  })
  .catch((error) => {
    console.error("Connection Failed:", error);
  });

// Define schema for the "collection" collection
const collectionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Validate if confirmpassword matches password
        return this.password === value;
      },
      message: props => `Passwords do not match`
    }
  }
});

// Define schema for the "Event" collection
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

// Create models for both collections
const Collection = mongoose.model("Collection", collectionSchema);
const EventList = mongoose.model("Event", eventSchema);

// Export models
module.exports = { Collection, EventList };
