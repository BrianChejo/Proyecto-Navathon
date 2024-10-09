import { Link } from "react-router-dom";


export function LogoYNombre({ Link, Nombre, Logo }){
  return(
    <a className="LogoA" href={Link}>
      <img src={ Logo } alt="Logo" width="100%" height="50vh" className="logo" />
    </a>
  )
}

export function Icon1({ Ruta, Icon1, Nombre }){
  return(
    <div className="Logo2">
      <Link className="nav-link"to={Ruta}>
        <img src={Icon1} alt="Icono" width="350vw" height="400vh" className="d-inline-block align-text-center img-fluid" />
      </Link>
    </div>
  )
}

export function Icon2({ Ruta, Icono }){
  return(
    <span className="navbar-text">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={Ruta}>
            <img src={ Icono } alt="Home Icon" width="50vw" height="40" className="d-inline-block align-text-centre img-fluid" />
          </Link>
        </li>
      </ul>
    </span>
  )
}