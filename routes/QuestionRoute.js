const express = require('express');
const {
  getQuestionValidator,

  updateQuestionValidator,
  deleteQuestionValidator,
} = require('../utills/validators/QuestionValidators');

const {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  uploadQuestionImages,
  resizeQuestionImages,getlistofQuestion
} = require('../services/QuestionServise');
const authService = require('../services/authService');


const router = express.Router();
router
  .route('/')
  .get(getQuestions)
  .post(
    authService.protect,
    createQuestion
  );
  router.route('/test/:id').get(getlistofQuestion);
router
  .route('/:id')
  .get(getQuestionValidator, getQuestion)
  .put(
    authService.protect,
    uploadQuestionImages,
    resizeQuestionImages,
    updateQuestionValidator,
    updateQuestion
  )
  .delete(
    authService.protect,
    deleteQuestionValidator,
    deleteQuestion
  );

module.exports = router;
