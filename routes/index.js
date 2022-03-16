var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/index.js');

router.get('/', Controllers.Home);

// Sign Up
router.get('/signup', Controllers.signupGetController);
router.post('/signup', Controllers.signUpPostController);

// Login
router.get('/login', Controllers.loginGetController);
router.post('/login', Controllers.loginPostController);

// Message
router.get('/message', Controllers.messageGetController);
router.post('/message', Controllers.messagePostController);

// Member
router.get('/member', Controllers.memberGetController);
router.post('/member', Controllers.memberPostController);

// Admin
router.get('/admin', Controllers.adminGetController);
router.post('/admin', Controllers.adminPostController);

router.delete('/delete/:message', Controllers.deleteMessage);

// LogOut
router.get('/logout', Controllers.logOutController);

module.exports = router;
