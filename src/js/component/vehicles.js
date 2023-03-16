import React, { useState, useEffect } from "react";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/vehicles")
      .then((response) => response.json())
      .then((data) => setVehicles(data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.uid}>
            <h2>{vehicle.name}</h2>
            <p>Model: {vehicle.model}</p>
            <p>Manufacturer: {vehicle.manufacturer}</p>
            <p>Class: {vehicle.vehicle_class}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vehicles;
