const mongoose = require('mongoose')
const room = require('./roomModel')

const reviewSchema = new mongoose.Schema(
    {
        review:{
            type:String,
             required: [true, 'Review can not be empty!']
        },
        rating:{
            type:Number,
            min:1,
            max:5
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        room:{
            type: mongoose.Schema.ObjectId,
            ref:'Room',
            required:[true,'Review must belong to a tour']
        },
        user:{
            type: mongoose.Schema.ObjectId,
            ref:'User',
            required:[true,'Review must belong to a User']
        },
    },
    {
        toJson:{virtuals:true},
        toObject:{virtuals:true}
    }
   

)
//populating the reviews
reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:'room',
        select:'name'
    }).populate({
        path:'user',
        select:'username photo'
    })
    next()
    //need to change photo or room name
})

const Review = mongoose.model('Review',reviewSchema)

module.exports = Review