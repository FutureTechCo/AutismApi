const express =require('express');
const dotenv =require('dotenv');
const morgan =require('morgan');
const globalError =require('./middlewares/errorMiddlware');
const database_connect = require('./config/database');
const ApiEerror =require('./utills/ApiEerror');
const categoryRoute =require('./routes/categoryRoute');
const subCategoryRoute =require('./routes/subCategoryRoute');
const VideoRoute =require('./routes/VideoRoute');
const userRoute =require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const PostRoute = require('./routes/postRoute');

const AdviceRoute = require('./routes/AdviceRoute');
const AdviceCategoryRoute = require('./routes/AdviceCategoryRoute');
const commentRoute =require('./routes/commentRoute');
const functions = require("firebase-functions")
const QuestionRoute=require('./routes/QuestionRoute');
const TestRoute=require('./routes/TestRoute');

//var multipartMiddleware = multipart();

dotenv.config({path:'config.env'});


database_connect();

const App =express();

App.use(express.json());
if(process.env.NODE_ENV==='development'){
   App.use(morgan('dev'));
   console.log('mode :'+process.env.NODE_ENV);
}


App.use('/api/v1/category',categoryRoute);
App.use('/api/v1/SupCategory',subCategoryRoute);
App.use('/api/v1/Video',VideoRoute);
App.use('/api/v1/users',userRoute);

App.use('/api/v1/auth', authRoute);
App.use('/api/v1/post', PostRoute);

App.use('/api/v1/Advice', AdviceRoute);
App.use('/api/v1/AdviceCategory', AdviceCategoryRoute);
App.use('/api/v1/Comment', commentRoute);
App.use('/api/v1/Question',QuestionRoute);
App.use('/api/v1/Test',TestRoute);



App.use('*',(req,res,next)=>{
   const err =  new Error(`cont fond this url ${req.originalUrl}` );
   next(err.message);
  next(new ApiEerror(`cont fond this url ${req.originalUrl}` ,400))
});

//Global error handling for express
App.use(globalError);

//  const PORT=process.env.PORT || 9000;
//  const server =App.listen(PORT,()=>{
//     console.log('App running on port '+PORT);
//  });
// Handle error outside express
 process.on('unhandledRejection',(err)=>{
   console.error(`unhandledRejection Error${err}`);
   server.close(()=>{
      process.exit(1);
   });

 })
exports.Afaq = functions.https.onRequest(App)