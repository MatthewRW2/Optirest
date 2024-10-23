import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAddressCard, faAddressBook, faPeopleGroup, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Styles.css';

const Settings = () => {
  // Estados del componente
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [tipoDocumentoDisponibles, setDocumentosDisponibles] = useState([]);
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [contrasenaActual, setContrasenaActual] = useState(''); // Para la contraseña actual
  const [error, setError] = useState('');  // Manejo de errores
  const { nDocumento } = useParams();  // Número de documento de la URL
  const navigate = useNavigate();

  // Cargar datos del usuario y opciones disponibles al montar el componente
  useEffect(() => {
    console.log(`Cargando datos del usuario con documento: ${nDocumento}`);
    
    // Cargar información del perfil del usuario
    if (nDocumento) {
      Axios.get(`http://localhost:3001/perfilE/${nDocumento}`)
        .then((response) => {
          const user = response.data;
          setNombres(user.Nombres || '');
          setApellidos(user.Apellidos || '');
          setTipoDocumento(user.tipoDocumento || '');
          setRol(user.Rol || '');
          setCorreo(user.correoElectronico || '');
        })
        .catch((error) => {
          console.error('Hubo un error al cargar los datos del usuario:', error);
        });
    }

    // Cargar tipos de documentos
    Axios.get('http://localhost:3001/tipos_documentos')
      .then((response) => {
        setDocumentosDisponibles(response.data.map(doc => doc.tipoDocumento));
      })
      .catch((error) => {
        console.error('Hubo un error al cargar los tipos de documentos:', error);
      });

    // Cargar roles disponibles
    Axios.get('http://localhost:3001/roles')
      .then((response) => {
        setRolesDisponibles(response.data.map(rol => rol.Rol));
      })
      .catch((error) => {
        console.error('Hubo un error al cargar los roles:', error);
      });
  }, [nDocumento]);

  // Función para validar la nueva contraseña
  const validarContrasena = (contrasena) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(contrasena);
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar la contraseña actual
    if (contrasenaActual === '') {
      setError('La contraseña actual es requerida');
      return;
    }

    if (contrasenaActual === contrasena) {
      setError('La nueva contraseña no puede ser igual a la actual');
      return;
    }

    // Verificar la contraseña actual
    Axios.post(`http://localhost:3001/verificar_contrasena/${nDocumento}`, { contrasenaActual })
      .then((response) => {
        if (response.data.valid) {
          // Validar nuevas contraseñas
          if (contrasena !== confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
          }

          if (!validarContrasena(contrasena)) {
            setError('La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial');
            return;
          }

          // Actualizar perfil si todas las validaciones son correctas
          Axios.put(`http://localhost:3001/editar_perfil/${nDocumento}`, {
            nombres, apellidos, tipoDocumento, rol, correo, contrasena
          })
            .then(() => {
              alert('Perfil actualizado exitosamente');
              navigate('/profile');
              console.log(contrasena)
            })
            .catch((error) => {
              console.error('Hubo un error al actualizar el perfil:', error);
            });
        } else {
          setError('La contraseña actual es incorrecta');
        }
      })
      .catch((error) => {
        console.error('Hubo un error al verificar la contraseña:', error);
      });
  };

  // Renderizar el componente
  return (
    <div className='container-forms'>
      <Navbar />
      <div className="form-container">
        <img
          className="img-forms"
          src={require('./assets/img/logo2.png')}
          alt="Logo"
        />
        <h2 className='title-form'>Editar Perfil</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Campo de Nombres */}
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons' />
            <label>Nombres:</label>
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
            />
          </div>

          {/* Campo de Apellidos */}
          <div className="form-group">
            <FontAwesomeIcon icon={faUser} fontSize={20} className='icons' />
            <label>Apellidos:</label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
          </div>

          {/* Campo de Tipo de Documento */}
          <div className="form-group">
            <FontAwesomeIcon icon={faAddressBook} fontSize={20} className='icons' />
            <label>Tipo de Documento:</label>
            <select
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              required
            >
              <option value="">Seleccione su tipo de documento</option>
              {tipoDocumentoDisponibles.map((doc, index) => (
                <option key={index} value={doc}>
                  {doc}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de N° de Documento */}
          <div className="form-group">
            <FontAwesomeIcon icon={faAddressCard} fontSize={20} className='icons' />
            <label>N° de Documento:</label>
            <input
              type="text"
              value={nDocumento}
              disabled
            />
          </div>

          {/* Campo de Rol */}
          <div className="form-group">
            <FontAwesomeIcon icon={faPeopleGroup} fontSize={20} className='icons' />
            <label>Rol:</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              disabled  // Rol no modificable
            >
              <option value="">Seleccione su rol</option>
              {rolesDisponibles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
            </select>
          </div>

          {/* Campo de Correo */}
          <div className="form-group">
            <FontAwesomeIcon icon={faEnvelope} fontSize={20} className='icons' />
            <label>Correo:</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          {/* Campo de Contraseña Actual */}
          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label>Contraseña Actual:</label>
            <input
              type="password"
              value={contrasenaActual}
              onChange={(e) => setContrasenaActual(e.target.value)}
              required
            />
          </div>

          {/* Campo de Contraseña Nueva */}
          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label>Contraseña Nueva:</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          {/* Campo de Confirmar Contraseña Nueva */}
          <div className="form-group">
            <FontAwesomeIcon icon={faLock} fontSize={20} className='icons' />
            <label>Confirmar Contraseña Nueva:</label>
            <input
              type="password"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}  {/* Mostrar errores si los hay */}

          <button type="submit" className="save-button">Guardar Cambios</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;