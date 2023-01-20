

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoguot } from '../../actions/auth';
import { starNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

  const {name} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(startLoguot())
  }
  const handleAddNew = ()=>{
    dispatch(starNewNote());
  }
  return (
  
    <aside className="journal__sidebar">
      <div className="journal__siderbar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span>{name}</span>
        </h3>
        <button 
        onClick={handleLogout}
        className="btn">
          Logout
        </button>

      </div>
      <div 
      onClick={handleAddNew}
      className="jounal__new-entry">
        <i className="far fa-calendar-plus fa-5x"></i>
        <p
        className="mt-5"
        >New Enry</p>
      </div>
        <JournalEntries/>
    </aside>
  )
}
