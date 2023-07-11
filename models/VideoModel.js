const mongoose =require('mongoose');

const VideoSchema =new mongoose.Schema({
    name: {
        type : String ,
        required :[true,'video required'],
        unique :[true ,'video must be unique'],
        minlength:[3,'too short video name'],
        maxlength :[32,'too long video name']
    },
    URI: {
        type : String ,
        required :[true,'URI required'],
        minlength:[10,'too short URI name'],
    },

    goal : {
    
        type : String ,
        required :[true,'goal required'],

       
    },
    PhsCategory : {
        type : mongoose.Schema.ObjectId,
        ref :'SubCategory',
        required: [ true, 'Video must be belong to parent PhsCategory'],
        
    },
    category : {
        type : mongoose.Schema.ObjectId,
        ref :'Category',
        required: [ true, 'SubCategory must be belong to parent category'],
        
    },
    result:{
        type : String ,
        required :[true,'result required'],
 
    }
    ,
    slug :{
        type:String ,
        lowercase : true,
    },
    image : String,
},
{timestamps:true}
);
const brandModel =mongoose.model('Video',VideoSchema);
module.exports=brandModel;