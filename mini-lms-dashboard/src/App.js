// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import CourseUpload from './components/CourseUpload';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://swanirbharbackend.onrender.com/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses', error);
    }
  };

  const handleLogin = (role) => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleCourseUpload = async (course) => {
    try {
      const response = await axios.post('https://swanirbharbackend.onrender.com/courses', course);
      setCourses([...courses, response.data]);
    } catch (error) {
      console.error('Error uploading course', error);
    }
  };

  const handleMarkComplete = (courseId, lessonIndex) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.slice();
        updatedLessons[lessonIndex] += ' (completed)';
        const completedLessons = updatedLessons.filter(lesson => lesson.includes('(completed)')).length;
        const progress = (completedLessons / updatedLessons.length) * 100;
        return { ...course, lessons: updatedLessons, progress };
      }
      return course;
    });
    setCourses(updatedCourses);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="main">
          {user && <Sidebar role={user.role} />}
          <div className="content">
            {!user ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Routes>
                <Route path="/" element={user.role === 'teacher' ? <CourseUpload onUpload={handleCourseUpload} /> : <CourseList courses={courses} />} />
                <Route path="/courses/:id" element={<CourseDetails courses={courses} onMarkComplete={handleMarkComplete} />} />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
