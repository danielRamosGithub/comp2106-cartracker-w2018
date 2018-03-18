var express = require('express');
var router = express.Router();

// auth references
const passport = require('passport');
const User = require('../models/user');

/* GET About page. */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About Car Tracker',
    message: 'You are now at the about page.'
  });
});

/* GET About page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', {
    title: 'Contact Us',
    message: 'You are now at the contact page.'
  });
});

// GET: /register
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register'
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
  res.render('login', {
    title: 'Login'
 });
});

// POST: /login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/cars',
  failureRedirect: '/login'
}));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Car Tracker',
    message: 'COMP2106 In-Class Node Application' 
  });
});

module.exports = router;
