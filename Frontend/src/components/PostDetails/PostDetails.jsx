import { Link, useParams } from 'react-router-dom';
import './PostDetails.css';
import ProductReview from './PostReview';
import { useContext, useEffect, useState } from 'react';
import { postContext } from '../../stores/postStore';
import { reviewContext } from '../../stores/reviewStore';
import { ReviewSchema } from '../../validators/Validators';
import { toast } from 'react-toastify';

function ProductDetails(){

    const { id } = useParams();

    const { getPostDetails, postDetails,setPostDetails } = useContext(postContext);
    const { createReview, fetchReviews } = useContext(reviewContext);

    const [isFormOpen,setIsFormOpen] = useState(false);
    const [ratings,setRatings] = useState(0);
    const [comments,setComments] = useState("");

    // Only run once when id changes
    useEffect(()=>{
        getPostDetails(id);
    },[id]);

    
    async function handleReview(){
        try {
            const reviewDetails = { id, ratings, comments };

            // before creation check its validation
            await ReviewSchema.validate({ratings,comments});

            const response = await createReview(reviewDetails);

            if(response?.data?.status){
                setIsFormOpen(false);
                setRatings(0);
                setComments("");

                // find the updated post details
                await getPostDetails(id);
            }

        } catch (error) {
            toast.warning(error.message);
            console.log('error: ',error);
        }
    }

    if(!postDetails) return <p>Loading...</p>;

    return(
        <div className='product-page'>

            <div className='product'>
                <img src={postDetails.image} alt="post"/>

                <div className='product-details'>
                    <p className='product-details-heading'>Details</p>

                    <p>
                        <span className='product-details-location'>Location:</span>
                        {postDetails.location}
                    </p>

                    <p>
                        <span className='product-details-user'>Posted By:</span>
                        <Link to='/user/all-post'>
                            <span className='product-details-author-name'>
                                {postDetails.author.name}
                            </span>
                        </Link>
                    </p>

                    <p>
                        <span className='product-details-desc'>Description:</span>
                        {postDetails.description}
                    </p>

                    <button onClick={()=>setIsFormOpen(true)}>
                        Add Review
                    </button>

                    {/* Add the review of the post */}
                    {isFormOpen && (
                        <div className='review-form'>
                            <input
                                type='number'
                                placeholder='Rating (1-5)'
                                min="1"
                                max="5"
                                value={ratings}
                                onChange={(e)=>setRatings(e.target.value)}
                            />

                            <textarea
                                placeholder='Write comment'
                                rows='5'
                                cols='35'
                                value={comments}
                                onChange={(e)=>setComments(e.target.value)}
                            />

                            <button onClick={handleReview}>
                                Submit
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <ProductReview reviews={postDetails.reviews}/>

        </div>
    )
}

export default ProductDetails;
