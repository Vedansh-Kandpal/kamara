const express = require('express')
const viewsControler = require('../controller/viewsControler')
const authController = require('../controller/authController')
const bookingController = require('./../controller/bookingController')


const router = express.Router()


//for room
router.get('/me/addRoom',authController.protect,authController.restrictTo('seller','admin'),viewsControler.addRoom)
router.get('/updateRoom',authController.protect,authController.restrictTo('seller','admin'),viewsControler.roomUpdate)
router.post('/update-room-data',authController.protect,viewsControler.updateYourRoom)

// for user
router.get('/',bookingController.createBookingCheckOut,authController.isLoggedIn,viewsControler.getOverview)
router.get('/room/:slug',authController.isLoggedIn,viewsControler.getRoom)
router.get('/login',viewsControler.getLoinForm)
router.get('/signup',viewsControler.getSignupForm)
router.get('/me',authController.protect, viewsControler.getAccount)
router.get('/my-booking',authController.protect, viewsControler.getMyRoom)
router.get('/my-room',authController.protect,authController.restrictTo("seller","admin"), viewsControler.getMyCreatedRoom)


router.post('/submit-user-data',authController.protect,viewsControler.updateUserData)

module.exports = router