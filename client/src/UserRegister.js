import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faUserGraduate, faClock } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/UserRegister.css';

function UserRegister() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="login-container">
        <img src={require('./assets/img/logo2.png')} alt="Logo" />
        <h2>Registrar asistencia de estudiantes</h2>
        <form>
          <div className="form-group">
            <FontAwesomeIcon icon={faUserGroup} className="icon" /> {/* Icono para cantidad de estudiantes */}
            <label htmlFor="cant">Cantidad de estudiantes:</label>
            <input type="text" id="cant" placeholder="Ingrese la cantidad de estudiantes" required />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faUserGraduate} className="icon" /> {/* Icono para curso */}
            <label htmlFor="course">Curso:</label>
            <select id="course" required>
              <option value="">Seleccione el curso</option>
              {/* Agrega más opciones aquí */}
            </select>
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faClock} className="icon" /> {/* Icono para fecha */}
            <label htmlFor="date">Fecha:</label>
            <input type="date" id="date" required />
          </div>
          <button className="button" type="submit">Registrar</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserRegister;
