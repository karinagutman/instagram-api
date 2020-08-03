const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const Comment = new mongoose.model('Comment' , {
    user: {
        type: ObjectId,
        require: true ,
        ref: 'User'
    },
    postId: {
        type:ObjectId,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    }
});

module.exports = Comment;