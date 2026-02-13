const express=require('express');
const { userValidation } = require('../middlewares/userValidation');
const { createPostController, getAllPostsController, getAllUserPostController, getPostDetailsController, deletePostController, editPostController } = require('../controllers/postsController');
const { multerUploads } = require('../middlewares/multerValidation');

const postRouter=express.Router();

postRouter.post('/create',userValidation,multerUploads,createPostController);
postRouter.get('/all/posts',getAllPostsController);
postRouter.get('/posts',userValidation,getAllUserPostController);
postRouter.get('/:id',getPostDetailsController);
postRouter.delete('/:id',userValidation,deletePostController);
postRouter.put('/:id',userValidation,multerUploads,editPostController);

module.exports={postRouter}