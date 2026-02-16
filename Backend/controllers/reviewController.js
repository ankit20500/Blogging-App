const { addPostReviewService } = require("../services/postsService");
const { createReviewService, fetchReviewService } = require("../services/reviewService");

// function for creating a review
async function createReviewController(req,res){
    try {
        const userId=res.user._id;
        const {id,ratings,comments}=req.body; 
        const reviewDetails={userId,id,ratings,comments};
        const review=await createReviewService(reviewDetails);

        // push review id into post
        await addPostReviewService(reviewDetails.id,review._id);

        res.status(200).json({
                status:true,
                message:"review created successfully",
                data:review
            });
        
    } catch (error) {
        res.status(400).json({
                status:false,
                message:"review not created",
                error:error.message
            });
    }
}

// function for fetching all the reviews of any post
async function fetchReviewController(req,res){
    try {
        const postId=req.params.id;
        const response=await fetchReviewService(postId);
        
        res.status(200).json({
                status:true,
                message:"review fetched successfully",
                data:response
            });

    } catch (error) {
        res.status(400).json({
                status:false,
                message:"review not fetched",
                error:error.message
            });
    }
}

module.exports={createReviewController,fetchReviewController};