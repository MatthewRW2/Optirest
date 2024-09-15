import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const Inventory = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [alimento, setAlimento] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/alimentos')
      .then((response) => response.json())
      .then((data) => setAlimentos(data))
      .catch((error) => console.error('Error al obtener alimentos:', error));
  }, []);

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para ejecutar la búsqueda cuando se haga clic en el botón
  const handleSearchSubmit = () => {
    setSearchTrigger(searchTerm); // Se actualiza el trigger de búsqueda
  };

  // Función para abrir el modal de "Entrada de Alimentos"
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar el envío del formulario del modal
  const handleSubmit = () => {
    // Aquí puedes manejar el envío de los datos, por ejemplo, hacer una petición POST
    alert(`Alimento: ${alimento}, Cantidad: ${cantidad}, Categoría: ${categoria}, Fecha de entrada: ${fechaEntrada}`);
    closeModal(); // Cierra el modal después de enviar el formulario
  };

  // Filtrar los alimentos basado en el término de búsqueda
  const filteredAlimentos = alimentos.filter((alimento) =>
    alimento.nombreAlimento.toLowerCase().includes(searchTrigger.toLowerCase())
  );

  return (
    <div>
      <Navbar className="navbar-custom" />
      <div className="main-content">
        <div className="inventory-container-custom">
          {/* Contenedor Izquierdo */}
          <div className="menu-left-unique-custom">
            <div className="inventory-search-custom">
              <input
                type="text"
                placeholder="Buscar alimentos..."
                className="search-input-custom"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="search-button-custom" onClick={handleSearchSubmit}>
                <i className="fas fa-search"></i> 
              </button>
              <button 
                className="action-button-custom action-button-danger-custom" 
                onClick={openModal}
              >
                Entrada de Alimentos
              </button>
            </div>

            {/* Botones de categorías */}
            <div className="category-buttons-container">
              <button className="category-button">Proteína</button>
              <button className="category-button">Carbohidratos</button>
              <button className="category-button">Legumbres</button>
              <button className="category-button">Verduras</button>
              <button className="category-button">Cereales</button>
              <button className="category-button">Lácteos</button>
              <button className="category-button">Bebidas</button>
            </div>

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
                    filteredAlimentos.map((alimento) => (
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

          {/* Contenedor Derecho */}
          <div className="menu-right-unique-custom">
            <div className="right-box-unique-custom">
              <h2 className="menu-heading-unique-custom">Resumen de inventario</h2>
              <div className="inventory-summary-custom">
                <p>Total de alimentos: {filteredAlimentos.length}</p>
                <p>Categorías únicas:</p>
                <p>Alimentos por categorías:</p>
                <ul>
                </ul>
                <p>Nivel Crítico:</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer className="footer-custom" />

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Entrada de Alimentos</h2>
            <div className="modal-form">
              <div className="form-group">
                <label>Alimento</label>
                <input
                  type="text"
                  placeholder="Ingrese nombre de alimento"
                  value={alimento}
                  onChange={(e) => setAlimento(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Cantidad</label>
                <input
                  type="number"
                  placeholder="Ingrese la cantidad del alimento"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">Escoja la categoría del alimento</option>
                  <option value="Proteína">Proteína</option>
                  <option value="Carbohidratos">Carbohidratos</option>
                  <option value="Lácteos">Lácteos</option>
                  <option value="Verduras">Verduras</option>
                </select>
              </div>
              <div className="form-group">
                <label>Fecha de entrada</label>
                <input
                  type="date"
                  value={fechaEntrada}
                  onChange={(e) => setFechaEntrada(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button onClick={closeModal} className="cancel-button">Cancelar</button>
              <button onClick={handleSubmit} className="submit-button">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
