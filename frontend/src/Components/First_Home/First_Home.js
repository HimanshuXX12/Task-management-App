import React, { useState } from 'react'
import './First_Home.css'
import axios from 'axios';
import CreateDiagloge from '../CreateDialoge/CreateDiagloge';
function First_Home() {
      const [dialog_status,setdialog_status]= useState(null);
   

    const opencreatedialoge= async()=>{
        setdialog_status(true);
        
          
    }

    const closedialoge= async ()=>{
          setdialog_status(null);
    }
  return (
    <div className='first-home'>
      <div className='first-home-container'>
        <button className='status-btn' onClick={opencreatedialoge}>Create</button>
        {
            dialog_status && <CreateDiagloge closer={closedialoge}/>
        }
      </div>
      
    </div>
  )
}

export default First_Home
