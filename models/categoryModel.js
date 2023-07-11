const mongoose =require('mongoose');

const categorySchema =new mongoose.Schema({
    name: {
        type : String ,
        required :[true,'Category required'],
        unique :[true ,'Category must be unique'],
        minlength:[3,'too short category name'],
        maxlength :[32,'too long category name']
    },

    slug :{
        type:String ,
        lowercase : true,
    },
    image : String,
},
{timestamps:true}
);
const CategoryModel =mongoose.model('Category',categorySchema);
module.exports=CategoryModel;