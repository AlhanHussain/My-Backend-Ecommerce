const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authenticate} = require('../middleware/authMiddleware')

// User registration route
router.post('/register',UserController.register);

// User login route
router.post('/login', UserController.login);

// User profile route
router.get('/profile',authenticate,UserController.getProfile);
router.put('/profile',authenticate,UserController.updateProfile);



module.exports = router;



