const AppError = require('../utility/appError')
const Room = require('./../models/roomModel')
const ApiFetures = require('./../utility/apiFetures')
const catchAsync = require('./../utility/catchAsync')

// _________________________________________



exports.gatAllRooms = catchAsync(async function (req, res, next) {


    const features = new ApiFetures(Room.find(), req.query).filter().sort().limitFields().paginate()
    const allRooms = await features.query
    res.status(200).json({
        status: 'success',
        results: allRooms.length,   //when we pass long json then provide us the length of the json
        data: {
            allRooms
        }
    })

})



exports.getOneRoom = catchAsync(async (req, res, next) => {

    const OneRoom = await Room.findById(req.params.id).populate('reviews')

    if(!OneRoom){
        return next(new AppError("No Room found with that Id",404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            OneRoom
        }
    });




});

exports.createRoom = catchAsync(async function (req, res, next) {

    const newCreatedRoom = await Room.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            newCreatedRoom
        }
    })

})




exports.updateRoom = catchAsync(async function (req, res, next) {

    const UpdatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    })
    if(!UpdatedRoom){
        return next(new AppError("No Room found with that Id",404))
    }

    res.status(200).json({
        status: "success",
        data: {
            UpdatedRoom
        }
    })


})

exports.deleteRoom = catchAsync(async function (req, res, next) {

    const room = await Room.findByIdAndDelete(req.params.id)

    if(!room){
        return next(new AppError("No Room found with that Id",404))
    }

    res.status(204).json({
        status: "success",
        data: null
    })

})





// extra
// exports.getRoomStats = async function(req,res) {
//     try{
//         const stats = await Room.aggregate([
//             {
//                 $match: { ratingsAverage :{ $gte: 4.5 }}
//             },
//             {
//                 $group: {
//                     _id: null,
//                     avgRating:{ $avg: '$ratingsverage' },
//                     avgPrice:{ $avg: '$price' },
//                     minPrice:{ $min: '$price' },
//                     maxPrice: { $max: '$price' },
//                 }
//             }
//         ])

//         res.status(201).json({
//             status:'success',
//             data:{
//                 stats
//             }
//          })
//     }catch(err){
//        res.status(400).json({
//             status:'fail',
//             messgae:err
//         })
//     }
// }
//_____________________________________________________