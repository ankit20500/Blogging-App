import './PostDetails.css';
import { GiSplitCross } from "react-icons/gi";

function ProductReview({reviews}){

    return(
        <div className='product-reviews'>
            <p className='product-reviews-headings'>User's Review</p>

            {reviews.length>0?reviews.map((review,idx)=>(
                <div className='product-reviews-list' key={reviews._id}>

                    <img src="../profile-icon.avif"/>

                    <div className='product-reviews-content'>
                        <p className='product-reviews-username'>
                            {review.user.name}
                        </p>

                        <p className='product-reviews-disc'>
                            {review.comments}
                        </p>
                    </div>
                </div>
            )):
            <div className='no-reviews-section'>
                <p className='no-reviews-section-icon'>
                    <GiSplitCross/>
                </p>
                
                <p className='no-reviews-section-content'>
                    No reviews yet in this post.
                </p>
            </div>
            }
        </div>
    )
}

export default ProductReview;