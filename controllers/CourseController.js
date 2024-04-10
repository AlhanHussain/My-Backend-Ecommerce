const Course = require('../models/Course');
const nodemailer = require('nodemailer');




// Create nodemailer transporter
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Your SMTP server host
  port: 587, // Port for secure SMTP
  secure: false, // true for 465, false for other ports
  auth: {
      user: 'alhanhussain99@gmail.com', // Your SMTP username
      pass: 'rthz pvvy qrpk dokr' // Your SMTP password
  }
});


// Get courses controller with filtering and pagination
exports.getCourses = async (req, res) => {
    try {
      let { page, limit, category, level } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const filter = {};
      if (category) {
        filter.category = category;
      }
      if (level) {
        filter.level = level;
      }

      
      const count = await Course.countDocuments(filter);
      const courses = await Course.find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .exec();
      res.json({
        courses,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

// Create course controller
exports.createCourse = async (req, res) => {
  
  try {
    const { title, category, level, popularity  } = req.body;
    const course = new Course({
      title,
      category,
      level,
      popularity,
      
    });
    await course.save();

    let mailOptions = {
      from: 'alhanhussain99@gmail.com',
      to: 'alhanhussain84@gmail.com', // Replace with admin email address
      subject: 'New Course Created',
      text: `A new course titled "${title}" has been created.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });

    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get course by ID controller
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update course controller
exports.updateCourse = async (req, res) => {
  try {
    const { title, category, level, popularity } = req.body;
    const course = await Course.findByIdAndUpdate(req.params.id, {
      title,
      category,
      level,
      popularity
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete course controller
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
