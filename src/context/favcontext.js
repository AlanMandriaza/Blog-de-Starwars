import React, { createContext, useState } from 'react';

export const GlobalFavContext = createContext();

const actions = {
  addToFavorites: (setFavorites) => (item) => {
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
    addToFavorites: actions.addToFavorites(setFavorites),
    removeFav: actions.removeFav(setFavorites),
  };

  return (
    <GlobalFavContext.Provider value={contextValue}>
      {children}
    </GlobalFavContext.Provider>
  );
};
