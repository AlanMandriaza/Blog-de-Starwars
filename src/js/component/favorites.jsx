import React, { useContext } from "react";
import React from "react";
import React from "react";

import { GlobalFavContext } from "../context/favcontext";

const Favorites = () => {
  const { fav } = useContext(GlobalFavContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-primary">Favorites</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {fav.length > 0 &&
                fav.map((favorite, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{favorite.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
