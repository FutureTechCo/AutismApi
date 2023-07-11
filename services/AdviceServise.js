const AdviceModel = require("../models/AdviceModel");
const categoryAdviceModel = require("../models/categoryAdviceModel");

const slugify = require('slugify');
const ApiEerror = require('../utills/ApiEerror');
const asyncHandler = require('express-async-handler')
//@desc  ارجاع جميع Advice  
//@route post  /api/v1/Advice 
//@access Public
exports.getAdvices=asyncHandler(async(req,res)=>{
    const page =req.query.page * 1 || 1;
    const limit =req.query.limit * 1 || 5;
    const skip = (page -1)* limit;
const Advice = await AdviceModel.find({}).skip(skip).limit(limit);
res.status(200).json({results:Advice.length ,page,data: Advice});
});

//@desc انشاء Advice 
//@route post  /api/v1/Advice
//@access private
exports.creatAdvice =asyncHandler(async(req,res)=>{
    const {titel,advice,categoryAdvice} = req.body;
    
    const Advice =await AdviceModel.create({titel,advice,categoryAdvice});
    const subCategory=await categoryAdviceModel.findOneAndUpdate(
        {_id:Advice.categoryAdvice},
        {$push: {Adices :{$each:[  {titel:Advice.titel,Adice :Advice._id}]} }},
        {new : true});
    res.status(201).json({data:Advice});
   
});

//@desc  get specific Advice by id 
// @route  GET  /api/v1/Advice:id
// @access Public
exports.getAdvice=asyncHandler(async(req,res,next)=>{
    const {id} =req.params;
    const Advice =await AdviceModel.findById(id);
    if(!Advice) {
       // res.status(404).json({msg:" no category for this id"});
    return   next(new ApiEerror(`no Advice for this id${id}` ,404));

    }
        res.status(200).json({data:Advice});
    
});

//@desc update specific Advice by id 
//@route PUT /api/v1/Advice:id
//@access private
exports.updateSpecificAdvice=asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const {titel,advice} = req.body;
    const Advice=await AdviceModel.findOneAndUpdate(
        {_id:id},
        { titel,advice,categoryAdvice },
        {new : true});
    if(!Advice) {
        return next(new ApiEerror(`no Advice for this id${id}` ,404));
    }
        res.status(200).json({data:Advice});
    
});

//@desc delete specific Advice by id 
//@route delete /api/v1/Advice:id
//@access private
exports.deleteSpecificAdvice=asyncHandler(async(req,res,next)=>{
const { id }=req.params;
const Advice =await AdviceModel.findByIdAndDelete(id);
if(!Advice) {
    return   next(new ApiEerror(`no Advice for this id${id}` ,404));
}
    res.status(204).json({data:Advice});
});