
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = ({ courses, onMarkComplete }) => {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return <Navigate replace to="/" />;
  }

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Lessons</h3>
      <ul>
        {course.lessons.map((lesson, index) => (
          <li key={index}>
            {lesson}
            <button onClick={() => onMarkComplete(course.id, index)}>Mark as Complete</button>
          </li>
        ))}
      </ul>
      <p>Progress: {course.progress}%</p>
    </div>
  );
};

export default CourseDetails;
