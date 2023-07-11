const CategoryModel = require("../models/categoryModel");
const slugify = require('slugify');
const ApiEerror = require('../utills/ApiEerror');
const asyncHandler = require('express-async-handler')

//@desc ارجاع جميع الاقسام 
//@route post  /api/v1/category
//@access Public
exports.getCategories=asyncHandler(async(req,res)=>{
    const page =req.query.page * 1 || 1;
    const limit =req.query.limit * 1 || 5;
    const skip = (page -1)* limit;
const categories = await CategoryModel.find({}).skip(skip).limit(limit);
res.status(200).json({results:categories.length ,page,data: categories});
});
//@desc انشاء قسم 
//@route post  /api/v1/category
//@access private
exports.creatCategory =asyncHandler(async(req,res)=>{
    const {name} = req.body;
   // const name =req.body.name;
    
    const category =await CategoryModel.create({name,slug:slugify(name)});
    res.status(201).json({data:category});
    //هدي الطريقة الاولة 
  //CategoryModel.create({name,slug:slugify(name)})
  //.then(
  //  (category)=> res.status(201).json({data:category})).catch((err)=>res.status(400).send(err));
});

//@desc  get specific category by id 
// @route  GET  /api/v1/category:id
// @access Public
exports.getCategory=asyncHandler(async(req,res,next)=>{
    const {id} =req.params;
    const category =await CategoryModel.findById(id);
    if(!category) {
       // res.status(404).json({msg:" no category for this id"});
    return   next(new ApiEerror(`no category for this id${id}` ,404));

    }
        res.status(200).json({data:category});
    
});

//@desc update specific category by id 
//@route PUT /api/v1/category:id
//@access private
exports.updateSpecificCategory=asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const {name}=req.body;
    const category=await CategoryModel.findOneAndUpdate(
        {_id:id},
        { name, slug:slugify(name)},
        {new : true});
    if(!category) {
        return next(new ApiEerror(`no category for this id${id}` ,404));
    }
        res.status(200).json({data:category});
    
});

//@desc delete specific category by id 
//@route delete /api/v1/category:id
//@access private
exports.deleteSpecificCategory=asyncHandler(async(req,res,next)=>{
const { id }=req.params;
const category =await CategoryModel.findByIdAndDelete(id);
console.log(category)
if(!category) {
    console.log('fpdfopsdfojs');
    return   next(new ApiEerror(`no category for this id${id}` ,404));
}
    res.status(204).json({data:category});
});