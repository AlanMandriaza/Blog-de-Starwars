import React, { useState, useEffect } from "react";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(fetchVehiclesData, []);

  function fetchVehiclesData() {
    fetch("https://www.swapi.tech/api/vehicles")
      .then((response) => response.json())
      .then((data) => {
        // Obtener los datos básicos de cada vehículo
        const basicVehicleData = data.results;

        // Para cada vehículo, hacer otra llamada Fetch para obtener las propiedades completas
        const fetchVehicleProperties = basicVehicleData.map((vehicle) =>
          fetch(vehicle.url).then((response) => response.json())
        );

        // Esperar a que se completen todas las llamadas Fetch para las propiedades
        Promise.all(fetchVehicleProperties)
          .then((vehicleProperties) => {
            // Actualizar el estado con los datos completos de cada vehículo
            const vehiclesData = basicVehicleData.map((vehicle, index) => ({
              ...vehicle,
              properties: vehicleProperties[index].result.properties,
            }));
            setVehicles(vehiclesData);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Vehicles</h1>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.uid}>
            <h2>{vehicle.name}</h2>
            <p>Model: {vehicle.model}</p>
            <p>Manufacturer: {vehicle.manufacturer}</p>
            {vehicle.properties && (
              <ul>
                {Object.entries(vehicle.properties).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vehicles;
