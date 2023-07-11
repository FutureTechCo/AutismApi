
const express =require('express');
const {param ,validtionResult} = require('express-validator');
const{deleteCategoryAdviceValidator,updateCategoryAdviceValidator,createCategoryAdviceValidator} =require('../utills/validators/CategoryAdviceValidators');

const { getCategoryAdvice
    
     ,creatCategoryAdvice,
     updateSpecificCategoryAdvice,
     deleteSpecificCategoryAdvice} =require('../services/categoryAdvice');

const router =express.Router();

router.route('/')
.get(getCategoryAdvice)
.post(createCategoryAdviceValidator,creatCategoryAdvice);
router.route('/:id')

.put(updateCategoryAdviceValidator,updateSpecificCategoryAdvice)
.delete(deleteCategoryAdviceValidator,deleteSpecificCategoryAdvice);

module .exports= router;