const express = require('express')
const reviewControler = require('./../controller/reviewControler')
const authController = require('./../controller/authController')


const Router = express.Router({mergeParams:true})
//each router has permission to acces the route which there spesific route to use the id from room route (nested route) we use margeParams 

Router.route('/')
.get(reviewControler.getAllReviews)
.post(authController.protect,authController
.restrictTo('user'),reviewControler.createReview)

module.exports = Router;