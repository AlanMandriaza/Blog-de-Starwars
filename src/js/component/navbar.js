import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalFavContext } from "../../context/favcontext";



export const Navbar = () => {
  const { fav, removeFav } = useContext(GlobalFavContext);
  const [favorites, setFavorites] = useState([]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/people" className="nav-link">
                People
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/vehicles" className="nav-link">
                Vehicles
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/planets" className="nav-link">
                Planets
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                id="btnGroupDrop1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Favorites ({fav.length})
              </button>
              <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                {fav.length > 0 &&
                  fav.map((prod, i) => {
                    return (
                      <li key={i}>
                        <a className="dropdown-item" href="#">
                          {prod.name}
                          <i
                            className="far fa fa-trash mx-2"
                            onClick={() => removeFav(prod.name)}
                          ></i>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
