const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            trim : true,
            unique:[true, 'subCategory must be unique'],
            minlength : [2,'to short SubCategory name'],
            maxlength : [32,'to long SubCategory name'],
        },
        slug : {
            type : String ,
            lowercase : true,
        },
        category : {
            type : mongoose.Schema.ObjectId,
            ref :'Category',
            required: [ true, 'SubCategory must be belong to parent category'],
            
        },
        Video: [
            {
              product: {
                type: mongoose.Schema.ObjectId,
                ref: 'Video',
              },

              name : {
                type : String ,
              }
           
            },
          ],
    },
    {timestamps : true}
);

module.exports =mongoose.model('SubCategory',subCategorySchema);