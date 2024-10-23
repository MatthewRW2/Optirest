import React, { useState, useEffect } from 'react'; // Asegúrate de importar useState y useEffect
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const Profile = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [rol, setRol] = useState('');
    const [correo, setCorreo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Obtener los datos del usuario
    useEffect(() => {
        const correoElectronico = localStorage.getItem('userEmail'); // Recupera el correo del localStorage

        if (!correoElectronico) {
            setError('El correo electrónico es requerido para acceder al perfil.');
            return;
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

    const handleNavigation = () => {
        navigate(`/UserEdit/${numeroDocumento}`); 
    };

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
                    <h1 className='profile-title'>Mi Perfil</h1>
                    {nombres && apellidos ? (
                        <div className="profile-info">
                            <label><strong>Nombres:</strong></label>
                            <input type="text" value={nombres} readOnly className="special-input" />
                            
                            <label><strong>Apellidos:</strong></label>
                            <input type="text" value={apellidos} readOnly className="special-input" />
                            
                            <label><strong>Tipo de Documento:</strong></label>
                            <input type="text" value={tipoDocumento} readOnly className="special-input" />
                            
                            <label><strong>Número de Documento:</strong></label>
                            <input type="text" value={numeroDocumento} readOnly className="special-input" />
                            
                            <label><strong>Rol:</strong></label>
                            <input type="text" value={rol} readOnly className="special-input" />

                            <label><strong>Correo Electronico:</strong></label>
                            <input type="text" value={correo} readOnly className="special-input" />
                        </div>
                    ) : (
                        <p>Cargando datos del usuario...</p>
                    )}
                  
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
