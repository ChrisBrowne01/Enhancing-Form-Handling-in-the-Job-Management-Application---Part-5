import { React, useState } from 'react';
import { FormButton } from './FormButton';
import { FilterForm } from './FilterForm';
import './FormButton.css';

export const JobForm = ({addNewJob, newJob, setNewJob, search, setSearch, error, setError}) => {

  const [successMessage, setSuccessMessage] = useState('');  
  
  const categories = ['Read Emails', 'Web Parsing', 'Send Emails'];
  const statuses = ['Select status...', 'To Start', 'In Progress', 'Completed'];
  

  // Change handler for input fields (title, status) and updates the newJob state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prevJob => ({ ...prevJob, [name]: value }));
    // Clear the error message specific to this input if it exists
    if (error && name === 'title' && value.trim().length >= 3) {
      setError("");
    } else if (error && name === 'category' && value !== '') {
      setError("");
    }
  }

  // Handles clicking the category buttons (category)
  const handleCategoryClick = (e) => {
    e.preventDefault();
    const categoryValue = e.target.value;
    setNewJob({ ...newJob, category: categoryValue });
    // Clear error message if user selects a category after an error
    if (error && categoryValue !== '') setError("");
  };

  // Reset the form fields to their initial empty/default state
  const resetForm = () => {
    setNewJob({
      id: '',
      title: '',
      category: '',
      status: 'To Start' 
    });
    setError("");
    setSuccessMessage(''); 
  };

  // Handle on Submit function
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Validation logic
    let currentError = ''; 

    if (!newJob.title.trim()) {
      currentError = 'Job title is required.';
    } else if (newJob.title.trim().length < 3) {
      currentError = 'Job title must be at least 3 characters long.';
    } else if (!newJob.category || newJob.category === '') {
      currentError = 'Please select a category.';
    } else if (!newJob.status || newJob.status === 'Select status...' || newJob.status === '') { 
    }

    if (currentError) {
      setError(currentError); 
      setSuccessMessage(''); 
      return;
    }

    
    // If validation passes:
    console.log('Job Details Submitted:', newJob);

    addNewJob(e);
    
    // Add visual feedback when a job is successfully added
    setSuccessMessage('Job successfully added!');
    resetForm();


    // Clear success message after a 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  // Determine if the submit button should be disabled
  // const isSubmitDisabled = !newJob.title.trim() || !newJob.category;
console.log('successMessage: ', successMessage)
console.log('setSuccessMessage: ', setSuccessMessage)
  return (
    <div className="form-header">
      <form onSubmit={handleSubmit}>
        <div>
          {/* An input field for entering job titles */}
          <input 
            type="text" 
            name="title"
            value={newJob.title}
            onChange={handleInputChange}
            className={`bot-input ${error && !newJob.title.trim() ? 'input-error' : ''}`} 
            placeholder="Enter the job" />
          {error && (!newJob.title.trim() || newJob.title.trim().length < 3) && (
            <p id="title-error-message" className="error-message">{error}</p>
          )}
        </div>
        {/* Buttons for selecting job categories */}
        <div className="form-details">
          <div className="bottom-line">
            
            <FormButton
              value="Read Emails"
              newJob={newJob}
              handleCategoryClick={handleCategoryClick}
            />
            <FormButton
              value="Web Parsing"
              newJob={newJob}
              handleCategoryClick={handleCategoryClick}
            />
            <FormButton
              value="Send Emails"
              newJob={newJob}
              handleCategoryClick={handleCategoryClick}
            />
            <select className={`job-status ${error && !newJob.category.trim() ? 'input-error' : ''}`} 
              name="category"
              value={newJob.category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          {error && (!newJob.category || newJob.category === '') && (
            <p className="error-message">Please select a category.</p>
          )}
        </div>

        <div>
          {/* A dropdown menu for selecting job status */}
          <select className={`job-status ${error && !newJob.status.trim() ? 'input-error' : ''}`} 
            name="status"
            value={newJob.status}
            onChange={handleInputChange}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          {error && (!newJob.status || newJob.status === '') && (
            <p className="error-message">Please select a status.</p>
          )}
        </div>
        {/* A submit button to add the job */}
        <button type="submit" className="submit-data" /* disabled={isSubmitDisabled} */>
          Add Jobs
        </button>
        
        {/* Display success message */}
        {successMessage && (<p className="success-message">{successMessage}</p>)}

      </form>

      <FilterForm 
        search={search}
        setSearch={setSearch}
      />

    </div>
  );
};
