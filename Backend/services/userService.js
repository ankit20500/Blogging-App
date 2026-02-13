const {User}=require('../models/users');
const mongoose=require("mongoose");

// create the user's profile
async function createUserService(userDetail){
    try {
        const response=await User.create({
            name:userDetail.name,
            email:userDetail.email,
            password:userDetail.hashPassword,
            phone:userDetail.phone,
            avtar:userDetail.avtar
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// login user
async function findUserService(email){
    try {
        const response=await User.findOne({email:email});
        return response;
    } catch (error) {
        throw error;
    }
}

// find the user by id so that author of post details can be identified
async function findAuthorService(id){
    try {
        const userId=new mongoose.Types.ObjectId(id);
        
        const response=await User.findById(userId);
        return response;
    } catch (error) {
        throw error;
    }
}

// delete the logged in user
async function deleteUserService(id){
    try {
        await User.findByIdAndDelete(id);
        return;
    } catch (error) {
        
    }
}

module.exports={createUserService,findUserService,findAuthorService,deleteUserService};