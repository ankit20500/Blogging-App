const mongoose= require("mongoose");
const {Reviews}=require("../models/reviews");

// function for creating a review of the post
async function createReviewService(reviewDetails){
    try {
        const postId=new mongoose.Types.ObjectId(reviewDetails.id);
        const response=await Reviews.create({
            post:postId,
            user:reviewDetails.userId,
            comments:reviewDetails.comments,
            ratings:reviewDetails.ratings
        })

        return response;
    } catch (error) {
        throw error;
    }
}

// function for fetching the review on post
async function fetchReviewService(id){
    try {
        const postId=new mongoose.Types.ObjectId(id);
        const response=await Reviews.find({post:postId});
        return response;
    } catch (error) {
        throw error;
    }
}


module.exports={createReviewService,fetchReviewService};