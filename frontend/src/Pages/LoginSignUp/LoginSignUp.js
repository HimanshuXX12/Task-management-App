import React from 'react'
import './LoginSignUp.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
function LoginSignUp() {
    const [formData,SetformData]= useState({
        email:undefined,
        password:undefined
    })
    const [value,inputer]= useState("Login");
    const changehandler= async (e)=>{
        SetformData({...formData,[e.target.name]:e.target.value});
    }

   
    useEffect(()=>{
        const element= document.getElementsByClassName("inputer");
        
        for(let i=0;i<element.length;i++)
        {
           element[i].addEventListener('blur',async ()=>{
               if(element[i].value)
               {
                   element[i].classList.add("login-filled");
               }
               else 
               {
                  element[i].classList.remove("login-filled");
               }
           })
        }
  
  
       });
  



    const clicker= async ()=>{
        if(value==='Login')
        {
            inputer('Register');
        }
        else{
            inputer('Login');
        }
    }

    const Submitter= async ()=>{
        // signup
        const url="https://task-management-app-p4k9.onrender.com/signup"
        const res= await axios.post(url,formData);
        if(res.data.sucess)
        {
            alert(res.data.error);
            inputer("Login");
        }
        else{
             alert(res.data.error);
        }

    }

    const logger= async  ()=>{
        // login
        const url="https://task-management-app-p4k9.onrender.com/login";
        const res= await axios.post(url,formData)
         if(res.data.sucess)
         {
             alert(res.data.error);
             localStorage.setItem("token",res.data.token);
             window.location.replace("/");
         }
         else if(res.data.sucess===null)
         {
            alert(res.data.error);
            inputer('Register');
         }
         else if(!res.data.sucess)
            {
            alert(res.data.error);
         }

    }


  return (
    <div className='login'>
    <div className='login-container'>
        <div className='login-inner-container pt-2 '>
        <h1 className='font-bold'>TASK MANAGER</h1>
        <p className='font-bold'>{value}</p>
        <div>
           <input type='email' onChange={changehandler} placeholder='Email' name='email' className='inputer  '/>
           <hr/>
        </div>
        <div>
        <input type='password' onChange={changehandler} placeholder='Password' name='password' className='inputer'/>
        <hr/>
        </div>
        {/* {
           value==='Login' ? <></>
           :
           <div>
              <input type='file' id="file" onChange={imageHandler} accept='image/*' />
               <label htmlFor='file' className='flex'>
                <div> 
                 <img src={item?URL.createObjectURL(item):avtar} className='avatar-image'/>
                 </div>
                 {
                   item?<p className='texter'>Avatar Added</p>
                   :<p className='texter'>Add a Avatar</p>
                 }
               </label>
           </div>
        } */}

        <div className='diver'>
           <button className='btn mb-3 py-2 font-bold' onClick={value!=='Login'?Submitter:logger}>{value}</button>
        </div>
        {
           value==='Login'?
           <div className='flex gap-2 justify-center my-2'>
               <p  className='text-xs'>New User?</p>
               <Link onClick={clicker} className='text-xs'>Signup</Link>
           </div>
           :<div className='flex gap-2 justify-center my-2'>
               <p className='text-xs'>Already have an account</p>
               <Link className='text-xs' onClick={clicker}>Login</Link>    
           </div>
        }
        
        </div>
       </div>  
   </div>
  )
}

export default LoginSignUp
