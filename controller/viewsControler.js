const Room = require('../models/roomModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utility/catchAsync');
const AppError =require('../utility/appError')


exports.getOverview =catchAsync(async(req,res)=>{
    //get tour data from collection
       const rooms = await Room.find() 
    //
    res.status(200).render('overview',{
        title:'Overview',
        rooms
    });
})


exports.getRoom=catchAsync(async(req,res,next)=>{

    // get the data for the requested room including reviews
    console.log(req.body.slug)
    const room = await Room.findOne({slug: req.params.slug}).populate({
        path:'reviews',
        fields:'review rating user'
    })
    if(!room){
        return next(new AppError('There is no room with that name',404))

    }
    res.status(200).render('room',{
        title:'Our Room',
        room
    });
})

exports.getMyCreatedRoom = (req,res,next)=>{
    //1.find all room

    //2

}

exports.getLoinForm = (req,res)=>{
    res.status(200).render('login',{
        title:'Log into your Account'
    })
}
exports.getSignupForm = (req,res)=>{
    res.status(200).render('signup',{
        title:'Sign into your Account'
    })
}

exports.getAccount = (req,res)=>{
    res.status(200).render('account',{
        title:'Your Account'
    })
}



exports.getMyRoom =catchAsync(async (req,res)=>{
    //find all booking

    const bookings = await Booking.find({user:req.user.id});
    const roomIds =  bookings.map(el => el.room)
    const rooms = await Room.find({_id:{$in:roomIds}})
    res.status(200).render('overview',{
        title:'My bookings',
        rooms
    })
})

exports.updateUserData = catchAsync(async(req,res)=>{
    
    const updatedUser = await User.findByIdAndUpdate(req.user.id,{
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        photo:req.body.photo
    },{
        new:true,
        runValidators:true
    })
    res.status(200).render('account',{
        title:'Your Account',
        user:updatedUser
    })

})



//_________________FOR ROOMS____________________

exports.addRoom = (req,res)=>{
    res.status(200).render('createroom',{
        title:'Add Room'
    })
}

// roomUpdate
exports.roomUpdate = (req,res)=>{
    res.status(200).render('updateRoom',{
        title:'Update room'
    })
}

exports.updateYourRoom =catchAsync(async (req,res)=>{
    const updatedRoom = await Room.findByIdAndUpdate(req.room.id,
        {
        name:req.body.name,
        address:req.body.address,
        BHK:req.body.BHK,
        city:req.body.city,
        pin:req.body.pin,
        price:req.body.price,
        imageCover:req.body.imageCover,
        image:req.body.image,
        summary:req.body.summary,
        description:req.body.description,
    },{
        new:true,
        runValidators:true
    }
    )
    res.status(200).render('updateRoom',{
        title:'Update Room',
        user:updatedRoom
    })

})