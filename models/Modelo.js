const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    User: {
        type: String,
        required: true
    },
    Mail: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('users', usersSchema)