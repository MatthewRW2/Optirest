import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Iconos de FontAwesome

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la búsqueda
    const usersPerPage = 5; // Número de usuarios por página
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
    const handleNavigation = (nDocumento) => {
        navigate(`/UserEdit/${nDocumento}`); // Navega a la página UserEdit con el nDocumento como parámetro
    };

    // Función para manejar la eliminación
    const handleDelete = (nDocumento) => {
        Axios.delete(`http://localhost:3001/usuarios/${nDocumento}`)
            .then(() => {
                setUsers(users.filter(user => user.nDocumento !== nDocumento)); // Elimina el usuario de la lista
            })
            .catch((error) => {
                console.error('Hubo un error eliminando el usuario: ', error);
            });
    };

    // Cálculo de los usuarios que se mostrarán en la página actual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    
    // Filtrar usuarios según el término de búsqueda
    const filteredUsers = users.filter(user => 
        user.Nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nDocumento.toString().includes(searchTerm) // Filtrado por nDocumento
    );

    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Funciones para cambiar de página
    const nextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Resetea la página a 1 al buscar
    };

    return (
        <div className="main-list-container">
            <Navbar />
            <div className="user-list-container">
                <h2 className="title-form">Lista de Usuarios</h2>
                <input
                    type="text"
                    placeholder="Buscar usuarios por nombre, apellido o N° de Documento..."
                    className="search-input-custom"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-button-custom" onClick={() => { /* puedes agregar funcionalidad aquí si es necesario */ }}>
                    <i className="fas fa-search"></i> 
                </button>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Rol</th>
                            <th>N° de Documento</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user) => (
                            <tr key={user.nDocumento}>
                                <td>{user.Nombres}</td>
                                <td>{user.Apellidos}</td>
                                <td>{user.Rol}</td>
                                <td>{user.nDocumento}</td>
                                <td>{user.correoElectronico}</td>
                                <td className="action-buttons">
                                    <button className="action-btn edit-btn" onClick={() => handleNavigation(user.nDocumento)}>
                                        <FaEdit />
                                    </button>
                                    <button className="action-btn delete-btn" onClick={() => handleDelete(user.nDocumento)}>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Botones de paginación */}
                <div className="buttons-container">
                    <button className="save-button" onClick={prevPage} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <button className="save-button" onClick={nextPage} disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}>
                        Siguiente
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserList;
