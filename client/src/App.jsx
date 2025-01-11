import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage'
import HomePage from './page/HomePage'
import PrivateRoute from './ProtectedRoute/PrivateRoute'

export default function App() {
  return (
      <Routes>

        <Route 
        path="/" 
        element={
         <PrivateRoute>
            <HomePage />
         </PrivateRoute>
        } />

        <Route path="/login" element={<LoginPage />} />

      </Routes>
  )
}
