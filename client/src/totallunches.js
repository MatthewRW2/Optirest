import React, { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import almuerzo1 from './assets/img/almuerzo1.jpg';
import almuerzo2 from './assets/img/almuerzo2.jpg';


const Almuerzos = () => {
    const [fecha, setFecha] = useState('');
    const [almuerzos, setAlmuerzos] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch(`http://localhost:3001/almuerzo?fecha=${fecha}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("No se encontraron registros para esa fecha");
                }
                return res.json();
            })
            .then((data) => {
                setAlmuerzos(data[0]?.totalAsistencia || 0);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setAlmuerzos(null);
            });
    };

    return (
        <div className="almuerzos-container-almuerzo">
            <Navbar />
            <div className="content-almuerzo">
                <div className="form-container-almuerzo">
                    <h1>Almuerzos Para Realizar</h1>
                    <form onSubmit={handleSubmit} className="form-almuerzo">
                        <label>
                            Ingrese la fecha:
                            <input
                                type="date"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Consultar</button>
                    </form>

                    {error && <p className="error-almuerzo">{error}</p>}
                    {almuerzos !== null && (
                        <div className="almuerzos-result-container">
                            <h2>Almuerzos Registrados</h2>
                            <p>Total: {almuerzos}</p>
                        </div>
                    )}
                </div>

                {/* Contenedor de las imágenes */}
                <div className="image-container-almuerzo">
                    <img src={almuerzo1} alt="Almuerzo 1" />
                    <img src={almuerzo2} alt="Almuerzo 2" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Almuerzos;
