var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = require('./booksModel');

var userSchema = new Schema({
    name: {type: String, required: true},
    books: {type: [Books.ObjectId]},
    phone: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);