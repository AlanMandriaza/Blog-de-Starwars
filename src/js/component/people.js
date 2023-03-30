import React, { useState, useEffect, useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { GlobalFavContext } from "../../context/favcontext";

function People() {
  const [people, setPeople] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { addToFavorites } = useContext(GlobalFavContext);

  function fetchPeopleData() {
    fetch("https://www.swapi.tech/api/people")
      .then((response) => response.json())
      .then((data) => {
        // Obtener los datos básicos de cada personaje
        const basicPeopleData = data.results;

        // Para cada personaje, hacer otra llamada Fetch para obtener las propiedades completas
        const fetchPeopleProperties = basicPeopleData.map((person) =>
          fetch(person.url).then((response) => response.json())
        );

        // Esperar a que se completen todas las llamadas Fetch para las propiedades
        Promise.all(fetchPeopleProperties)
          .then((peopleProperties) => {
            // Actualizar el estado con los datos completos de cada personaje
            const peopleData = basicPeopleData.map((person, index) => ({
              ...person,
              properties: peopleProperties[index].result.properties,
            }));
            setPeople(peopleData);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    fetchPeopleData();
  }, []);

  const handleAddToFavorites = (person) => {
    setFavorites([...favorites, person]);
  };

  return (
    <div>
      
      <div className="container py-5">
      <h1>People</h1>
        <div className="d-flex flex-nowrap overflow-auto">
          {people.map((person) => (
            <div className="col-9" key={person.uid}>
              <div className="card mb-5" style={{ width: "800px" }}>
                <div className="row g-0">
                  <div className="col-md-6">
                    <img
                      src="https://dojiw2m9tvv09.cloudfront.net/10102/product/c3po-39845.jpg"
                      className="img-fluid rounded-start"
                      alt="..."
                      style={{ height: "383px" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">{person.name}</h5>
                      <p className="card-text">
                      Height: {person.properties.height}
                      </p>
                      <p className="card-text">
                        Weight: {person.properties.mass}
                      </p>
                      <p className="card-text">
                        Hair Color: {person.properties.hair_color}
                      </p>
                      <p className="card-text">
                        Skin Color: {person.properties.skin_color}
                      </p>
                      <p className="card-text">
                        Eye Color: {person.properties.eye_color}
                      </p>
                      <p className="card-text">
                        Birth: {person.properties.birth_year}
                      </p>
                      <p className="card-text">
                        Gender: {person.properties.gender}
                      </p>
                      <p className="card-text">
                      Created: {person.properties.created}
                      </p>
                      <button type="button" className="btn btn-primary">
                        Learn More!
                      </button>
                      <button
                        onClick={() =>
                          addToFavorites({
                            uid: person.uid,
                            name: person.name,
                          })
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

export default People;
