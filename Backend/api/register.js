const User = require('../models/userSchema');
const { extractTextFromImage, sendOTP } = require('../utils/verification');

async  function registerUser(req, res) {
    try {
      const {
        name,
        aadhaar,
        pan,
        dob,
        phone,
        email,
        address
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ aadhaar }, { pan }, { email }]
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists with given Aadhaar, PAN, or email"
        });
      }

      // Create new user
      const newUser = new User({
        name,
        aadhaar,
        pan,
        dob,
        phone,
        email,
        address
      });

      await newUser.save();
      res.status(201).json({
        message: "User registered successfully",
        userId: newUser._id
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during registration" });
    }
  }

module.exports = registerUser;