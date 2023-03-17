import React, { useState, useEffect } from "react";

function People() {
  const [people, setPeople] = useState([]);

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

  return (
    <div>
      <h1>People</h1>
      <div className="container-fluid">
        <div className="row">
          {people.map((person) => (
            <div className="col-md-4 col-lg-3 mb-4" key={person.uid}>
              <div className="card h-100">
                <img
                  src="https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_fb34a1ff.jpeg?region=131%2C0%2C951%2C536"
                  className="card-img-top"
                  alt="Luke Skywalker"
                  style={{ height: 250, width: 250, objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  <p className="card-text">Height: {person.properties.height}</p>
                  <p className="card-text">Mass: {person.properties.mass}</p>
                  <p className="card-text">Hair Color: {person.properties.hair_color}</p>
                  <p className="card-text">Skin Color: {person.properties.skin_color}</p>
                  <p className="card-text">Eye Color: {person.properties.eye_color}</p>
                  <p className="card-text">Birth Year: {person.properties.birth_year}</p>
                  <p className="card-text">Gender: {person.properties.gender}</p>
                  <p className="card-text">Created: {person.properties.created}</p>
                  <div className="card-footer">
                    <a href="#" className="card-link">
                      Learn More
                    </a>
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
