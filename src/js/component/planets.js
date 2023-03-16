import React, { useState, useEffect } from "react";

function Planets() {
  const [planets, setPlanets] = useState([]);

  function fetchPlanetsData() {
    fetch("https://www.swapi.tech/api/planets")
      .then((response) => response.json())
      .then((data) => {
        // Obtener los datos básicos de cada planeta
        const basicPlanetsData = data.results;

        // Para cada planeta, hacer otra llamada Fetch para obtener las propiedades completas
        const fetchPlanetsProperties = basicPlanetsData.map((planet) =>
          fetch(planet.url).then((response) => response.json())
        );

        // Esperar a que se completen todas las llamadas Fetch para las propiedades
        Promise.all(fetchPlanetsProperties)
          .then((planetsProperties) => {
            // Actualizar el estado con los datos completos de cada planeta
            const planetsData = basicPlanetsData.map((planet, index) => ({
              ...planet,
              properties: planetsProperties[index].result.properties,
            }));
            setPlanets(planetsData);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchPlanetsData();
  }, []);

  return (
    <div>
      <h1>Planets</h1>
      <div className="card-group">
        {planets.map((planet) => (
          <div className="card" style={{ width: "18rem" }} key={planet.uid}>
            <div className="card-body">
              <h5 className="card-title">{planet.name}</h5>
              <p>Terrain: {planet.properties.terrain}</p>
              <p>Population: {planet.properties.population}</p>
              <p>Diameter: {planet.properties.diameter}</p>
              <p>Gravity: {planet.properties.gravity}</p>
              <p>Created: {planet.properties.created}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planets;
