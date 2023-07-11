const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getPostValidator = [
  check('id').isMongoId().withMessage('Invalid Post id format'),
  validatorMiddleware,
];

exports.createPostValidator = [
  check('text')
    .notEmpty()
    .withMessage('text required')
    .isLength({ min: 3 })
    .withMessage('Too short Post text'),
   
  validatorMiddleware,
];

exports.updatePostValidator = [
  check('id').isMongoId().withMessage('Invalid Post id format'),
 
  validatorMiddleware,
];

exports.deletePostValidator = [
  check('id').isMongoId().withMessage('Invalid Post id format'),
  validatorMiddleware,
];
