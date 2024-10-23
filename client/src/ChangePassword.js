import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/css/Forms.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from './components/footer';
import { faLock, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

function ChangePassword() {
  const [email, setEmail] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [confirmContra, setConfirmContra] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validarContrasena = (contrasena) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(contrasena);
  };

  // UseEffect para obtener el email desde localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirigir a ForgotYourPassword si no hay correo
      window.location.href = '/ForgotYourPassword';
    }
  }, []);

  // Handler para enviar formulario
const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarContrasena(Contrasena)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
      return;
    }
    // Validar que las contraseñas coincidan
    if (Contrasena !== confirmContra) {
        setError('Las contraseñas no coinciden.');
        return;
    }

    // Limpiar cualquier error previo
    setError('');

    try {
        // Enviar solicitud de cambio de contraseña al back-end
        const response = await axios.post('http://localhost:3001/ChangePassword', 
            {
                email,
                contrasena: Contrasena,
            }
        );

        // Mostrar mensaje de éxito
        if (response.data.success) {
            setSuccess('Contraseña cambiada exitosamente. Redirigiendo a la página de inicio de sesión...');
            setTimeout(() => {
                window.location.href = '/'; // Redirigir a la página de inicio de sesión después de 2 segundos
            }, 2000);
        } else {
            setError('No se pudo cambiar la contraseña. Intenta de nuevo.');
        }
    } catch (error) {
        // Mostrar mensaje de error
        setError('Error al cambiar la contraseña. Por favor, intente de nuevo.');
    }
    };

  return (
    <div className="container-forms">
      <div className="form-container">
        <img className="img-forms" src={require('./assets/img/logo2.png')} alt="Logo" />
        <h2 className='title-form'>Recuperar la contraseña</h2>
        <form onSubmit={handleSubmit}>
          <div className="placeholder-container">
            <div className="form-group">
              <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
              <label htmlFor="Contrasena">Nueva Contraseña:</label>
              <input
                type={showNewPassword ? "text" : "password"} // Alterna entre texto y contraseña
                onChange={(event) => setContrasena(event.target.value)}
                placeholder="Ingrese su nueva contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)} // Cambia el estado al hacer clic
                className="toggle-button"
              >
                <FontAwesomeIcon fontSize={20} icon={showNewPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            <div className="form-group">
              <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
              <label htmlFor="confirmContra">Confirma la contraseña:</label>
              <input
                type={showConfirmPassword ? "text" : "password"} // Alterna entre texto y contraseña
                onChange={(event) => setConfirmContra(event.target.value)}
                placeholder="Confirme su nueva contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Cambia el estado al hacer clic
                className="toggle-button"
              >
                <FontAwesomeIcon fontSize={20} icon={showConfirmPassword ? faEye : faEyeSlash} />
              </button>
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

export default ChangePassword;