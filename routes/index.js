var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'Car Tracker',
    message: 'COMP2106 In-Class Node Application' 
  });
});

module.exports = router;
