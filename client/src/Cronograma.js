import React from 'react';
import Footer from './components/footer';
import Navbar from './components/navbar';
import './assets/css/Cronograma.css';

function Cronograma() {
  return (
    <div className='app-container'>
      <Navbar />
      <div className='contenedorc'>
      <h1>Cronograma de comidas(Semanas del 17 al 21 de Enero del 2022)</h1>
        <table className="cronograma-table">
          <thead>
            <tr>
              <th>Componentes</th>
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lácteo</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Fruta</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Verdura</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Carbohidratos</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cereal</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Alimento Proteico</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="button-container">
          <button className='button' type="button">Agregar Alimento</button>
          <button className='button' type="button">Eliminar Alimento</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cronograma;
