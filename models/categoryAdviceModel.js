const mongoose = require('mongoose');
const categoryAdvice = new mongoose.Schema(
  {
    titel: {
      type: String,
      required: [true, 'titel required'],
      unique: [true, 'titel must be unique'],
      minlength: [3, 'Too short titel'],
     
    },
    Adices: [
      {
        Adice: {
          type: mongoose.Schema.ObjectId,
          ref: 'AdiceModel',
        },

        titel : {
          type : String ,
        }
     
      },
    ],
   
  },
  { timestamps: true }
);



const CategoryModel = mongoose.model('categoryAdvice ', categoryAdvice );

module.exports = CategoryModel;
