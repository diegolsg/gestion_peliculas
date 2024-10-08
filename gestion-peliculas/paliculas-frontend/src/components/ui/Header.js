import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" exact to ='/'>
          PELICULAS
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact to ='/medias'>
                Medias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact to ='/productoras'>
                Productoras
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact to ='/directores'>
                Directores
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact to ='/generos'>
                Generos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName='active' exact to ='/tipos'>
                Tipos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export {
     Header
}
