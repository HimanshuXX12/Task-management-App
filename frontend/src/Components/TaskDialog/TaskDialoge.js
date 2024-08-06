import React, { useEffect, useState } from 'react'
import './TaskDialoge.css'
import axios from 'axios';

function TaskDialoge(props) {
    console.log("props",props);
    const [text,settext]= useState("");
    const [updatted_title,settitle]= useState("");
     useEffect(()=>{
         if(localStorage.getItem("token"))
         {
            settext(props.task.description);
            settitle(props.task.title);
         }



     },[]);

     const deleter= async (task)=>{
          const res= await axios.delete(`https://task-management-app-p4k9.onrender.com/tasks/${task._id}`)
          if(res.data.sucess)
          {
             alert("Sucessfull deleted task");
             window.location.reload();
          }
          else{
             alert("Failled to delete");
          }
     }

     const updatter= async (task)=>{
           const res= await axios.put(`https://task-management-app-p4k9.onrender.com/tasks/${task._id}`,{
              token:localStorage.getItem("token"),
              data:{
                description:text,
                title:updatted_title,
                due_date:task.due_date,
                status:task.status
            }
           })

           alert(res.data.error);
           
     }

     const fetchDescription= async ()=>{
     
        const res= await axios.put(`https://task-management-app-p4k9.onrender.com/tasks/${props.task._id}`,{
            token:localStorage.getItem("token")
        });

     }
    console.log("props",props);
  return (
    <div className='dialoge-page'>
          <div className='dialoge-box'>
        <div className='dialoge-container'>
           <div className='top-dialoge'>
            <textarea   value={updatted_title} onChange={(e)=>settitle(e.target.value)} className='title-block'/>
            {/* <input type='text' value={updatted_title} onChange={(e)=>settitle(e.target.value)} className='title-block'/> */}
             {/* <h1 className='font-bold'>{props.task.title}</h1> */}
             <button onClick={props.onclose}><i class="bi bi-x-lg"></i></button>
           </div>
           <div className='middle-dialoge'>
              <textarea className='text-descrition' value={text} onChange={(e)=>settext(e.target.value)}/>
           </div>
           <div className='lower-dialoge'>
             <button className=' status-btn delete-btn' onClick={()=>deleter(props.task)}>Delete</button>
             <button className=' status-btn update-btn' onClick={()=>updatter(props.task)}>Update</button>
           </div>
        </div>
      
    </div>
    </div>
  )
}

export default TaskDialoge
