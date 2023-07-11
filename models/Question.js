const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        typeQuestion:{
            type: String,
            enum: ['Choose', 'True or false'],
            default: 'Choose',
         
          
        },
        QuestionText : {
    
            type : String ,
            required :[true,'QuestionText required'],
    
           
        },
        QuestionChoices1:String ,
        QuestionChoicesEvaluation1:Number,
        QuestionChoices2:String ,
        QuestionChoicesEvaluation2:Number,
        QuestionChoices3:String ,
        QuestionChoicesEvaluation3:Number,
        QuestionChoices4:String ,
        QuestionChoicesEvaluation4:Number,
        Answer:{
            type : String , 
        }, 
      
        AnswerEvaluation : {
            type : Number,
            default :0
        },
       
        image: String,
        Test : {
            type : mongoose.Schema.ObjectId,
            ref :'Test',
            required: [ true, 'Questio must be belong to parent Test'],
            
        },
    },
    {timestamps : true}
);

module.exports =mongoose.model('Question',QuestionSchema);