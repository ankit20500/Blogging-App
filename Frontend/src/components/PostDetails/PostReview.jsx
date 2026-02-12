import './PostDetails.css';
import { GiSplitCross } from "react-icons/gi";

function ProductReview(){

    const reviews=[
        {
            userProfile:"../profile-icon.avif",
            name: "Ankit Kumar",
            review: "This place is very beautiful and i also went this place before 2 years back and again i want to go their."
        },
        // {
        //     userProfile:"../profile-icon.avif",
        //     name: "Shivam Kumar",
        //     review: "This place is very beautiful and i also went this place before 2 years back and again i want to go their."
        // },
        // {
        //     userProfile:"../profile-icon.avif",
        //     name: "Ankit Kumar",
        //     review: "This place is very beautiful and i also went this place before 2 years back and again i want to go their."
        // },
        // {
        //     userProfile:"../profile-icon.avif",
        //     name: "Ankit Kumar",
        //     review: "This place is very beautiful and i also went this place before 2 years back and again i want to go their."
        // },
        // {
        //     userProfile:"../profile-icon.avif",
        //     name: "Ankit Kumar",
        //     review: "This place is very beautiful and i also went this place before 2 years back and again i want to go their."
        // }
    ]

    return(
        <div className='product-reviews'>
            <p className='product-reviews-headings'>User's Review</p>

            {reviews.length>0?reviews.map((review,idx)=>(
                <div className='product-reviews-list' key={idx}>

                    <img src={reviews[0].userProfile}/>

                    <div className='product-reviews-content'>
                        <p className='product-reviews-username'>
                            {reviews[0].name}
                        </p>

                        <p className='product-reviews-disc'>
                            {reviews[0].review}
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