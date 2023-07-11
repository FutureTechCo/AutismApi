const mongoose =require('mongoose');

const database_connect =()=>{
    mongoose.connect(process.env.DB_URL).then((conn)=>{
        console.log('Database Connected :'+conn.connection.host);
     })
    // .catch((error)=>{
    //    console.log('database error :'+error);
    //    process.exit(1);
    // });
};
module.exports=database_connect