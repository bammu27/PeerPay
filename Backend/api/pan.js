const User = require('../models/userSchema');
const { extractTextFromImage, sendOTP } = require('../utils/verification');
const fs = require('fs').promises; // Use promise-based API for fs

async function verifyPAN(req, res) {
  try {
    const { userId, panNumber } = req.body;

    // Input validation
    if (!userId || !panNumber) {
      return res.status(400).json({ message: "Missing userId or PAN number" });
    }

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

    // Validate file upload
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "PAN image file is required" });
    }

    const filePath = req.file.path;

    try {
      // Extract text from uploaded PAN image
      const extractedText = await extractTextFromImage(filePath);
      console.log("Extracted Text:", extractedText);

      // Normalize PAN number for comparison
      const normalizedPan = panNumber.trim().toUpperCase();
      const extractedNormalizedText = extractedText.replace(/\s+/g, '').toUpperCase();

      // Use regex to find PAN in the extracted text
      const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]/;
      const matchedPAN = extractedNormalizedText.match(panRegex);

      if (!matchedPAN || matchedPAN[0] !== normalizedPan) {
        return res.status(400).json({ message: "PAN number not found or mismatched" });
      }

      // Update user record
      user.panVerified = true;
      await user.save();

      res.json({
        message: "PAN verified successfully. OTP sent for final verification.",
      });
    } finally {
      // Clean up uploaded file
      try {
        await fs.unlink(filePath);
        console.log(`File ${filePath} deleted successfully.`);
      } catch (err) {
        console.error(`Error deleting file ${filePath}:`, err);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during PAN verification" });
  }
}

module.exports = verifyPAN;
