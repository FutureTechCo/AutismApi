const mongoose = require('mongoose');
const AdiceModel = new mongoose.Schema(
  {
    titel: {
      type: String,
      required: [true, 'titel required'],
      unique: [true, 'titel must be unique'],
      maxlength :[50,'too long titel ']
     
    },
    advice: {
        type: String,
        required: [true, 'advice required'],
       
      },
      categoryAdvice : {
        type : mongoose.Schema.ObjectId,
        ref :'categoryAdvice',
        required: [ true, 'Advice must be belong to parent categoryAdvice'],
        
    },
   
  },
  { timestamps: true }
);



const CategoryModel = mongoose.model('AdiceModel', AdiceModel);

module.exports = CategoryModel;
