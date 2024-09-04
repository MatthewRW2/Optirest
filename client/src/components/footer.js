import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p><FontAwesomeIcon icon={faPhone} /> +57 320 8023808</p>
        <p><FontAwesomeIcon icon={faEnvelope} /> optirest@contacto.com</p>
      </div>
      <div className="footer-center">
        <p>© 2024 Optirest School Solutions | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
