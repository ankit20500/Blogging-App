import { Link, useParams } from 'react-router-dom';
import './PostDetails.css';
import ProductReview from './PostReview';
import { useContext, useEffect, useState } from 'react';
import { postContext } from '../../stores/postStore';
import { userContext } from '../../stores/userStore';

function ProductDetails(){
    const {id}=useParams();
    const {post}=useContext(postContext);
    const {author,fetchAuthor}=useContext(userContext);
    
    const [postDetails,setPostDetails]=useState(null);

    useEffect(()=>{
        const fetchData=async()=>{
            const response=post.find(item=>item._id===id);
            setPostDetails(response);
            
            await fetchAuthor(response?.author);
        }
        fetchData();
    },[post])


    return(
        <div className='product-page'>
            {postDetails && 
                <div className='product'>
                    <img src={postDetails.image}/>

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
                            <span className='product-details-desc'>description:</span> &nbsp;
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