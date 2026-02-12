const express=require('express');
const { createUserController, loginUserController, logoutUserController, fetchUserDetails, changePassword, findAuthorController } = require('../controllers/userController');
const { loginValidation, userValidation } = require('../middlewares/userValidation');
const userRouter=express.Router();

userRouter.post('/create',createUserController);
userRouter.post('/login',loginValidation,loginUserController);
userRouter.get('/logout',logoutUserController);
userRouter.get('/fetch',userValidation,fetchUserDetails);
userRouter.put('/change/password',userValidation,changePassword);
userRouter.get('/find/author/:id',findAuthorController);

module.exports={userRouter};