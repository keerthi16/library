var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var booksSchema = new Schema({
    bookId: {type: Schema.ObjectId},
    bookName: {type: String, required: true},
    author: {type: String, required: true},
    link: {type: String, required: true},
    location: {type: String, required: true},
    user: [{type: Schema.ObjectId}]
});

module.exports = mongoose.model('Books', booksSchema);