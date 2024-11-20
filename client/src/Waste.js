import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Modal from '../src/Modal';
import './assets/css/Styles.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDumpster, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const WasteRegisterForm = () => {
  const [Fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [IdMenu, setIdMenu] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
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

  const handleCloseModal = () => setShowModal(false);

  const addWaste = (event) => {
    event.preventDefault();

    if (!Fecha || !cantidad || !IdMenu || !descripcion) {
      setModalTitle('Error');
      setModalMessage('Por favor completa todos los campos');
      setShowModal(true);
      return;
    }

    Axios.post('http://localhost:3001/desperdicio', {
      Fecha,
      cantidad,
      IdMenu,
      descripcion
    }).then(() => {
      setModalTitle('Éxito');
      setModalMessage('Desperdicio registrado correctamente');
      setShowModal(true);

      // Limpiar los campos
      setFecha('');
      setCantidad('');
      setIdMenu('');
      setDescripcion('');
    }).catch(() => {
      setModalTitle('Error');
      setModalMessage('Hubo un error al registrar el desperdicio');
      setShowModal(true);
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
              <div className="waste-form-label-container">
                <FontAwesomeIcon className="fa-icon" icon={faClock} />
                <label>Fecha:</label>
              </div>
              <input
                type="date"
                value={Fecha}
                onChange={(event) => setFecha(event.target.value)}
                required
              />
            </div>
            <div className="waste-form-group">
              <div className="waste-form-label-container">
                <FontAwesomeIcon className="fa-icon" icon={faDumpster} />
                <label>Cantidad:</label>
              </div>
              <input
                type="number"
                value={cantidad}
                onChange={(event) => setCantidad(event.target.value)}
                placeholder="Ingrese la cantidad"
                required
              />
            </div>
            <div className="waste-form-group">
              <div className="waste-form-label-container">
                <FontAwesomeIcon className="fa-icon" icon={faEllipsisVertical} />
                <label>Menú:</label>
              </div>
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
              <div className="waste-form-label-container">
                <label>Descripción:</label>
              </div>
              <textarea
                className="waste-textarea"
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
                placeholder="Ingrese una descripción"
                required
              />
            </div>
            <button className="waste-form-button" type="submit">Registrar Desperdicio</button>
          </form>
        </div>
      </div>
      <Footer />
      <Modal 
        showModal={showModal} 
        closeModal={handleCloseModal} 
        title={modalTitle} 
        message={modalMessage} 
      />
    </div>
  );
};

export default WasteRegisterForm;