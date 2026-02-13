const cloudinary = require("../config/Cloudinary");
const { createPostService, getAllPostsService, getAllUserPostService, getPostDetailsService, deletePostService } = require("../services/postsService");

// create a post by user
async function createPostController(req,res){
    try {
        const author=res.user.id;
        const imageFile=req.file;
        const {location,description}=req.body;

        // upload the image file into cloudinary
        const uploadResult=await new Promise((resolve,reject)=>{
            const stream=cloudinary.uploader.upload_stream({folder:'posts'},
                (error,result)=>{
                    if(error)reject(error);
                    else resolve(result);
                }
            );
            stream.end(imageFile.buffer);
        });

        const image=uploadResult.secure_url;
        const publicImgId=uploadResult.public_id;
        
        const postDetail={image,author,location,description,publicImgId}
        
        // create the post
        const response=await createPostService(postDetail);

        res.status(200).json({
            status:true,
            message:"successfully created the post",
            post:response
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"some issues are occured while creating",
            error:error.message
        })
    }
}

// fetch all posts
async function getAllPostsController(req,res){
    try {
        const response=await getAllPostsService();
        res.status(200).json({
            status:true,
            message:"successfully fetch all the post",
            data:response
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"some error comes for fetching the post",
            error:error
        });
    }
}

// fetch all post for a specific user which is logged in
async function getAllUserPostController(req,res){
    try {
        const userId=res.user.id;
        const response=await getAllUserPostService(userId);
        res.status(200).json({
            status:true,
            message:"successfully fetch all the post of a user",
            data:response
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"some issues comes in fetch all the post of a user",
            error:error
        });
    }
}

// fetch post details of any specific post
async function getPostDetailsController(req,res){
    try {
        const id=req.params.id;
        // fetch the detail
        const response=await getPostDetailsService(id);

        res.status(200).json({
            status:true,
            message:"successfully fetch the post details of a user",
            data:response
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"error comes during fetching the post details",
            error:error.message
        });
    }
}

// delete the post which user wants
async function deletePostController(req,res){
    try {
        
        const id=req.params.id;
        
        // first find that post
        const postId=await getPostDetailsService(id);

        // delete the post from databse
        await deletePostService(id);

        // now delete the image from the cloudinary
        await cloudinary.uploader.destroy(postId.publicImgId);
        
        res.status(200).json({
            status:true,
            message:"successfully delete the post"
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"issues comes while deteting the post",
            data:error.message
        });
    }
}

// edit the post of logged in user
async function editPostController(req,res){
    try {
        const id=req.params.id;
        const imageFile=req.file;
        const {location,description}=req.body;
        
        // find the post
        const post=await getPostDetailsService(id);
        
        // if image file is comes then delete the previous image from cloudinary and upload the new one
        let newImgDet;
        if(imageFile){
            await cloudinary.uploader.destroy(post.publicImgId);

            // now upload the new one
            newImgDet=await new Promise((resolve,reject)=>{
                const stream=cloudinary.uploader.upload_stream({folder:'posts'},
                    (error,result)=>{
                        if(error)reject(error);
                        else resolve(result);
                    }
                );
                stream.end(imageFile.buffer);
            });
            // now update all the details of the post and save it
            post.image=newImgDet.secure_url;
            post.publicImgId=newImgDet.public_id;
        }

        // now update the remaining details
        post.location=location;
        post.description=description;
        post.save();

        res.status(200).json({
            status:true,
            message:"successfully edit the post",
            data:post
        });

    } catch (error) {
        res.status(400).json({
            status:false,
            message:"issues comes while updating the post",
            error:error.message
        });
    }
}

module.exports={createPostController,getAllPostsController,getAllUserPostController, getPostDetailsController,deletePostController,editPostController};
