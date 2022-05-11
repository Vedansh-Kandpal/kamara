// const  mongoose= require("mongoose")
// const bcrypt = require('bcryptjs')
// const validator = require('validator')
// // creating Schema for customer
// const customerSchema = new mongoose.Schema({
//     selector:{
//         type:String,
//         required:[true,"Plese tell us your Type!"],
//         lowercase:true,
//     },
//     username:{
//         type:String,
//         required:[true,"Please tell us your name!"]
//     },
//     email:{
//         type:String,
//         required:[true,"Please tell us your email!"],
//         unique:true,
//         lowercase:true,
//         validate:[validator.isEmail,'Please provide a valid email!']
//     },
//     phone:{
//         type:Number,
//         required:[true,"Please tell us your Phone No!"],
//         unique:true,
//        minlength:10
//     //    [10,"Phone number must have minimun 10 digit"],
//     //    maxlength:[10,"Phone number must have maximum 10 digit"],
//     },
      
//     photo:String,
//     password:{
//         type:String,
//         required:[true,"Please provide a password!"],
//         minlength:8,
//         select:false

//     },
//     confirmpassword:{
//         type:String,
//         required:[true,"Please confirm your password!"],
//         validate:{
//             validator:function(el){
//                 return el === this.password 
//             },
//             message :"Passwords are not the same"
//         }
        
//     },

// })

// //encrypt the password
// customerSchema.pre('save',async function(next){
//     if(!this.isModified('password'))
//     return next()
//     this.password = await bcrypt.hash(this.password,12)
//     this.confirmpassword = undefined
//     next()
// })
// //chack password provided at the time of login is equal to the password in db or not

// customerSchema.methods.correctPassword =async function(
//     candidatePassword,
//     userPassword
// ){
//     return await bcrypt.compare(candidatePassword, userPassword)
// }





// const Customer = new mongoose.model("Customer", customerSchema)

// module.exports = Customer    //export the collections
