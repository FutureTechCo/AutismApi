const express =require('express');
const {param ,validtionResult} = require('express-validator');
const{getCommentValidator,deleteCommentValidator,updateCommentValidator,createCommentValidator} =require('../utills/validators/commentValidators');

const { getcomments
    ,getComment
     ,createComment,
     updateComment,
     deleteComment} =require('../services/commentServise');
const subCategoryRoute =require('./subCategoryRoute');

const router =express.Router();
router.use('/:categoryId/subCategoryRoute',subCategoryRoute);
//router.get('/',getCategories);
//router.post('/',creatCategory);
//هدي اختصار للي فوق 
router.route('/')
.get(getcomments)
.post(createCommentValidator,createComment);
router.route('/:id')
.get(
    getCommentValidator,
getComment)
.put(updateCommentValidator,updateComment)
.delete(deleteCommentValidator,deleteComment);

module .exports= router;