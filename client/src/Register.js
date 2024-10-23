import React, { useState } from 'react';
import './assets/css/Styles.css';
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faUserPen, faAddressCard, faAddressBook, faEnvelope, faEye, faEyeSlash  } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Email, setEmail] = useState('');
  const [TipoDocumento, setTipoDocumento] = useState('');
  const [NumeroDocumento, setNumeroDocumento] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [ConfirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmar contraseña
  const navigate = useNavigate();

  const validarContrasena = (contrasena) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(contrasena);
  };

  const add = (event) => {
    event.preventDefault();

    if (NumeroDocumento.length !== 8 && NumeroDocumento.length !== 10) {
      setError('Ingrese un número de documento válido');
      return;
    }

    if (Contrasena !== ConfirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!validarContrasena(Contrasena)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
      return;
    }

    Axios.post("http://localhost:3001/registro", {
      nombres: Nombres,
      apellidos: Apellidos,
      email: Email,
      tipoDocumento: TipoDocumento,
      numeroDocumento: NumeroDocumento,
      contrasena: Contrasena
    }).then(() => {
      setError('');
      setShowModal(true); // Mostrar el modal al registrar correctamente
    }).catch(() => {
      setError('Hubo un error en el registro');
    });
  };

  return (
    <div className='container-form'>
      <div className="form-container">
        <img 
          className="img-forms" 
          src={require('./assets/img/logo2.png')} 
          alt="Logo"
        />
        <h2 className='title-form'>Registrar Usuario</h2>
        <form onSubmit={add}>
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons' />
            <label className="l">*Nombres:</label>
            <input
              type="text"
              onChange={(event) => setNombres(event.target.value)}
              placeholder="Ingrese sus nombres"
              required
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faUserPen} fontSize={20} className='icons' />
            <label className="l">*Apellidos:</label>
            <input
              type="text"
              onChange={(event) => setApellidos(event.target.value)}
              placeholder="Ingrese sus apellidos"
              required
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} fontSize={20} className='icons' />
            <label className="l">*Correo electrónico:</label>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faAddressBook} fontSize={20} className='icons' />
            <label className="l">*Tipo de documento:</label>
            <select 
              onChange={(event) => setTipoDocumento(event.target.value)}
              required
            >
              <option value="">Seleccione...</option>
              <option value="C.C.">Cédula de Ciudadanía</option>
              <option value="C.E.">Cédula de Extranjería</option>
              <option value="T.I.">Tarjeta de Identidad</option>
            </select>
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faAddressCard} fontSize={20} className='icons' />
            <label className="l">*Número de documento:</label>
            <input
              type="text"
              onChange={(event) => setNumeroDocumento(event.target.value)}
              placeholder="Ingrese su número de documento"
              required
            />
          </div>
          <div className="form-group password-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label className="l">*Contraseña:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"} // Alterna entre texto y contraseña
                onChange={(event) => setContrasena(event.target.value)}
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
          <div className="form-group password-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label className="l">*Confirmar Contraseña:</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"} // Alterna entre texto y contraseña
                onChange={(event) => setConfirmarContrasena(event.target.value)}
                placeholder="Confirme su contraseña"
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
          {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
          <button className="form-button" type="submit">Registrar</button>
        </form>
        <div className="links">
            <a href="/">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>

      {/* Modal de éxito */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Registro exitoso</h2>
            <p>Su cuenta ha sido creada con éxito.</p>
            <button onClick={() => {
              setShowModal(false);
              navigate('/');
            }}>Aceptar</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Register;