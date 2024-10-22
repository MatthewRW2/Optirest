import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/home'); // Redirigir al home
      };

  return (
    <div>
      <Navbar />
        <h1>Acceso Denegado</h1>
        <p>No tienes permiso para acceder a esta página.</p>
        <button onClick={handleGoHome}>Regresar</button>
      <Footer />
    </div>
  );
};

export default Unauthorized;
