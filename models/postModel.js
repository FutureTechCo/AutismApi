const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        text:{
            type: String,
            trim : true,
          
            minlength : [2,'to short Post text'],
        },
        slug : {
            type : String ,
            lowercase : true,
        },
        views :{
            type : Number,
            default :0
        },
        Like :{
            type : Number,
            default :0

        },
        comment:{
            type : Number,
            default :0

        },
        images: [String],
        imageCover: String,
        user : {
            type : mongoose.Schema.ObjectId,
            ref :'User',
            required: [ true, 'User must be belong to parent Post'],
            
        },
    },
    {timestamps : true}
);
const setImageURL = (doc) => {
    if (doc.images) {
      const imageUrl = `${process.env.BASE_URL}/products/${doc.images}`;
      doc.images = imageUrl;
    }
    if (doc.images) {
      const imagesList = [];
      doc.images.forEach((image) => {
        const imageUrl = `${process.env.BASE_URL}/products/${image}`;
        imagesList.push(imageUrl);
      });
      doc.images = imagesList;
    }
  };
  // findOne, findAll and update
  PostSchema.post('init', (doc) => {
    setImageURL(doc);
  });
  
  // create
  PostSchema.post('save', (doc) => {
    setImageURL(doc);
  });

module.exports =mongoose.model('Post',PostSchema);