const { findUserService } = require("../services/userService");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

// checks the user details when user try to logged in
async function loginValidation(req,res,next){
    try {
        const {email,password}=req.body;
        // check the email
        const user=await findUserService(email);

        if(!user){
            res.status(400).json({
                status:false,
                message:"user not found with this email"
            });
        }

        // now check the password
        const checkPass=await bcrypt.compare(password,user.password);
        if(!checkPass){
            res.status(400).json({
                status:false,
                message:"user credentials fail"
            });
        }

        res.user=user;
        next();
    } catch (error) {
        res.status(404).json({
                status:false,
                message:"some errors found",
                error:error.message
        });
    }
}

// user validation when user try to access anything
async function userValidation(req,res,next){
    try {
        // take its token
        const {token}=req.cookies;

        if(!token){
            res.status(404).json({
                status:false,
                message:"please login first"
            });
        }
        
        // check the credibility of this token
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        
        // verify this user after that giver permisson for other access
        const user=await findUserService(decode.email);

        if(!user){
            res.status(404).json({
                status:false,
                message:"you have not permissioned for this so please signup first"
            });
        }

        res.user=user;
        next();
    } catch (error) {
        
    }
}

module.exports={loginValidation,userValidation};