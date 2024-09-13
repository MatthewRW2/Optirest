import React, { useState } from 'react';
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import './assets/css/Register.css';
import Axios from 'axios';


const Register = () => {
  const [Nombres, setNombres] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [TipoDocumento, setTipoDocumento] = useState('');
  const [NumeroDocumento, setNumeroDocumento] = useState('');
  const [Contrasena, setContrasena] = useState('');
  const [ConfirmarContrasena, setConfirmarContrasena] = useState('');

  const add = () => {
    Axios.post("http://localhost:3001/registro", {
      nombres: Nombres,
      apellidos: Apellidos,
      tipoDocumento: TipoDocumento,
      numeroDocumento: NumeroDocumento,
      contrasena: Contrasena,
      confirmarContrasena: ConfirmarContrasena
    }).then(() => {
      alert("Usuario registrado");
    })
   }


  return (
    <div className='container'>
    <div className="form-container">
      <img 
          src={require('./assets/img/logo2.png')} 
          alt="Logo"
        />
         <h2>Registrar usuario</h2>
      <form>
        <div className="form-group">
        <FontAwesomeIcon icon={faUser} fontSize={20} className='icons'></FontAwesomeIcon>
          <label>Nombres:</label>
          <input
            type="text"
            onChange={(event) => setNombres(event.target.value)}
            placeholder="Ingrese sus nombres"
            required
          />
        </div>
        <div className="form-group">
          <label>Apellidos:</label>
          <input
            type="text"
            onChange={(event) => setApellidos(event.target.value)}
            placeholder="Ingrese sus apellidos"
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Documento:</label>
          <select
            onChange={(event) => setTipoDocumento(event.target.value)}
            required
          >
            <option value="">Seleccione su tipo de documento</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
          </select>
        </div>
        <div className="form-group">
          <label>N° de Documento:</label>
          <input
            type="text"
            onChange={(event) => setNumeroDocumento(event.target.value)}
            placeholder="Ingrese su número de documento"
            required
          />
        </div>
        <div className="form-group">
        <FontAwesomeIcon icon={faLock} fontSize={20} className='icons'></FontAwesomeIcon>
          <label>Contraseña:</label>
          <input
            type="password"
            onChange={(event) => setContrasena(event.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <div className="form-group">
        <FontAwesomeIcon icon={faLock} fontSize={20}  className='icons'></FontAwesomeIcon>
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            onChange={(event) => setConfirmarContrasena(event.target.value)}
            placeholder="Confirme su contraseña"
            required
          />
        </div>
        <button onClick={add} type="submit">Registrarse</button>
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
