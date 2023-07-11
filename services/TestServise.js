const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');
const factory = require('./handlersFactory');
const Test = require('../models/testModel');




// @desc    Get list of Test
// @route   GET /api/v1/Test
// @access  Public
exports.getQuestions = factory.getAll(Test);

// @desc    Get specific Test by id
// @route   GET /api/v1/Test/:id
// @access  Public
exports.getQuestion = factory.getOne(Test);

// @desc    Create Test
// @route   POST  /api/v1/Test
// @access  Private
exports.createQuestion = factory.createOne(Test);
// @desc    Update specific Test
// @route   PUT /api/v1/Test/:id
// @access  Private
exports.updateQuestion = factory.updateOne(Test);

// @desc    Delete specific Test
// @route   DELETE /api/v1/Test/:id
// @access  Private
exports.deleteQuestion = factory.deleteOne(Test);
