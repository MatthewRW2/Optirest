import React, { useState } from 'react';
import './Register.css';

const RegistroUsuario = () => {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log({
      nombres,
      apellidos,
      tipoDocumento,
      numeroDocumento,
      contrasena
    });
  };

  return (
    <div className="form-container">
      <h2>Registrar usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombres:</label>
          <input
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            placeholder="Ingrese sus nombres"
            required
          />
        </div>
        <div className="form-group">
          <label>Apellidos:</label>
          <input
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            placeholder="Ingrese sus apellidos"
            required
          />
        </div>
        <div className="form-group">
          <label>Tipo de Documento:</label>
          <select
            value={tipoDocumento}
            onChange={(e) => setTipoDocumento(e.target.value)}
            required
          >
            <option value="">Seleccione su tipo de documento</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CE">Cédula de Extranjería</option>
          </select>
        </div>
        <div className="form-group">
          <label>N° de Documento:</label>
          <input
            type="text"
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
            placeholder="Ingrese su número de documento"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
            placeholder="Confirme su contraseña"
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
