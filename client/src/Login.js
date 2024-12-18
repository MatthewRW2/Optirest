import React, { useState } from 'react';
import './assets/css/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [CorreoElectronico, setCorreoElectronico] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:3001/login', {
      correoElectronico: CorreoElectronico,
      contrasena: Contrasena,
    })
      .then((response) => {
        if (response.data.message === "Inicio de sesión exitoso") {
          const token = response.data.token;
          const nombre = response.data.nombre;
          const rol = response.data.rol;
          const numeroDocumento = response.data.nDocumento;
          localStorage.setItem('userRole', rol);
          localStorage.setItem('userEmail', CorreoElectronico);
          localStorage.setItem('authToken', token);
          localStorage.setItem('userDocument', numeroDocumento);

          setError('');
          setUserName(nombre);
          setUserRole(rol);
          setShowModal(true); // Mostrar el modal
        } else {
          setError('Correo electrónico o contraseña incorrectos');
        }
      })
      .catch((error) => {
        if (error.response) {
            // Manejo de mensajes de error según el código de estado
            switch (error.response.status) {
                case 404:
                    setError("El usuario no existe");
                    break;
                case 403:
                    setError("El usuario está inactivo");
                    break;
                case 401:
                    setError("Contraseña incorrecta");
                    break;
                default:
                    setError("Hubo un error en el inicio de sesión");
            }
        } else {
            setError("Hubo un error en el inicio de sesión");
        }
      });
  };

  return (
    <div className="container-forms">
      <div className="form-container">
        <img
          className="img-forms"
          src={require('./assets/img/logo2.png')}
          alt="Logo"
        />
        <h2 className="title-form">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="placeholder-container">
            <div className="form-group">
              <FontAwesomeIcon icon={faUser} fontSize={20} className="icons" />
              <label htmlFor="username">Correo Electrónico:</label>
              <input
                onChange={(event) => {
                  setCorreoElectronico(event.target.value);
                }}
                type="email"
                id="username"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
            <div className="form-group password-group">
              <FontAwesomeIcon icon={faLock} fontSize={20} className="icons" />
              <label htmlFor="password">Contraseña:</label>
              <div className="password-container">
                <input
                  onChange={(event) => {
                    setContrasena(event.target.value);
                  }}
                  type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
                  id="password"
                  placeholder="Ingrese su contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
                  className="toggle-button"
                >
                  <FontAwesomeIcon fontSize={20} icon={showPassword ? faEye : faEyeSlash} />
                </button>
              </div>
            </div>
          </div>
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
          <button className="form-button" type="submit">
            Enviar
          </button>
        </form>
        <div className="links">
          <a href="/Register">¿Aún no tienes cuenta? Regístrate</a>
          <br />
          <a href="/ForgotYourPassword">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
      
        {/* Modal Personalizado */}
        {showModal && (
          <div className="zork-modal-overlay">
            <div className="zork-modal-content">
              <h2 className="zork-modal-header">Inicio de sesión exitoso</h2>
              <p className="zork-parafo">
                Bienvenido {userName}, su rol es: {userRole}
              </p>
              <button 
                className="zork-modal-close"
                onClick={() => {
                  setShowModal(false);
                  navigate('/home');
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
        
      <Footer />
    </div>
  );
}

export default Login;