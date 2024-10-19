import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const usersPerPage = 4; 
    const navigate = useNavigate(); 

    useEffect(() => {
        Axios.get('http://localhost:3001/usuarios')
            .then((response) => {
                setUsers(response.data); 
            })
            .catch((error) => {
                console.error('Hubo un error obteniendo los usuarios: ', error);
            });
    }, []);

    const handleNavigation = (nDocumento) => {
        navigate(`/UserEdit/${nDocumento}`); 
    };

    const handleDelete = (nDocumento) => {
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    
        if (confirmed) {
            Axios.delete(`http://localhost:3001/usuario/${nDocumento}`)
                .then(() => {
                    alert('Usuario eliminado exitosamente');
                    setUsers((prevUsers) => prevUsers.filter(user => user.nDocumento !== nDocumento));
                })
                .catch((error) => {
                    console.error('Hubo un error al eliminar el usuario:', error);
                });
        }
    };
    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const filteredUsers = users.filter(user => 
        (user.Nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nDocumento.toString().includes(searchTerm)) &&
        user.activo === 1
    );

    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Cálculo total de páginas

    const nextPage = () => {
        if (currentPage < totalPages) {
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
        setCurrentPage(1); // Reiniciar a la primera página al buscar
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

                <div className="buttons-container-list">
                    <button className="save-button-list" onClick={prevPage} disabled={currentPage === 1}>
                        Anterior
                    </button>
                    <span className="page-counter">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button className="delete-button-list" onClick={nextPage} disabled={currentPage === totalPages}>
                        Siguiente
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserList;
