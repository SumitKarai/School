import React from 'react';
import Nav from 'react-bootstrap/Nav';

import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SideNav from './Components/SideNav';
import Header from './Components/Header';
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
