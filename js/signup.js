import axios from "axios";
import { showAlert } from "./alerts";
export const signingup = async(role,username,email,phone,password,confirmpassword) =>{
    // console.log(role,username,email,phone,password,confirmpassword)
    try{ 
        const res = await axios({
            method:'POST',
            url:'http://localhost:3000/api/v1/user/signup',
            data:{
                role,
                username,
                email,
                phone,
                password,
                confirmpassword
            }
        })
        if (res.data.status === 'success'){
            showAlert('success','Signed up successfully');
            window.setTimeout(()=>{
                location.assign('/')
                
            },1500);
        }
        // console.log(res)
    }catch(err){
        showAlert('error',err.response.data.message);
    }
}
