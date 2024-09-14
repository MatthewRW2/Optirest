import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css'; 

const Home = () => {
  const navigate = useNavigate(); 

  const handleMenuManagementClick = () => {
    navigate('/menu-management');
  };

  return (
    <div className="app">
      <Navbar /> 
      <main className="main">
        <div className="welcome-text-container">
          <div className="welcome-text">
            <h1 className="welcome-title">¡Bienvenido a Optirest School Solutions!</h1>
            <p className="welcome-subtitle">
              Nuestra plataforma simplifica la gestión de menús e inventario escolar, optimizando tus procesos y mejorando la eficiencia. Explora nuestras herramientas y disfruta de una experiencia eficiente y fácil de usar.
            </p>
          </div>
        </div>
        <div className="main-button-container">
          <h2 className="main-button-title">¡Empieza aquí!</h2>
          <button className="main-nav-button" onClick={handleMenuManagementClick}>
            Gestión de Menús
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
