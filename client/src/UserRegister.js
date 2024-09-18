import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faUserGraduate, faClock } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Styles.css';

function UserRegister() {
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState('');
  const [curso, setCurso] = useState('');
  const [fecha, setFecha] = useState('');
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [nDocumento, setNDocumento] = useState(''); // Asigna aquí el valor correspondiente
  const [IdGrupo, setIdGrupo] = useState(''); // Asigna aquí el valor correspondiente

  // Obtener cursos disponibles
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cursos'); // Ajusta el endpoint según tu API
        if (response.ok) {
          const cursos = await response.json();
          setCursosDisponibles(cursos);
        } else {
          console.error('Error al obtener los cursos');
        }
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/asistencia/${nDocumento}/${IdGrupo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidadEstudiantes, curso, fecha }),
      });

      if (response.ok) {
        alert('Asistencia registrada exitosamente');
        // Redirigir o limpiar el formulario aquí
        setCantidadEstudiantes('');
        setCurso('');
        setFecha('');
      } else {
        const errorText = await response.text();
        alert(`Error al registrar la asistencia: ${errorText}`);
      }
    } catch (error) {
      console.error('Error al registrar la asistencia:', error);
      alert('Hubo un error al intentar registrar la asistencia.');
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FontAwesomeIcon icon={faUserGroup} fontSize={20} className='icons' />
            <label htmlFor="cant">Cantidad de estudiantes:</label>
            <input
              type="text"
              id="cant"
              value={cantidadEstudiantes}
              onChange={(e) => setCantidadEstudiantes(e.target.value)}
              placeholder="Ingrese la cantidad de estudiantes"
              required
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faUserGraduate} fontSize={20} className='icons' />
            <label htmlFor="course">Curso:</label>
            <select
              id="course"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              required
            >
              <option value="">Seleccione el curso</option>
              {cursosDisponibles.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faClock} fontSize={20} className='icons' />
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              id="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          <button className="form-button" type="submit">Registrar</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default UserRegister;
