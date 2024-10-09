import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import javier from './colegios/javier.png';
import asuncion from './colegios/asuncion.png';
import viale from './colegios/viale.png';
import maldonado from './colegios/maldonado.png';
import parana from './colegios/parana.png';
import brasilia from './colegios/brasilia.png';
import naval from './colegios/naval.png';
import lagos from './colegios/lagos.png';
import ubi from '../../Icons/ubi.png';

const Map = ({ width, height }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const leafletMap = L.map(mapRef.current).setView([-25.385119782910873, -57.45772794419067], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(leafletMap);

      const customIcon = L.icon({
        iconUrl: ubi,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      const pointsData = [
        {
          coordinates: [-25.264924131732304, -57.581434774372326],
          title: 'Colegio Técnico Javier (PY)',
          imageUrl: javier,
        },
        {
          coordinates: [-25.300851130980927, -57.57128754739459],
          title: 'Colegio Técnico Nacional de Asunción (PY)',
          imageUrl: asuncion,
        },
        {
          coordinates: [-33.252761448005984, -58.03194354511378],
          title: 'Escuela Técnica Superior Pedro Blanes Viale (UR)',
          imageUrl: viale,
        },
        {
          coordinates: [-34.91018810569311, -54.95883881988604],
          title: 'Escuela Técnica Superior de Maldonado (UR)',
          imageUrl: maldonado,
        },
        {
          coordinates: [-25.504181043943497, -54.576861162723716],
          title: 'Instituto Federal do Paraná (BR)',
          imageUrl: parana,
        },
        {
          coordinates: [-15.753722919924753, -47.87932671892631],
          title: 'Instituto Federal de Brasília (BR)',
          imageUrl: brasilia,
        },
        {
          coordinates: [-34.63518748730171, -58.473371962230196],
          title: 'Hogar Naval Stella Maris (AR)',
          imageUrl: naval,
        },
        {
          coordinates: [-25.385119782910873, -57.45772794419067],
          title: 'Los Lagos (PY)',
          imageUrl: lagos,
        }
      ];

      pointsData.forEach(point => {
        const marker = L.marker(point.coordinates, { icon: customIcon }).addTo(leafletMap);

        const popupContent = `
          <div class="popup-content">
            <h3>${point.title}</h3>
            <img src="${point.imageUrl}" alt="${point.title}" class="img-fluid rounded" />
          </div>
        `;

        marker.bindPopup(popupContent);
      });

      return () => {
        leafletMap.remove();
      };
    }
  }, []);

  return <div id="map" ref={mapRef} className="rounded" style={{ width: '100%', height: '450px' }}></div>;
};

export default Map;
