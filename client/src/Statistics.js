import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './assets/css/Styles.css';

const Statistics = () => {
  const [statistics, setStatistics] = useState([]);
  const [alimentos, setAlimentos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Fetch statistics data from the API
    fetch('/api/estadisticas')
      .then(response => response.json())
      .then(data => setStatistics(data))
      .catch(error => console.error('Error fetching statistics:', error));

    // Fetch alimentos data from the API
    fetch('/api/alimento')
      .then(response => response.json())
      .then(data => setAlimentos(data))
      .catch(error => console.error('Error fetching alimentos:', error));

    // Fetch categorias data from the API
    fetch('/api/categorias')
      .then(response => response.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error fetching categorias:', error));
  }, []);

  useEffect(() => {
    if (statistics.length > 0) {
      drawChart();
    }
  }, [statistics]);

  const drawChart = () => {
    // Clear any previous chart
    d3.select('#chart-container').selectAll('*').remove();

    // Set dimensions and margins for the chart
    const margin = { top: 20, right: 30, bottom: 40, left: 40 },
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Append the SVG object to the chart-container div
    const svg = d3.select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Set up the x scale
    const x = d3.scaleBand()
      .domain(statistics.map(d => d.nombreAlimento))
      .range([0, width])
      .padding(0.2);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Set up the y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(statistics, d => +d.cantidadDisponible)])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    // Create bars
    svg.selectAll('rect')
      .data(statistics)
      .enter()
      .append('rect')
      .attr('x', d => x(d.nombreAlimento))
      .attr('y', d => y(d.cantidadDisponible))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.cantidadDisponible))
      .attr('fill', '#007CFF');
  };

  return (
    <div>
      <Navbar />
      <div className="statistics-container">
        <h2>Estadísticas de Alimentos</h2>
        <div id="chart-container"></div>
        <div>
          <h3>Alimentos:</h3>
          <ul>
            {alimentos.map((alimento, index) => (
              <li key={index}>{alimento.nombreAlimento}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Categorías:</h3>
          <ul>
            {categorias.map((categoria, index) => (
              <li key={index}>{categoria.nombreCategoria}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Statistics;
