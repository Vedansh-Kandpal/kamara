// const  mongoose= require("mongoose")
// const bcrypt = require('bcryptjs')
// const validator = require('validator')




// // creating Schema for seller
// const sellerSchema = new mongoose.Schema({
//     selector:{
//         type:String,
//         lowercase:true,
//         required:[true,"Plese tell us your Type!"]
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
//         unique:true
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
// sellerSchema.pre('save',async function(next){
//     if(!this.isModified('password'))
//     return next()
//     this.password = await bcrypt.hash(this.password,12)
//     this.confirmpassword = undefined
//     next()
// })

// //chack password provided at the time of login is equal to the password in db or not

// sellerSchema.methods.correctPassword =async function(
//     candidatePassword,
//     userPassword
// ){
//     return await bcrypt.compare(candidatePassword, userPassword)
// }

// const Seller = new mongoose.model("Seller", sellerSchema)
// module.exports = Seller   //export the collections
