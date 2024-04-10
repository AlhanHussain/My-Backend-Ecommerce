const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const authMiddleware = require('../middleware/authMiddleware');


// Get courses route with filtering and pagination
router.get('/', CourseController.getCourses);

// CRUD operations 
router.post('/', authMiddleware.authenticate, CourseController.createCourse);
router.get('/:id', CourseController.getCourseById);
router.put('/:id', authMiddleware.authenticate,  CourseController.updateCourse);
router.delete('/:id', authMiddleware.authenticate,  CourseController.deleteCourse);

module.exports = router;












