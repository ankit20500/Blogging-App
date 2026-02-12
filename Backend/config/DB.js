const mongoose=require('mongoose');
const mongodb_url=process.env.MONGODB_URI;
async function connectDB(){
    try {
        await mongoose.connect(mongodb_url);
    } catch (error) {
        console.log("connection failed with database: ",error);
    }
}

module.exports={connectDB};