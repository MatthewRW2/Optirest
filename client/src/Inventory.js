import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const Inventory = () => {
  const [alimentos, setAlimentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTrigger, setSearchTrigger] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // Añadido el estado para abrir/cerrar el modal de categoría
  const [alimentoId, setAlimentoId] = useState(''); 
  const [alimento, setAlimento] = useState('');
  const [cantidadDisponible, setCantidadDisponible] = useState('');
  const [cantidadMinima, setCantidadMinima] = useState('');
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');

  useEffect(() => {
    // Fetch para obtener los alimentos
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
    setIsCategoryModalOpen(true); // Ahora abrirá el modal de categorías
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false); // Cerrará el modal de categorías
  };

  const fetchCategorias = () => {
    // Fetch para obtener las categorías
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

  const handleSubmit = async () => {
    const nuevoAlimento = {
      IdAlimento: alimentoId,
      nombreAlimento: alimento,
      cantidadDisponible,
      cantidadMinima,
      IdCategoria: categoria,
    };

    try {
      const response = await fetch('http://localhost:3001/insertar_alimento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoAlimento),
      });

      if (response.ok) {
        const data = await response.json();
        setAlimentos([...alimentos, data]);
        alert('Alimento agregado correctamente.');
        closeModal();
      } else {
        alert('Error al agregar el alimento.');
      }
    } catch (error) {
      console.error('Error al agregar alimento:', error);
      alert('Hubo un error al intentar agregar el alimento.');
    }
  };

  const handleCategorySubmit = async () => {
    const nuevaCategoria = {
      IdCategoria: categorias.length + 1, // Genera un nuevo ID
      nombreCategoria,
    };

    try {
      const response = await fetch('http://localhost:3001/insertar_categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCategoria),
      });

      if (response.ok) {
        const data = await response.json();
        setCategorias([...categorias, data]);
        alert('Categoría agregada correctamente.');
        closeCategoryModal();
      } else {
        alert('Error al agregar la categoría.');
      }
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
      alert('Hubo un error al intentar agregar la categoría.');
    }
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
                onClick={openCategoryModal} // Abre el modal de categorías
              >
                Crear Categoría
              </button>
              <button 
                className="action-button-custom action-button-inventory" 
                onClick={() => alert('Agregar al inventario')}
              >
                Agregar al Inventario
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

          <div className="menu-right-unique-custom">
            <div className="right-box-unique-custom">
              <h2 className="menu-heading-unique-custom">Resumen de inventario</h2>
              <div className="inventory-summary-custom">
                <p>Total de alimentos: {filteredAlimentos.length}</p>
                <p>Categorías únicas:</p>
                <p>Alimentos por categorías:</p>
              </div>
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
          <label>ID Alimento</label>
          <input
            type="number"
            placeholder="Ingrese el ID del alimento"
            value={alimentoId}
            onChange={(e) => setAlimentoId(e.target.value)}
          />
        </div>
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

    </div>
  );
};

export default Inventory;
