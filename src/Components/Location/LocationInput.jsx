import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LocationInput = ({ options }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShow(event.target.value.length > 0);
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShow(true)}
        onBlur={() => setTimeout(() => setShow(false), 200)}
        placeholder="Quiero los datos de..."
        className="form-control w-100 fs-4"
      />
      {show && (
        <div
          className="dropdown-menu show w-100"
          style={{ maxHeight: '200px', overflowY: 'auto', transition: 'all 0.2s ease-in-out' }}
        >
          {options.filter(option => 
            option.toLowerCase().includes(inputValue.toLowerCase())
          ).map((option, index) => (
            <button 
              key={index} 
              className="dropdown-item" 
              onMouseDown={() => setInputValue(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;