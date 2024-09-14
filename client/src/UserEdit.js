import React, { useState } from 'react';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileLines, faLock, faPeopleGroup, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Forms.css';

const UserEdit = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [rol, setRol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log({
      nombres,
      apellidos,
      tipoDocumento,
      numeroDocumento,
      contrasena
    });
  };

  return (
    <div className='container-forms'>
       <Navbar />
            <div className="form-container">
      <img 
          className="img-forms" 
          src={require('./assets/img/logo2.png')} 
          alt="Logo"
        />
        <h2 className='title-form'>Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons' />
            <label>Nombres:</label>
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              placeholder="Ingrese sus nombres"
              required
            />
            <FontAwesomeIcon icon={faPenToSquare} fontSize={20} className="edit-icon" />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons' />
            <label>Apellidos:</label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              placeholder="Ingrese sus apellidos"
              required
            />
            <FontAwesomeIcon icon={faPenToSquare} fontSize={20} className="edit-icon" />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faFileLines} fontSize={20} className='icons' />
            <label>Tipo de Documento:</label>
            <select
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              required
            >
              <option value="">Seleccione su tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faFileLines} fontSize={20} className='icons' />
            <label>N° de Documento:</label>
            <input
              type="text"
              value={numeroDocumento}
              onChange={(e) => setNumeroDocumento(e.target.value)}
              placeholder="Ingrese su número de documento"
              required
            />
            <FontAwesomeIcon icon={faPenToSquare} fontSize={20} className="edit-icon" />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faPeopleGroup} fontSize={20} className='icons' />
            <label>Rol:</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="">Seleccione su rol</option>
              <option value="Doc">Docente</option>
              <option value="Pcocina">Personal de cocina</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label>Contraseña:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label>Confirmar contraseña:</label>
            <input
              type="password"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              placeholder="Confirme su contraseña"
              required
            />
          </div>

          <div className="buttons-container">
            <button type="submit" className="save-button">Guardar Cambios</button>
            <button type="submit" className="delete-button">Eliminar Usuario</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UserEdit;

