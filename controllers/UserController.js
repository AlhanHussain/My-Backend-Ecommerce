const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator');
const cloudinary = require('cloudinary').v2; // Import Cloudinary SDK
const nodemailer = require('nodemailer');

// const { Resend } = require('resend');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'alhanhussain99@gmail.com', // your Gmail email address
    pass: 'rthz pvvy qrpk dokr' // your app-specific password or account password
  }
});

// Initialize Resend with your API key
// const resend = new Resend('re_211TUpwD_CoeuLejdhvsMhqWpD45BEtG6');

// User registration controller
// Import necessary libraries

// User registration controller
exports.register = async (req, res) => {
  try {
    const { name, email, password, profilePicture} = req.body;
    
    // Validate email uniqueness
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists'  });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
       // Upload profile picture to Cloudinary
    
       const uploadedImage = await cloudinary.uploader.upload(profilePicture);
       const profilePictureUrl = uploadedImage.secure_url;
  
  
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture:profilePictureUrl,

    });
    await user.save();

        // Send registration email using Resend
        // const { data, error } = await resend.emails.send({
        //   from: 'Name <alhan38.wordpress.com>', // Corrected email address format
        //   to: ['alhanhussain99@gmail.com'], // Enclosed the email address in quotes
        //   subject: 'Welcome to Our App',
        //   html: `Dear ${name},<br/><br/>Thank you for registering with our app.`,
        // });
       
            // Send registration email
    const mailOptions = {
      from: 'alhanhussain99@gmail.com', // sender address
      to: 'alhanhussain75@gmail.com', // receiver address
      subject: 'Welcome to Our App',
      html: `Dear ${name},<br/><br/>Thank you for registering with our app.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending registration email:', error);
      } else {
        console.log('Registration email sent successfully');
      }
    })
          
        // // Handle email sending errors
        // if (error) {
        //   console.error('Error sending registration email:', error);
        //   // Handle error response if needed
        // } else {
        //   console.log('Registration email sent successfully');
        // }
    
    res.status(201).json({ message: 'User registered successfully with ',result: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// User login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get user profile controller
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update user profile controller
exports.updateProfile = async (req, res) => {
  try {
    const { name, profilePicture } = req.body;
    await User.findByIdAndUpdate(req.user.userId, { name, profilePicture });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

