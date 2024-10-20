import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import jsPDF from 'jspdf';  
import 'jspdf-autotable';  

const Statistics = () => {
  // Estados para alimentos
  const [foodChartData, setFoodChartData] = useState(null);
  const [allFoods, setAllFoods] = useState([]);
  const [loadingFood, setLoadingFood] = useState(true);

  // Estados para desperdicios
  const [wasteChartData, setWasteChartData] = useState(null);
  const [allWastes, setAllWastes] = useState([]);
  const [loadingWaste, setLoadingWaste] = useState(true);

  // Función para obtener estadísticas de alimentos
  const fetchFoodStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3001/alimento');
      const data = await response.json();
      const foodNames = data.map(food => food.nombreAlimento);
      const foodQuantities = data.map(food => food.cantidadDisponible);
      const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

      setFoodChartData({
        labels: foodNames,
        datasets: [{
          label: 'Cantidad Disponible por Alimento',
          data: foodQuantities,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.2', '1')),
          borderWidth: 1,
        }],
      });
      setLoadingFood(false);
    } catch (error) {
      console.error('Error al obtener los alimentos:', error);
    }
  };

  // Función para obtener todos los alimentos
  const fetchAllFoods = async () => {
    try {
      const response = await fetch('http://localhost:3001/alimento'); 
      const data = await response.json();
      setAllFoods(data); 
    } catch (error) {
      console.error('Error al obtener los alimentos completos:', error);
    }
  };

  // Función para obtener estadísticas de desperdicios
  const fetchWasteStatistics = async () => {
    try {
      const response = await fetch('http://localhost:3001/desperdicios');
      const data = await response.json();
      const wasteDates = data.map(waste => waste.Fecha);
      const wasteQuantities = data.map(waste => waste.cantidad);
      const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

      setWasteChartData({
        labels: wasteDates,
        datasets: [{
          label: 'Cantidad de Desperdicios por Fecha',
          data: wasteQuantities,
          backgroundColor: colors,
          borderColor: colors.map(color => color.replace('0.2', '1')),
          borderWidth: 1,
        }],
      });
      setLoadingWaste(false);
    } catch (error) {
      console.error('Error al obtener los desperdicios:', error);
    }
  };

  // Función para obtener todos los desperdicios
  const fetchAllWastes = async () => {
    try {
      const response = await fetch('http://localhost:3001/desperdicios'); 
      const data = await response.json();
      setAllWastes(data); 
    } catch (error) {
      console.error('Error al obtener los desperdicios completos:', error);
    }
  };

  useEffect(() => {
    fetchFoodStatistics();
    fetchAllFoods();
    fetchWasteStatistics();
    fetchAllWastes();
  }, []);

  // Generar PDF con estadísticas de alimentos y desperdicios
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Estadísticas de Alimentos y Desperdicios', 20, 20);

    const foodTableColumn = ['ID', 'Nombre del Alimento', 'Cantidad Disponible', 'Cantidad Mínima', 'Fecha de Ingreso', 'Categoría'];
    const foodTableRows = allFoods.map(food => [
      food.IdAlimento, 
      food.nombreAlimento, 
      food.cantidadDisponible, 
      food.cantidadMinima, 
      food.fecha, 
      food.IdCategoria  
    ]);

    doc.autoTable(foodTableColumn, foodTableRows, { startY: 30 });

    const wasteTableColumn = ['ID', 'Fecha', 'Cantidad', 'Descripción', 'ID Menú'];
    const wasteTableRows = allWastes.map(waste => [
      waste.IdDesperdicio, 
      waste.Fecha, 
      waste.cantidad, 
      waste.descripcion, 
      waste.IdMenu  
    ]);

    doc.autoTable(wasteTableColumn, wasteTableRows, { startY: doc.autoTable.previous.finalY + 10 });
    doc.save('reporte_estadisticas_alimentos_desperdicios.pdf');
  };

  return (
    <div>
      <Navbar />
      <div className="statistics-container">
        <h2>Estadísticas de Alimentos</h2>
        {/* Renderizar el gráfico de alimentos */}
        {foodChartData ? (
          <div>
            <Bar data={foodChartData} />
          </div>
        ) : (
          <p>{loadingFood ? 'Cargando estadísticas de alimentos...' : 'No hay datos disponibles.'}</p>
        )}

        <h2>Estadísticas de Desperdicios</h2>
        {/* Renderizar el gráfico de desperdicios */}
        {wasteChartData ? (
          <div>
            <Bar data={wasteChartData} />
          </div>
        ) : (
          <p>{loadingWaste ? 'Cargando estadísticas de desperdicios...' : 'No hay datos disponibles.'}</p>
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
