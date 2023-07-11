const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getAdviceValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];

exports.createAdviceValidator = [
  check('titel')
    .notEmpty()
    .withMessage('titel required')
    .isLength({ min: 3 })
    .withMessage('Too short titel name')
    .isLength({ max: 50 })
    .withMessage('Too long titel name')
    ,
    check('advice').notEmpty().withMessage('advice required'),
    check('categoryAdvice').notEmpty().withMessage('Advice must be belong to categoryAdvice ')
    .isMongoId().withMessage('Invalid categoryAdvice id format'),
  validatorMiddleware,
];

exports.updateAdviceValidator = [
  check('id').isMongoId().withMessage('Invalid Advice id format'),
  body('titel')
    .optional()  ,
    body('advice') .optional() ,
  validatorMiddleware,
];

exports.deleteAdviceValidator = [
  check('id').isMongoId().withMessage('Invalid Advice id format'),
  validatorMiddleware,
];
