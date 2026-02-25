// username , psw , email
// create new branches each one password sai babu min = 8 , mani min = 10

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min : 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('User', UserSchema);

