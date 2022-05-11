import axios from "axios"
import { showAlert } from "./alerts";

export const updateSettings = async(data,type) =>{
    try{
        const url = type ==='password'? 'http://localhost:3000/api/v1/user/updatePassword': 'http://localhost:3000/api/v1/user/updateMe'
        const res = await axios({
            method:'PATCH',
            url,
            data
             

        })
        if (res.data.status === 'success'){
            showAlert('success',`${type.toUpperCase()} updated successfully`);
        }

    }catch(err){
        showAlert('error',err.response.data.message)
    }
}




export const updateRoomData = async(name,address,BHK,city,state,pin,price,imageCover,image,summary,description) =>{
    try{
        const res = await axios({
            method:'PATCH',
            url:`http://localhost:3000/api/v1/room/${room.id}`,
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
                description
            }

        })
        if (res.data.status === 'success'){
            alert('success','Room updated successfully');
        }

    }catch(err){
        showAlert('error',err.response.data.message)
    }
}