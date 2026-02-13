import axios from "axios";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const postContext=createContext();

export const PostContextProvider=({children})=>{

    const [post,setPost]=useState([]);
    const [postDetails,setPostDetails]=useState(null);
    const [userPosts,setUserPosts] = useState([]);
    
    
    // function for creating the post
    async function createPost(postData){
        try {
            const response=await axios.post("http://localhost:3000/api/v1/post/create",postData,{withCredentials:true});
            toast.success(response.data.message)
            return;
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error comes while creating the post",error);
        }
    }

    // function for fetching all the posts
    async function fetchAllPosts(){
        try {
            const response=await axios.get("http://localhost:3000/api/v1/post/all/posts");
            setPost(response.data.data);
        } catch (error) {
            console.log("error comes while fetching the post from backend",error);
        }
    }


    // function for fetching all the post of a loggedin user
    async function fetchAllUserPosts(){
        try {
            const response=await axios.get("http://localhost:3000/api/v1/post/posts",{withCredentials:true});
            setUserPosts(response.data.data);
        } catch (error) {
            console.log("error comes while fetching the posts of a user from backend",error);
        }
    }

    // fetch any specific post details
    async function getPostDetails(id){
        try {
            const response=await axios.get(`http://localhost:3000/api/v1/post/${id}`)
            
            setPostDetails(response.data.data);
            return;
        } catch (error) {
            console.log("error comes while fetching the post details from backend",error);
        }
    }

    // delete any specific post by logged in user
    async function deleteUserPost(id){
        try {
            const response=await axios.delete(`http://localhost:3000/api/v1/post/${id}`,{
                withCredentials:true
            })
            toast.success(response.data.message);
            return;
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("error comes while deleting the post in backend",error);
        }
    }

    // update the post of logged in user
    async function updatePost(id, postData){
        try{
            const response=await axios.put(
                `http://localhost:3000/api/v1/post/${id}`,
                postData,
                { withCredentials: true }
            );
            toast.success(response.data.message);
            return response;
        }catch(error) {
            toast.error(error.response.data.message);
            throw error;
        }
    }


    return(
        <postContext.Provider value={{fetchAllPosts,post,setPost,fetchAllUserPosts,createPost,getPostDetails,postDetails,setPostDetails,deleteUserPost,updatePost,userPosts,setUserPosts}}>
            {children}
        </postContext.Provider>
    )
}