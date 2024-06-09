
import React from 'react';
import { Link } from 'react-router-dom';
import './CourseList.css';

const CourseList = ({ courses }) => {
  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              {course.title}
            </Link>
            <p>{course.description}</p>
            <p>Progress: {course.progress}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
