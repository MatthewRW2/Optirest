import React, { useState } from 'react';
import './assets/css/Styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'; // Importar Axios para manejar las peticiones HTTP
import { useNavigate } from 'react-router-dom'; // Para redirigir entre rutas

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook de react-router para redirigir

  const handleLogin = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:3001/login', {
      username: username,
      password: password
    }).then((response) => {
      const { token, role } = response.data;

  
      localStorage.setItem('token', token);

      // Redirigir según el rol del usuario
      if (role === 'Administrador') {
        navigate('/UserRegister');
      } else if (role === 'Docente') {
        navigate('/teacher-dashboard');
      } else if (role === 'PersonalDeCocina') {
        navigate('/kitchen-dashboard');
      }
    }).catch((error) => {
      setError('Usuario o contraseña incorrectos');
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
        <h2 className='title-form'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="placeholder-container">
            <div className="form-group">
              <FontAwesomeIcon icon={faUser} fontSize={20} className='icons'></FontAwesomeIcon>
              <label htmlFor="username">Nombre:</label>
              <input
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                type="text"
                id="username"
                placeholder="Ingrese su nombre"
                required
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faLock} fontSize={20} className='icons'></FontAwesomeIcon>
              <label htmlFor="password">Contraseña:</label>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className='form-button' type="submit">Enviar</button>
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
