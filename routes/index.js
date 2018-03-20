var express = require('express');
var router = express.Router();

// auth references
const passport = require('passport');
const User = require('../models/user');

/* GET About page. */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About Car Tracker',
    message: 'You are now at the about page.',
    user: req.user
  });
});

/* GET Contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', {
    title: 'Contact Us',
    message: 'You are now at the contact page.',
    user: req.user
  });
});

// GET: /register
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register',
    user: req.user
  });
});

// POST: /register
router.post('/register', (req, res, next) => {
  // create the new User with our model
  User.register(new User( {
    username: req.body.username,
    phone: req.body.phone
  }), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      // automatically log the user in and direct to /cars
      /*req.login(user, () => {
        res.redirect('/cars');
      })*/
      res.redirect('/login');
    }
  });
});

// GET: /login
router.get('/login', (req, res, next) => {
  // check for invalid login message
  let messages = req.session.messages || [];

  // clear the session messages
  req.session.messages = [];

  res.render('login', {
    title: 'Login',
    messages: messages,
    user: req.user
  });
});

// POST: /login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/cars',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login'
}));

// GET: /logout
router.get('/logout', (req, res, next) => {
  // clear any session messages
  req.session.messages = [];
  // end the user's session
  req.logout();
  // redirect to login or home page
  res.redirect('/');
});

// GET: /google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// GET: /google/callback
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
  scope: 'email'
}),
(req, res, next) => {
  res.redirect('/cars');
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Car Tracker',
    message: 'COMP2106 In-Class Node Application',
    user: req.user 
  });
});


module.exports = router;
