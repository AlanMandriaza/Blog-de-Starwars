import React, { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { GlobalFavContext } from "../../context/favcontext";

function Planets() {
  const [planets, setPlanets] = useState([]);
  const { fav, addToFavorites } = useContext(GlobalFavContext);

  function fetchPlanetsData() {
    fetch("https://www.swapi.tech/api/planets")
      .then((response) => response.json())
      .then((data) => {
        const basicPlanetsData = data.results;

        const fetchPlanetsProperties = basicPlanetsData.map((planet) =>
          fetch(planet.url).then((response) => response.json())
        );

        Promise.all(fetchPlanetsProperties)
          .then((planetsProperties) => {
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
      
      <div className="container py-5">
      <h1>Planets</h1>
        <div className="d-flex flex-nowrap overflow-auto">
          {planets.map((planet) => (
            <div className="col-9" key={planet.uid}>
              <div className="card mb-5" style={{ width: "800px" }}>
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src="https://sm.ign.com/t/ign_za/gallery/e/every-plan/every-planet-and-location-in-star-wars-battlefront-2s-multip_uxzr.1080.jpg"
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ height: "383px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{planet.name}</h5>
                      <p className="card-text">
                        Terrain: {planet.properties.terrain}
                      </p>
                      <p className="card-text">
                        Population: {planet.properties.population}
                      </p>
                      <p className="card-text">
                        Diameter: {planet.properties.diameter}
                      </p>
                      <p className="card-text">
                        Gravity: {planet.properties.gravity}
                      </p>
                      <p className="card-text">
                        Created: {planet.properties.created}
                      </p>
                      <button type="button" className="btn btn-primary">
                        Learn More
                      </button>
                      <button
                        onClick={() =>
                          addToFavorites({ uid: planet.uid, name: planet.name })
                        }
                      >
                        <FaHeart />
                      </button>
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
  
}

export default Planets;
