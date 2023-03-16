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
      <div className="card-group">
        {people.map((person) => (
          <div className="card" style={{ width: "18rem" }} key={person.uid}>
            <div className="card-body">
              <h5 className="card-title">{person.name}</h5>
              <p>Height: {person.properties.height}</p>
              <p>Mass: {person.properties.mass}</p>
              <p>Hair Color: {person.properties.hair_color}</p>
              <p>Skin Color: {person.properties.skin_color}</p>
              <p>Eye Color: {person.properties.eye_color}</p>
              <p>Birth Year: {person.properties.birth_year}</p>
              <p>Gender: {person.properties.gender}</p>
              <p>Created: {person.properties.created}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;
