const express = require('express');
const router = express.Router();
const EnrollmentController = require('../controllers/EnrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Course enrollment route
router.post('/', authMiddleware.authenticate, EnrollmentController.enrollCourse);

// View enrolled courses route
router.get('/', authMiddleware.authenticate, EnrollmentController.getEnrolledCourses);

module.exports = router;




