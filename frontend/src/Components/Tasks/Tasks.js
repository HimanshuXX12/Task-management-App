import React, { useEffect, useState } from 'react'
import './Tasks.css'
import axios from 'axios';
import Task from './Task/Task';
import TaskDialoge from '../TaskDialog/TaskDialoge';
function Tasks() {
      const [task,settask]= useState(null);
    const [tasks,settasks]= useState([]);
  
    
    useEffect(()=>{
       

        if(localStorage.getItem("token"))
        {
            finder();
        }

        const element= document.getElementsByClassName("status-btn");
     
         for( let i=0;i<element.length;i++)
         {
             console.log("element",element[i]);
            if(element[i].innerHTML=="Due")
            {
               
                 
                element[i].classList.add("due");
                
            }
            else if(element[i].innerHTML==="Completed")
                {
                 element[i].classList.add("completed");
            }
           
         }
         

    });

    const btn_clicker= async (task)=>{
         if(task.status=="Due")
         {
            
            const res= await axios.put(`https://task-management-app-p4k9.onrender.com/tasks/status/${task._id}`,{
                status:"Completed",
                token:localStorage.getItem("token")
            })
            window.location.reload();
         }
         else
         {
            const res= await axios.put(`https://task-management-app-p4k9.onrender.com/tasks/status/${task._id}`,{
                status:"Due",
                token:localStorage.getItem("token")
            })

            window.location.reload();
         }
    }

    const params={
        token:localStorage.getItem("token")
    }

    const handleCloseDialog= async ()=>{
        localStorage.removeItem("dialoge");
         settask(null);
    }

    const taskclick=async (task)=>{
             settask(task);
             localStorage.setItem("dialoge",true);
    }


    const finder= async ()=>{
        
        const res= await axios.get("https://task-management-app-p4k9.onrender.com/tasks",{params});
       
        if(res.data.sucess)
            {
                const fillter_data= res.data.task.filter((task)=>task.status=="Due");
                if(fillter_data.length==0)
                {
                    alert("No Due Data at this moment");
                }
                else
                {

                    settasks(res.data.task);
                }
            }
            else
            {
                alert(res.data.error);
            }
            
        }
      
  return (
    <div className='tasks'>
        <div className='tasks-container'>
           {
            tasks?.map((task)=>{
                if(task.status=='Due')
                {
                    return (
                        <div className='tanker'>
                            <Task value={task} click={()=>taskclick(task)}/>
                            <div className=' inner-box'>
                                  <button className='date status-btn'>{task.due_date}</button>
                                   <button className='status-btn' id="status-btn" onClick={()=>btn_clicker(task)}>{task.status}</button>
                            </div>
                        </div>
                      )
                }
            })
           }

        </div>
        {
            task && (
                <TaskDialoge task={task} onclose={handleCloseDialog} />
            )
        }
    
    </div>
  )
}


export default Tasks;

