const express = require('express')
// const sellerController = require('../controller/sellerController')
const userController = require('../controller/userController')

const authController = require('../controller/authController')


const Router = express.Router()

Router.post('/signup',authController.signup)
Router.post('/login',authController.login)
Router.get('/logout',authController.logout)
Router.post('/forgotPassword',authController.forgotPassword)
Router.patch('/resetPassword/:token',authController.resetPassword)
Router.delete('/deleteMe',authController.protect,userController.deleteMe)
Router.patch('/updatePassword',
authController.protect,
authController.updatePassword)

Router.patch('/updateMe',authController.protect,userController.updateMe)

Router
    .route('/')
    .get(userController.gatAllusers)
    .post(userController.createUser)
Router
    .route('/:id')
    .get(userController.getOneUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports = Router
