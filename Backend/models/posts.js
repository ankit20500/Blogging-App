const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    image:{
        type:String,
        required:[true,'image is required']
    },
    location:{
        type:String,
        required:[true,'location is required']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'user is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    }
},{timestamps:true})

const Posts=mongoose.model('posts',PostSchema);

module.exports={Posts};