const VideoModel = require("../models/VideoModel");
const slugify = require('slugify');
const ApiEerror = require('../utills/ApiEerror');
const asyncHandler = require('express-async-handler')
const subCategoryModel = require("../models/subCategoryModel");

//@desc ارجاع جميع Video 
//@route post  /api/v1/Video
//@access Public
exports.getVideoes=asyncHandler(async(req,res)=>{
    const page =req.query.page * 1 || 1;
    const limit =req.query.limit * 1 || 5;
    const skip = (page -1)* limit;
    let SubCategoriesIdFilter ={};
    if(req.params.SubCategoriesId){
        SubCategoriesIdFilter={PhsCategory :req.params.SubCategoriesId};
    }

const Videoes = await VideoModel.find(SubCategoriesIdFilter).skip(skip).limit(limit);
res.status(200).json({results:Videoes.length ,page,data: Videoes});
});
//@desc انشاء Video 
//@route post  /api/v1/Video
//@access private
exports.creatVideo =asyncHandler(async(req,res)=>{
    
   // const name =req.body.name;
    
    const Video =await VideoModel.create(req.body);
    const subCategory=await subCategoryModel.findOneAndUpdate(
        {_id:Video.PhsCategory},
        {$push: {Video :{$each:[  {name:Video.name,_id :Video._id}]} }},
        {new : true});
      x= subCategory.Video.flatMap(e=>e.name);
    res.status(201).json({data:Video,subCategory: x});
    //هدي الطريقة الاولة 
  //CategoryModel.create({name,slug:slugify(name)})
  //.then(
  //  (category)=> res.status(201).json({data:category})).catch((err)=>res.status(400).send(err));
});

//@desc  get specific Video by id 
// @route  GET  /api/v1/Video:id
// @access Public
exports.getVideo=asyncHandler(async(req,res,next)=>{
    const {id} =req.params;
    const Video =await VideoModel.findById(id);
    if(!Video) {
       // res.status(404).json({msg:" no Video for this id"});
    return   next(new ApiEerror(`no Video for this id${id}` ,404));

    }
        res.status(200).json({data:Video});
    
});

//@desc update specific Video by id 
//@route PUT /api/v1/Video:id
//@access private
exports.updateSpecificVideo=asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const {name}=req.body;
    const Video=await VideoModel.findOneAndUpdate(
        {_id:id},
        { name, slug:slugify(name)},
        {new : true});
    if(!Video) {
        return next(new ApiEerror(`no Video for this id${id}` ,404));
    }
        res.status(200).json({data:Video});
    
});

//@desc delete specific Video by id 
//@route delete /api/v1/Video:id
//@access private
exports.deleteSpecificVideo=asyncHandler(async(req,res,next)=>{
const { id }=req.params;
const Video =await VideoModel.findByIdAndDelete(id);
console.log(Video)
if(!Video) {
    console.log('fpdfopsdfojs');
    return   next(new ApiEerror(`no Video for this id${id}` ,404));
}
    res.status(204).json({data:Video});
});