import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import SideNav from './Components/SideNav';
import Student from './Components/Student';
import Teacher from './Components/Teacher';
import AddStudent from './Components/AddStudent';

function App() {
  return (
    <>
    
      <SideNav/>
      <Routes>
                <Route path="/student" element={<Student />} />
                <Route path="/teacher" element={<Teacher />} />
                <Route path="/addstudent" element={<AddStudent/>} />
                 
            </Routes>
           
</>
);
}

export default App;
