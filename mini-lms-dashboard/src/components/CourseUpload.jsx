
import React, { useState } from 'react';
import './CourseUpload.css';

const CourseUpload = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lessons, setLessons] = useState(['']);

  const handleLessonChange = (index, value) => {
    const newLessons = lessons.slice();
    newLessons[index] = value;
    setLessons(newLessons);
  };

  const addLesson = () => {
    setLessons([...lessons, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      title,
      description,
      lessons,
      progress: 0
    };
    onUpload(newCourse);
  };

  return (
    <div>
      <h2>Upload New Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <h3>Lessons</h3>
        {lessons.map((lesson, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Lesson ${index + 1}`}
            value={lesson}
            onChange={(e) => handleLessonChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addLesson}>Add Lesson</button>
        <button type="submit">Upload Course</button>
      </form>
    </div>
  );
};

export default CourseUpload;
