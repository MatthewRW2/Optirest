import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';  // Importa la librería jsPDF
import 'jspdf-autotable';  // Esto te permite agregar tablas fácilmente

const Statistics = () => {
  const [foodChartData, setFoodChartData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [allFoods, setAllFoods] = useState([]); // Guardar todos los alimentos
  const [loading, setLoading] = useState(true);

  // Función para obtener los datos de alimentos
  const fetchFoodStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3001/statistics'); // Ruta para obtener las estadísticas de alimentos
      const data = await response.json();

      // Preparar los datos para Chart.js
      const foodNames = data.map(food => food.nombreAlimento);
      const foodQuantities = data.map(food => food.cantidadDisponible);

      // Generar colores únicos para cada barra
      const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'
      ];

      // Configuración de los datos para el gráfico de alimentos
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

  // Función para obtener los datos completos de la tabla de alimentos desde /alimento
  const fetchAllFoods = async () => {
    try {
      const response = await fetch('http://localhost:3001/alimento'); // Ruta para obtener todos los alimentos
      const data = await response.json();
      setAllFoods(data); // Guardar los alimentos obtenidos
    } catch (error) {
      console.error('Error al obtener los alimentos completos:', error);
    }
  };

  // Función para obtener los datos de menús
  const fetchMenuStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3001/detalle_menu'); // Ruta para obtener los detalles del menú
      const data = await response.json();
      setMenuData(data); // Guardar los detalles del menú
    } catch (error) {
      console.error('Error al obtener los detalles del menú:', error);
    }
  };

  // Ejecutar las funciones fetch cuando el componente se monte
  useEffect(() => {
    fetchFoodStatistics();
    fetchMenuStatistics();
    fetchAllFoods(); // Obtener todos los alimentos
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
        food.IdCategoria  // Aquí puedes reemplazar por el nombre de la categoría si tienes una relación con la tabla de categorías
      ]);
    });

    doc.autoTable(foodTableColumn, foodTableRows, { startY: 30 });

    // Agregar una tabla con los datos de menús
    const menuTableColumn = ['Nombre del Alimento en el Menú', 'Cantidad'];
    const menuTableRows = [];

    menuData.forEach(menu => {
      menuTableRows.push([menu.nombreAlimento, menu.cantidad]);
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
        {foodChartData && foodChartData.labels ? (
          <div>
            <Bar data={foodChartData} />
          </div>
        ) : (
          <p>{loading ? 'Cargando estadísticas de alimentos...' : 'No hay datos disponibles.'}</p>
        )}
      </div>

      {/* Sección para los botones */}
      <div className="report-buttons-container">
        <button className="report-button" onClick={generatePDF}>Descargar reportes en PDF</button>
        <button className="report-button">Ver reportes</button>
      </div>

      <Footer />
    </div>
  );
};

export default Statistics;
