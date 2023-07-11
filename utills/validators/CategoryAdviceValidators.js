const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');



exports.createCategoryAdviceValidator = [
  check('titel')
    .notEmpty()
    .withMessage('Category required')
    .isLength({ min: 3 })
    .withMessage('Too short CategoryAdvice titel')
    .isLength({ max:50 })
    .withMessage('Too long CategoryAdvice titel'),
   
  validatorMiddleware,
];

exports.updateCategoryAdviceValidator = [
  check('id').isMongoId().withMessage('Invalid CategoryAdvice id format'),
  body('titel')
    .optional()
  ,
  validatorMiddleware,
];

exports.deleteCategoryAdviceValidator = [
  check('id').isMongoId().withMessage('Invalid CategoryAdvice id format'),
  validatorMiddleware,
];
