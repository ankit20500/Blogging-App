const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({

    image:{
        type: String,
        required: true
    },

    imagePublicId:{
        type: String,
        required: true
    },

    location:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }]

},{timestamps:true});

const Posts=mongoose.model("Posts", postSchema);

module.exports={Posts};
