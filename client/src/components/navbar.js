import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <header className="navbar">
      <img 
        src={require('../assets/img/logo.png')} 
        className="logo" 
        alt="logo" 
        onClick={() => handleNavigation('/home')} 
        style={{ cursor: 'pointer' }} 
      />

      <div className="right-section">
        <div className="hamburger" onClick={toggleNav}>
          <FontAwesomeIcon icon={faBars} className="hamburgerIcon" />
        </div>

        <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
          <button className="navButton" onClick={() => handleNavigation('/menu-management')}>
            Gestión de Menús
          </button>
          <button className="navButton" onClick={() => handleNavigation('/UserRegister')}>
            Registro de asistencia
          </button>
          <button className="navButton" onClick={() => handleNavigation('/userList')}>
            Editar usuarios
          </button>
          <button className="navButton" onClick={() => handleNavigation('/statistics')}>
            Estadísticas
          </button>
          <button className="navButton" onClick={() => handleNavigation('/reports')}>
            Reportes
          </button>
        </nav>

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
              <button className="menuButton" onClick={handleLogout}>
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
