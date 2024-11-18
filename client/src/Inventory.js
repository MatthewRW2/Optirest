import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const Inventory = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IdAlimento, setIdAlimento] = useState('');
  const [alimento, setAlimento] = useState('');
  const [cantidadDisponible, setCantidadDisponible] = useState('');
  const [cantidadMinima, setCantidadMinima] = useState('');
  const [fecha, setFecha] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);  // Página actual
  const [itemsPerPage, setItemsPerPage] = useState(8); // Elementos por página

  useEffect(() => {
    fetch('http://localhost:3001/alimento')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener alimentos');
        }
        return response.json();
      })
      .then((data) => setAlimentos(data))
      .catch((error) => console.error('Error al obtener alimentos:', error));
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    fetchCategorias();
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const openEditModal = (alimento) => {
    setIdAlimento(alimento.IdAlimento);
    setAlimento(alimento.nombreAlimento);
    setCantidadDisponible(alimento.cantidadDisponible);
    setCantidadMinima(alimento.cantidadMinima);
    setCategoria(alimento.IdCategoria);
    setFecha(alimento.fecha);
    setIsEditModalOpen(true);
    fetchCategorias();
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditSubmit = async () => {
    const updatedAlimento = {
      IdCategoria: categoria,
      nombreAlimento: alimento,
      cantidadDisponible,
      cantidadMinima,
      fecha,
    };

    try {
      const response = await fetch(`http://localhost:3001/alimento/${IdAlimento}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAlimento),
      });

      if (response.ok) {
        const updatedAlimentos = await fetch('http://localhost:3001/alimento')
          .then((res) => res.json());
        setAlimentos(updatedAlimentos);
        alert('Alimento actualizado correctamente.');
        closeEditModal();
      } else {
        const errorText = await response.text();
        alert(`Error al actualizar el alimento: ${errorText}`);
      }
    } catch (error) {
      console.error('Error al actualizar el alimento:', error);
      alert('Hubo un error al intentar actualizar el alimento.');
    }
  };

  const fetchCategorias = () => {
    fetch('http://localhost:3001/categorias')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }
        return response.json();
      })
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTrigger(searchTerm);
  };

  const filteredAlimentos = alimentos.filter((alimento) =>
    alimento.nombreAlimento.toLowerCase().includes(searchTrigger.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlimentos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAlimentos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar className="navbar-custom" />
      <div className="main-content">
        <div className="inventory-container-custom">
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
                className="action-button-custom action-button-insert"
                onClick={openModal}
              >
                Insertar Alimentos
              </button>
              <button
                className="action-button-custom action-button-category"
                onClick={openCategoryModal}
              >
                Crear Categoría
              </button>
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
                    <th>FECHA</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((alimento) => (
                      <tr key={alimento.IdAlimento}>
                        <td>{alimento.nombreAlimento}</td>
                        <td>{alimento.IdCategoria}</td>
                        <td>{alimento.cantidadDisponible}</td>
                        <td>{alimento.cantidadMinima}</td>
                        <td>{alimento.fecha}</td>
                        <td>
                          <div className="action-buttons">
                            <button className="edit-btn-custom" onClick={() => openEditModal(alimento)}>Editar</button>
                            <button
                              className="delete-btn-custom"
                              onClick={() => handleDelete(alimento.IdAlimento)}
                            >
                              Eliminar
                            </button>
                          </div>
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

            {/* Paginación */}
            <div className="buttons-container-cro">
             <button
             className="save-button-list"
              onClick={() => handlePageChange(currentPage - 1)}
             disabled={currentPage === 1}
              >
              Anterior
              </button>
             <span className="page-counter">
               Página {currentPage} de {totalPages}
              </span>
            <button
               className="delete-button-list"
              onClick={() => handlePageChange(currentPage + 1)}
             disabled={currentPage === totalPages}
            >
            Siguiente
           </button>
          </div>
          </div>
        </div>
      </div>
      <Footer className="footer-custom" />

  {/* Modal para Alimentos */}
  {isModalOpen && (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Insertar Alimentos</h2>
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
            <label>Cantidad Disponible</label>
            <input
              type="number"
              placeholder="Ingrese cantidad disponible"
              value={cantidadDisponible}
              onChange={(e) => setCantidadDisponible(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Cantidad Mínima</label>
            <input
              type="number"
              placeholder="Ingrese cantidad mínima"
              value={cantidadMinima}
              onChange={(e) => setCantidadMinima(e.target.value)}
            />
          </div>
          <div className="form-group">
                <label>Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)} // Input para la fecha
                />
              </div>
          <div className="form-group">
            <label>Categoría</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.IdCategoria} value={cat.IdCategoria}>
                  {cat.nombreCategoria}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-buttons">
            <button className="submit-button" onClick={handleSubmit}>Agregar</button>
            <button className="cancel-button" onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Modal para Categorías */}
  {isCategoryModalOpen && (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Crear Categoría</h2>
        <div className="modal-form">
          <div className="form-group">
            <label>Nombre Categoría</label>
            <input
              type="text"
              placeholder="Ingrese nombre de la categoría"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
            />
          </div>
          <div className="modal-buttons">
            <button className="submit-button" onClick={handleCategorySubmit}>Agregar Categoría</button>
            <button className="cancel-button" onClick={closeCategoryModal}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )}
        {isEditModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Editar Alimento</h2>
              <form className="modal-form">
                <div className="form-group">
                  <label>Nombre del Alimento:</label>
                  <input 
                    type="text" 
                    value={alimento} 
                    onChange={(e) => setAlimento(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Cantidad Disponible:</label>
                  <input 
                    type="number" 
                    value={cantidadDisponible} 
                    onChange={(e) => setCantidadDisponible(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Cantidad Mínima:</label>
                  <input 
                    type="number" 
                    value={cantidadMinima} 
                    onChange={(e) => setCantidadMinima(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Categoría:</label>
                  <select 
                    value={categoria} 
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    <option value="">Seleccionar Categoría</option>
                    {categorias.map((cat) => (
                      <option key={cat.IdCategoria} value={cat.IdCategoria}>
                        {cat.nombreCategoria}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
              <div className="modal-buttons">
                <button 
                  className="submit-button" 
                  onClick={handleEditSubmit}
                >
                  Guardar Cambios
                </button>
                <button 
                  className="cancel-button" 
                  onClick={closeEditModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Inventory;