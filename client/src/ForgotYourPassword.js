import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Forms.css';

function ForgotYourPassword() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handler para enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los correos coincidan
    if (email !== confirmEmail) {
      setError('Los correos no coinciden.');
      return;
    }

    // Limpiar cualquier error previo
    setError('');

    try {
      // Llamada al backend para verificar si el correo existe en la base de datos con axios
      const response = await axios.post('http://localhost:3001/VerifyEmail', { email });

      if (response.data.exists) {
        // Guardar el correo en el localStorage antes de redirigir
        localStorage.setItem('email', email);
        
        // Si el correo existe, redirigir a la pantalla de cambiar contraseña
        setSuccess('Correo verificado. Redirigiendo a la página de cambio de contraseña...');
        setTimeout(() => {
          window.location.href = '/ChangePassword';
        }, 2000);
      } else {
        setError('Este correo no está registrado.');
      }
    } catch (error) {
      setError('Ocurrió un error. Intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="container-forms">
      <div className="form-container">
        <img className="img-forms" src={require('./assets/img/logo2.png')} alt="Logo" />
        <h2 className='title-form'>Confirma tu correo</h2>
        <form onSubmit={handleSubmit}>
          <div className="placeholder-container">
            <div className="form-group">
              <FontAwesomeIcon icon={faUser} fontSize={20} className='icons' />
              <label htmlFor="email">Correo:</label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
              <label htmlFor="confirmEmail">Confirma el correo:</label>
              <input
                type="email"
                id="confirmEmail"
                placeholder="Confirma tu correo"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
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

export default ForgotYourPassword;
