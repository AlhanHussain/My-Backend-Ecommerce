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




//for post register  -- http://localhost:5000/api/users/register
// {
//     "name": "Your Name",
//     "email": "mhy.email@example.com",
//     "password": "jkjmhjfjhjh",
//     "profilePicture":"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1"
//   }


// for post login -- http://localhost:5000/api/users/login

    // {
    //     "email": "alice.smith@example8.com",
    //     "password": "alhan hussain"
    //   }




// for get profile
// http://localhost:5000/api/users/profile
// --paste inside auth inside bearer getting login token in thunder client



// for put profile
// http://localhost:5000/api/users/profile
// --paste inside auth inside bearer getting login token in thunder client
// {

//     "name": "Alice pickel",
//     "email": "alice.smith@example2.com",
//     "password": "$2a$10$y50lOJY5HA5OA2W7X3esIO8AuOAiKrkGCTyPB7UYzkpe40HYvRZvm",
//     "profilePicture": "https://res.cloudinary.com/dapw5tihe/image/upload/v1712561466/vris8otd3qkh9upkotby.jpg"
//   }