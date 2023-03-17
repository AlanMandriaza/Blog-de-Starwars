import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

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

      <div className="container py-5">
        <div className="d-flex flex-nowrap overflow-auto">
          {vehicles.map((vehicle) => (
            <div className="col-12" key={vehicle.uid}>
              <div className="card mb-5" style={{ width: "800px" }}>
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src="https://static.wikia.nocookie.net/starwars/images/e/e1/Lukes_T-16_Skyhopper_TT.png"
                      className="img-fluid rounded-start"
                      alt="..."
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{vehicle.name}</h5>
                      <p className="card-text">Model: {vehicle.model}</p>
                      <p className="card-text">
                        Manufacturer: {vehicle.manufacturer}
                      </p>
                      {vehicle.properties && (
                        <>
                          <p className="card-text">
                            Cargo Capacity: {vehicle.properties.cargo_capacity}
                          </p>
                          <p className="card-text">
                            Consumables: {vehicle.properties.consumables}
                          </p>
                          <p className="card-text">
                            Cost in Credits: {vehicle.properties.cost_in_credits}
                          </p>
                          <p className="card-text">
                            Crew: {vehicle.properties.crew}
                          </p>
                          <p className="card-text">
                            Length: {vehicle.properties.length}
                          </p>
                          <p className="card-text">
                            Max Atmosphering Speed:{" "}
                            {vehicle.properties.max_atmosphering_speed}
                          </p>
                          <p className="card-text">
                            Model: {vehicle.properties.model}
                          </p>
                          <p className="card-text">
                            Passengers: {vehicle.properties.passengers}
                          </p>
                          <p className="card-text">
                            Vehicle Class: {vehicle.properties.vehicle_class}
                          </p>
                          <button type="button" class="btn btn-primary">Learn More</button>
                          <FaHeart/>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>

    </div>
  );
};

export default Vehicles;

