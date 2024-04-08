const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const authMiddleware = require('../middleware/authMiddleware');

// Get courses route with filtering and pagination
router.get('/', CourseController.getCourses);

// CRUD operations for superadmin
router.post('/', authMiddleware.authenticate,authMiddleware.superadminOnly,  CourseController.createCourse);
router.get('/:id', CourseController.getCourseById);
router.put('/:id', authMiddleware.authenticate, authMiddleware.superadminOnly, CourseController.updateCourse);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.superadminOnly, CourseController.deleteCourse);

module.exports = router;



// for get method
// http://localhost:5000/api/courses/660ef7cc612fa1f1dde5072a
// http://localhost:5000/api/courses



// for post method





