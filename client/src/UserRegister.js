import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserGroup , faUserGraduate, faClock} from '@fortawesome/free-solid-svg-icons';
import './assets/css/Forms.css';

function UserRegister() {
  return (
    <div className="container-forms">
      <Navbar />
      <div className="form-container">
      <img 
          className="img-forms" 
          src={require('./assets/img/logo2.png')} 
          alt="Logo"
        />
         <h2 className='title-form'>Registrar asistencia de estudiantes</h2>
        <form>
          <div className="form-group">
          <FontAwesomeIcon icon={faUserGroup} fontSize={20} className='icons'></FontAwesomeIcon>
            <label htmlFor="cant">Cantidad de estudiantes:</label>
            <input type="text" id="cant" placeholder="Ingrese la cantidad de estudiantes" required />
          </div>
          <div className="form-group">
          <FontAwesomeIcon icon={faUserGraduate} fontSize={20} className='icons'></FontAwesomeIcon>
            <label htmlFor="course">Curso:</label>
            <select id="course" required>
              <option value="">Seleccione el curso</option>
              {/* Agrega más opciones aquí */}
            </select>
          </div>
          <div className="form-group">
          <FontAwesomeIcon icon={faClock} fontSize={20} className='icons'></FontAwesomeIcon>
            <label htmlFor="date">Fecha:</label>
            <input type="date" id="date" required />
          </div>
          <button className="form-button" type="submit">Registrar</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserRegister;
