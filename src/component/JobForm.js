import { React } from 'react';
import { FormButton } from './FormButton';

export const JobForm = ({addNewJob, newJob, setNewJob, search, setSearch, error, setError}) => {

  // Handles input fields (title, status) and updates the newJob state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
    if (error) setError("");
  }

  // Handles clicking the category buttons (task)
  const handleTaskClick = (e) => {
    e.preventDefault();
    const taskValue = e.target.value;
    setNewJob({ ...newJob, task: taskValue });
    // Clear error message if user selects a task after an error
    if (error) setError("");
  };

  return (
    <div className="form-header">
      <form onSubmit={addNewJob}>
        {/* An input field for entering job titles */}
        <input 
          type="text" 
          name="title"
          value={newJob.title}
          onChange={handleInputChange}
          className="bot-input" 
          placeholder="Enter the job" />
        
        {/* Buttons for selecting job categories */}
        <div className="form-details">
          <div className="bottom-line">
            
            <FormButton
              value="Read Emails"
              newJob={newJob}
              handleTaskClick={handleTaskClick}
            />
            <FormButton
              value="Web Parsing"
              newJob={newJob}
              handleTaskClick={handleTaskClick}
            />
            <FormButton
              value="Send Emails"
              newJob={newJob}
              handleTaskClick={handleTaskClick}
            />

          </div>
        </div>

        {/* A dropdown menu for selecting job status */}
        <select className="job-status" 
          name="status"
          value={newJob.status} 
          onChange={handleInputChange}> 
          <option value="">Select Status</option> {/* Default, non-submittable option */}
          <option value="Need to Start">Start Process</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Stopped">Stopped</option>
        </select>

        {/* A submit button to add the job */}
        <button type="submit" className="submit-data">Add Jobs</button>
        
        {/* Error Handling */}
        {error && <p className="error-message">{error}</p>}
      </form>
      <form className="filter-input">
        <input
          placeholder="Search by Job"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
    </div>
  );
};
