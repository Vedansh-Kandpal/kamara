const User = require ('../models/userModel')
const catchAsync = require('../utility/catchAsync')
const AppError = require('./../utility/appError')


//when user wants to update then that time he can only update specifide fields 
const filterObj = (obj, ...allowedFields) =>{
    const newObj = {}
    Object.keys(obj).forEach(el =>{
        if(allowedFields.includes(el)) newObj[el]=obj[el]
    })
    return newObj
}


exports.gatAllusers =catchAsync(async function(req,res,next){
    const allusers = await User.find()
    res.status(200).json({
        status: 'success',
        results: allusers.length,   //when we pass long json then provide us the length of the json
        data: {
            allusers
        }
    })
})


// Delete user

exports.deleteMe =catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})
    res.status(204).json({
        status:'Success',
        data:null
    })
})

// update user
exports.updateMe = catchAsync(async(req,res,next)=>{
    //1 Create error if user update password
    if(req.body.password || req.body.confirmpassword){
        return next(new AppError('This route is not for password Updates.',400))
    }

    //2 Filtered out unwanted fields names that are not allowed to be updated
    const filtreBody = filterObj(req.body, 'username','email','phone','photo')

    //3 update the user data
    const updateUser = await User.findByIdAndUpdate(req.user.id,filtreBody,{
        new: true,
        runValidators:true
    })
    res.status(200).json({
        status: 'Success',
        data:{
            user:updateUser
        }
    }) 
})

exports.createUser =function(req,res){
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}

exports.getOneUser =function(req,res){
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}

exports.updateUser =function(req,res){
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}

exports.deleteUser =function(req,res){
    res.status(500).json({
        status: 'error',
        message: "This route is not yet defined!"
    })
}
