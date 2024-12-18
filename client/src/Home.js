import React, { useEffect, useState } from 'react'; // Importa useEffect y useState
import { useNavigate } from 'react-router-dom'; 
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css'; 

const Home = () => {
  const [userRole, setUserRole] = useState(''); // Estado para el rol del usuario
  const navigate = useNavigate(); 

  useEffect(() => {
    const role = localStorage.getItem('userRole'); // Obtener el rol del usuario almacenado en localStorage
    setUserRole(role); // Establecer el rol del usuario en el estado
  }, []); // Se ejecuta solo cuando el componente se monta

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
          {userRole === 'Inactivo' && (
            <h2 className="main-button-title">Como tu rol es inactivo debes esperar a que el Administrador te proporcione un rol</h2>
          )}
          {userRole !== 'Inactivo' && (
            <>
              {(userRole === 'Administrador' || userRole === 'PersonalDeCocina') && (
                <>
                  <h2 className="main-button-title">¡Empieza aquí!</h2>
                  <button className="main-nav-button" onClick={handleMenuManagementClick}>
                    Gestión de Menús
                  </button>
                </>
              )}

              {userRole === 'Docente' && (
                <>
                  <h2 className="main-button-title">¡Empieza aquí!</h2>
                  <button className="main-nav-button" onClick={() => navigate('/UserRegister')}>
                    Registro de asistencia
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
