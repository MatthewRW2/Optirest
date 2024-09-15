import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Iconos de FontAwesome

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook para la navegación

  // Obtener los usuarios desde la base de datos cuando el componente se monta
  useEffect(() => {
    Axios.get('http://localhost:3001/usuarios')
      .then((response) => {
        setUsers(response.data); // Guardar los usuarios en el estado
      })
      .catch((error) => {
        console.error('Hubo un error obteniendo los usuarios: ', error);
      });
  }, []);

  // Función para manejar la navegación
  const handleNavigation = () => {
    navigate('/UserEdit'); // Navega a la página UserEdit
  };

  return (
    <div className="main-list-container">
      <Navbar />
      <div className="user-list-container">
        <h2 className="title-form">Lista de Usuarios</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Rol</th>
              <th>N° de Documento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.IdUsuario}>
                <td className="user-info">
                  <img src={`path-to-images/${user.IdUsuario}.jpg`} alt="profile" className="profile-image" /> 
                  <span>{user.Nombres}</span>
                </td>
                <td>{user.Apellidos}</td>
                <td>{user.Rol}</td>
                <td>{user.numeroDocumento}</td>
                <td className="action-buttons">
                  <button className="action-btn edit-btn"
                    onClick={handleNavigation}> 
                    <FaEdit /></button>
                  <button className="action-btn delete-btn"><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default UserList;
