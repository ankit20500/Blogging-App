import {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const userContext=createContext();

export const UserContextProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [author,setAuthor]=useState(null);

    // fetch the current user that is logged in
    useEffect(()=>{
        async function getCurrentUser(){
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/user/fetch",
                    { withCredentials: true }
                );
                setUser(response.data.data);
            } catch (error) {
                setUser(null);
            }finally {
                setLoading(false);
            }
        }

        getCurrentUser();
    },[]);

    // user registration
    async function registerUser(userDetails){
        try {
            const response=await axios.post("http://localhost:3000/api/v1/user/create",userDetails);
            
            setUser(response.data.data);
            return;
        } catch (error) {
            throw error;
        }
    }

    // user login
    async function loginUser(userDetail){
        try {
            const response=await axios.post("http://localhost:3000/api/v1/user/login",userDetail,{
                withCredentials:true
            });
            setUser(response.data.user);
            return;
        } catch (error) {
            throw error;
        }
    }

    // user logout
    async function logoutUser(){
        try {
            const response=await axios.get("http://localhost:3000/api/v1/user/logout",{
                withCredentials:true
            });
            setUser(null);
            return response;
        } catch (error) {
            console.log("some error occured",error.message);
        }
    }

    // change the user's password
    async function changePassword(passDetails){
        try {
            const response=await axios.put("http://localhost:3000/api/v1/user/change/password",passDetails,{
                withCredentials:true
            })
            setUser(response.data.data);
            return;
        } catch (error) {
            throw error;
        }
    }

    // fetch the author details
    async function fetchAuthor(id){
        try {
            const response=await axios.get(`http://localhost:3000/api/v1/user/find/author/${id}`);
            
            setAuthor(response.data.data);
            return;
        } catch (error) {
            console.log("error comes while fetching the author",error.message);
        }
    }

    return(
        <userContext.Provider value={{registerUser,user,setUser,loginUser,logoutUser,loading,setLoading,changePassword,fetchAuthor,author,setAuthor}}>
            {children}
        </userContext.Provider>
    )
}