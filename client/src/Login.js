import React, { useState } from 'react';
import './assets/css/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [CorreoElectronico, setCorreoElectronico] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    Axios.post('http://localhost:3001/login', {
      correoElectronico: CorreoElectronico,
      contrasena: Contrasena,
    })
      .then((response) => {
        if (response.data.message === "Inicio de sesión exitoso") {
          const token = response.data.token; // Asegúrate de que el token se envíe si lo usas
          const nombre = response.data.nombre; // Obtener el nombre del usuario
          const rol = response.data.rol; // Obtener el rol del usuario
          localStorage.setItem('userRole', rol); // Guardar el rol en localStorage
          localStorage.setItem('userEmail', CorreoElectronico);
          localStorage.setItem('authToken', token); // Guardar el token en localStorage
          setError('');
          
          // Mostrar el mensaje de alerta
          alert(`Inicio de sesión exitoso. Bienvenido ${nombre}, su rol es: ${rol}`);
          
          navigate('/home');
        } else {
          setError('Correo electrónico o contraseña incorrectos');
        }
      })
      .catch(() => {
        setError('Hubo un error en el inicio de sesión');
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
              <FontAwesomeIcon
                icon={faUser}
                fontSize={20}
                className="icons"
              />
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
            <div className="form-group">
              <FontAwesomeIcon
                icon={faLock}
                fontSize={20}
                className="icons"
              />
              <label htmlFor="password">Contraseña:</label>
              <input
                onChange={(event) => {
                  setContrasena(event.target.value);
                }}
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                required
              />
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
      <Footer />
    </div>
  );
}

export default Login;
