import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
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
          <ul className="navbar-nav">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};
