const mongoose = require('mongoose')
const User = require('./UserModule')
const Post = require('./UserPost')
const CommentSchema = new mongoose.Schema({
  PostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  ventId: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
// connections: { // This object will store the connection status to the post's author
//     ventId: {
//       type: String, // Corrected to String to match your frontend logic
//       default: null 
//     },
//     status: {
//       type: String,
//       enum: ['pending', 'accepted', 'rejected', 'none'],
//       default: 'none'
//     }
//   },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

