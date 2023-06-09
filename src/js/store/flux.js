// favcontext.js
import { createContext, useState } from 'react';

export const GlobalFavContext = createContext();

const actions = {
  addToFavorites: (item, setFavorites) => {
    setFavorites((prevState) => [...prevState, item]);
  },
  removeFavorite: (item, setFavorites) => {
    setFavorites((prevState) => prevState.filter((favItem) => favItem.name !== item.name));
  },
};

export const GlobalFavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const contextActions = {
    addToFavorites: (item) => actions.addToFavorites(item, setFavorites),
    removeFavorite: (item) => actions.removeFavorite(item, setFavorites),
  };

  return (
    <GlobalFavContext.Provider value={{ fav: favorites, ...contextActions }}>
      {children}
    </GlobalFavContext.Provider>
  );
};
