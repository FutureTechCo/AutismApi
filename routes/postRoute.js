const express =require('express');
const {param ,validtionResult} = require('express-validator');
const{getPostValidator,deletePostValidator,updatePostValidator,createPostValidator} =require('../utills/validators/PostValidator');

const { getPostes
    ,getPost
     ,createPost,
     updatePost, uploadProductImages,
     resizeProductImages,
     deletePost,add_like,Delete_like} =require('../services/PostService');
const subCategoryRoute =require('./subCategoryRoute');


const router =express.Router();
router.use('/:categoryId/subCategoryRoute',subCategoryRoute);
//router.get('/',getCategories);
//router.post('/',creatCategory);
//هدي اختصار للي فوق 
router.route('/like/:id').put(add_like);
router.route('/DeleteLike/:id').put(Delete_like);
router.route('/')
.get(getPostes)
.post( uploadProductImages,
    resizeProductImages,createPostValidator,createPost);
router.route('/:id')
.get(
    getPostValidator,
    getPost)
.put( uploadProductImages,
    resizeProductImages,updatePostValidator,updatePost)
.delete(deletePostValidator,deletePost);
router.route('/user/:id').get(getPostes);

module .exports= router;