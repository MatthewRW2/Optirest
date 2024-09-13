import React, { useState } from 'react';
import './assets/css/Forms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  

  return (
    <div className="container-forms">
      <div className="form-container">
        <img
          className='img-forms' 
          src={require('./assets/img/logo2.png')} 
          alt="Logo"
        />
         <h2 className='title-form'>Login</h2>
        <form>
          <div className="placeholder-container">
            <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons'></FontAwesomeIcon>
              <label htmlFor="username">Nombre:</label>
              <input 
                onChange={(event)=>{
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
                onChange={(event)=>{
                  setPassword(event.target.value);
                }}
                type="password" 
                id="password" 
                placeholder="Ingrese su contraseña" 
                required 
              />
            </div>
          </div>
          <button className='form-button' type="submit">Enviar</button>
        </form>
        <div className="links"> 
          <a href="/Register">¿Aún no tienes cuenta? Regístrate</a>
          <br />
          <a href="/ForgotYourPassword">Olvidaste tu contraseña?</a>
        </div>
      </div>
      <Footer /> 
    </div>
  );
}

export default Login;
