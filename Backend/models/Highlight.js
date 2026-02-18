// SAI BABU HW
const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    highlightedText: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now

    },
    updatedAt: {
        type: Date,
        defult: Date.now
    }
});
module.exports = mongoose.model('Highlight', highlightSchema);

