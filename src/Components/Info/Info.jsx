import React from "react";

function Info({Title, SubTitle, InfoText}){
  return(
    <div className="ContCard" style={{ width: '100%' }}>
      <div className="CardBody">
        <h5 className="CardTitle">{Title}</h5>
        <h6 className="CardSubtitle">{SubTitle}</h6>
        <p className="CardInfo">{InfoText}</p>
      </div> 
    </div>
  )
};

export default Info;