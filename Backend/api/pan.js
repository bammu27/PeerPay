const User = require('../models/userSchema');
const { extractTextFromImage, sendOTP } = require('../utils/verification');

async function  verifyPAN(req, res) {
    try {
      const { userId, panNumber } = req.body;
      
      // Check if user exists and Aadhaar is verified
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.aadhaarVerified) {
        return res.status(400).json({ message: "Please verify Aadhaar first" });
      }

      if (user.panVerified) {
        return res.status(400).json({ message: "PAN already verified" });
      }

      // Extract text from uploaded PAN image
      const extractedText = await extractTextFromImage(req.file.path);
      
      // Check if extracted PAN number matches
      if (extractedText.includes(panNumber)) {
        user.panVerified = true;
        await user.save();
        
        // Send OTP after PAN verification
        const phoneToUse = user.adar_phoneno || user.phone;
        const { otp } = await sendOTP(phoneToUse);
        otpStore.set(userId, otp);
        
        res.json({ 
          message: "PAN verified successfully. OTP sent for final verification.",
          phoneNumber: phoneToUse
        });
      } else {
        res.status(400).json({ message: "PAN verification failed" });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during PAN verification" });
    }
  }

module.exports = verifyPAN;