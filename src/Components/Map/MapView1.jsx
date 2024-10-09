import React, { useState, useEffect } from 'react';
import '../../Styles/MapView.css';
import Map from './Map1';

import humedad from '../../Icons/humedad.png';
import lluvia from '../../Icons/lluvia.png';
import temperatura from '../../Icons/temperatura.png';
import viento from '../../Icons/viento.png';

function MapView() {
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-ES', options);
    setCurrentDay(formattedDate);
  }, []);

  return (
    <div className="container">
      <div className='container_bienvenida'>
        <h1 className="mapa">MAPA</h1>
        <h1 className="localidad">(SELECCIONE UNA ESCUELA)</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-md-7">
          <Map width="100%" height="600px" />
        </div>
      </div>
      <div className="container_valores">
        <table>
          <tbody>
            <tr>
              <td>
                <img src={temperatura} alt="Icono de temperatura" style={{ width: '43px', height: '42px' }} /> <h2 className="valores">0</h2>
              </td>
              <td>
                <img src={viento} alt="Icono de viento" style={{ width: '43px', height: '42px' }}/> <h2 className="valores">0</h2>
              </td>
              <td>
                <img src={lluvia} alt="Icono de lluvia" style={{ width: '43px', height: '42px' }} /> <h2 className="valores">0</h2>
              </td>
              <td>
                <img src={humedad} alt="Icono de humedad" style={{ width: '43px', height: '42px' }} /> <h2 className="valores">0</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container_fecha">
        <table>
          <tbody>
            <tr>
              <td>
                <h2 className="fecha">{currentDay}</h2>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MapView;
