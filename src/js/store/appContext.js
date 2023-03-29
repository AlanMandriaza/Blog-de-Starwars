import React, { useState, useEffect } from "react";
import { GlobalFavProvider } from "../../context/favcontext";


// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
  const StoreWrapper = props => {
    // The initial value for the context is not null anymore, but the current state of this component,
    // the context will now have a getStore, getActions and setStore functions available, because they were declared
    // on the state of this component
    return (
      <GlobalFavProvider>
        <Context.Provider>
          <PassedComponent {...props} />
        </Context.Provider>
      </GlobalFavProvider>
    );
  };
  return StoreWrapper;
};

export default injectContext;
