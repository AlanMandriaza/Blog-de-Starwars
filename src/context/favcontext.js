import React, { createContext, useState } from 'react';

export const GlobalFavContext = createContext();

const actions = {
  addToFav: (setFavorites) => (item) => {
    setFavorites((prevState) => [...prevState, item]);
  },
  removeFav: (setFavorites) => (item) => {
    setFavorites((prevState) => prevState.filter((favItem) => favItem.name !== item.name));
  },
};

export const GlobalFavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const contextValue = {
    fav: favorites,
    addToFav: actions.addToFav(setFavorites),
    removeFav: actions.removeFav(setFavorites),
  };

  return (
    <GlobalFavContext.Provider value={contextValue}>
      {children}
    </GlobalFavContext.Provider>
  );
};
