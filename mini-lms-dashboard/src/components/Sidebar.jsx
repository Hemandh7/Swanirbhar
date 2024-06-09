
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  return (
    <div className="sidebar">
      <ul>
        {role === 'teacher' ? (
          <>
            <li><Link to="/">Upload Course</Link></li>
            <li><Link to="/">Manage Courses</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/">My Courses</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
