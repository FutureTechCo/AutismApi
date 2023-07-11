const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getCommentValidator = [
  check('id').isMongoId().withMessage('Invalid Post id format'),
  validatorMiddleware,
];

exports.createCommentValidator = [
  check('text')
    .notEmpty()
    .withMessage('text required')
    .isLength({ min: 3 })
    .withMessage('Too short Post text'),
    check('Post').notEmpty().withMessage('Comment must be belong to Post ')
    .isMongoId().withMessage('Invalid Post id format'),
    check('user').notEmpty().withMessage('Comment must be belong to user ')
    .isMongoId().withMessage('Invalid user id format'),

   
  validatorMiddleware,
];

exports.updateCommentValidator = [
  check('id').isMongoId().withMessage('Invalid Comment id format'),
 
  validatorMiddleware,
];

exports.deleteCommentValidator = [
  check('id').isMongoId().withMessage('Invalid Comment id format'),
  validatorMiddleware,
];
