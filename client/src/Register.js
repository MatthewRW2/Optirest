import React, { useState } from 'react';
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock,faUserPen,faAddressCard,faAddressBook,faEnvelope} from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './assets/css/Styles.css';

const Register = () => {
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Email, setEmail] = useState('');
  const [TipoDocumento, setTipoDocumento] = useState('');
  const [NumeroDocumento, setNumeroDocumento] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [ConfirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const add = (event) => {
    event.preventDefault();

    if (Contrasena !== ConfirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    Axios.post("http://localhost:3001/registro", {
      nombres: Nombres,
      apellidos: Apellidos,
      email : Email,
      tipoDocumento: TipoDocumento,
      numeroDocumento: NumeroDocumento,
      contrasena: Contrasena
    }).then(() => {
      alert("Usuario registrado");
      setError(''); 
      navigate('/')
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
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons'/>
            <label className="l">Nombres:</label>
            <input
              type="text"
              onChange={(event) => setNombres(event.target.value)}
              placeholder="Ingrese sus nombres"
              required
            />
          </div>
          <div className="form-group">
          <FontAwesomeIcon icon={faUserPen} fontSize={20} className='icons'/>
            <label className="l">Apellidos:</label>
            <input
              type="text"
              onChange={(event) => setApellidos(event.target.value)}
              placeholder="Ingrese sus apellidos"
              required
            />
          </div>
          <div className="form-group">
          <FontAwesomeIcon icon={faEnvelope} fontSize={20} className='icons'/>
            <label className="l">Correo electrónico:</label>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Ingrese su correo electrónico"
              required
            />
          </div>
          <div className="form-group">
          <FontAwesomeIcon icon={faAddressBook} fontSize={20} className='icons'/>
            <label className="l">Tipo de Documento:</label>
            <select
              onChange={(event) => setTipoDocumento(event.target.value)}
              required
            >
              <option value="">Seleccione su tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>
          <div className="form-group">
          <FontAwesomeIcon icon={faAddressCard} fontSize={20} className='icons'/>
            <label className="l">N° de Documento:</label>
            <input
              type="text"
              onChange={(event) => setNumeroDocumento(event.target.value)}
              placeholder="Ingrese su número de documento"
              required
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons'></FontAwesomeIcon>
            <label className="l">Contraseña:</label>
            <input
              type="password"
              onChange={(event) => setContrasena(event.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons'></FontAwesomeIcon>
            <label className="l">Confirmar contraseña:</label>
            <input
              type="password"
              onChange={(event) => setConfirmarContrasena(event.target.value)}
              placeholder="Confirme su contraseña"
              required
            />
          </div>
          
          {error && <p style={{ color: 'red', marginBottom: '15px'}}>{error}</p>}
          
            <button className='form-button' type="submit">Registrarse</button>
          <div className="links">
            <a href="/">¿Ya tienes cuenta? Inicia sesión</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;


