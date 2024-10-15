import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Asegúrate de tener esta línea para que Chart.js funcione correctamente

const Statistics = () => {
  const [foodChartData, setFoodChartData] = useState({});

  // Función para obtener los datos de alimentos
  const fetchFoodStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3001/statistics'); // Asegúrate de que la ruta sea correcta
      const data = await response.json();

      // Preparar los datos para Chart.js
      const foodNames = data.map(food => food.nombreAlimento);
      const foodQuantities = data.map(food => food.cantidadDisponible);

      // Generar colores únicos para cada barra
      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
      ]; // Puedes ajustar estos colores según prefieras

      // Configuración de los datos para el gráfico de alimentos
      setFoodChartData({
        labels: foodNames,
        datasets: [
          {
            label: 'Cantidad Disponible por Alimento',
            data: foodQuantities,
            backgroundColor: colors, // Aplicar colores a las barras
            borderColor: colors.map(color => color.replace('0.2', '1')), // Bordes más oscuros
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error al obtener los alimentos:', error);
    }
  };

  // Ejecutar la función fetch cuando el componente se monte
  useEffect(() => {
    fetchFoodStatistics();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="statistics-container">
        <h2>Estadísticas de Alimentos</h2>

        {/* Renderizar el gráfico de alimentos */}
        {foodChartData && foodChartData.labels ? (
          <div>
            <Bar data={foodChartData} />
          </div>
        ) : (
          <p>Cargando estadísticas de alimentos...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Statistics;
