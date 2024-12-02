const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    FullName: String,
    Phone: Number
});

module.exports = mongoose.model('contacts', ContactSchema);