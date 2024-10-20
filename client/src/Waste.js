import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Footer from './components/footer';
import Navbar from './components/navbar';
import './assets/css/Styles.css'; // Asegúrate de que el archivo CSS tenga este nombre
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDumpster, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const WasteRegisterForm = () => {
  const [Fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [IdMenu, setIdMenu] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/menus')
      .then(response => {
        setMenus(response.data);
      })
      .catch(err => {
        console.error('Error al obtener los menús:', err);
      });
  }, []);

  const addWaste = (event) => {
    event.preventDefault();

    if (!Fecha || !cantidad || !IdMenu || !descripcion) {
      setError('Por favor completa todos los campos');
      return;
    }

    Axios.post('http://localhost:3001/desperdicio', {
      Fecha,
      cantidad,
      IdMenu,
      descripcion
    }).then(() => {
      alert('Desperdicio registrado');
      setError('');
      setFecha('');
      setCantidad('');
      setIdMenu('');
      setDescripcion('');
    }).catch(() => {
      setError('Hubo un error al registrar el desperdicio');
    });
  };

  return (
    <div className="waste-container-form-wasted"> 
      <Navbar />
      <div className="waste-form-container">
        <div className="waste-form-wrapper"> 
          <h2 className="waste-title-form">Registrar Desperdicio</h2>
          <form onSubmit={addWaste}>
            <div className="waste-form-group">
              <FontAwesomeIcon className="fa-icon" icon={faClock} />
              <label className="l">Fecha:</label>
              <input
                type="date"
                value={Fecha}
                onChange={(event) => setFecha(event.target.value)}
                required
              />
            </div>
            <div className="waste-form-group">
              <FontAwesomeIcon className="fa-icon" icon={faDumpster} />
              <label className="l">Cantidad:</label>
              <input
                type="number"
                value={cantidad}
                onChange={(event) => setCantidad(event.target.value)}
                placeholder="Ingrese la cantidad"
                required
              />
            </div>
            <div className="waste-form-group">
              <FontAwesomeIcon className="fa-icon" icon={faEllipsisVertical} />
              <label className="l">Menú:</label>
              <select
                value={IdMenu}
                onChange={(event) => setIdMenu(event.target.value)}
                required
              >
                <option value="">Seleccione un menú</option>
                {menus.map(menu => (
                  <option key={menu.IdMenu} value={menu.IdMenu}>
                    {menu.IdMenu}
                  </option>
                ))}
              </select>
            </div>
            <div className="waste-form-group">
              <label className="l">Descripción:</label>
              <textarea
                className="waste-textarea" // Agrega la clase aquí
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
                placeholder="Ingrese una descripción"
                required
              />
            </div>

            {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

            <button className="waste-form-button" type="submit">Registrar Desperdicio</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WasteRegisterForm;
