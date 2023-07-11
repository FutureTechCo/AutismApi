const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const ApiError = require('../utills/apiError');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');
const factory = require('./handlersFactory');
const Question = require('../models/Question');

exports.uploadQuestionImages = uploadMixOfImages([
  {
    name: 'image',
    maxCount: 1,
  },
 
]);

exports.resizeQuestionImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for image
  if (req.files.image) {
    const image_qu = `image_qu-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.image[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/image_qus/${image_qu}`);

    // Save image into our db
    req.body.image = image_qu;
  }
 
 
});

// @desc    Get list of Question
// @route   GET /api/v1/Question
// @access  Public
exports.getQuestions = factory.getAll(Question);

// @desc    Get list of Question
// @route   GET /api/v1/Question/test/
// @access  Private
exports.getlistofQuestion =asyncHandler(async(req,res,next)=>{
  const {id} =req.params;
  const Questions =await Question.find({Test:id});
  if(!Questions) {
     // res.status(404).json({msg:" no category for this id"});
  return   next(new ApiError(`no Questions for this id  ${id}` ,404));

  }

      res.status(200).json({Questiones:Questions});
});

// @desc    Get specific Question by id
// @route   GET /api/v1/Question/:id
// @access  Public
exports.getQuestion = factory.getOne(Question);

// @desc    Create Question
// @route   POST  /api/v1/Question
// @access  Private
exports.createQuestion = factory.createOne(Question);
// @desc    Update specific Question
// @route   PUT /api/v1/Question/:id
// @access  Private
exports.updateQuestion = factory.updateOne(Question);

// @desc    Delete specific Question
// @route   DELETE /api/v1/Question/:id
// @access  Private
exports.deleteQuestion = factory.deleteOne(Question);
