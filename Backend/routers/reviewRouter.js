const express=require('express');
const { userValidation } = require('../middlewares/userValidation');
const { createReviewController, fetchReviewController } = require('../controllers/reviewController');
const reviewRouter=express.Router();

reviewRouter.post('/create',userValidation,createReviewController);
reviewRouter.get('/:id',fetchReviewController);

module.exports={reviewRouter}