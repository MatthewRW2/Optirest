import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const Inventory = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch alimentos from the API
  useEffect(() => {
    fetch('http://localhost:3001/alimentos')
      .then(response => response.json())
      .then(data => setAlimentos(data))
      .catch(error => console.error('Error al obtener alimentos:', error));
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter alimentos based on search term
  const filteredAlimentos = alimentos.filter(alimento =>
    alimento.nombreAlimento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar className="navbar-custom" />
      <div className="main-content">
        <div className="inventory-search-custom">
          <input
            type="text"
            placeholder="Buscar alimentos..."
            className="search-input-custom"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button-custom">Buscar</button>
          <button className="action-button-custom action-button-danger-custom">Entrada de Alimentos</button>
          <button className="action-button-custom">Actualizar Alimento</button>
        </div>
        <div className="inventory-container-custom">
          <div className="menu-left-unique-custom">
            <div className="menu-left-container-unique-custom">
              <h2 className="menu-heading-unique-custom">Inventario de alimentos</h2>
              <table className="menu-table-unique-custom">
                <thead>
                  <tr>
                    <th>ALIMENTO</th>
                    <th>CATEGORÍA</th>
                    <th>CANTIDAD EXISTENTE</th>
                    <th>CANTIDAD MÍNIMA</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlimentos.length > 0 ? (
                    filteredAlimentos.map(alimento => (
                      <tr key={alimento.IdAlimento}>
                        <td>{alimento.nombreAlimento}</td>
                        <td>{alimento.IdCategoria}</td>
                        <td>{alimento.cantidadDisponible}</td>
                        <td>{alimento.cantidadMinima}</td>
                        <td>
                          <button className="edit-btn-custom">Editar</button>
                          <button className="delete-btn-custom">Eliminar</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No hay alimentos disponibles</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="menu-right-unique-custom">
            <div className="right-box-unique-custom">
              <h2 className="menu-heading-unique-custom">Resumen de inventario</h2>
              <div className="inventory-summary-custom">
                <p>Total de alimentos: {filteredAlimentos.length}</p>
                <p>Categorías únicas: {/* Lógica para contar las categorías únicas */}</p>
                <p>Alimentos por categorías:</p>
                <ul>
                  {/* Lógica para contar los alimentos por categoría */}
                </ul>
                <p>Nivel Crítico:</p>
                {/* Lógica para mostrar alimentos en nivel crítico */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="footer-custom" />
    </div>
  );
};

export default Inventory;
