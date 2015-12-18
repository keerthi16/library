var express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    messages = require('../core/messages'),
    User = require('../models/users'),
    Librarian = require('../models/librarian'),
    Books = require('../models/books');


router

    .get('/users', function (req, res, next) {
        User.find(function (err, user) {
            if (err) {
                res.json({error: true, message: messages.ERROR, data: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, data: user},
            }
        })
    })

    .post('/users', function (req, res, next) {
        var user = new User();
        user.name = req.param('name')
        user.phone = req.param('phone')

        user.save(function (err, user) {
            if (err) {
                res.json({error: true, message: messages.ERROR, description: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, description: '', data: user});
            }
        })
    })

    .post('/', function (req, res, next) {
        var librarian = new Librarian();
        librarian.name = req.param('name')
        librarian.phone = req.param('phone')

        librarian.save(function (err, librarian) {
            if (err) {
                res.json({error: true, message: messages.ERROR, description: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, description: '', data: librarian});
            }
        })
    })

    .get('/', function (req, res, next) {
        Librarian.find(function (err, librarian) {
            if (err) {
                res.json({error: true, message: messages.ERROR, data: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, data: librarian});
            }
        })
    })


router.route('/users/:_id')

    .get(function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.json({error: true, message: messages.ERROR, data: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, data: user});
            }
        })
    })

    .delete(function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.json({error: true, message: messages.ERROR, data: err});
            } else {
                user.remove(function (err, user) {
                    if (err) {
                        res.json({error: true, message: messages.ERROR, data: err});
                    } else {
                        res.json({error: false, message: messages.SUCCESSFUL, data: user});
                    }
                })

            }
        })
    })

    .put(function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.json({error: true, message: messages.ERROR, data: err});
            } else {
                user.name = req.param('name')
                user.phone = req.param('phone')
                user.save(function (err) {
                    if (err) {
                        res.json({error: true, message: messages.ERROR, data: err});
                    } else {
                        res.json({error: false, message: messages.SUCCESSFUL,});
                    }
                })
            }
        })
    });

router.route('/:_id/borrow/:bookId')


    .post(function (req, res) {
        Books.findById(req.params.bookId, function (err, books) {
            if (err) {
                res.json({error: true, message: messages.SUCCESSFUL});
            } else {

                User.findByIdAndUpdate(req.params._id, {$push: {books: books}}, {upsert: true}, function (err, result) {
                    if (err) {
                        res.json({error: true, message: messages.ERROR, data: err});
                    } else {
                        res.json({error: false, message: messages.SUCCESSFUL, data: result});
                    }
                })
            }
        })
    });

router.route('/:_id/return/:bookId')

    .delete(function (req, res) {

        Books.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.json({error: true, message: messages.ERROR});
            } else {
                User.findByIdAndUpdate(req.params._id, {$pull: {books: book}}, function (err, result) {
                    if (err) {
                        res.json({error: true, message: messages.ERROR, data: err});
                    } else {
                        res.json({error: false, message: messages.SUCCESSFUL, data: result});
                    }
                })
            }
        });
    });


module.exports = router;
