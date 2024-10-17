import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Importar para la navegación
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const MenuManagement = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const goToSchedule = () => {
    navigate('/schedule'); // Navega a la página del cronograma
  };

  const goToInventory = () => {
    navigate('/inventory'); // Navega a la página del inventario
  };

  return (
    <div className="menu-management-container">
      <Navbar />
      <div className="menu-management-form-container">
        <h1 className="menu-management-title">Ingresar Menú</h1>
        <form className="menu-management-form">
          <div className="menu-management-group">
            <input type="text" placeholder="Ingrese una Proteína" className="menu-management-input" />
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="menu-management-group">
            <input type="text" placeholder="Ingrese un Carbohidrato" className="menu-management-input" />
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="menu-management-group">
            <input type="text" placeholder="Ingrese un Lácteo" className="menu-management-input" />
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="menu-management-group">
            <input type="text" placeholder="Ingrese una Fruta" className="menu-management-input" />
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="menu-management-group">
            <input type="text" placeholder="Ingrese una Verdura" className="menu-management-input" />
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="menu-management-group">
            <input type="text" placeholder="Ingrese una Legumbre" className="menu-management-input" />
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="menu-management-group">
            <input type="text" placeholder="Ingrese una bebida" className="menu-management-input" />
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <button type="button" className="menu-management-button">
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
          <div className="menu-management-group">
            <input type="date" placeholder="Ingrese una fecha" className="menu-management-input" />
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
