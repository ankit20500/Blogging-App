import axios from "axios";
import { createContext, useState } from "react";

export const postContext=createContext();

export const PostContextProvider=({children})=>{

    const [post,setPost]=useState([]);
    const [postDetails,setPostDetails]=useState(null);
    
    
    // function for creating the post
    async function createPost(postData){
        try {
            await axios.post("http://localhost:3000/api/v1/post/create",postData,{withCredentials:true});
            
            return;
        } catch (error) {
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
            return response;
        } catch (error) {
            console.log("error comes while fetching the posts of a user from backend",error);
        }
    }

    // fetch any specific post details
    async function getPostDetails(id){
        try {
            const response=await axios.get(`http://localhost:3000/api/v1/post/${id}`)
            console.log("author: ",response.data.data);
            setPostDetails(response.data.data);
            return;
        } catch (error) {
            console.log("error comes while fetching the post details from backend",error);
        }
    }

    return(
        <postContext.Provider value={{fetchAllPosts,post,setPost,fetchAllUserPosts,createPost,getPostDetails,postDetails}}>
            {children}
        </postContext.Provider>
    )
}