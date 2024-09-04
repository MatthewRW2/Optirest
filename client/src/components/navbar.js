import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/Navbar.css'; 

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <img src={require('../assets/img/logo.png')} className="logo" alt="logo" />

      <div className="right-section">
        {/* Menú hamburguesa */}
        <div className="hamburger" onClick={toggleNav}>
          <FontAwesomeIcon icon={faBars} className="hamburgerIcon" />
        </div>

        {/* Botones de navegación */}
        <nav className={`nav ${navOpen ? 'nav-open' : ''}`}>
          <button className="navButton">Gestión de Menús</button>
          <button className="navButton">Registro de asistencia</button>
          <button className="navButton">Estadísticas</button>
          <button className="navButton">Reportes</button>
        </nav>

        {/* Perfil de usuario */}
        <div className="profile">
          <FontAwesomeIcon icon={faUser} className="profileIcon" onClick={toggleMenu} />
          {menuOpen && (
            <div className="profileMenu">
              <button className="menuButton">Perfil</button>
              <button className="menuButton">Configuración</button>
              <button className="menuButton">Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;


