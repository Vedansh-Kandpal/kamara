import axios from "axios"
import { showAlert } from "./alerts"


const stripe = Stripe("pk_test_51Kx4xISIKmq28W4GNhB8NgixedlKf871yVkRFdQsxT3MRgBrJcGBalLheDbBCbuyxqbxh72tBZ63xAIS5aB0ZnTw00Y5wcslRD")


export const bookRoom =async roomId =>{
    try{
        //1.get checkout session 
    const session = await axios(`http://localhost:3000/api/v1/bookings/checkout-session/${roomId}`)
    console.log(session)
    //2.create checkour form
    await stripe.redirectToCheckout({
        sessionId: session.data.session.id
    })

    }catch(err){
        console.log(err)
        showAlert('error',err)

    }
    
}