const Review = require('./../models/reviewesModel')
const catchAsync = require('../utility/catchAsync')

exports.getAllReviews = catchAsync(async(req,res,next)=>{
    const reviews = await Review.find()

    res.status(200).json({
        status:'success',
        results:reviews.length,
        data:{
            reviews
        }
    })
})

exports.createReview = catchAsync(async(req,res,next)=>{
    //allow nested routes
    // if(!req.body.room) req.body.room = req.params.roomId;
    // if(!req.body.user) req.body.user = req.user.id;
    
    const newReview = await Review.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            review:newReview
        }
    })
})