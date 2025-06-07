import React, { useState, useEffect } from "react";
import { DragDropContext } from '@hello-pangea/dnd';
import { Header } from "./component/Header";
import { Footer } from './component/Footer';
import { JobColumn } from "./component/JobColumn";
import toDoIcon from './images/to-do-icon.jpg';
import inProgressIcon from './images/in-progress-icon.png';
import doneIcon from './images/done-icon.png';
import './App.css';

function App() {

  // Initialize job list objects
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem('jobs');
    return savedJobs ? JSON.parse(savedJobs) : [
      { id: 1, title: 'Parse Emails', status: 'Need to Start' },
      { id: 2, title: 'SAP Extraction', status: 'In Progress' },
      { id: 3, title: 'Generate Report', status: 'Completed' }
    ]
  });

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const [search, setSearch] = useState("");
  const [newJob, setNewJob] = useState({ id: '', title: '', status: '', category: '' })
  // 1. Edit Functionality Implementation
  const [editingJob, setEditingJob] = useState(null);
  const [editForm, setEditForm] = useState({ id: '', title: '', status: '', category: '' });
  const [error, setError] = useState("");

  // Initialize dark mode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' ? true : false;
  });

  // Effect to apply/remove the 'dark-mode' class on the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(theme => !theme);
  };

  // Delete job based on ID
  const onDeleteJob = (id) => { setJobs(jobs.filter((job) => job.id !== id)) };

  // Update job status based on condition
  const updateJobStatus = (id) => {
    setJobs(
      jobs.map(job =>
        job.id === id ?
          { ...job, status: (job.status === "Need to Start" || job.status === "stopped") ? "In Progress" : job.status === "In Progress" ? "Completed" : "In Progress" }
          : job
      )
    );
  };

  // Implement add new job functionality
  const addNewJob = (e) => {
    e.preventDefault();

    // Basic validation
    if (!newJob.title.trim()) {
      setError("Job Title cannot be empty.");
      return;
    }
    if (!newJob.category) {
      setError("Please select a job category.");
      return;
    }
    if (!newJob.status || newJob.status === "") {
      setError("Please select a job status.");
      return;
    }

     // Create new job with a unique ID
    // Find the maximum existing ID or start from 0 if no jobs exist
    const maxId = jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) : 0;
    const newId = maxId + 1;

    const newJobListing = {
      id: newId,
      title: newJob.title.trim(),
      status: newJob.status.trim(),
      category: newJob.category.trim()
    };

    // Update the 'jobs' state by adding the new job listing
    setJobs([...jobs, newJobListing]);

    // Clear the form fields after successful submission
    setNewJob({ id: '', title: '', status: '', category: '' });
    setError("");

    // Log the data here, after the state has been updated
    console.log("Submitting Job:", newJobListing);
    console.log("All Jobs:", [...jobs, newJobListing]);
  };


  // Edit Functions
  // Edit job based on ID
  const onEditJob = (job) => {
    setEditingJob(job.id);
    setEditForm({ ...job });
  };

  // Submit edit form
  const saveEdit = (e) => {
    e.preventDefault();
    if (!editForm.title.trim()) {
      setError("Job Title cannot be empty.");
      return;
    }
    setJobs(jobs.map(job =>
      job.id === editingJob ? { ...editForm } : job
    ));
    setEditingJob(null);
    setEditForm({ id: '', title: '', status: '', category: '' });
    setError("");
  };
  
/*   const cancelEdit = () => {
    setEditingJob(null);
    setEditForm({ id: '', title: '', status: '', category: '' });
    setError("");
  };
 */
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // If the item is dropped in the same column and same position, do nothing
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const draggedJob = jobs.find(job => job.id === parseInt(draggableId));

    if (!draggedJob) {
      return;
    }

    // Create a new array of jobs to avoid direct mutation
    const newJobs = Array.from(jobs);

    // Remove the dragged job from its original position
    newJobs.splice(newJobs.findIndex(job => job.id === draggedJob.id), 1);

    // Update the status of the dragged job based on the destination column
    let newStatus;
    if (destination.droppableId === "Need to Start") {
      newStatus = "Need to Start";
    } else if (destination.droppableId === "In Progress") {
      newStatus = "In Progress";
    } else if (destination.droppableId === "Completed") {
      newStatus = "Completed";
    } else if (destination.droppableId === "Stopped") {
      newStatus = "Stopped";
    }

    const updatedDraggedJob = { ...draggedJob, status: newStatus };
    newJobs.push(updatedDraggedJob);
    setJobs(newJobs);
  };



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {/* Dark Mode Toggle Button */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>

        <Header
          addNewJob={addNewJob}
          jobs={jobs} setJobs={setJobs}
          newJob={newJob} setNewJob={setNewJob}
          editingJob={editingJob} setEditingJob={setEditingJob}
          saveEdit={saveEdit}
          search={search} setSearch={setSearch}
          error={error} setError={setError}
        />
        <main className="job-columns">

          {/* update state & delete functionality */}
          <JobColumn
            title="Need to Start"
            image={toDoIcon}
            alt="To-do icon"
            jobs={jobs} setJobs={setJobs}
            search={search} setSearch={setSearch}
            statusName="To Start"
            updateJobStatus={updateJobStatus}
            onDeleteJob={onDeleteJob}
            onEditJob={onEditJob}
            droppableId="Need to Start"
          />

          <JobColumn
            title="In Progress"
            image={inProgressIcon}
            alt="In-progress icon"
            jobs={jobs}
            setJobs={setJobs}
            statusName="In Progress"
            search={search}
            setSearch={setSearch}
            updateJobStatus={updateJobStatus}
            onDeleteJob={onDeleteJob}
            onEditJob={onEditJob}
            droppableId="In Progress"
          />

          <JobColumn
            title="Completed"
            image={doneIcon}
            alt="Done icon"
            jobs={jobs}
            setJobs={setJobs}
            statusName="Completed"
            search={search}
            setSearch={setSearch}
            updateJobStatus={updateJobStatus}
            onDeleteJob={onDeleteJob}
            onEditJob={onEditJob}
            droppableId="Completed"
          />

        </main>
        <Footer />
      </div>
    </DragDropContext>
  );
}

export default App;
