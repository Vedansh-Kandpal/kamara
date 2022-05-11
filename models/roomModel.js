const  mongoose= require("mongoose")
const Review = require("./reviewesModel")
const slugify = require('slugify');



const roomSchema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'A Room must have a name'],
      unique: true,
      trim: true,
      maxlength: [10, 'A room name must have less or equal then 40 characters'],
      minlength: [5, 'A room name must have more or equal then 10 characters']
    },
    slug:{ type: String, slug: "name"},

  // room_no:{
  //   type:Number,
  //   required:[true,'A Room must have a Room No.'],
  //   unique:[true,'A Room Exist with same room No.']
  // },

//   location:{ 
//     type:String,
//     required:[true,'A Room must have a Location']
//   },
  address:{
    type:String,
    required:[true,'A Room must have a address']
  },

  BHK:{
    type:Number,
    required:[true,'A Room must have a BHK']
  },

  city:{
    type:String,
    required:[true,'A Room must have a city']
  },

  state:{
    type:String,
    required:[true,'A Room must have a State']
  },

  pin:{
    type:Number,
    required:[true,'A Room must have a Pin-Code']
  },

  rating:{
    type:Number,
    default:4.5
  },
  
  price:{
    type:Number,
    required:[true,'A Room must have a Price']
  },

  description:{
    type:String,
    trim:true
  },

  imageCover:{
    type:String,
    required:[true,'A Room must have a Cover Image']
  },

  image:[String],
  createdAt:{
    type:Date,
    default:Date.now(),
    select:false
  },
  ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
  ratingsQuantity: {
      type: Number,
      default: 0
    },

    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    reviews:{
      type: mongoose.Schema.ObjectId,
      ref:'Review',
            // required:[true,'Review must belong to a room']
    },

},
{
   toJson:{virtuals:true},
    toObject:{virtuals:true}
})


// virtual populate reviews
// roomSchema.virtual('reviews',{
//   ref:'Review',
//   foreignField:'room',  //connect to the reviewsModels field called room
//   localField:'_id'
// })

roomSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Room = mongoose.model('Room',roomSchema)

module.exports = Room