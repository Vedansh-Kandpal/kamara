// const Seller = require ('../models/sellerModel')
// const Customer = require ('../models/customerModel')
const User = require ('../models/userModel')
const jwt = require('jsonwebtoken')
const catchAsync = require('./../utility/catchAsync')
const AppError = require('./../utility/appError')
const Email = require('./../utility/email')
const crypto = require('crypto')
const { promisify } = require('util')
const { cookie } = require('express/lib/response')






const signToken = id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE_IN
    })
}
//process.env is using the config.env file and JWT_SECRET is the our secreate the syntex is jwt.sign(payload, secretOrPrivateKey, [options, callback])


//
const createSendToken = (user, statusCode, res)=>{
    const token = signToken(user._id)
    //creating and send cookies
    const cookieOptions = {
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE_IN *24*60*60*1000),//converting 90 days into milisec
        // secure:true,
        httpOnly:true,
    }
   
    res.cookie('jwt',token,cookieOptions)
    //remove the password when the user signup
    // user.password = undefined 
    res.status(statusCode).json({
            status: 'success',
            token,
            data: {
                user
            }
    })
}

exports.signup = catchAsync(async function (req, res, next) {

    const newUser = await User.create({
        role:req.body.role,
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword,
        photo:req.body.photo
        
            
    })

    createSendToken(newUser,201,res)


    // const  text= req.body.selector
    // const selector = text.toLowerCase()
    
    // if (selector === "seller"){
    //     const newUser = await Seller.create({
    //         selector:req.body.selector,
    //         username:req.body.username,
    //         email:req.body.email,
    //         phone:req.body.phone,
    //         password:req.body.password,
    //         confirmpassword:req.body.confirmpassword,
            
    //     })

    //     const token = signToken(newUser._id)
        

    //     res.status(201).json({
    //         status: 'success',
    //         token,
    //         data: {
    //             newUser
    //         }
    //     })
    // }else if(selector === "customer" ){
    //     const newUser = await Customer.create({
    //         selector:req.body.selector,
    //         username:req.body.username,
    //         email:req.body.email,
    //         phone:req.body.phone,
    //         password:req.body.password,
    //         confirmpassword:req.body.confirmpassword, 
    //     })

    //     const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRE_IN})

    //     res.status(201).json({
    //         status: 'success',
    //         token,
    //         data: {
    //             newUser
    //         }
    //     })  
    // }else{
    //    console.log("New User Type is invalid"); 
    // }
    

})

exports.login = catchAsync(async(req,res,next) =>{
    const{email,password} = req.body;
    if( !email || !password){
       return next(new AppError('Please provide  Email and Password',400))
    }

    
    const user = await User.findOne({email}).select('+password')

    //correctPasswoed come from user module
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect Email or Password',404))
    }

    createSendToken(user,200,res)
       

    // const{selector,email,password} = req.body;
    // if(!selector || !email || !password){
    //    return next(new AppError('Please provide User Type, Email and Password',400))
    // }

    // if(selector === "seller"){
    //     const seller = await Seller.findOne({email}).select('+password')

    //    //correctPasswoed come from seller module
    //     if(!seller || !(await seller.correctPassword(password, seller.password))){
    //         return next(new AppError('Incorrect user type, Email or Password',404))
    //     }
    //     const token =signToken(seller._id)
    //     res.status(200).json({
    //         status: 'Success',
    //         token
    //     })
    // }else if(selector === "customer"){
    //     const customer = await Customer.findOne({email}).select('+password')

        
    //     //correctPasswoed come from customer module
    //     if(!customer || !(await customer.correctPassword(password, customer.password))){
    //         return next(new AppError('Incorrect user type, Email or Password ',404))
    //     }
    //     const token =signToken(customer._id)
    //     res.status(200).json({
    //         status: 'Success',
    //         token
    //     })
    // }
    
})

exports.logout =(req,res)=>{
    res.cookie('jwt','loggedout',{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
    })
    res.status(200).json({status:'success'})
}

//middleWare function to protect room api with unauthanticated person

exports.protect = async(req,res,next) =>{
    try{
        //get the token and chack if it's there
    let token;
    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    
    // console.log(token)
    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access',401))
    }
    //token  Verification
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
        // console.log(decoded)

    //chack if user skill exists
    const currentUser = await User.findById(decoded.id)
    if(!currentUser){
        return next(
            new AppError(
                'The user belonging to this token does not longer exist.',401
            )
        )
    }
    //check if user changed passwoed after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(
            new AppError('User recently changed password! Please log in again')
        )
    }

    //if there was no problem in any of the stapes then th next() was called the protected route
    req.user = currentUser
    res.locals.user = currentUser
    next()

    }catch(err){
        return next()
    }
    
}

//only for render pages used by login user
exports.isLoggedIn = async(req,res,next) =>{
    
    if(req.cookies.jwt){
    try{
        //1.verify the token
        
       
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET)

        //chack if user skill exists
        const currentUser = await User.findById(decoded.id)
        if(!currentUser){
            return next()
        }


        //check if user changed passwoed after the token was issued
        if(currentUser.changedPasswordAfter(decoded.iat)){
            return next( )
        }

        //there is loged in user
        res.locals.user = currentUser //ferther we use it in the header template
        return next()
    }catch(err){
        return next()
    }
    }
    next()
}

//not all user can parform the action to room api to protuct this we create a middleware  

exports.restrictTo = (...roles) =>{
   
    return(req,res,next) =>{
        //req.user.role we got it from the privious middleware
        if(!roles.includes(req.user.role)){
            return next (new AppError('You do not have to permission to perform this action',403))
        }
        next()
    }
}

//forgot password

exports.forgotPassword =catchAsync(async (req,res,next) =>{
    // 1.Get user based on email
    
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new AppError('There is no user with email address',404))
    }

    //2.generate the reset tolen

    const resetToken = user.createPasswordResetToken()
    await user.save({validateBeforeSave:false})
    
    
    //3 send token to user's Email
    try{
        const resetURL = `http://localhost:3000/api/v1/user/resetPassword/${resetToken}`

        await new Email(user, resetURL).sendPasswordReset();
        
    
        res.status(200).json({
            status:'Success',
            message:'Token sent to email'
        })
    } catch(err){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({validateBeforeSave:false})

        return next(
            new AppError('There was an error sending email. Try again later!'),500
        )
    }
})



//reset password
exports.resetPassword = catchAsync(async(req,res,next) =>{

    //1 get user based on the token

    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

    const user = await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires:{$gt:Date.now()}
    })

    //2 if token has not expire and there is user set the new password
    if(!user){
        return next(new AppError('Token is invalid or has expired',400))
    }
    user.password = req.body.password
    user.confirmpassword = req.body.confirmpassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    //3 Update chagedPasswordAt property for the user

    //4 Log the user in,send JWR
    createSendToken(user,200,res)
})



//update password
//update password
exports.updatePassword = catchAsync(async(req, res, next)=>{
    //1 get user from the database
    const user = await User.findById(req.user.id).select('+password')
    // console.log(user)

    //2 chack if entered password is correct
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))){
        return next(new AppError('Your Current Password is Wrong',401))
    }

    //3 if password is correct then update password
    user.password = req.body.password
    user.confirmpassword = req.body.confirmpassword
    await user.save()

    //4 Log the user in
    createSendToken(user,200,res) 
})
 
 