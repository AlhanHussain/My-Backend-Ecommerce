const Enrollment = require('../models/Enrollment');

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
    res.status(201).json({ message: 'Course enrolled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// View enrolled courses controller
exports.getEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user.userId }).populate('courseId');
    res.json(enrollments);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
