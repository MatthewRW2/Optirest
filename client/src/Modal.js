import React from 'react';
import './assets/css/Styles.css'; // Asegúrate de que el estilo esté incluido

const Modal = ({ showModal, closeModal, title, message }) => {
  if (!showModal) return null; // Si no se debe mostrar, no renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>
        <button className="modal-close" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;