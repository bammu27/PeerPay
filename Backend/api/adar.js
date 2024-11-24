const User = require('../models/userSchema');
const { extractTextFromImage, sendOTP } = require('../utils/verification');
const moment = require('moment');


/**
 * Verifies Aadhaar card details against user information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function verifyAadhaar(req, res) {
  try {
    const { userId, aadhaarNumber } = req.body;

    // Input validation
    if (!userId || !aadhaarNumber) {
      return res.status(400).json({ 
        message: "Missing required fields: userId and aadhaarNumber are required" 
      });
    }

    // Validate Aadhaar number format (12 digits)
    if (!/^\d{4} \d{4} \d{4}$/.test(aadhaarNumber)) {
      return res.status(400).json({ 
        message: "Invalid Aadhaar number format. Must be 12 digits" 
      });
    }
    
    // Check if user exists and is registered
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if Aadhaar is already verified
    if (user.aadhaarVerified) {
      return res.status(400).json({ message: "Aadhaar already verified" });
    }

    // Validate file upload
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Aadhaar image file is required" });
    }

   
    // Extract text from uploaded Aadhaar image
    const extractedText = await extractTextFromImage(req.file.path);
    if (!extractedText) {
      return res.status(400).json({ message: "Failed to extract text from image" });
    }
    console.log(extractedText);
    // Verify Aadhaar number
    if (!extractedText.includes(aadhaarNumber)) {
      return res.status(400).json({ 
        message: "Aadhaar number in image doesn't match provided number" 
      });
    }

    // Extract and verify name from the extracted text
    // Using a more flexible regex pattern to match names
    const namePattern = new RegExp(user.name.replace(/\s+/g, '\\s+'), 'i');
    const nameMatch = extractedText.match(namePattern);
    
    if (!nameMatch) {
      return res.status(400).json({ 
        message: "Name verification failed - Name not found in Aadhaar image" 
      });
    }

    const extractedName = nameMatch[0].toLowerCase().trim();
    const registeredName = user.name.toLowerCase().trim();

    if (extractedName !== registeredName) {
      return res.status(400).json({ 
        message: "Name on Aadhaar card doesn't match registered name",
        details: {
          aadhaarName: extractedName,
          registeredName: registeredName
        }
      });
    }

    // Extract and verify DOB
    const dobMatch = extractedText.match(/DOB:\s*(\d{2}\/\d{2}\/\d{4})/);
    if (!dobMatch) {
      return res.status(400).json({ 
        message: "Date of birth not found in Aadhaar image" 
      });
    }

    const extractedDOB = moment(dobMatch[1], "DD/MM/YYYY");
    const userDOB = moment(user.dob);
    
    if (!extractedDOB.isValid() || !userDOB.isValid()) {
      return res.status(400).json({ 
        message: "Invalid date format in DOB" 
      });
    }

    if (!extractedDOB.isSame(userDOB, 'day')) {
      return res.status(400).json({ 
        message: "Date of birth doesn't match registered DOB",
        details: {
          aadhaarDOB: extractedDOB.format("DD/MM/YYYY"),
          registeredDOB: userDOB.format("DD/MM/YYYY")
        }
      });
    }

    // Extract phone number if present (optional)
    const phoneMatch = extractedText.match(/\b\d{10}\b/);
    if (phoneMatch) {
      user.adar_phoneno = phoneMatch[0];
    }
    
    // All verifications passed - update user record
    user.aadhaarVerified = true;
    user.aadhaarVerificationDate = new Date();
    await user.save();
    
    // Return success response
    res.json({ 
      message: "Aadhaar verification successful",
      data: {
        aadharPhone: user.adar_phoneno || null,
        verifiedName: extractedName,
        verifiedDOB: extractedDOB.format("DD/MM/YYYY"),
        verificationDate: user.aadhaarVerificationDate
      }
    });

  } catch (error) {
    console.error('Aadhaar verification error:', error);
    res.status(500).json({ 
      message: "Error during Aadhaar verification",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

module.exports = verifyAadhaar;