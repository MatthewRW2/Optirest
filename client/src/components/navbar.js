import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import '../assets/css/Navbar.css';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para manejar la navegación
  const handleNavigation = (path) => {
    navigate(path); // Redirige a la ruta correspondiente
  };

  return (
    <header className="navbar">
      {/* Logo (redirige a Home) */}
      <img 
        src={require('../assets/img/logo.png')} 
        className="logo" 
        alt="logo" 
        onClick={() => handleNavigation('/home')} // Redirige a Home al hacer clic
        style={{ cursor: 'pointer' }} // Cambia el cursor a puntero para indicar que es clickeable
      />

      <div className="right-section">
        {/* Menú hamburguesa */}
        <div className="hamburger" onClick={toggleNav}>
          <FontAwesomeIcon icon={faBars} className="hamburgerIcon" />
        </div>

        {/* Botones de navegación */}
        <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
          <button className="navButton" onClick={() => handleNavigation('/menu-management')}>
            Gestión de Menús
          </button>
          <button className="navButton" onClick={() => handleNavigation('/schedule')}>
            Registro de asistencia
          </button>
          <button className="navButton" onClick={() => handleNavigation('/statistics')}>
            Estadísticas
          </button>
          <button className="navButton" onClick={() => handleNavigation('/reports')}>
            Reportes
          </button>
        </nav>

        {/* Perfil de usuario */}
        <div className="profile">
          <FontAwesomeIcon icon={faUser} className="profileIcon" onClick={toggleMenu} />
          {menuOpen && (
            <div className="profileMenu">
              <button className="menuButton" onClick={() => handleNavigation('/profile')}>
                Perfil
              </button>
              <button className="menuButton" onClick={() => handleNavigation('/settings')}>
                Configuración
              </button>
              <button className="menuButton" onClick={() => handleNavigation('/logout')}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
