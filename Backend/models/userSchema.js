const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhaar: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{4} \d{4} \d{4}$/, "Aadhaar number must be in the format XXXX XXXX XXXX"],
  },
  
  pan: {
    type: String,
    required: true,
    unique: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number format"],
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return moment().diff(moment(value), "years") >= 18; // User must be at least 18
      },
      message: "User must be at least 18 years old",
    },
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits long"],
  },
  adar_phoneno: {
    type: String,
    match: [/^\d{10}$/, "Phone number must be 10 digits long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ],
  },
  aadhaarVerified: { type: Boolean, default: false },
  panVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: {
      type: String,
      required: true,
      match: [/^\d{6}$/, "Pincode must be a 6-digit number"],
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
