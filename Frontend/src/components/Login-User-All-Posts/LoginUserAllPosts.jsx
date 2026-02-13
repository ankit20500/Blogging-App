import './LoginUserAllPosts.css';
import { useContext, useEffect, useState } from 'react';
import { CiNoWaitingSign } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../stores/userStore';
import { postContext } from '../../stores/postStore';

function LoginUserAllPosts() {

    const navigate = useNavigate();
    const { user,loading } = useContext(userContext);
    const { fetchAllUserPosts, deleteUserPost,userPosts,setUserPosts }=useContext(postContext);


    useEffect(()=>{
        if(loading)return;
        if(!user){
            navigate("/login");
            return;
        }

        const fetchPost=async()=>{
            try{
                await fetchAllUserPosts();
            }catch(error){
                console.log(error);
            }
        };

        fetchPost();

    },[user,loading,navigate]);

    async function handleDelete(id){
        try{
            await deleteUserPost(id);
            // update the user's post
            setUserPosts(prev =>
                prev.filter(post=>post._id!==id)
            );
        }catch(error){
            console.log("Error deleting post:",error);
        }
    }

    return (
        <div className='login-user-all-posts'>
            <p className='login-user-all-posts-heading'>My All Posts</p>
            <div className='login-user-all-posts-content'>
                {userPosts.length>0?(
                    userPosts.map((post)=>(
                        <div key={post._id} className='login-user-all-posts-box'>
                            <img
                                className='login-user-all-posts-box-image'
                                src={post.image}
                                alt="post"
                            />
                            <p className='login-user-all-posts-box-location'>
                                {post.location}
                            </p>
                            <div className='login-user-all-posts-box-btn'>
                                <button onClick={() => handleDelete(post._id)}>
                                    Delete
                                </button>
                                <button onClick={() => navigate(`/update-post/${post._id}`)}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))

                ):(
                    <div className='login-user-no-posts'>
                        <CiNoWaitingSign className='login-user-no-posts-icon' />
                        <p className='login-user-no-posts-heading'>
                            No posts are here. Please upload your posts
                        </p>
                        <button
                            className='add-posts-btn'
                            onClick={() => navigate("/upload-posts")}
                        >
                            Add Posts
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginUserAllPosts;
