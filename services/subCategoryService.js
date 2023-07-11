const subCategoryModel = require("../models/subCategoryModel");
const slugify = require('slugify');
const ApiEerror = require('../utills/ApiEerror');
const asyncHandler = require('express-async-handler')





//@desc crate subCategory
//@route post  /api/v1/subCategory
//@access private
exports.crateSubCategory =asyncHandler(async(req,res)=>{
    const {name,category} = req.body;
   // const name =req.body.name;
    
    const subcategory =await subCategoryModel.create({name,slug:slugify(name),category,});
    res.status(201).json({data:subcategory});
    //هدي الطريقة الاولة 
  //CategoryModel.create({name,slug:slugify(name)})
  //.then(
  //  (category)=> res.status(201).json({data:category})).catch((err)=>res.status(400).send(err));
});

//@desc ارجاع جميع الاقسام 
//@route post  /api/v1/subCategory
//@access Public
exports.getSubCategories=asyncHandler(async(req,res)=>{
    const page =req.query.page * 1 || 1;
    const limit =req.query.limit * 1 || 5;
    console.log(req.params);
    const skip = (page -1)* limit;
    let categoryFilter ={};
    if(req.params.categoryId){
        categoryFilter={category :req.params.categoryId};
    }

const subCategory = await subCategoryModel.find(categoryFilter).skip(skip).limit(limit);
res.status(200).json({results:subCategory.length ,page,data: subCategory});
});



//@desc  get specific subCategory by id 
// @route  GET  /api/v1/subCategory:id
// @access Public
exports.getSubCategory=asyncHandler(async(req,res,next)=>{
    const {id} =req.params;
    const subCategory =await subCategoryModel.findById(id);
    if(!subCategory) {
       // res.status(404).json({msg:" no category for this id"});
    return   next(new ApiEerror(`no category for this id${id}` ,404));

    }
        res.status(200).json({data:subCategory});
    
});

//@desc update specific subCategory by id 
//@route PUT /api/v1/subCategory:id
//@access private
exports.updateSpecificSubCategory=asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const {name,category}=req.body;

    const subCategory=await subCategoryModel.findOneAndUpdate(
        {_id:id},
        { name, slug:slugify(name),category},
        {new : true});
    if(!subCategory) {
        return next(new ApiEerror(`no category for this id${id}` ,404));
    }
        res.status(200).json({data:subCategory});
    
});

//@desc delete specific subCategory by id 
//@route delete /api/v1/subCategory:id
//@access private
exports.deleteSpecificSubCategory=asyncHandler(async(req,res,next)=>{
const { id }=req.params;
const subCategory =await subCategoryModel.findByIdAndDelete(id);
console.log(subCategory)
if(!subCategory) {
    console.log('fpdfopsdfojs');
    return   next(new ApiEerror(`no category for this id${id}` ,404));
}
    res.status(204).json({data:subCategory});
});