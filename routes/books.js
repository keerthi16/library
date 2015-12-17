var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var messages = require('../core/messages');

var Books = require('../models/booksModel');

router

    .get('/', function (req, res) {
        Books.find(function (err, data) {
            if (err) {
                res.json({error: true, description: '', data: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, description: '', data: data});
            }
        })
    })

    .post('/', function (req, res) {
        var books = new Books();
        books.bookName = req.param('bookName');
        books.author = req.param('author');
        books.link = req.param('link');
        books.location = req.param('location');
        books.save(function (err, data) {
            if (err) {
                res.json({error: true, description: '', data: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, description: '', data: data});
            }
        })
    });

router.route('/:_id')

    .get(function (req, res) {
        Books.findById(req.params._id, function (err, books) {
            if (err) {
                res.json({error: true, message: messages.ERROR, description: '', data: err});
            } else {
                res.json({error: false, message: messages.SUCCESSFUL, description: '', data: books});
            }
        })
    });


module.exports = router;