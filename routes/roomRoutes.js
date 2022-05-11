const express = require('express')
const roomController = require("./../controller/roomController")
const authController = require("./../controller/authController")
const reviewControler = require("./../controller/reviewControler")
const reviewRouter = require("./../routes/reviewRouter")




const router = express.Router()


// router.param('id',roomController.checkID)
// router.route('/room-stats').get(roomController.getRoomStats)


reviewRouter
router
    .route('/')
    .get( roomController.gatAllRooms)
    .post(roomController.createRoom)

router
    .route('/:id')
    .get(roomController.getOneRoom)
    .patch(roomController.updateRoom)
    .delete(authController.protect,
        authController.restrictTo('admin','seller'), roomController.deleteRoom)


//nested route


        router.use('/:roomId/reviews',reviewRouter)

        
// router.route('/:roomId/reviews').post(authController.protect,authController.restrictTo('user'),reviewControler.createReview)
    

module.exports = router
