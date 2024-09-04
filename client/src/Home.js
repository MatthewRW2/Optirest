import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        {/* Logo */}
        <img src={require('./assets/img/logo.png')} style={styles.logo} alt="logo" />

        {/* Botones de navegación */}
        <nav style={styles.nav}>
          <button style={styles.navButton}>Gestión de Menús</button>
          <button style={styles.navButton}>Registro de asistencia</button>
          <button style={styles.navButton}>Estadísticas</button>
          <button style={styles.navButton}>Reportes</button>
        </nav>

        {/* Perfil de usuario */}
        <div style={styles.profile}>
          <FontAwesomeIcon icon={faUser} style={styles.profileIcon} onClick={toggleMenu} />
          {menuOpen && (
            <div style={styles.profileMenu}>
              <button style={styles.menuButton}>Perfil</button>
              <button style={styles.menuButton}>Configuración</button>
              <button style={styles.menuButton}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </header>

      {/* Contenido principal */}
      <main style={styles.main}>
        <div style={styles.welcomeTextContainer}>
          <div style={styles.welcomeText}>
            <h1 style={styles.welcomeTitle}>¡Bienvenido a Optirest School Solutions!</h1>
            <p style={styles.welcomeSubtitle}>
              Nuestra plataforma simplifica la gestión de menús e inventario escolar, optimizando tus procesos y mejorando la eficiencia. Explora nuestras herramientas y disfruta de una experiencia eficiente y fácil de usar.
            </p>
          </div>
        </div>
        <div style={styles.mainButtonContainer}>
          <h2 style={styles.mainButtonTitle}>¡Empieza aquí!</h2>
          <button style={styles.mainNavButton}>Gestión de Menús</button>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLeft}>
          <p>Tel: +57 320 8023808</p>
          <p>Email: optirest@contacto.com</p>
        </div>
        <div style={styles.footerCenter}>
          <p>© 2024 Optirest School Solutions | All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#EFECEC',
    color: '#1A374D',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#006ADB',
  },
  logo: {
    height: '50px',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navButton: {
    backgroundColor: '#007CFF',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  profile: {
    position: 'relative',
  },
  profileIcon: {
    fontSize: '24px',
    color: 'white',
    cursor: 'pointer',
  },
  profileMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1,
    padding: '10px',
    width: '150px',
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '10px 0',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#1A374D',
    borderBottom: '1px solid #EFECEC',
  },
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(${require('./assets/img/fondo.png')})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
},

  welcomeTextContainer: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'left',
  },
  welcomeText: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px 40px', 
    borderRadius: '8px',
    width: '80%', 
    maxWidth: '80%', 
    textAlign: 'center', 
    margin: '0 auto', 
  },
  welcomeTitle: {
    fontSize: '64px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  welcomeSubtitle: {
    fontSize: '40px',
    lineHeight: '1.5',
  },
  mainButtonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 'auto',
  },
  mainButtonTitle: {
    fontSize: '40px',
    marginBottom: '20px',
  },
  mainNavButton: {
    background: 'linear-gradient(to bottom, #005ABA, #00356C)',
    border: 'none',
    color: 'white',
    padding: '20px 40px',
    fontSize: '40px',
    cursor: 'pointer',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
},
  footer: {
    backgroundColor: '#006ADB',
    color: '#FFFFFF',
    padding: '5px 20px',
    position: 'relative',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    height: '30px',
  },
  footerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  footerCenter: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
};

export default Home;
