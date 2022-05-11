
const Room = require('../models/roomModel')
const Booking =require('../models/bookingModel');

const catchAsync = require('../utility/catchAsync')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const room = await Room.findById(req.params.roomId);
    // console.log(room)

      // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        // success_url:`http://localhost:3000/?room=${req.params.roomId}&user=${req.user.id}&price=${room.price}`,
        success_url:`${req.protocol}://${req.get('host')}/?room=${req.params.roomId}&user=${req.user.id}&price=${room.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/room/${room.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.roomId,
        line_items:[
            {
                name: `${room.name} `,
                description: room.summary,
                images: [`http://localhost:3000/room/${room.imageCover}`],
                amount: room.price*100,
                currency: 'inr',
                quantity: 1
            }
        ]
    })
    // 3) Create session as response
    res.status(200).json({
         status: 'success',
        session
    });
})

exports.createBookingCheckOut=catchAsync(async(req,res,next)=>{
  const { room, user, price } = req.query;

  if (!room && !user && !price) {
    return next();
  }
  await Booking.create({ room, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
}) 