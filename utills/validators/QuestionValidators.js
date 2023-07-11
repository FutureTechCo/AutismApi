const slugify = require('slugify');
const { check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');


exports.getQuestionValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];

exports.updateQuestionValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),

  validatorMiddleware,
];

exports.deleteQuestionValidator = [
  check('id').isMongoId().withMessage('Invalid ID formate'),
  validatorMiddleware,
];
