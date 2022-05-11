import axios from "axios";
import { showAlert } from "./alerts";
export const addingRoom = async(name,address,BHK,city,state,pin,price,imageCover,image,summary,description) =>{
    // console.log(role,username,email,phone,password,confirmpassword)
    try{ 
        const res = await axios({
            method:'POST',
            url:'http://localhost:3000/api/v1/rooms',
            data:{
                name,
                address,
                BHK,
                city,
                state,
                pin,
                price,
                imageCover,
                image,
                summary,
                description,
                
            }
        })
        if (res.data.status === 'success'){
            showAlert('success','New room added successfully');
            window.setTimeout(()=>{
                location.assign('/')
                
            },1500);
        }
        
    }catch(err){
        showAlert('error',err.response.data.message);
    }
}
