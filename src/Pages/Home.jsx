import React, { useState, useEffect } from 'react';
import { Icon1, LogoYNombre, Icon2 } from '../Components/AppComponents';
import Lock from '../Icons/Lock_Icon.svg';
import Logo from '../Logos/logomate.svg';
import Nombre from '../Logos/NuevoLogo.svg';

import Location from '../Components/Location/Location';
import Info from '../Components/Info/Info';
import ChartGraphic from '../Components/Grafica/ChartGraphic';
import Map1 from '../Components/Map/Map1';

import humedad from '../Icons/hum + bg.png';
import lluvia from '../Icons/lluvia + bg.png';
import temperatura from '../Icons/temp + bg.png';
import viento from '../Icons/viento + bg.png';
import SensacionTermica from '../Icons/SensacionTermica.svg';
import foto from '../Images/grupoHackaton.jpg';

import Uruguay from '../Icons/Uruguay.png';
import Argentina from '../Icons/Argentina.png';
import Brasil from '../Icons/Brasil.png';
import Paraguay from '../Icons/Paraguay.png';
import Parallax from 'parallax-js'; // Importa la librería si es que usas React




// Definición de TicIcon
const TicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
    <path fill="#00cc00" d="M9.523 16.378l-4.124-4.416a.5.5 0 0 1 .036-.708l.712-.66a.5.5 0 0 1 .705.033l2.8 3.005 5.384-6.321a.5.5 0 0 1 .729-.004l.793.84a.5.5 0 0 1-.003.712l-6.49 7.63a.5.5 0 0 1-.71.045z"/>
  </svg>
);

// Definición de CruzIcon
const CruzIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path style={{ fill: 'rgba(255, 0, 0, 1)', transform: '', msFilter: '' }} d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
  </svg>
);

function Home() {
  
  const [currentDay, setCurrentDay] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Tiempo antes de que la navegación se haga visible
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    setCurrentDay(formattedDate);
  }, []);

  const [datosSensores, setDatosSensores] = useState({
    temperatura: 0,
    viento: 0,
    lluvia: 0,
    humedad: 0,
    Heat: 0,
    volts: 0, // Incluido volts con valor inicial 0
  });
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/promedios-ultimas-24-horas');
        const data = await response.json();

        const formatearDato = (dato) => parseFloat(dato).toFixed(1);

        setDatosSensores({
          temperatura: formatearDato(data.temperatura),
          viento: formatearDato(data.viento),
          lluvia: formatearDato(data.lluvia),
          humedad: formatearDato(data.humedad),
          Heat: formatearDato(data.Heat),
          volts: formatearDato(data.volts), // Actualizar volts con el promedio de las últimas 24 horas
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  
  return (
  
      
    <div className="App">
      <nav className={`Nav ${isVisible ? 'visible' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <LogoYNombre Link='/' Logo={Logo} />
        <div className="ContIcon1">
          <Icon1 Ruta='/' Icon1={Nombre} />
        </div>
      </nav>

      <main>
        <div className="ContLocation">
          <Location />
        </div>
        <div className="ContMap">
          <Map1 />
        </div>

      {/* Contenedor para la fecha con fondo degradado */}
      <div className="ContDia">
        <h2>{currentDay}</h2>
      </div>

      <div className="ContTemp">
        <div className="Iconos">
          <div className="Icono">
            <img src={temperatura} alt="Icono de temperatura" />
            <h2 className="valores">{datosSensores.temperatura}</h2>
          </div>
          <div className="Icono">
            <img src={viento} alt="Icono de viento" />
            <h2 className="valores">{datosSensores.viento}</h2>
          </div>
          <div className="Icono">
            <img src={lluvia} alt="Icono de lluvia" />
            <div className="mt-2">
              {datosSensores.lluvia >= 10 ? <TicIcon /> : <CruzIcon />}
            </div>
          </div>
          <div className="Icono">
            <img src={humedad} alt="Icono de humedad" />
            <h2 className="valores">{datosSensores.humedad}</h2>
          </div>
          <div className="Icono">
            <img src={SensacionTermica} alt="Icono de S.Termica" />
            <h2 className="valores">{datosSensores.Heat}</h2>
          </div>
        </div>
      </div>
        <div id="sectionChart" style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '20px 0'
        }}>
          <div className='ContGraphic'>
            <ChartGraphic width="60vw" height="40vh" />
          </div>
        </div>
  <div id="sectionInfo" className="ContInfo">
  <Info
    Title="INFO"
    SubTitle="Sobre el proyecto"
    InfoText="El proyecto tiene como objetivo desarrollar una solución creativa y funcional para la recolección y visualización de datos ambientales, incluyendo mediciones de temperatura, humedad y velocidad del viento. Este proyecto está siendo desarrollado por estudiantes de la Escuela Técnica Hogar Naval Stella Maris, quienes han aplicado sus conocimientos en robótica y programación para diseñar una solución innovadora. Durante la Hackaton Mercosur 2024, un evento en el que participaron estudiantes de Argentina, Brasil, Uruguay y Paraguay, se sentaron las bases para esta iniciativa, demostrando el valor de la colaboración regional en el ámbito educativo y tecnológico."
  />
  </div>
  <div className="d-flex" style={{ width: '100%' }}>
    <div style={{ width: '75%', margin: '0 auto' }}>
      <img src={foto} alt="foto" className="img-fluid" />
    </div>
  </div>
  

      </main>
    </div>
  );
}

export default Home;
