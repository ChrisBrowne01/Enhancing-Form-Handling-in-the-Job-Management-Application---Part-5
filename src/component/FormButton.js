import React from 'react'
import './FormButton';
import './FormButton.css';

export const FormButton = (props) => {
  return (
      // 5.4 - Practical Activity - Implementing Dynamic Functionality in the Job Management Application
      <button type="button" onClick={props.handleTaskClick} value={props.value} name="task" className={`tag ${props.newJob.task === props.value ? 'selected-tag' : ''}`}>{props.value}</button>
      
      // 5.4 - Lesson - Building Job Lists and Status Components
      // <button type="button" value={props.value} name="task" className="tag">{props.value}</button>
  )
}
