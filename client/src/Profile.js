import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Axios from 'axios';
import './assets/css/Styles.css';

const Profile = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [nDocumento, setnDocumento] = useState('');
  const [rol, setRol] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/settings/${nDocumento}`);  // Lleva al perfil de edición usando el número de documento
  };

  useEffect(() => {
    const correoElectronico = localStorage.getItem('userEmail');

    if (!correoElectronico) {
      setError('El correo electrónico es requerido para acceder al perfil.');
      return;
    }

    Axios.get(`http://localhost:3001/perfil`, { params: { correoElectronico } })
      .then((response) => {
        if (response.data.length > 0) {
          const user = response.data[0];
          setNombres(user.Nombres || '');
          setApellidos(user.Apellidos || '');
          setTipoDocumento(user.tipoDocumento || '');
          setnDocumento(user.nDocumento || '');
          setRol(user.Rol || '');
          setCorreo(user.correoElectronico || '');
        } else {
          setError('No se encontraron datos para este usuario.');
        }
      })
      .catch((error) => {
        console.error('Hubo un error al cargar los datos del usuario:', error);
        setError('Error al obtener la información del perfil.');
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="form-container-profile">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="profile-content">
          <div className="profile-logo">
            <img
              className="img-forms"
              src={require('./assets/img/logo2.png')}
              alt="Logo"
            />
          </div>
          <h1 className='profile-title'>Perfil del usuario</h1>
          {nombres && apellidos ? (
            <div className="profile-info">
              <p className='profile-items'><strong>Nombres:</strong> {nombres}</p>
              <p className='profile-items'><strong>Apellidos:</strong> {apellidos}</p>
              <p className='profile-items'><strong>Tipo de Documento:</strong> {tipoDocumento}</p>
              <p className='profile-items'><strong>Número de Documento:</strong> {nDocumento}</p>
              <p className='profile-items'><strong>Correo Electrónico:</strong> {correo}</p>
              <p className='profile-items'><strong>Rol:</strong> {rol}</p>
            </div>
          ) : (
            <p>Cargando datos del usuario...</p>
          )}
          <div className="profile-edit">
            <button className="edit-profile-btn" onClick={handleNavigation}>
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;