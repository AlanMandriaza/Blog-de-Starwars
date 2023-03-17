import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [favorites, setFavorites] = useState([]);

  const handleAddToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

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
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-link nav-link"
                onClick={() => handleAddToFavorites("item")}
              >
                Add to Favorites
              </button>
            </li>
          </ul>
          <a className="navbar-brand me-auto" href="#">
            Favorites ({favorites.length})
          </a>
        </div>
      </div>
    </nav>
  );
};
