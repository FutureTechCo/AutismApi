const express = require('express');
const {
  getQuestionValidator,

  updateQuestionValidator,
  deleteQuestionValidator,
} = require('../utills/validators/TestValidators');

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
 
} = require('../services/TestServise');
const authService = require('../services/authService');


const router = express.Router();
router
  .route('/')
  .get(getQuestions)
  .post(
    authService.protect,
  
    createQuestion
  );
router
  .route('/:id')
  .get(getQuestionValidator, getQuestion)
  .put(
    authService.protect,
   
    updateQuestionValidator,
    updateQuestion
  )
  .delete(
    authService.protect,
    deleteQuestionValidator,
    deleteQuestion
  );

module.exports = router;
