import React from 'react';
import './assets/css/Modal.css'; 

const Modal = ({ showModal, closeModal, title, message }) => {
  if (!showModal) return null;

  return (
    <div className="zork-modal-overlay">
      <div className="zork-modal-content">
        <h3>{title}</h3>
        <p className="zork-parafo">{message}</p>
        <button className="zork-modal-close" onClick={closeModal}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Modal;
