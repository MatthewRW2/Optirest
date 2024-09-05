import React from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
function Login() {
  return (
    <div className="container">
      <div className="login-container">
        <img 
          src={require('./assets/img/logo2.png')} 
          alt="Logo"
        />
        <h2>Login</h2>
        <form>
          <div className="placeholder-container">
            <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons'></FontAwesomeIcon>
              <label htmlFor="username">Nombre:</label>
              <input 
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
                type="password" 
                id="password" 
                placeholder="Ingrese su contraseña" 
                required 
              />
            </div>
          </div>
          <button className='button' type="submit">Enviar</button>
        </form>
        <div className="links"> {/* Links de registro y recuperación */}
          <a href="/Register.js">¿Aún no tienes cuenta? Regístrate</a>
          <br />
          <a href="/forgot-password">Olvidaste tu contraseña?</a>
        </div>
      </div>
      <Footer /> {/* Usar el componente Footer aquí */}
    </div>
  );
}

export default Login;
