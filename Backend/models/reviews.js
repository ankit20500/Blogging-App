const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts',
        required:[true,'post is required for giving any review']
    },       
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:[true,'please login for review on this post']
        },
    comments:{
        type:String,
        required:[true,"please write something"]
    },
    ratings:{
        type:Number,
        max:[5,'ratings not more than 5'],
        min:[1,'ratings not less than 1'],
        required:[true,'please give ratings']
    }
},{timestamps:true});

const Reviews = mongoose.model('Review', reviewSchema);

module.exports={Reviews};
