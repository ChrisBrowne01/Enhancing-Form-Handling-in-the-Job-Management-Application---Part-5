import React from 'react'
import Logo from "../images/job-board-app-pic.png"
import { JobForm } from './JobForm';
import './AppForm.css';

export const Header = ({addNewJob, newJob, setNewJob, search, setSearch, error, setError}) => {
  return (
    <header className="header-top">
      <h1>
        <img className="object-fit-contain" height="100" weight="auto" src={Logo} alt="Job Board Application" />
        <a href="/">Job Management Application Form</a>
      </h1>
      <JobForm 
        addNewJob={addNewJob}
        newJob={newJob}
        setNewJob={setNewJob}
        search={search}
        setSearch={setSearch}
        error={error}
        setError={setError}
      />
    </header>
  )
}
