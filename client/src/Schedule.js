import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../src/assets/css/Styles.css';

const Cronograma = () => {
  const [cronograma, setCronograma] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/cronograma')
      .then((response) => response.json())
      .then((data) => {
        // Ordena cronológicamente por la fecha
        const sortedData = data.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha));
        setCronograma(sortedData);
      })
      .catch((error) => console.error("Error al obtener el cronograma:", error));
  }, []);

  return (
    <div className="cronograma-page-container">
      <Navbar />

      <div className="cronograma-content">
        <h1 className="cronograma-title">Cronograma de Menús</h1>
        {cronograma.length > 0 ? (
          <table className="cronograma-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Proteína</th>
                <th>Carbohidrato</th>
                <th>Lácteo</th>
                <th>Fruta</th>
                <th>Verdura</th>
                <th>Legumbre</th>
                <th>Bebida</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {cronograma.map((item, index) => (
                <tr key={index} className="cronograma-row">
                  <td>{new Date(item.Fecha).toLocaleDateString()}</td>
                  <td>{item.Proteina}</td>
                  <td>{item.Carbohidrato}</td>
                  <td>{item.Lacteo}</td>
                  <td>{item.Fruta}</td>
                  <td>{item.Verdura}</td>
                  <td>{item.Legumbre}</td>
                  <td>{item.Bebida}</td>
                  <td>{item.DescripcionMenu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="cronograma-no-data">No hay datos disponibles en el cronograma.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cronograma;
