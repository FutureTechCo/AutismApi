const express =require('express');
const {param ,validtionResult} = require('express-validator');

const {crateSubCategory,
    deleteSpecificSubCategory,
    updateSpecificSubCategory,getSubCategory,getSubCategories} = require('../services/subCategoryService');
const{createSubCategoryValidator,updateSubCategoryValidator,deleteSubCategoryValidator,getSubCategoryValidator}= require('../utills/validators/subCategoryValidators');
const VideoRoute =require('./VideoRoute');

const router =express.Router({mergeParams:true});
router.use('/:SubCategoriesId/VideoRoute',VideoRoute);


router.route('/')
.get(getSubCategories)
.post(createSubCategoryValidator,crateSubCategory);
router.route('/:id')
.get(
    getSubCategoryValidator,
getSubCategory)
.put(updateSubCategoryValidator,updateSpecificSubCategory)
.delete(deleteSubCategoryValidator,deleteSpecificSubCategory);

module.exports =router;