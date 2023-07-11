const categoryAdvice = require("../models/categoryAdviceModel");
const slugify = require('slugify');
const ApiEerror = require('../utills/ApiEerror');
const asyncHandler = require('express-async-handler')

//@desc  ارجاع جميع CategoryAdvice  
//@route post  /api/v1/CategoryAdvice 
//@access Public
exports.getCategoryAdvice=asyncHandler(async(req,res)=>{
    const page =req.query.page * 1 || 1;
    const limit =req.query.limit * 1 || 5;
    const skip = (page -1)* limit;
const categoryAdvices = await categoryAdvice.find({}).skip(skip).limit(limit);
res.status(200).json({results:categoryAdvices.length ,page,data: categoryAdvices});
});
//@desc انشاء قسم 
//@route post  /api/v1/categoryAdvice
//@access private
exports.creatCategoryAdvice =asyncHandler(async(req,res)=>{
    const {titel} = req.body;
    
    const category =await categoryAdvice.create({titel});
    res.status(201).json({data:category});
  
});



//@desc update specific CategoryAdvice by id 
//@route PUT /api/v1/CategoryAdvice :id
//@access private
exports.updateSpecificCategoryAdvice =asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const {titel}=req.body;
    const category=await categoryAdvice.findOneAndUpdate(
        {_id:id},
        { titel},
        {new : true});
    if(!category) {
        return next(new ApiEerror(`no CategoryAdvice for this id${id}` ,404));
    }
        res.status(200).json({data:category});
    
});

//@desc delete specific CategoryAdvice by id 
//@route delete /api/v1/CategoryAdvice:id
//@access private
exports.deleteSpecificCategoryAdvice=asyncHandler(async(req,res,next)=>{
const { id }=req.params;
const category =await categoryAdvice.findByIdAndDelete(id);
console.log(category)
if(!category) {
    return   next(new ApiEerror(`no CategoryAdvice for this id${id}` ,404));
}
    res.status(204).json({data:category});
});