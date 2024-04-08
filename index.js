const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const cloudinaryConfig = require('./cloudinary/cloudinary'); // Assuming config.js is in the same directory
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with credentials from config file
cloudinary.config({
    cloud_name: cloudinaryConfig.cloudinary.cloud_name,
    api_key: cloudinaryConfig.cloudinary.api_key,
    api_secret: cloudinaryConfig.cloudinary.api_secret
});



const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enrollments', require('./routes/enrollmentRoutes'));



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
