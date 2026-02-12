const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { createUserService, findAuthorService } = require("../services/userService");

// user creation
async function createUserController(req,res){
    try {
        const body=req.body;
        
        let {name,email,password,phone,avtar}=body;
        
        if(!avtar){
            avtar='https://image2url.com/r2/default/images/1770639659224-385bfeef-9feb-435f-86b4-d78af71aa9e7.avif';
        }

        // hash this plane password into hashed password
        const hashPassword=await bcrypt.hash(password,10);

        const userDetails={name,email,hashPassword,phone,avtar};

        // user create successfully
        const response=await createUserService(userDetails);
        
        // now make a jwt token
        const token=jwt.sign(
            {id:response._id,email:response.email},
            process.env.JWT_SECRET,
            {expiresIn:'24hr'}
        );

        // store this token into http only cookie
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:'strict'
        })
        
        // send the response to the user
        res.status(200).json({
            status:true,
            message:'successfully created user',
            data:response
        })

    } catch (error) {
        res.status(500).json({
            status:false,
            message:'user not created due to some errors',
            error:error.message
        })
    }
}

// login user
async function loginUserController(req,res){
    try {
        const user=res.user;

        // make a token of the user
        const token=jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        );

        // store this token into http only cookie
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false,
            path:"/"
        })

        // send the user details to users
        return res.status(200).json({
            status:true,
            message:"login successfully",
            user:user
        })
    } catch (error) {
        res.status(400).json({
                status:false,
                message:"some error occured during login",
                error:error
            });
    }
}

// user logout
async function logoutUserController(req,res){
    try {
        res.clearCookie('token',{
            httpOnly:true,
            sameSite:"strict",
        })

        res.status(200).json({
            status:true,
            message:"logout successfully"
        })
    } catch (error) {
        res.status(400).json({
                status:false,
                message:"some error occured during logout",
                error:error
            });
    }
}

// fetch the user details which refreshing
async function fetchUserDetails(req,res){
    try {
        const user=res.user;
        res.status(200).json({
            status:true,
            message:"user fetched successfully",
            data:user
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"some errors occured while fetching",
            error:error
        })
    }
}

// change password of loggedin user
async function changePassword(req,res){
    try {
        const user=res.user;
        const {oldPassword,newPassword}=req.body;

        // if both passwords are same
        if(oldPassword===newPassword){
            res.status(402).json({
                status:false,
                message:"both the password are same"
            });
        }

        // now compare the saved password with oldpassword
        const check=await bcrypt.compare(oldPassword,user.password);
        if(!check){
            res.status(402).json({
                status:false,
                message:"old password is different"
            });
        }

        // now hash the new password and update and save into the database
        const hashPassword=await bcrypt.hash(newPassword,10);
        user.password=hashPassword;
        user.save();

        res.status(200).json({
            status:true,
            message:"password change successfully",
            data:user
        });
    } catch (error) {
        res.status(404).json({
            status:false,
            message:"some issues comes while changing the password",
            error:error.message
        });
    }
}

// fetch the user details by id so that author can be identified
async function findAuthorController(req,res){
    try {
        const userId=req.params.id;
        
        // find the author details of any post
        const response=await findAuthorService(userId);
        
        res.status(200).json({
            status:true,
            message:"successfully find the author",
            data:response
        });
    } catch (error) {
        res.status(400).json({
            status:false,
            message:"error comes while fetching the author",
            error:error.message
        });
    }
}

module.exports={createUserController,loginUserController,logoutUserController,fetchUserDetails,changePassword,findAuthorController};