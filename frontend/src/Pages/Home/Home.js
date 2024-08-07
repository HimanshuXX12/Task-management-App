import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link, Route, Routes } from 'react-router-dom'
import './Home.css'
import Tasks from '../../Components/Tasks/Tasks';
import Done from '../../Components/Done/Done';
import First_Home from '../../Components/First_Home/First_Home';
function Home() {

    const [variable,setvariable]= useState(null);
    useEffect(()=>{
      const element=document.getElementById("home");
        if(variable===null)
        {
          element.classList.add("filled");

        }
        else if
        (variable!=null)
        {
           element.classList.remove("filled");
        }
    })
    async function clicker(id)
    {
        
        const element=document.getElementById(id);
        if(variable===null)
        {
             setvariable(element);
             element.classList.add("filled");
        }
        else
        {
             console.log("printing variable",variable)
             variable.classList.remove("filled");
             element.classList.add("filled");
             if(id==="home")
             {
                setvariable(null);
             }
             else
             {
              setvariable(element);
             }
        }

    }

    const logger= async ()=>{
        localStorage.removeItem("token");
         window.location.replace("/login");
    }

    console.log("token",localStorage.getItem("token"));
  return (
  
          <div className={`home_page `}>
        <div className='left-home'> 
            <div className=' flex flex-col'>
              <Link to="/"> <div className='boxes' id="home" onClick={()=>clicker("home")} >Home</div></Link>
              <Link to="/tasks"> <div className='boxes' onClick={()=>clicker("tasks")} id="tasks">Tasks Due</div></Link>
              <Link to="/tasks/done">  <div className='boxes' onClick={()=>clicker("done")} id="done">Task's Done</div></Link>
                <div className='boxes' onClick={logger}><button className='log-btn'>Logout</button></div>

            </div>
        </div>
        <div className='right-home'> 
            <Routes>
                <Route path='/' element={<First_Home/>}/>
                <Route path="/tasks" element={<Tasks/>}/>
                <Route path='/tasks/done' element={<Done/>}/>
            </Routes>
        </div>
       
      
    </div>
  
  )
}

export default Home
