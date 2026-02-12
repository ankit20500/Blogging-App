import { useContext, useEffect, useState } from 'react';
import './LoginUserAllPosts.css';
import { CiNoWaitingSign } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../stores/userStore';
import { postContext } from '../../stores/postStore';

function LoginUserAllPosts(){
    const navigate=useNavigate();
    const {user}=useContext(userContext);
    const {fetchAllUserPosts}=useContext(postContext);

    const [userPosts,setUserPosts]=useState([]);

    useEffect(()=>{
        if(!user){
            navigate("/login")
        }else{
            const fetchPost=async()=>{
                const response=await fetchAllUserPosts();
                setUserPosts(response.data.data);
            }
            fetchPost();
        }
    },[user]);
    
    const arr=[
        {
            image:"https://static.toiimg.com/photo/msid-65754989,width-96,height-65.cms",
            location:"ooty, uttrakhand, India",
        },{
            image:"https://static.toiimg.com/photo/msid-65754989,width-96,height-65.cms",
            location:"ooty, uttrakhand, India",
        },{
            image:"https://static.toiimg.com/photo/msid-65754989,width-96,height-65.cms",
            location:"ooty, uttrakhand, India",
        }
    ]

    return(
        <div className='login-user-all-posts'>
            <p className='login-user-all-posts-heading'>My All Posts</p>
            {/* All the posts of a user is this */}
            <div className='login-user-all-posts-content'>
                {
                    userPosts.length>0?
                        userPosts.map((post,idx)=>(
                            <div key={idx} className='login-user-all-posts-box'>
                                <img className='login-user-all-posts-box-image' src={post.image}/>
                                <p className='login-user-all-posts-box-location'>{post.location}</p>
                            </div>
                        )):
                    <div className='login-user-no-posts'>
                        <CiNoWaitingSign className='login-user-no-posts-icon'/>
                        <p className='login-user-no-posts-heading'>No posts are here. Please upload your posts</p>
                        <button className='add-posts-btn' onClick={()=>navigate("/upload-posts")}>Add Posts</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginUserAllPosts;