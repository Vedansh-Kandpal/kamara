// const Customer = require ('../models/customerModel')
// const catchAsync = require('./../utility/catchAsync')

// exports.gatAllCustomers =catchAsync(async function(req,res,next){
//     const allCustomers = await Customer.find()
//     res.status(200).json({
//         status: 'success',
//         results: allCustomers.length,   //when we pass long json then provide us the length of the json
//         data: {
//             allCustomers
//         }
//     })
// })

// exports.createUser =function(req,res){
//     res.status(500).json({
//         status: 'error',
//         message: "This route is not yet defined!"
//     })
// }

// exports.getOneUser =function(req,res){
//     res.status(500).json({
//         status: 'error',
//         message: "This route is not yet defined!"
//     })
// }

// exports.updateUser =function(req,res){
//     res.status(500).json({
//         status: 'error',
//         message: "This route is not yet defined!"
//     })
// }

// exports.deleteUser =function(req,res){
//     res.status(500).json({
//         status: 'error',
//         message: "This route is not yet defined!"
//     })
// }
