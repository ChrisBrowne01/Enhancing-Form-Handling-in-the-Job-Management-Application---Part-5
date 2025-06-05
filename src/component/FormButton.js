import React from 'react'
import './FormButton';

export const FormButton = (props) => {
  return (
      // 5.4 - Practical Activity - Implementing Dynamic Functionality in the Job Management Application
      <button type="button" onClick={props.handleCategoryClick} value={props.value} name="category" className={`tag ${props.newJob.category === props.value ? 'selected-tag' : ''}`}>{props.value}</button>
      
      // 5.4 - Lesson - Building Job Lists and Status Components
      // <button type="button" value={props.value} name="category" className="tag">{props.value}</button>
  )
}
