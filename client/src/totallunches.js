import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import '../src/assets/css/Styles.css';

const Almuerzos = () => {
    const [fecha, setFecha] = useState('');
    const [datosVista, setDatosVista] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = fecha
            ? `http://localhost:3001/vista-asistencias-cronograma?fecha=${fecha}`
            : `http://localhost:3001/vista-asistencias-cronograma`;

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No se encontraron registros.");
                }
                return res.json();
            })
            .then((data) => {
                setDatosVista(data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setDatosVista([]);
            });
    };

    return (
        <div className="almuerzos-container-almuerzo">
            <Navbar />
            <div className="content-almuerzo">
                <div className="form-container-almuerzo">
                    <h1>Almuerzos por realizar</h1>
                    <form onSubmit={handleSubmit} className="form-almuerzo">
                        <label>
                            Seleccione la fecha para consultar la cantidad de almuerzos :
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </label>
                        <button type="submit">Consultar</button>
                    </form>
                </div>

                {error && <p className="error-almuerzo">{error}</p>}

                {datosVista.length > 0 ? (
                    <table className="cronograma-table">
                        <thead>
                            <tr>
                                <th>Fecha Asistencia</th>
                                <th>Total Asistencias</th>
                                <th>Fecha Cronograma</th>
                                <th>Proteína</th>
                                <th>Carbohidrato</th>
                                <th>Lácteo</th>
                                <th>Fruta</th>
                                <th>Verdura</th>
                                <th>Legumbre</th>
                                <th>Bebida</th>
                                <th>Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosVista.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fecha_asistencia || 'N/A'}</td>
                                    <td>{item.total_asistencias || 'N/A'}</td>
                                    <td>{item.fecha_cronograma || 'N/A'}</td>
                                    <td>{item.Proteina || 'N/A'}</td>
                                    <td>{item.Carbohidrato || 'N/A'}</td>
                                    <td>{item.Lacteo || 'N/A'}</td>
                                    <td>{item.Fruta || 'N/A'}</td>
                                    <td>{item.Verdura || 'N/A'}</td>
                                    <td>{item.Legumbre || 'N/A'}</td>
                                    <td>{item.Bebida || 'N/A'}</td>
                                    <td>{item.DescripcionMenu || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    !error && <p>No hay datos para mostrar.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Almuerzos;
