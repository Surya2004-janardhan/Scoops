const mongoose = require('mongoose');
// linked with the post model to get the post details of highlighted text. 
//linked with the user model to get the user details of highlighted text. 
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

