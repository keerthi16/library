var mongoose = require('mongoose');

mongoose.connect('mongodb://keerthi:kike@ds029615.mongolab.com:29615/kikedb');

mongoose.exports = mongoose.connection;