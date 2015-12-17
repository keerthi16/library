var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = require('./booksModel');

var librarianSchema = new Schema({
    name: {type: String, required: true},
    books: {type: [Books.ObjectId]},
    phone: {type: String, required: true}
});

module.exports = mongoose.model('Librarian', librarianSchema);