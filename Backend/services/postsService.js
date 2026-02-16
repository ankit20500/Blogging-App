const {Posts}=require('../models/posts');
const mongoose=require('mongoose');

// user create their post
async function createPostService(postDetail){
    try {
        const response=await Posts.create({
            image:postDetail.image,
            imagePublicId:postDetail.imagePublicId,
            location:postDetail.location,
            author:postDetail.author,
            description:postDetail.description
        })

        return response;
    } catch (error) {
        throw error;
    }
}

// fetch all the post 
async function getAllPostsService(){
    try {
        const response=await Posts.find();
        return response;
    } catch (error) {
        throw error;
    }
}

// fetch all post for a specific user
async function getAllUserPostService(userId){
    try {
        const response=await Posts.find({author:userId});
        return response;
    } catch (error) {
        throw error;
    }
}

// fetch the post details of any specific post
async function getPostDetailsService(id){
    try {
        const response = await Posts.findById(id)
            .populate({
                path: "author",
                select: "name"
            })
            .populate({
                path: "reviews",
                populate: {
                    path: "user",
                    select: "name"
                }
            });
        return response;
    } catch (error) {
        throw error;
    }
}

// delete the post which is user want
async function deletePostService(id){
    try {
        const response=await Posts.findByIdAndDelete(id);
        return response;
    } catch (error) {
        throw error;
    }
}

// find the post and update it
async function addPostReviewService(id,reviewId){
    try{
        const postId=new mongoose.Types.ObjectId(id);
        await Posts.findByIdAndUpdate(postId,{$push:{reviews:reviewId}});
    }catch(error){
        throw error
    }
}

// searching feature
async function searchPostsService(query) {
    try {

        if (!query) {
            return [];
        }

        const posts = await Posts.find({
            location: {
                $regex: query,
                $options: "i"   // case insensitive
            }
        }).populate("author");

        return posts;

    } catch (error) {
        throw error;
    }
}

module.exports={createPostService,getAllPostsService,getAllUserPostService,getPostDetailsService,deletePostService,addPostReviewService,searchPostsService};