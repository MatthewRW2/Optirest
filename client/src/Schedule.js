import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../src/assets/css/Styles.css';

const Cronograma = () => {
  const [cronograma, setCronograma] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Número de elementos por página

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

  // Cálculo de las páginas
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cronograma.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cronograma.length / itemsPerPage); // Cálculo total de páginas

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

  return (
    <div className="cronograma-page-container">
      <Navbar />
      <div className="cronograma-container">
        <h1 className="cronograma-title">Cronograma de Menús</h1>
        
        {cronograma.length > 0 && (
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
              {currentItems.map((item, index) => (
                <tr key={index}>
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
        )}

        {/* Controles de navegación de páginas */}
        <div className="buttons-container-cro">
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

export default Cronograma;
