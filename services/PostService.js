const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utills/apiError');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const post = require('../models/postModel');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');
const comment = require('../models/commentModel');

exports.uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',

    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/post/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `post-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/post/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});

// @desc    Get list of post
// @route   GET /api/v1/post
// @access  Public
exports.getPostes=asyncHandler(async(req,res)=>{
  const page =req.query.page * 1 || 1;
  const limit =req.query.limit * 1 || 5;
  console.log(req.params);
  const skip = (page -1)* limit;
  let PostesFilter ={};
    if(req.params.user){
      PostesFilter={user :req.params.user};
    }

const Postes = await post.find(PostesFilter).skip(skip).limit(limit).populate({path : 'user'});
res.status(200).json({results:Postes.length ,page,data: Postes});
});


// @desc    Get specific post by id
// @route   GET /api/v1/post/:id
// @access  Public
exports.getPost =asyncHandler(async(req,res,next)=>{
  const {id} =req.params;
  const postw =await post.findById(id).populate({path : 'user'});
const commente = await comment.find({Post :id}).populate({path : 'user'});
  if(!postw) {
     // res.status(404).json({msg:" no category for this id"});
  return   next(new ApiError(`no post for this id  ${id}` ,404));

  }
  postw.views = postw.views+1;
  postw.save();
      res.status(200).json({data:postw,comments:commente});
});
// @desc    Create post
// @route   POST  /api/v1/post
// @access  Private/Admin-Manager
exports.createPost = factory.createOne(post);

// @desc    Update specific post
// @route   PUT /api/v1/post/:id
// @access  Private/Admin-Manager
exports.updatePost = factory.updateOne(post);

// @desc    Delete specific post
// @route   DELETE /api/v1/post/:id
// @access  Private/Admin
exports.deletePost = factory.deleteOne(post);


// @desc    add_like 
// @route   put /api/v1/post/like:id
// @access  Public
exports.add_like =asyncHandler(async(req,res,next)=>{
  const {id} =req.params;
  const postw =await post.findById(id);
  if(!postw) {
     // res.status(404).json({msg:" no category for this id"});
  return   next(new ApiError(`no post for this id  ${id}` ,404));

  }
  postw.Like = postw.Like+1;
  postw.save();
      res.status(200).json({data:postw,comments:commente});
});

// @desc    Delete_like 
// @route   put /api/v1/post/DeleteLike:id
// @access  Public
exports.Delete_like =asyncHandler(async(req,res,next)=>{
  const {id} =req.params;
  const postw =await post.findById(id);
  if(!postw) {
     // res.status(404).json({msg:" no category for this id"});
  return   next(new ApiError(`no post for this id  ${id}` ,404));

  }
  postw.Like = postw.Like-1;
  postw.save();
      res.status(200).json({data:postw,comments:commente});
});