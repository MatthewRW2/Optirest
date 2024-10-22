import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const MenuManagement = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState({
    protein: '',
    carbohydrate: '',
    dairy: '',
    fruit: '',
    vegetable: '',
    legume: '',
    drink: ''
  });

  // Obtener las categorías del backend
  useEffect(() => {
    fetch('http://localhost:3001/categorias')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener categorías');
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  }, []);

  // Obtener todos los alimentos del backend
  useEffect(() => {
    fetch('http://localhost:3001/alimento')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener alimentos');
        }
        return response.json();
      })
      .then((data) => setFoods(data))
      .catch((error) => console.error('Error al obtener alimentos:', error));
  }, []);

  // Filtrar alimentos por categoría
  const filterFoodsByCategory = (categoryId) => {
    return foods.filter((food) => food.IdCategoria === categoryId);
  };

  // Manejar la selección de alimentos
  const handleFoodSelection = (category, value) => {
    setSelectedFoods({ ...selectedFoods, [category]: value });
  };

  const goToSchedule = () => {
    navigate('/schedule');
  };

  const goToInventory = () => {
    navigate('/inventory');
  };

  return (
    <div className="menu-management-container">
      <Navbar />
      <div className="menu-management-form-container">
        <h1 className="menu-management-title">Ingresar Menú</h1>
        <form className="menu-management-form">

          {/* Dropdown de Proteínas */}
          <div className="menu-management-group">
            <select
              className="menu-management-input"
              value={selectedFoods.protein}
              onChange={(e) => handleFoodSelection('protein', e.target.value)}
            >
              <option value="">Seleccione una Proteína</option>
              {filterFoodsByCategory(1).map((food) => ( // Suponiendo que la categoría 1 es Proteínas
                <option key={food.IdAlimento} value={food.nombreAlimento}>
                  {food.nombreAlimento}
                </option>
              ))}
            </select>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Dropdown de Carbohidratos */}
          <div className="menu-management-group">
            <select
              className="menu-management-input"
              value={selectedFoods.carbohydrate}
              onChange={(e) => handleFoodSelection('carbohydrate', e.target.value)}
            >
              <option value="">Seleccione un Carbohidrato</option>
              {filterFoodsByCategory(2).map((food) => ( // Suponiendo que la categoría 2 es Carbohidratos
                <option key={food.IdAlimento} value={food.nombreAlimento}>
                  {food.nombreAlimento}
                </option>
              ))}
            </select>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Similar para el resto de categorías */}
          {/* Dropdown de Lácteos */}
          <div className="menu-management-group">
            <select
              className="menu-management-input"
              value={selectedFoods.dairy}
              onChange={(e) => handleFoodSelection('dairy', e.target.value)}
            >
              <option value="">Seleccione un Lácteo</option>
              {filterFoodsByCategory(3).map((food) => ( // Suponiendo que la categoría 3 es Lácteos
                <option key={food.IdAlimento} value={food.nombreAlimento}>
                  {food.nombreAlimento}
                </option>
              ))}
            </select>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Dropdown de Frutas */}
          <div className="menu-management-group">
            <select
              className="menu-management-input"
              value={selectedFoods.fruit}
              onChange={(e) => handleFoodSelection('fruit', e.target.value)}
            >
              <option value="">Seleccione una Fruta</option>
              {filterFoodsByCategory(4).map((food) => ( // Suponiendo que la categoría 4 es Frutas
                <option key={food.IdAlimento} value={food.nombreAlimento}>
                  {food.nombreAlimento}
                </option>
              ))}
            </select>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Dropdown de Verduras */}
          <div className="menu-management-group">
            <select
              className="menu-management-input"
              value={selectedFoods.vegetable}
              onChange={(e) => handleFoodSelection('vegetable', e.target.value)}
            >
              <option value="">Seleccione una Verdura</option>
              {filterFoodsByCategory(5).map((food) => ( // Suponiendo que la categoría 5 es Verduras
                <option key={food.IdAlimento} value={food.nombreAlimento}>
                  {food.nombreAlimento}
                </option>
              ))}
            </select>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Dropdown de Legumbres */}
          <div className="menu-management-group">
            <select
              className="menu-management-input"
              value={selectedFoods.legume}
              onChange={(e) => handleFoodSelection('legume', e.target.value)}
            >
              <option value="">Seleccione una Legumbre</option>
              {filterFoodsByCategory(6).map((food) => ( // Suponiendo que la categoría 6 es Legumbres
                <option key={food.IdAlimento} value={food.nombreAlimento}>
                  {food.nombreAlimento}
                </option>
              ))}
            </select>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Dropdown de Bebidas */}
          <div className="menu-management-group">
            <select
              className="menu-management-input"
              value={selectedFoods.drink}
              onChange={(e) => handleFoodSelection('drink', e.target.value)}
            >
              <option value="">Seleccione una Bebida</option>
              {filterFoodsByCategory(7).map((food) => ( // Suponiendo que la categoría 7 es Bebidas
                <option key={food.IdAlimento} value={food.nombreAlimento}>
                  {food.nombreAlimento}
                </option>
              ))}
            </select>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          {/* Fecha y descripción */}
          <div className="menu-management-group">
            <input type="date" placeholder="Ingrese una fecha" className="menu-management-input" />
          </div>
          <div className="menu-management-group">
            <textarea
              placeholder="Ingrese una descripción (máximo 255 caracteres)"
              className="menu-management-input"
              maxLength="255"
            />
          </div>

          <button type="submit" className="menu-management-submit">Enviar</button>
          <div className="menu-management-navigation-buttons">
            <button type="button" className="menu-management-red-button" onClick={goToSchedule}>Ir al cronograma</button>
            <button type="button" className="menu-management-green-button" onClick={goToInventory}>Ir al inventario</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default MenuManagement;
