var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var messages = require('../core/messages');
var User = require('../models/usersModel');

var Books = require('../models/booksModel');

router.route('/:_id')

    .get(function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.json({error: true, message: messages.ERROR, description: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, description: '', data: user});
            }
        })
    })

    .put(function (req, res) {
        User.findById(req.params._id, function (err, user) {
            if (err) {
                res.json({error: true, message: messages.ERROR, description: err});
            } else {
                user.name = req.param('name')
                user.phone = req.param('phone')
                user.save(function (err) {
                    if (err) {
                        res.json({error: true, message: messages.ERROR, description: err});
                    } else {
                        res.json({error: false, message: messages.SUCCESSFUL, description: '', data: user});
                    }
                })
            }
        })
    });

router.route('/:_id/borrow/:bookId')

    .post(function (req, res) {
        Books.findById(req.params.bookId, function (err, books) {
            if (err) {
                res.json({error: true, message: messages.ERROR, description: err});
            } else {
                var UserId = req.params._id;

                Books.findByIdAndUpdate(req.params.bookId, {$push: {user: UserId}}, function (err, result) {
                    if (err) {
                        res.json({error: true, message: messages.ERROR, description: err});
                    } else {
                        User.findByIdAndUpdate(req.params._id, {$push: {books: books}}, {upsert: true}, function (err, result) {
                            if (err) {
                                res.json({error: true, message: messages.ERROR, description: err});
                            } else {
                                res.json({error: false, message: messages.SUCCESSFUL, description: '', data: result});
                            }
                        });
                    }
                })
            }
        })
    });

router.route('/:_id/return/:bookId')

    .delete(function (req, res) {

        Books.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.json({error: true, message: messages.ERROR, description: err});
            } else {
                Books.findByIdAndUpdate(req.params.bookId, {$pull: {user: UserId}}, function (err, result) {
                    if (err) {
                        res.json({error: true, message: messages.ERROR, description: err});
                    } else {
                        User.findByIdAndUpdate(req.params._id, {$pull: {books: book}}, function (err, result) {
                            if (err) {
                                res.json({error: true, description: '', data: err});
                            } else {
                                res.json({error: false, message: messages.SUCCESSFUL});
                            }
                        })
                    }
                });
            }
        })
    });

module.exports = router;
