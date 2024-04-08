const express = require('express');
const router = express.Router();
const EnrollmentController = require('../controllers/EnrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Course enrollment route
router.post('/', authMiddleware.authenticate, EnrollmentController.enrollCourse);

// View enrolled courses route
router.get('/', authMiddleware.authenticate, EnrollmentController.getEnrolledCourses);

module.exports = router;




// for get
// http://localhost:5000/api/enrollments


// for post
// take the token which is we get from GET method then paste in auth bearer and add the body also

// {
//     "userId": "611f15f066e2ad001c387daa", // ObjectId of User1
//     "courseId": "611f15f066e2ad001c387dab" // ObjectId of Course1
//   }
  