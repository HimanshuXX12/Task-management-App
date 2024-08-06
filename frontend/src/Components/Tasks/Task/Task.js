import React from 'react'
import './Task.css'
function Task(props) {

  return (
    <div className='task' onClick={props.click}>
        <h1 className='uppercase'>{props.value.title}</h1>
        {/* <p className='description'>{props.value.description}</p> */}
       
    </div>
    
  )
}

export default Task
