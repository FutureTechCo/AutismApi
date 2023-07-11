const mongoose =require('mongoose');

const TestSchema =new mongoose.Schema({
    titel:{
        type: String,
        trim : true,
      
        minlength : [2,'to short Post text'],
    },
    
},
{timestamps:true}
);
const brandModel =mongoose.model('Test',TestSchema);
module.exports=brandModel;