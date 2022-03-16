const UserModel = require('../models/user.js');
const MessageModel = require('../models/message');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {body, validationResult} = require('express-validator');

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

const signUpPostController = [
  body('username', 'Empty name').trim().isLength({min: 1}).escape(),
  body('password').isLength({min: 1}).escape(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render('signup', {title: 'Sign Up', alert});
    }

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
  },
];

// Login & Log Out
const loginGetController = function (req, res, next) {
  res.render('login', {title: 'Login'});
};

const loginPostController = [
  body('username', 'Empty name').trim().isLength({min: 1}).escape(),
  body('password').isLength({min: 1}).escape(),
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  }),
];

const logOutController = (req, res) => {
  req.logout();
  res.redirect('/');
};

// Message
const messageGetController = function (req, res, next) {
  res.render('message', {title: 'Message'});
};

const messagePostController = [
  body('title', 'Empty title').trim().isLength({min: 1}).escape(),
  body('message', 'Empty message').trim().isLength({min: 1}).escape(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render('message', {title: 'Message', alert});
    }

    const item = new MessageModel(req.body)
      .save()
      .then((result) => console.log(result))
      .catch((err) => next(err));

    res.redirect('/');
  },
];

// Member

const memberGetController = function (req, res, next) {
  res.render('member', {title: 'Member'});
};

const memberPostController = [
  body('isMember', 'Empty Value').trim().isLength({min: 3}).escape(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render('member', {title: 'Member', alert});
    }

    const id = req.body.id;
    if (req.body.isMember === 'ape') {
      UserModel.findByIdAndUpdate(id, {
        isMember: 'true',
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }

    res.redirect('/');
  },
];

// Admin

const adminGetController = function (req, res, next) {
  res.render('admin', {title: 'Admin'});
};

const adminPostController = [
  body('isAdmin', 'Empty Value').trim().isLength({min: 3}).escape(),
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render('admin', {title: 'Admin', alert});
    }

    const id = req.body.id;
    if (req.body.isAdmin === 'ape') {
      UserModel.findByIdAndUpdate(id, {
        isAdmin: 'true',
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }

    res.redirect('/');
  },
];

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
