import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';
import '../assets/css/Modal.css';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userDocument, setUserDocument] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
    const document = localStorage.getItem('userDocument');
    setUserDocument(document);
  }, []);

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
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail'); 
    localStorage.removeItem('userDocument'); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          {userRole === 'Administrador' && (
            <>
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
              <button className="navButton" onClick={() => handleNavigation('/schedule')}>
                Cronograma
              </button>
              <button className="navButton" onClick={() => handleNavigation('/waste')}>
                Registro de desechos
              </button>
            </>
          )}

          {userRole === 'Docente' && (
            <>
              <button className="navButton" onClick={() => handleNavigation('/UserRegister')}>
                Registro de asistencia
              </button>
              <button className="navButton" onClick={() => handleNavigation('/statistics')}>
                Estadísticas
              </button>
            </>
          )}

          {userRole === 'PersonalDeCocina' && (
            <>
              <button className="navButton" onClick={() => handleNavigation('/menu-management')}>
                Gestión de Menús
              </button>
              <button className="navButton" onClick={() => handleNavigation('/inventory')}>
                Inventario
              </button>
              <button className="navButton" onClick={() => handleNavigation('/totallunches')}>
                Almuerzos por realizar
              </button>
              <button className="navButton" onClick={() => handleNavigation('/schedule')}>
                Cronograma
              </button>
              <button className="navButton" onClick={() => handleNavigation('/waste')}>
                Registro de desperdicios
              </button>
            </>
          )}
        </nav>

        <div className="profile">
          <FontAwesomeIcon icon={faUser} className="profileIcon" onClick={toggleMenu} />
          {menuOpen && (
            <div className="profileMenu">
              <button className="menuButton" onClick={() => handleNavigation('/Profile')}>
                Perfil
              </button>
              <button className="menuButton" onClick={() => handleNavigation(`/settings/${userDocument}`)}>
                Configuración
              </button>
              <button className="menuButton" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
        {isModalOpen && (
          <div id="myModal" className="zork-modal-overlay">
            <div className="zork-modal-content">
              <p className="zork-parafo">Sesión cerrada exitosamente.</p>
              <button className="zork-modal-close" onClick={closeModal}>
                Aceptar
              </button>
            </div>
          </div>
        )}
    </header>
  );
};

export default Navbar;