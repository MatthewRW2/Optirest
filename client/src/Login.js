import React, { useState } from 'react';
import './assets/css/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [Nombre, setNombre] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = (event) => {
    event.preventDefault();


    Axios.post('http://localhost:3001/login', {
      nombre: Nombre,
      contrasena: Contrasena, 
    })
      .then((response) => {
        if (response.data.message === "Usuario existente") {
          setError('');
          navigate('/home'); 
        } else {
          setError('Nombre o contraseña incorrectos');
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
              <label htmlFor="username">Nombre:</label>
              <input
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
                type="text"
                id="username"
                placeholder="Ingrese su nombre"
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
