import React from "react";
import './Info.css'; // Importa un archivo CSS para estilos específicos

function Info({ Title, SubTitle, InfoText }) {
  return (
    <div className="ContCard">
      <div className="CardBody">
        <h5 className="CardTitle">{Title}</h5>
        <h6 className="CardSubtitle">{SubTitle}</h6>
        <p className="CardInfo">{InfoText}</p>
      </div>
    </div>
  );
}

export default Info;
