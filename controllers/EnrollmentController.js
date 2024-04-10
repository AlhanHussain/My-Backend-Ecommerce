const Enrollment = require('../models/Enrollment');
const nodemailer = require('nodemailer');



// Create nodemailer transporter
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // Your SMTP server host
  port: 587, // Port for secure SMTP
  secure: false, // true for 465, false for other ports
  auth: {
      user: 'alhanhussain99@gmail.com', // Your SMTP username
      pass: 'rthz pvvy qrpk dokr' // Your SMTP password
  }
});


// Course enrollment controller
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const existingEnrollment = await Enrollment.findOne({ userId: req.user.userId, courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }
    const enrollment = new Enrollment({
      userId: req.user.userId,
      courseId
    });
    await enrollment.save();

  
    // Send email notification
    let mailOptions = {
      from: 'alhanhussain99@gmail.com',
      to: 'alhanhussain75@gmail.com', // Assuming user email is stored in req.user.email
      subject: 'Course Enrollment Confirmation',
      text: `You have successfully enrolled in course ${courseId}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });

    res.status(201).json({ message: 'Course enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// View enrolled courses controller
exports.getEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.userId });
    res.json(enrollments);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
