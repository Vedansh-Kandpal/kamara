const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/RoomDB",{
//     useCreatendex: true, 
//    useFindAndModify: false, 
   useNewUrlParser: true,
}).then(function(){
    console.log("Connection successful")
}).catch(function(err){
    console.log(err)
})