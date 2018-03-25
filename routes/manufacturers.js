// references
var express = require('express');
var router = express.Router();
const Manufacturer = require('../models/manufacturer');

const functions = require('../config/functions');

// GET: /manufacturer
router.get('/', (req, res, next) => {
    Manufacturer.find((err, manufacturers) => {
        if(err) {
            console.log(err);
        } else {
            res.render('manufacturers/index', {
                title: 'Manufacturer List',
                manufacturers: manufacturers,
                user: req.user
            });
        }
    });
});

// GET: /manufacturers/add
router.get('/add', functions.isLoggedIn, (req, res, next) => {
    res.render('manufacturers/add', {
        title: 'Add a new manufacturer',
        user: req.user
    })
});

// POST: /manufacturers/add
router.post('/add', functions.isLoggedIn, (req, res, next) => {
    Manufacturer.create({
        name: req.body.name,
        country: req.body.country,
        yearFounded: req.body.yearFounded
    }, (err, manufacturer) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/manufacturers');
        }
    });
})

//GET: //manufacturers/delete/abc123
router.get('/delete/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id

    Manufacturer.remove({_id: _id}, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/manufacturers');
        }
    })
});

// GET: /manufacturers/edit/abc123
router.get('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Manufacturer.findById(_id, (err, manufacturer) => {
        if(err) {
            console.log(err);
        } else {
            res.render('manufacturers/edit', {
                title: 'Manufacturer Details',
                manufacturer: manufacturer,
                user: req.user
            });
        }
    });
});

// POST: /manufacturers/edit/abc123
router.post('/edit/:_id', functions.isLoggedIn, (req, res, next) => {
    let _id = req.params._id;

    Manufacturer.update({_id: _id}, {
        $set: {
            name: req.body.name,
            country: req.body.country,
            yearFounded: req.body.yearFounded
        }
    }, null, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/manufacturers');
        }
    });
});

// make public
module.exports = router;
