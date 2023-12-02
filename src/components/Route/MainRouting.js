import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../Auth/Login';
import PublicRoutes from './PublicRoutes';
import AdminDetails from '../dashboard/Admindetail';

function MainRouting() {
  return (
    <Router>
   
    <Routes>
        <Route path="/" element={
         <PublicRoutes>
             <Login/>
         </PublicRoutes>
      } /> 
      <Route path="/dashboard" element={
        <PublicRoutes>
      <AdminDetails />
        </PublicRoutes>
    } />
    </Routes>
    </Router>
  )
}

export default MainRouting