const express=require('express');
require('dotenv').config();
const { connectDB } = require('./config/DB');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const { userRouter } = require('./routers/userRouter');
const { postRouter } = require('./routers/postsRouter');

const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(cookieParser());

// all the routers
app.use('/api/v1/user',userRouter);
app.use('/api/v1/post', postRouter);


connectDB()
.then(()=>{
    console.log("database connected successfully");
    app.listen(port,()=>{
        console.log(`app is running on the port ${port}`);
    })
})