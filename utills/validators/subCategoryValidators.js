const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createSubCategoryValidator = [
    check('name')
      .notEmpty()
      .withMessage('Category required')
      .isLength({ min: 2 })
      .withMessage('Too short category name')
      .isLength({ max: 32 })
      .withMessage('Too long category name'),
      check('category').notEmpty().withMessage('sub Category must be belong to category ')
      .isMongoId().withMessage('Invalid Category id format'),
    validatorMiddleware,
  ];

  exports.updateSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    body('name') .optional() .custom((val, { req }) => {
        req.body.slug = slugify(val);
        return true;
      }),
    validatorMiddleware,
  ];
  
  exports.deleteSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
  ];

  exports.getSubCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
  ];