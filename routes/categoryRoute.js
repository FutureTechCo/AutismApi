
const express =require('express');
const {param ,validtionResult} = require('express-validator');
const{getCategoryValidator,deleteCategoryValidator,updateCategoryValidator,createCategoryValidator} =require('../utills/validators/categoryValidators');

const { getCategories
    ,getCategory
     ,creatCategory,
     updateSpecificCategory,
     deleteSpecificCategory} =require('../services/categoryService');
const subCategoryRoute =require('./subCategoryRoute');

const router =express.Router();
router.use('/:categoryId/subCategoryRoute',subCategoryRoute);
//router.get('/',getCategories);
//router.post('/',creatCategory);
//هدي اختصار للي فوق 
router.route('/')
.get(getCategories)
.post(createCategoryValidator,creatCategory);
router.route('/:id')
.get(
    getCategoryValidator,
getCategory)
.put(updateCategoryValidator,updateSpecificCategory)
.delete(deleteCategoryValidator,deleteSpecificCategory);

module .exports= router;