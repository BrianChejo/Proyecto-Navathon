import React from 'react';
import LocationInput from './LocationInput';
import ButtonLocation from './ButtonsLocation';
function Location() {
  const predefinedLocations = ['Argentina', 'Brasil', 'Paraguay', 'Uruguay'];
  
  return (
    <main style={{ 
      width: '100vw',
      height: '70vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      
      <div className="container mt-3">
        <div className="container mt-5">
          
          <h2>Quiero los datos climáticos de:</h2>
          
          <LocationInput options={predefinedLocations} />
          <div className='ContButtonLocation'>
            <ButtonLocation />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Location;
