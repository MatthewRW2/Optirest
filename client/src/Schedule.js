import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../src/assets/css/Styles.css';

const Cronograma = () => {
  const [cronograma, setCronograma] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Número de elementos por página
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

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

  // Formateador de fechas
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES').format(new Date(date));
  };

  // Filtra los datos del cronograma en función del término de búsqueda
  const filteredCronograma = cronograma.filter((item) => {
    const fechaFormateada = formatDate(item.Fecha); // Normaliza la fecha
    return (
      fechaFormateada.includes(searchTerm) || // Compara con el término de búsqueda
      item.Proteina.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Carbohidrato.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Lacteo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Fruta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Verdura.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Legumbre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Bebida.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Cálculo de las páginas
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCronograma.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCronograma.length / itemsPerPage);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reiniciar a la primera página al realizar una búsqueda
  };

  return (
    <div className="cronograma-page-container">
      <Navbar />
      <div className="cronograma-container">
        <h1 className="cronograma-title">Cronograma de Menús</h1>
        
        {/* Barra de búsqueda que busca por alimento o fecha */}
        <input
          type="text"
          placeholder="Buscar por fecha o alimentos..."
          className="search-input-custom"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {filteredCronograma.length > 0 ? (
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
                  <td>{formatDate(item.Fecha)}</td>
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
          <p>No se encontraron resultados para "{searchTerm}"</p>
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

