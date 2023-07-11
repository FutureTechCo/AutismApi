const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            trim : true,
            minlength : [2,'to short Post text'],
        },
      
        views :{
            type : Number,
            default :0
        },
        Like :{
            type : Number,
            default :0

        },
      
        Post:{
            type : mongoose.Schema.ObjectId,
            ref :'Post',
            required: [ true, 'Post must be belong to parent Comment'],  
        },
      

        user : {
            type : mongoose.Schema.ObjectId,
            ref :'User',
            required: [ true, 'User must be belong to parent Comment'],
            
        },
    },
    {timestamps : true}
);

module.exports =mongoose.model('Comment',CommentSchema);