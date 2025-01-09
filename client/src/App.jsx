import React from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './page/LoginPage'
import HomePage from './page/HomePage'

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
  )
}
