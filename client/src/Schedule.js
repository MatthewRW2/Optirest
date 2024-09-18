import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../src/assets/css/Styles.css';

const Cronograma = () => {
  const [cronograma, setCronograma] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/cronograma')
      .then((response) => response.json())
      .then((data) => setCronograma(data))
      .catch((error) => console.error("Error al obtener el cronograma:", error));
  }, []);

  return (
    <div className="cronograma-page-container">
      <Navbar />
      <div className="cronograma-content-wrap">
        <div className="cronograma-cronograma-container">
          <h1>Cronograma de la Semana</h1>
          {cronograma.length > 0 ? (
            <table className="cronograma-cronograma-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha de Fin</th>
                  <th>Observación</th>
                </tr>
              </thead>
              <tbody>
                {cronograma.map((item) => (
                  <tr key={item.IdCronograma}>
                    <td>{item.IdCronograma}</td>
                    <td>{item.fechaInicio}</td>
                    <td>{item.fechaFin}</td>
                    <td>{item.Observación}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay cronogramas disponibles</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cronograma;
