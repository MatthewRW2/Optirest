import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Para obtener el ID de usuario y navegar
import Footer from './components/footer';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faAddressBook, faLock, faPeopleGroup, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Styles.css';

const UserEdit = () => {
  const [nombres, setNombres] = useState(''); // Siempre inicializado con una cadena vacía
  const [apellidos, setApellidos] = useState(''); // Siempre inicializado con una cadena vacía
  const [tipoDocumento, setTipoDocumento] = useState(''); // Siempre inicializado con una cadena vacía
  const [numeroDocumento, setNumeroDocumento] = useState(''); // Siempre inicializado con una cadena vacía
  const [contrasena, setContrasena] = useState(''); // Siempre inicializado con una cadena vacía
  const [confirmarContrasena, setConfirmarContrasena] = useState(''); // Siempre inicializado con una cadena vacía
  const [rol, setRol] = useState(''); // Siempre inicializado con una cadena vacía
  const [rolesDisponibles, setRolesDisponibles] = useState([]); // Estado para los roles
  const { nDocumento } = useParams(); 
  const navigate = useNavigate(); 

  // Obtener datos del usuario y roles disponibles
  useEffect(() => {
    // Obtener datos del usuario
    Axios.get(`http://localhost:3001/usuarios/${nDocumento}`)
      .then((response) => {
        const user = response.data;
        setNombres(user.Nombres || ''); // Asegura que sea siempre una cadena no vacía
        setApellidos(user.Apellidos || '');
        setTipoDocumento(user.tipoDocumento || '');
        setNumeroDocumento(user.numeroDocumento || '');
        setRol(user.Rol || '');
      })
      .catch((error) => {
        console.error('Hubo un error al cargar los datos del usuario:', error);
      });

    // Obtener roles disponibles desde el backend
    Axios.get('http://localhost:3001/roles')
      .then((response) => {
        const roles = response.data.map((rol) => rol.Rol); // Asumiendo que los roles están en la columna 'Rol'
        setRolesDisponibles(roles);
      })
      .catch((error) => {
        console.error('Hubo un error al cargar los roles:', error);
      });
  }, [nDocumento]);

  // Manejar la actualización del usuario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Llamada PUT para editar el usuario
    Axios.put(`http://localhost:3001/editar_usuario/${nDocumento}`, {
      nombres,
      apellidos,
      tipoDocumento,
      numeroDocumento,
      contrasena,
      rol
    })
      .then((response) => {
        alert('Usuario actualizado exitosamente');
        navigate('/userlist'); // Redirigir a la lista de usuarios después de la edición
      })
      .catch((error) => {
        console.error('Hubo un error al actualizar el usuario:', error);
      });
  };

  // Manejar la eliminación del usuario
  const handleDelete = () => {
    Axios.delete(`http://localhost:3001/usuarios/${nDocumento}`)
      .then(() => {
        alert('Usuario eliminado exitosamente');
        navigate('/userlist'); // Redirigir a la lista de usuarios después de eliminar
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
              value={nombres || ''} // Evitar que sea undefined
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
              value={apellidos || ''} // Evitar que sea undefined
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
              value={tipoDocumento || ''} // Evitar que sea undefined
              onChange={(e) => setTipoDocumento(e.target.value)}
              required
            >
              <option value="">Seleccione su tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faAddressCard} fontSize={20} className='icons' />
            <label>N° de Documento:</label>
            <input
              type="text"
              value={numeroDocumento || ''} // Evitar que sea undefined
              onChange={(e) => setNumeroDocumento(e.target.value)}
              placeholder="Ingrese su número de documento"
              required
              disabled // Deshabilitar este campo ya que no debería ser editable
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faPeopleGroup} fontSize={20} className='icons' />
            <label>Rol:</label>
            <select
              value={rol || ''} // Evitar que sea undefined
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="">Seleccione su rol</option>
              {rolesDisponibles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label>Contraseña:</label>
            <input
              type="password"
              value={contrasena || ''} // Evitar que sea undefined
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
              value={confirmarContrasena || ''} // Evitar que sea undefined
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              placeholder="Confirme su contraseña"
              required
            />
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
