
const express =require('express');
const {param ,validtionResult} = require('express-validator');
const{getVideoValidator,deleteBrandValidator,updateBrandValidator,createVideoValidator} =require('../utills/validators/VideoValidators');

const { getVideoes
    ,getVideo
     ,creatVideo,
     updateSpecificVideo,
     deleteSpecificVideo} =require('../services/VideoService');

const router =express.Router({mergeParams:true});

//هدي اختصار للي فوق 
router.route('/')
.get(getVideoes)
.post(createVideoValidator,creatVideo);
router.route('/:id')
.get(
    getVideoValidator,
    getVideo)
.put(updateBrandValidator,updateSpecificVideo)
.delete(deleteBrandValidator,deleteSpecificVideo);

module .exports= router;