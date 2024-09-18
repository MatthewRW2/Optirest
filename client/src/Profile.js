import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const Profile = () => {

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h1>Perfil del Usuario</h1>
          <div>
            <p><strong>Nombre:</strong></p>
            <p><strong>Correo Electrónico:</strong></p>
            <p><strong>Rol:</strong></p>
            <p><strong>Tipo de Documento:</strong></p>
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;