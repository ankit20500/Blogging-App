const express=require('express');
const { userValidation } = require('../middlewares/userValidation');
const { createPostController, getAllPostsController, getAllUserPostController, getPostDetailsController } = require('../controllers/postsController');
const { multerUploads } = require('../middlewares/multerValidation');

const postRouter=express.Router();

postRouter.post('/create',userValidation,multerUploads,createPostController);
postRouter.get('/all/posts',getAllPostsController);
postRouter.get('/posts',userValidation,getAllUserPostController);
postRouter.get('/:id',getPostDetailsController);

module.exports={postRouter}