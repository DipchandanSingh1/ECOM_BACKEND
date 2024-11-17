
const express =require('express');
require('module-alias/register')
const app= express();
const routes=require('@/routes/index.js');
const mongoose=require('mongoose');
const cors=require('cors')
require('dotenv').config();



app.use(cors())



app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.use('/api/',routes); 

app.use((req,res,next)=>{
    return next({
        message:"Resource not found",
        status:400
    })

})

app.use((err,req,res,next)=>{
    res.status(err.status||400)
    res.send({
    message:err. message|| 'problem while processing request',
    errors:err.errors   
    });

});


app.use((req,res,next)=>{
    return next({
        message:"not found",
        status:400
    })

})

app.listen(process.env.PORT,async()=>{ 
    console.log("Server running at "+process.env.port),
    await mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("connected to mongo database")
    })
})



