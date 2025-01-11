import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/authStore";

export default function ProtectedRoute({ children }) {
const [authToken, setAuthToken] = useState(null);
const navigate = useNavigate();
      
const token = useAuthStore((state) => state.token);
// alert(token)
      
useEffect(() => {
    setAuthToken(token); 
}, [token]);

  if (token != null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}