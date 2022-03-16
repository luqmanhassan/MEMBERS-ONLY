const UserModel = require('../models/user.js');
const MessageModel = require('../models/message');
const passport = require('passport');
const bcrypt = require('bcryptjs');
// Home
const Home = function (req, res, next) {
  MessageModel.find()
    .then((result) => {
      res.render('index', {title: 'Home', messages: result});
    })
    .catch((err) => res.send(err));
};

// Sign Up
const signupGetController = function (req, res, next) {
  res.render('signup', {title: 'Sign Up'});
};

const signUpPostController = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      next(err);
    }
    const item = new UserModel({
      username: req.body.username,
      password: hashedPassword,
      avatar: req.body.avatar,
      isMember: 'false',
      isAdmin: 'false',
    })
      .save()
      .then((result) => console.log(result))
      .catch((err) => next(err));
  });
  res.redirect('/');
};

// Login & Log Out
const loginGetController = function (req, res, next) {
  res.render('login', {title: 'Login'});
};

const loginPostController = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true,
});

const logOutController = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Message
const messageGetController = function (req, res, next) {
  res.render('message', {title: 'Message'});
};

const messagePostController = function (req, res, next) {
  const item = new MessageModel(req.body)
    .save()
    .then((result) => console.log(result))
    .catch((err) => next(err));

  res.redirect('/');
};

// Member

const memberGetController = function (req, res, next) {
  res.render('member', {title: 'Member'});
};

const memberPostController = function (req, res, next) {
  const id = req.body.id;
  if (req.body.isMember === 'ape') {
    UserModel.findByIdAndUpdate(id, {
      isMember: 'true',
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  res.redirect('/');
};

// Admin

const adminGetController = function (req, res, next) {
  res.render('admin', {title: 'Admin'});
};

const adminPostController = function (req, res, next) {
  const id = req.body.id;
  if (req.body.isAdmin === 'ape') {
    UserModel.findByIdAndUpdate(id, {
      isAdmin: 'true',
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  res.redirect('/');
};

const deleteMessage = function (req, res, next) {
  const id = req.params.message;
  MessageModel.findByIdAndDelete(id)
    .then((result) => res.json({redirect: '/'}))
    .catch((err) => console.log(err));
};

module.exports = {
  Home,
  signupGetController,
  signUpPostController,
  loginGetController,
  loginPostController,
  logOutController,
  messageGetController,
  messagePostController,
  memberGetController,
  memberPostController,
  adminGetController,
  adminPostController,
  deleteMessage,
};
