import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup, faUserGraduate, faClock } from '@fortawesome/free-solid-svg-icons';
import './assets/css/Styles.css';

const UserRegister = ()  => {
  const [cantidadAsistencia, setCantidadAsistencia] = useState('');
  const [cursos, setCursos] = useState([]);  // Cambié 'curso' por 'cursos' para manejar el listado de cursos
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');  // Estado separado para el curso seleccionado
  const [fecha, setFecha] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/curso') // Cambia aquí para que coincida con tu ruta
      .then(response => {
        setCursos(response.data);  // Actualiza 'cursos' con la respuesta
      })
      .catch(err => {
        console.error('Error al obtener los cursos:', err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!fecha || !cantidadAsistencia|| !cursoSeleccionado) {
      setError('Por favor completa todos los campos');
      return;
    }

    // Enviar los datos a la API
    Axios.post('http://localhost:3001/asistencia', {
      cantidadAsistencia,
      curso: cursoSeleccionado,  // Usamos el curso seleccionado
      fecha,
    })
      .then(() => {
        alert('Asistencia registrada exitosamente');
        setError(''); // Limpiar el mensaje de error
        // Reiniciar los campos
        setFecha('');
        setCantidadAsistencia('');
        setCursoSeleccionado('');  // Limpiar el curso seleccionado
      })
      .catch(() => {
        setError('Hubo un error al registrar la asistencia');
      });
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
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <FontAwesomeIcon icon={faUserGroup} fontSize={20} className='icons' />
            <label htmlFor="cant">Cantidad de estudiantes:</label>
            <input
              type="text"
              id="cant"
              value={cantidadAsistencia}
              onChange={(e) => setCantidadAsistencia(e.target.value)}
              placeholder="Ingrese la cantidad de estudiantes"
              required
            />
          </div>
          <div className="form-group">
            <FontAwesomeIcon icon={faUserGraduate} fontSize={20} className='icons' />
            <label htmlFor="course">Curso:</label>
            <select
              id="course"
              value={cursoSeleccionado}  // Aquí usamos 'cursoSeleccionado'
              onChange={(e) => setCursoSeleccionado(e.target.value)}  // Actualizamos 'cursoSeleccionado'
              required
            >
              <option value="">Seleccione el curso</option>
              {cursos.map((curso) => (
                <option key={curso.IdGrupo} value={curso.IdGrupo}>
                  {curso.IdGrupo}
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
