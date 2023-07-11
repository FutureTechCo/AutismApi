
const express =require('express');
const {param ,validtionResult} = require('express-validator');
const{getAdviceValidator,deleteAdviceValidator,updateAdviceValidator,createAdviceValidator} =require('../utills/validators/AdviceValidators');

const { getAdvices
    ,getAdvice
     ,creatAdvice,
     updateSpecificAdvice,
     deleteSpecificAdvice} =require('../services/AdviceServise');

const router =express.Router();

router.route('/')
.get(getAdvices)
.post(createAdviceValidator,creatAdvice);
router.route('/:id')
.get(
    getAdviceValidator,
    getAdvice)
.put(updateAdviceValidator,updateSpecificAdvice)
.delete(deleteAdviceValidator,deleteSpecificAdvice);

module .exports= router;