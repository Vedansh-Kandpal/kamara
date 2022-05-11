const express = require('express')
const bookingController = require('./../controller/bookingController')
const authController = require('./../controller/authController')


const Router = express.Router()

Router.get('/checkout-session/:roomId',authController.protect,bookingController.getCheckoutSession)


module.exports = Router;