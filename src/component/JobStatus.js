import React from 'react';
import deleteIcon from '../images/delete.png'
import './JobStatus.css';

export const JobStatus = ({job, updateJobStatus, status, deleteJob}) => {
  return (
    <div className={`ticket-item status-${job.status.toLowerCase() === "in progress" ? "in-progress" 
      : job.status.toLowerCase() === "completed" ? "completed" 
      : "start"
    }`}>
      <div className="card-body">
        <h5 className="card-title">
          {job.title}
        </h5>
      </div>

      <div className="card-footer">
        <div className="button-group">
          {/* Change or add Delete button icon */}
          <button onClick={() => updateJobStatus(job.id)} className="job-action-button" >
            {job.status === "Need to Start" ? "Start Job" : job.status === "In Progress" ? "Complete Job" : "Mark as Incomplete"}
          </button>
          <div className='jobDelete' onClick={() => deleteJob(job.id)}>
            <img src={deleteIcon} className='deletingImg' alt="Delete" />
          </div>
        </div>
      </div>
    </div>
  )
}
