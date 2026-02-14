const mongoose = require('mongoose')
const User=require('./UserModule')
const Comment=require('./UserComment')



const PostSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Title: {
        type: String,
        required: true
    }, Description: {
        type: String,
        required: true
    },
    Tag: {
        type: String, 
        required: true
    },
    Comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
    
    default: []
},
    
    createdAt: {
        type: Date,
        default: Date.now
    }

})

const Post=mongoose.model('Post',PostSchema);

module.exports=Post;
