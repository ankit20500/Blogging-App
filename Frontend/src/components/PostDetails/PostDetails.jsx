import { Link, useParams } from 'react-router-dom';
import './PostDetails.css';
import ProductReview from './PostReview';
import { useContext, useEffect } from 'react';
import { postContext } from '../../stores/postStore';
import { userContext } from '../../stores/userStore';

function ProductDetails(){

    const { id } = useParams();

    const { getPostDetails, postDetails } = useContext(postContext);
    const { author, fetchAuthor } = useContext(userContext);

    useEffect(() => {

        const fetchData = async () => {

            await getPostDetails(id);  // 🔥 fetch from backend

        };

        fetchData();

    }, [id]);

    // 🔥 fetch author after postDetails loads
    useEffect(() => {

        if(postDetails?.author){
            fetchAuthor(postDetails.author);
        }

    }, [postDetails]);

    return(
        <div className='product-page'>

            {postDetails &&
                <div className='product'>
                    <img src={postDetails.image} alt="post"/>

                    <div className='product-details'>
                        <p className='product-details-heading'>Details</p>

                        <p>
                            <span className='product-details-location'>Location:</span>&nbsp;
                            <span>{postDetails.location}</span>
                        </p>

                        <p>
                            <span className='product-details-user'>Posted By:</span> &nbsp;
                            <Link to='/user/all-post'>
                                <span className='product-details-author-name'>
                                    {author?.name}
                                </span>
                            </Link>
                        </p>

                        <p>
                            <span className='product-details-desc'>Description:</span> &nbsp;
                            <span>{postDetails.description}</span>
                        </p>

                        <button>Review</button>
                    </div>
                </div>
            }

            <ProductReview/>

        </div>
    )
}

export default ProductDetails;
