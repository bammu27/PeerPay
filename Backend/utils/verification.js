const Tesseract = require('tesseract.js');

/**
 * Extracts text from an image using Tesseract.js
 * @param {string} imagePath - Path to the image file
 * @returns {Promise<string>} - Extracted text from the image
 */
async function extractTextFromImage(imagePath) {
  try {
    const { data } = await Tesseract.recognize(imagePath, 'eng');
    return data.text;
  } catch (error) {
    console.error('Error during OCR with Tesseract.js:', error);
    throw error;
  }
}

// Example usage


function sendOTP(phoneNumber) {
  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        body: `Your OTP is: ${otp}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      })
      .then((message) => resolve({ otp, messageId: message.sid }))
      .catch((error) => reject(error));
  });
}

module.exports = { extractTextFromImage, sendOTP };