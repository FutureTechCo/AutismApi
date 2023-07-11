const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getVideoValidator = [
  check('id').isMongoId().withMessage('Invalid Video id format'),
  validatorMiddleware,
];

exports.createVideoValidator = [
  check('name')
    .notEmpty()
    .withMessage('Video name required')
    .isLength({ min: 3 })
    .withMessage('Too short Video name')
   
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Video id format'),
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check('id').isMongoId().withMessage('Invalid Video id format'),
  validatorMiddleware,
];
