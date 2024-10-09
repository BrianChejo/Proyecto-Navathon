import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

// Componentes de iconos (reemplaza con tus iconos reales)
import { TemperatureIcon, WindIcon, RainIcon, HumidityIcon, VoltageIcon } from './Icons';

const ChartGraphic = ({ width, height }) => {
  const [dataType, setDataType] = useState('temperature');
  const [sensorData, setSensorData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const generateCompleteHourlyData = useCallback((data) => {
    const hourlyDataObject = {};

    // Initialize hourly data object with zeros for all hours
    for (let i = 0; i < 24; i++) {
      hourlyDataObject[i] = {
        temperature: [],
        humidity: [],
        wind: [],
        rain: [],
        volts: [], // Agrega voltaje aquí
      };
    }

    // Populate hourly data object with actual data
    data.forEach(item => {
      const hour = new Date(item.datetime).getHours();
      hourlyDataObject[hour].temperature.push(item.temperature);
      hourlyDataObject[hour].humidity.push(item.humidity);
      hourlyDataObject[hour].wind.push(item.wind);
      hourlyDataObject[hour].rain.push(item.rain);
      hourlyDataObject[hour].volts.push(item.volts); // Agrega voltaje aquí
    });

    // Calculate averages for each hour
    const averagedData = Object.keys(hourlyDataObject).map(hour => ({
      temperature: hourlyDataObject[hour].temperature.length > 0 ? calculateAverage(hourlyDataObject[hour].temperature) : 0,
      humidity: hourlyDataObject[hour].humidity.length > 0 ? calculateAverage(hourlyDataObject[hour].humidity) : 0,
      wind: hourlyDataObject[hour].wind.length > 0 ? calculateAverage(hourlyDataObject[hour].wind) : 0,
      rain: hourlyDataObject[hour].rain.length > 0 ? calculateAverage(hourlyDataObject[hour].rain) : 0,
      volts: hourlyDataObject[hour].volts.length > 0 ? calculateAverage(hourlyDataObject[hour].volts) : 0, // Calcula el promedio de voltaje
      hour: parseInt(hour),
    }));

    return averagedData;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/obtener_info');
      
      // Agrupar datos por hora y calcular el promedio para cada hora
      const completeHourlyData = generateCompleteHourlyData(response.data);
      
      setSensorData(completeHourlyData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [generateCompleteHourlyData]);

  const calculateAverage = (data) => {
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    return sum / data.length;
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    const updateChart = () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      let data;
      let label;
      let color;
      let unit;

      switch(dataType) {
        case 'temperature':
          data = sensorData.map(item => item.temperature);
          label = 'Temperatura (°C)';
          color = '#FF6384';
          unit = '°C';
          break;
        case 'humidity':
          data = sensorData.map(item => item.humidity);
          label = 'Humedad (%)';
          color = '#4BC0C0';
          unit = '%';
          break;
        case 'wind':
          data = sensorData.map(item => item.wind);
          label = 'Velocidad del Viento (m/s)';
          color = '#36A2EB';
          unit = 'm/s';
          break;
        case 'rain':
          data = sensorData.map(item => item.rain);
          label = 'Volumen de Lluvia (mm)';
          color = '#7F7F7F';
          unit = 'mm';
          break;
        case 'volts':
          data = sensorData.map(item => item.volts);
          label = 'Voltaje (V)';
          color = '#FFCE56';
          unit = 'V';
            break;
        default:
          data = sensorData.map(item => item.temperature);
          label = 'Temperatura (°C)';
          color = '#FF6384';
          unit = '°C';
      }

      const labels = generateHourLabels(sensorData); // Genera etiquetas para las últimas 24 horas

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 2,
            fill: false,
            tension: 0.4,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: color,
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  const value = context.raw;
                  return `${value} ${unit}`;
                }
              }
            },
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
              ticks: {
                color: '#FFF',
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.1)',
              },
              ticks: {
                color: '#FFF',
                callback: function(value) {
                  return `${value} ${unit}`;
                }
              },
            },
          },
        }
      });
    };

    updateChart();

  }, [dataType, sensorData]);


  const generateHourLabels = (data) => {
    // Genera las etiquetas de las últimas 24 horas en formato 'HH:00'
    const labels = [];
    const currentHour = new Date().getHours();
    for (let i = 0; i < 24; i++) {
      const hour = (currentHour - i + 24) % 24; // Asegura que sea un número entre 0 y 23
      labels.unshift(`${hour.toString().padStart(2, '0')}:00`);
    }
    return labels;
  };

  const buttonStyle = {
    backgroundColor: '#3DA06E',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
    cursor: 'pointer',
    color: 'white',
    padding: '0',
    transition: 'background-color 0.3s',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#2C7A4E',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
        <button 
          style={dataType === 'temperature' ? activeButtonStyle : buttonStyle} 
          title="Temperatura" 
          onClick={() => setDataType('temperature')}
        >
          <TemperatureIcon />
        </button>
        <button 
          style={dataType === 'humidity' ? activeButtonStyle : buttonStyle} 
          title="Humedad" 
          onClick={() => setDataType('humidity')}
        >
          <HumidityIcon />
        </button>
        <button 
          style={dataType === 'wind' ? activeButtonStyle : buttonStyle} 
          title="Viento" 
          onClick={() => setDataType('wind')}
        >
          <WindIcon />
        </button>
        <button 
          style={dataType === 'rain' ? activeButtonStyle : buttonStyle} 
          title="Lluvia" 
          onClick={() => setDataType('rain')}
        >
          <RainIcon />
        </button>
        <button 
          style={dataType === 'volts' ? activeButtonStyle : buttonStyle} 
          title="Voltaje" 
          onClick={() => setDataType('volts')} // Cambia 'voltage' a 'volts'
        >
        <VoltageIcon />
        </button>

      </div>
      <div style={{ width, height, padding: '20px', backgroundColor: '#1E1E1E', borderRadius: '10px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartGraphic;
