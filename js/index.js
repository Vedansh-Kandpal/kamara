import '@babel/polyfill'
import {login,logout} from './login'
import {signingup} from './signup'
import {addingRoom} from './newRoom'
import { updateSettings ,updateRoomData} from './updateSettings'
import {bookRoom} from './stripe'


const loginFrom =document.querySelector('.form--login')
const logOutBtn = document.querySelector('.nav__el--logout')
const signupFrom =document.querySelector('.form--signup')
const updateDataForm = document.querySelector('.form-user-data')
const updatePasswordForm = document.querySelector('.form-user-password')
const updateRoomForm = document.querySelector('.form--updateRoom')
const createNewRoom = document.querySelector('.form--newRoom')
const bookBtn = document.getElementById('book-room')

if(loginFrom)
    loginFrom.addEventListener('submit',e=>{ //e is event which is a callback function
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email,password)
    })



if(signupFrom)
    signupFrom.addEventListener('submit',e=>{
        e.preventDefault();
        const role = document.getElementById('Role').value
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const phone = document.getElementById('phone').value
        const password = document.getElementById('password').value
        const confirmpassword = document.getElementById('con_password').value
        signingup(role,username,email,phone,password,confirmpassword)
    })



if(logOutBtn) 
    logOutBtn.addEventListener('click',logout)

if(updateDataForm)
    updateDataForm.addEventListener('submit',e=>{

        e.preventDefault();

        const username = document.getElementById('name').value
        const email = document.getElementById('email').value
        const phone = document.getElementById('phone').value
        const photo = document.getElementById('photo').value
        // updateData(username,email,phone)
        updateSettings({username,email,phone,photo},'data')

        document.querySelector('.btn-updateData').textContent ='Updated'
    })

if(updatePasswordForm)
    updatePasswordForm.addEventListener('submit',async e=>{
        e.preventDefault();

        document.querySelector('.btn-savePassword').textContent ='Updating...'


        const passwordCurrent = document.getElementById('password-current').value
        const password = document.getElementById('password').value
        const confirmpassword = document.getElementById('password-confirm').value
        await updateSettings({passwordCurrent,password,confirmpassword},'password')



        document.querySelector('.btn-savePassword').textContent ='Updated '


        document.getElementById('password-current').value=""
        document.getElementById('password').value=""
        document.getElementById('password-confirm').value=""

    })


//________________________ROOMS________________________
if(createNewRoom)
    createNewRoom.addEventListener('submit',async e=>{
        e.preventDefault();

        const name = document.getElementById('name').value
        const address = document.getElementById('address').value
        const BHK = document.getElementById('BHK').value
        const city = document.getElementById('city').value
        const state = document.getElementById('state').value
        const pin = document.getElementById('pin').value
        const price = document.getElementById('price').value
        const imageCover = document.getElementById('coverImg').value
        const image = document.getElementById('imgs').value
        const summary = document.getElementById('summary').value
        const description = document.getElementById('description').value
        


        addingRoom(name,address,BHK,city,state,pin,price,imageCover,image,summary,description)

    })


// if(updateRoomForm)
//     updateRoomForm.addEventListener('submit',async e=>{
//         e.preventDefault();
        
//         const name = document.getElementById('name').value
//         const address = document.getElementById('address').value
//         const BHK = document.getElementById('BHK').value
//         const city = document.getElementById('city').value
//         const state = document.getElementById('state').value
//         const pin = document.getElementById('pin').value
//         const price = document.getElementById('price').value
//         const imageCover = document.getElementById('coverImg').value
//         const image = document.getElementById('imgs').value
//         const summary = document.getElementById('summary').value
//         const description = document.getElementById('description').value
        


//         addingRoom(name,address,BHK,city,state,pin,price,imageCover,image,summary,description)

//     })



if(bookBtn)
    bookBtn.addEventListener('click',e=>{
        e.target.textContent= 'Processing....'
        const {roomId} = e.target.dataset
        bookRoom(roomId)
    })