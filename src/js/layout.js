import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import { GlobalFavProvider } from "../context/favcontext";

import ScrollToTop from "./component/scrollToTop";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import People from "./component/people";
import Planets from "./component/planets";
import Vehicles from "./component/vehicles";


const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <GlobalFavProvider>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Navbar />
            <Routes>
              <Route path="/" element={<People />} />
        
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/planets" element={<Planets />} />
              <Route path="/people" element={<People />} />
              <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
            <Footer />
          </ScrollToTop>
        </BrowserRouter>
      </GlobalFavProvider>
    </div>
  );
};

export default injectContext(Layout);
