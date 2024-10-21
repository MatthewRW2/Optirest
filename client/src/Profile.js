import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Axios from 'axios';
import './assets/css/Styles.css';

const Profile = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [rol, setRol] = useState('');
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const correoElectronico = localStorage.getItem('userEmail'); // Recupera el correo del localStorage

        if (!correoElectronico) {
            setError('El correo electrónico es requerido para acceder al perfil.');
            return; // Detiene la ejecución si el correo no está disponible
        }

        Axios.get(`http://localhost:3001/perfil`, { params: { correoElectronico } })
            .then((response) => {
                if (response.data.length > 0) {
                    const user = response.data[0]; // Almacena los datos del usuario
                    setNombres(user.Nombres || '');
                    setApellidos(user.Apellidos || '');
                    setTipoDocumento(user.tipoDocumento || '');
                    setNumeroDocumento(user.nDocumento || '');
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
            <div className="form-container">
                <h2>Perfil del Usuario</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {nombres && apellidos ? (
                    <div>
                            <p><strong>Nombre:</strong> {nombres}</p>
                            <p><strong>Apellidos:</strong> {apellidos}</p>
                            <p><strong>Tipo de Documento:</strong> {tipoDocumento}</p>
                            <p><strong>Número de Documento:</strong> {numeroDocumento}</p>
                            <p><strong>Correo Electrónico:</strong> {correo}</p>
                            <p><strong>Rol:</strong> {rol}</p>
                        {/* Agrega otros campos que desees mostrar */}
                    </div>
                ) : (
                    <p>Cargando datos del usuario...</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
