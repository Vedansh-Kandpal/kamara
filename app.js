const path = require ('path')
const express = require('express')
const morgan = require('morgan')

const AppError = require('./utility/appError')
const globalErrorHandler = require('./controller/errorController')
const roomRouter =require('./routes/roomRoutes')
// const customerRouter =require('./routes/customerRouter')
// const sellerRoutes =require('./routes/sellerRoutes')
const userRoutes =require('./routes/userRoutes')
const reviewRouter =require('./routes/reviewRouter')
const viewRouter =require('./routes/viewRouter')
const bookingRouters =require('./routes/bookingRouters')
const cookieParser = require('cookie-parser')

const app = express()

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))

// app.use(express.static(`${__dirname}/public`))

app.use (express.json({limit:'10kb'}))   //to use the json files
app.use (express.urlencoded({extended:true ,limit:'10kb'}))   //to use the json files
app.use(cookieParser())

// creating a middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}



app.use(function(req,res,next){
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies);
    next();
})


//route



app.use ('/',viewRouter)
app.use ('/api/v1/rooms',roomRouter)
app.use ('/api/v1/user',userRoutes)
app.use ('/api/v1/reviews',reviewRouter)
app.use ('/api/v1/bookings',bookingRouters)
// app.use ('/api/v1/customer',customerRouter)
// app.use ('/api/v1/seller',sellerRoutes)




//response for all the route which we not created 
app.all('*',(req,res,next)=>{
   
   
    next(new AppError(`Can't Find ${req.originalUrl} on this Server!`,404)) //AppError called from appError class
})

// creating a middleware for error handling

app.use(globalErrorHandler) //to handle all tthe err and we cll globalErr..... form the controller folder

module.exports = app;