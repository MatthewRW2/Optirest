import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Footer from './components/footer';
import Navbar from './components/navbar';
import '../src/assets/css/Styles.css';
import '../src/assets/css/Footer.css';

const WasteRegisterForm = () => {
  const [Fecha, setFecha] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [IdMenu, setIdMenu] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [menus, setMenus] = useState([]); // Nuevo estado para los menús

  useEffect(() => {
    // Obtener los IdMenu disponibles al cargar el componente
    Axios.get('http://localhost:3001/menus') // Cambia aquí para que coincida con tu ruta
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
      // Reiniciar los campos
      setFecha('');
      setCantidad('');
      setIdMenu('');
      setDescripcion('');
    }).catch(() => {
      setError('Hubo un error al registrar el desperdicio');
    });
  };

  return (
    <div className="container-form">
      <Navbar /> 
      <div className="form-container">
        <h2 className="title-form">Registrar Desperdicio</h2>
        <form onSubmit={addWaste}>
          <div className="form-group">
            <label className="l">*Fecha:</label>
            <input
              type="date"
              value={Fecha}
              onChange={(event) => setFecha(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="l">*Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(event) => setCantidad(event.target.value)}
              placeholder="Ingrese la cantidad"
              required
            />
          </div>
          <div className="form-group">
            <label className="l">*ID del Menú:</label>
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
          <div className="form-group">
            <label className="l">*Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              placeholder="Ingrese una descripción"
              required
            />
          </div>

          {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

          <button className="form-button" type="submit">Registrar Desperdicio</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default WasteRegisterForm;
