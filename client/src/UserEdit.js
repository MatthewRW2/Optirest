import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faAddressBook, faLock, faPeopleGroup, faEnvelope, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Styles.css';


const validarContrasena = (contrasena) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return regex.test(contrasena);
}; 

const UserEdit = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correo, setCorreo] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [rol, setRol] = useState('');
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [tipoDocumentoDisponibles, setDocumentosDisponibles] = useState([]);
  const { nDocumento } = useParams();
  const navigate = useNavigate();

  // Obtener datos del usuario y roles disponibles
  useEffect(() => {
    // Obtener datos del usuario
    Axios.get(`http://localhost:3001/profile/${nDocumento}`)
      .then((response) => {
        const user = response.data;
        setNombres(user.Nombres || '');
        setApellidos(user.Apellidos || '');
        setTipoDocumento(user.tipoDocumento || '');
        setRol(user.Rol || '');
        setCorreo(user.correoElectronico || '');
        setContrasena(user.Contraseña || '');
      })
      .catch((error) => {
        console.error('Hubo un error al cargar los datos del usuario:', error);
      });

      Axios.get('http://localhost:3001/tipos_documentos')
      .then((response) => {
        const tDocumento = response.data.map((tipoDocumento) => tipoDocumento.TipoDocumento);
        setDocumentosDisponibles(tDocumento);
      })
      .catch((error) => {
        console.error('Hubo un error al cargar el tipo de documento:', error);
      });

    // Obtener roles disponibles desde el backend
    Axios.get('http://localhost:3001/roles')
      .then((response) => {
        const roles = response.data.map((rol) => rol.Rol);
        setRolesDisponibles(roles);
      })
      .catch((error) => {
        console.error('Hubo un error al cargar los roles:', error);
      });
  }, [nDocumento]);


  // Manejar la actualización del usuario
  const handleSubmit = (e) => {
    e.preventDefault();

     // Validar que las contraseñas coincidan
     if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Validar la fortaleza de la contraseña
    if (!validarContrasena(contrasena)) {
      alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
      return;
    }


    // Llamada PUT para editar el usuario
    Axios.put(`http://localhost:3001/editar_usuario/${nDocumento}`, {
      nombres,
      apellidos,
      tipoDocumento,
      contrasena,
      rol,
      correo
    })
      .then((response) => {
        alert('Usuario actualizado exitosamente');
        navigate('/userlist');
      })
      .catch((error) => {
        console.error('Hubo un error al actualizar el usuario:', error);
      });
  };

  // Manejar la eliminación del usuario
  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/usuario/${nDocumento}`)
      .then(() => {
        alert('Usuario eliminado exitosamente');
        navigate('/userlist');
      })
      .catch((error) => {
        console.error('Hubo un error al eliminar el usuario:', error);
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
            <FontAwesomeIcon icon={faAddressBook} fontSize={20} className='icons' />
            <label>Tipo de Documento:</label>
            <select
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              required
            >
              <option value="">Seleccione su tipo de documento</option>
              {tipoDocumentoDisponibles.map((tipoDocumento, index) => (
            <option key={index} value={tipoDocumento}>
                {tipoDocumento}
            </option>
            ))}
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faAddressCard} fontSize={20} className='icons' />
            <label>N° de Documento:</label>
            <input
              type="number"
              value={nDocumento}
              disabled
            />
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
              {rolesDisponibles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
                <option value= "Administrador">Administrador</option>
                <option value= "PersonalDeCocina">Personal de cocina</option>
                <option value= "Docente">Docente</option>
            </select>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} fontSize={20} className='icons' />
            <label>Correo:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingrese su correo"
              required
            />
            <FontAwesomeIcon icon={faPenToSquare} fontSize={20} className="edit-icon" />
          </div>

          <div className="buttons-container">
            <button type="submit" className="save-button">Guardar Cambios</button>
            <button type="button" className="delete-button" onClick={handleDelete}>Eliminar Usuario</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UserEdit;
