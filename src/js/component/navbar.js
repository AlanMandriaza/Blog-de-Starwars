import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Star Wars API</span>
			</Link>
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link to="/people" className="nav-link">
						People
					</Link>
				</li>
				<li className="nav-item">
					<NavLink to="/vehicles" className="nav-link">
						Vehicles
					</NavLink>
				</li>
				<li className="nav-item">
					<Link to="/planets" className="nav-link">
						Planets
					</Link>
				</li>
			</ul>
		</nav>
	);
};
