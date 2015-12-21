var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = require('./books');

var librarianSchema = new Schema({
    name: {type: String, required: true},
    books: {type: [Books.ObjectId]},
    phone: {type: String, required: true}
});

module.exports = mongoose.model('Librarian', librarianSchema, 'Librarian');