const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const post = require('../models/postModel');

const factory = require('./handlersFactory');
const comment = require('../models/commentModel');



// @desc    Get list of comment
// @route   GET /api/v1/comment
// @access  Public
exports.getcomments = factory.getAll(comment);

// @desc    Get specific comment by id
// @route   GET /api/v1/comment/:id
// @access  Public
exports.getComment = factory.getOne(comment);

// @desc    Create comment
// @route   POST  /api/v1/comment
// @access  Private/Admin-Manager
exports.createComment =asyncHandler(async(req,res)=>{
   
        const document = await post.findById(req.body.Post );
        document.comment =document.comment+1;
        if (!document) {
          return next(
            new ApiError(`No post for this id ${req.params.id}`, 404)
          );
        }
        // Trigger "save" event when update document
        document.save();
    const comments =await comment.create(req.body);
    res.status(201).json({data:comments});
 
});

// @desc    Update specific comment
// @route   PUT /api/v1/comment/:id
// @access  Private/Admin-Manager
exports.updateComment = factory.updateOne(comment);

// @desc    Delete specific comment
// @route   DELETE /api/v1/comment/:id
// @access  Private/Admin
exports.deleteComment = factory.deleteOne(comment);
