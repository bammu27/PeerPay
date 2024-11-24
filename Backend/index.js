const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const verifyAadhaar = require('./api/adar');
const verifyPAN = require('./api/pan');
const verifyOTP = require('./api/phone');
const registerUser = require('./api/register');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./models/config');   

const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware
app.use(bodyParser.json());

// MongoDB connection function

// Routes
app.post('/auth/register', registerUser);
app.post('/auth/verify-aadhaar', upload.single('aadhaarImage'), verifyAadhaar);
app.post('/auth/verify-pan', upload.single('panImage'), verifyPAN);
app.post('/auth/verify-otp', verifyOTP);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  connectDB(); // Connect to MongoDB before starting the server
  console.log(`Server running on port ${PORT}`);
});
