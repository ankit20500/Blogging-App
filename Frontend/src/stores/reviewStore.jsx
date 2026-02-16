import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const reviewContext=createContext();

export const ReviewContextProvider=({children})=>{

    const [reviews,setReviews]=useState([]);

    // create the review on any post
    async function createReview(reviewDetails){
        try {
            const response=await axios.post("http://localhost:3000/api/v1/review/create",reviewDetails,{
                withCredentials:true
            })
            toast.success(response.data.message);
            setReviews(response.data.data);
            return response;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    // fetch all the review of any post
    async function fetchReviews(postId){
        try {
            const response=await axios.get(`http://localhost:3000/api/v1/review/${postId}`);
            setReviews(response.data.data);
            return;
        } catch (error) {
            console.log("error comes",error.message);
            throw error;
        }
    }

    return(
        <reviewContext.Provider value={{createReview,fetchReviews,reviews}}>
            {children}
        </reviewContext.Provider>
    )
}