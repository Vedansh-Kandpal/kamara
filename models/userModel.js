const  mongoose= require("mongoose")
const bcrypt = require('bcryptjs')
const validator = require('validator')
const crypto = require('crypto')


// creating Schema for seller
const userSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:['user','seller','admin'],
        default:'user', 
    },
    username:{
        type:String,
        required:[true,"Please tell us your name!"]
    },
    email:{
        type:String,
        required:[true,"Please tell us your email!"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email!']
    },
    phone:{
        type:Number,
        required:[true,"Please tell us your Phone No!"],
        unique:true,
        // minlength:10,
    },
    
    photo:String,
        
    password:{
        type:String,
        required:[true,"Please provide a password!"],
        minlength:8,
        select:false
    },
    confirmpassword:{
        type:String,
        required:[true,"Please confirm your password!"],
        validate:{
            validator:function(el){
                return el === this.password 
            },
            message :"Passwords are not the same"
        }
        
    },
    passwordChangedAt:Date,

    passwordResetToken: String,

    passwordResetExpires: Date,


    active:{
        type:Boolean,
        default:true,
        select:false
    }
    
})


//encrypt the password
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    return next()
    this.password = await bcrypt.hash(this.password,12)
    this.confirmpassword = undefined
    next()
})

//function for the middleware which help us to update our password

userSchema.pre('save', function(next){
   if(!this.isModified('password') || this.isNew) return next() 
   this.passwordChangedAt = Date.now() -1000  //1 sec is subtracted
   next()
})

//middleware to hide inactive users from the show all user fields
userSchema.pre(/^find/, function(next){
    this.find({active:{$ne:false}})  //ne mean not equal
    next()
})

//chack password provided at the time of login is equal to the password in db or not

userSchema.methods.correctPassword =async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

//function used when the unauthorized user wants to perform some work
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        this.passwordChangedAt,JWTTimestamp
    }
    return false
}
//function for reset password

//this token sended to the user
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
        console.log({resetToken},this.passwordResetToken)
    this.passwordResetExpires =Date.now()+10*60*1000 //converting 10 min into mili sec
    return resetToken
}

const User = new mongoose.model("User", userSchema)
module.exports = User   //export the collections
