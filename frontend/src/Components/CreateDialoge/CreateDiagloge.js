import React, { useState } from 'react'
import './CreateDialoge.css'
import axios from 'axios'
function CreateDiagloge(props) {
    const [formdata,setformdata]= useState({
        title:undefined,
        description:undefined,
        due_date:undefined,
        status:"Due",
        token:localStorage.getItem("token")
    })

    const createHandller= async ()=>{
         const res= await axios.post("http://localhost:700/tasks",formdata);
        if(res.data.sucess)
        {
            alert(res.data.error);
            window.location.replace("/tasks");
        }
        else
        {
            alert("Creation Failed");
        }
    }

    const changehandler= async (e)=>{
         setformdata({...formdata,[e.target.name]:e.target.value});
    }
      
  return (
    <div className='createdialoge-page'>
       <div className='createdialoge-page-conntainer'>
       <div className='flex justify-between gap-5'>
            <input className='input uppercase' type="text" name="title" onChange={changehandler} placeholder='Enter the title'/>
            <button onClick={props.closer}><i class="bi bi-x-lg text-xl"></i></button>
        </div>
        <div>
            <textarea className='input' placeholder='Enter The Description' id="create-desc" name="description" onChange={changehandler}/>
        </div>
        
        <div className='create-lower'>
            <input className='input' name='due_date' id="due_date" placeholder='dd-mm-yyyy' onChange={changehandler}/>
            <button className='status-btn py-5 px-8 ' id="task-creation"  onClick={createHandller}>Create</button>
        </div>
       </div>
      
    </div>
  )
}

export default CreateDiagloge
