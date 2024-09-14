import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import './assets/css/Forms.css';

function OlvidasteTuContraseña() {
  return (
    <div className="container-forms">
      <div className="login-container">
      <div className="img-forms">
         src={require('./assets/img/logo2.png')} alt="Logo"
         </div>
         <h2 className='title-form'>Confirma tu correo</h2>
        <form>
          <div className="placeholder-container">
            <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons'></FontAwesomeIcon>
              <label htmlFor="username">Correo:</label>
              <input 
                type="text" 
                id="username" 
                placeholder="Ingresa tu correo" 
                required 
              />
            </div>
            <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons'></FontAwesomeIcon>
              <label htmlFor="password">Confirma el correo:</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Confirma tu correo" 
                required 
              />
            </div>
          </div>
          <button className='form-button' type="submit">Enviar</button>
        </form>
        <div className="links"> 
          <a href="/Register">¿Aún no tienes cuenta? Regístrate</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OlvidasteTuContraseña;
