import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const MenuManagement = () => {
  const [detallesMenu, setDetallesMenu] = useState([]);
  const navigate = useNavigate(); 

  const getDetallesMenu = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/detalle_menu");
      setDetallesMenu(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles del menú", error);
    }
  };

  useEffect(() => {
    getDetallesMenu();
  }, []);

  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <div className="menu-management-unique-container">
      <Navbar />
      <div className="menu-content-unique"> 
        <div className="menu-left-unique">
          <div className="menu-left-container-unique">    
            <h2 className="menu-heading-unique">Menú del día</h2>  
            <div className='container-table'>
              <div className="menu-table-wrapper-unique">
              <table className="menu-table-unique">
                <thead>
                  <tr>
                    <th>Alimento</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesMenu.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.nombreAlimento}</td>
                      <td>{detalle.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-right-unique">
          <div className="right-box-unique">
            <div className="form-group-unique">
              <label htmlFor="date">Fecha:</label>
              <div className="input-with-icon-unique">
                <input type="date" id="date" />
              </div>
            </div>
            <div className="form-group-unique">
              <label htmlFor="course">Curso:</label>
              <select id="course">
                <option>Seleccione Curso</option>
                <option>Curso 1</option>
                <option>Curso 2</option>
              </select>
            </div>
            <div className="form-group-unique">
              <label htmlFor="level">Nivel Académico:</label>
              <select id="level">
                <option>Seleccione Nivel</option>
                <option>Nivel 1</option>
                <option>Nivel 2</option>
              </select>
            </div>
            <div className="form-group-unique">
              <label htmlFor="meals">Nº de Almuerzos:</label>
              <input type="number" id="meals" value="45" readOnly />
            </div>
            <button 
              className="btn-gray-unique" 
              onClick={() => handleNavigation('/schedule')} 
            >
              Ir al cronograma
            </button>
            <button 
              className="btn-blue-unique" 
              onClick={() => handleNavigation('/inventory')} 
            >
              Ir al inventario
            </button>
            <button className="btn-submit-unique">Enviar</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuManagement;
