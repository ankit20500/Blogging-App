const {Posts}=require('../models/posts');

// user create their post
async function createPostService(postDetail){
    try {
        const response=await Posts.create({
            image:postDetail.image,
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
        const response=await Posts.findById(id);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports={createPostService,getAllPostsService,getAllUserPostService,getPostDetailsService};