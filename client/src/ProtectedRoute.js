import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  return authenticated ? children : null;
};

export default ProtectedRoute;