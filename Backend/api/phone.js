const User = require('../models/userSchema');
const { extractTextFromImage, sendOTP } = require('../utils/verification');

async  function verifyOTP(req, res) {
    try {
      const { userId, otp } = req.body;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.panVerified) {
        return res.status(400).json({ message: "Please verify PAN first" });
      }

      const storedOTP = otpStore.get(userId);
      if (!storedOTP || storedOTP !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      user.phoneVerified = true;
      await user.save();
      otpStore.delete(userId); // Clear OTP after successful verification

      res.json({ message: "Phone number verified successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during OTP verification" });
    }
  }

module.exports = verifyOTP;