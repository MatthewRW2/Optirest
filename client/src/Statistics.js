import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';  
import 'jspdf-autotable';  

const Statistics = () => {
  const [foodChartData, setFoodChartData] = useState(null);
  const [menuChartData, setMenuChartData] = useState(null); 
  const [allFoods, setAllFoods] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de alimentos
  const fetchFoodStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3001/alimento'); // Cambiar a la ruta correcta para obtener alimentos
      const data = await response.json();

      const foodNames = data.map(food => food.nombreAlimento);
      const foodQuantities = data.map(food => food.cantidadDisponible);

      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
      ];

      setFoodChartData({
        labels: foodNames,
        datasets: [
          {
            label: 'Cantidad Disponible por Alimento',
            data: foodQuantities,
            backgroundColor: colors,
            borderColor: colors.map(color => color.replace('0.2', '1')),
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los alimentos:', error);
    }
  };

  // Función para obtener los datos de menús
  const fetchMenuStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3001/estadisticas_menu'); 
      const data = await response.json();

      // Verifica los nombres de las propiedades que estás obteniendo
      const menuFoodNames = data.map(menu => menu.nombreAlimento); // Ajusta según tu API
      const menuQuantities = data.map(menu => menu.cantidad); // Ajusta según tu API

      setMenuChartData({
        labels: menuFoodNames,
        datasets: [
          {
            label: 'Cantidad por Alimento en el Menú',
            data: menuQuantities,
            backgroundColor: '#FF9F40',
            borderColor: '#FF9F40',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error al obtener las estadísticas del menú:', error);
    }
  };

  // Función para obtener los datos completos de la tabla de alimentos
  const fetchAllFoods = async () => {
    try {
      const response = await fetch('http://localhost:3001/alimento'); 
      const data = await response.json();
      setAllFoods(data); 
    } catch (error) {
      console.error('Error al obtener los alimentos completos:', error);
    }
  };

  // Ejecutar las funciones fetch cuando el componente se monte
  useEffect(() => {
    fetchFoodStatistics();
    fetchMenuStatistics(); 
    fetchAllFoods(); 
  }, []);

  // Función para generar PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Estadísticas de Alimentos y Menús', 20, 20);

    // Agregar una tabla con los datos completos de alimentos
    const foodTableColumn = ['ID', 'Nombre del Alimento', 'Cantidad Disponible', 'Cantidad Mínima', 'Fecha de Ingreso', 'Categoría'];
    const foodTableRows = [];

    allFoods.forEach(food => {
      foodTableRows.push([
        food.IdAlimento, 
        food.nombreAlimento, 
        food.cantidadDisponible, 
        food.cantidadMinima, 
        food.fecha, 
        food.IdCategoria  
      ]);
    });

    doc.autoTable(foodTableColumn, foodTableRows, { startY: 30 });

    // Agregar una tabla con los datos de menús
    const menuTableColumn = ['Nombre del Alimento en el Menú', 'Cantidad'];
    const menuTableRows = [];

    menuChartData.datasets[0].data.forEach((quantity, index) => {
      menuTableRows.push([menuChartData.labels[index], quantity]);
    });

    doc.autoTable(menuTableColumn, menuTableRows, { startY: doc.lastAutoTable.finalY + 10 });

    // Descargar el PDF
    doc.save('reporte_estadisticas_alimentos_y_menus.pdf');
  };

  return (
    <div>
      <Navbar />
      <div className="statistics-container">
        <h2>Estadísticas de Alimentos y Menús</h2>

        {/* Renderizar el gráfico de alimentos */}
        {foodChartData ? (
          <div>
            <Bar data={foodChartData} />
          </div>
        ) : (
          <p>{loading ? 'Cargando estadísticas de alimentos...' : 'No hay datos disponibles.'}</p>
        )}

        {/* Renderizar el gráfico de menús */}
        {menuChartData ? (
          <div>
            <Bar data={menuChartData} />
          </div>
        ) : (
          <p>{loading ? 'Cargando estadísticas del menú...' : 'No hay datos disponibles.'}</p>
        )}
      </div>

      <div className="report-buttons-container">
        <button className="report-button" onClick={generatePDF}>Descargar reportes en PDF</button>
        <button className="report-button">Ver reportes</button>
      </div>

      <Footer />
    </div>
  );
};

export default Statistics;
