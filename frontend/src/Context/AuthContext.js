
import React, { useEffect, useState } from 'react'
import { useContext ,createContext} from 'react';
import axios from 'axios';
export const AuthContext= createContext(null);

function AuthContextPorvider(props)
{
       const [currentUser,setcurrentuser]= useState({});
      const [all_task,setAlltask]= useState([]);
   const caller= async ()=>{
       
            const res= await axios.get("https://task-management-app-p4k9.onrender.com/tasks",{
                token:localStorage.getItem("token")
             });
     

   }

    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            caller();
        }
    },[]);

    const logoutfunction= async ()=>{
        localStorage.removeItem("token");
        window.location.replace("/login");
    }

     console.log("ALL TASK in authcontext.js", all_task);


    return (
        <AuthContext.Provider>
            {props.children}
        </AuthContext.Provider>
    )

}


export default  AuthContextPorvider;