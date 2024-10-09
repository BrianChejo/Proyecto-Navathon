import React from 'react';
import styled from 'styled-components';
import horas from '../../Images/24hs.png';
import info from '../../Images/info.png';
import mapa from '../../Images/mapaboton.png';

const StyledButton = styled.button`
  background-color: white;
  color: black;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  height: auto;

  &:hover {
    background-color: #f1f1f1;
  }

  img {
    margin-right: 10px;
  }
`;

function ButtonsLocation() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <StyledButton onClick={() => scrollToSection('sectionLocation')}>
        <img src={mapa} alt="Botón Mapa" style={{ width: '150px', height: 'auto' }} />
      </StyledButton>
      <StyledButton onClick={() => scrollToSection('sectionChart')}>
        <img src={horas} alt="Botón 24 Horas" style={{ width: '150px', height: 'auto' }} />
      </StyledButton>
      <StyledButton onClick={() => scrollToSection('sectionInfo')}>
        <img src={info} alt="Botón Info" style={{ width: '150px', height: 'auto' }} />
      </StyledButton>
   </>
  );
}

export default ButtonsLocation;
