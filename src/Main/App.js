import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HangarPage from './Pages/HangarPage';
import TemplatePage from './Pages/TemplatePage';
import CustomShipPage from './Pages/CustomShipPage';
import { ShipsProvider, CustomShipsProvider } from "./Context/shipContext";

function App() {
  // const [userShips, setUserShips] = useState([])

  return (
    <ShipsProvider>
      <CustomShipsProvider>
      <div className="App">
        <main className="Routes">
            <Routes>
              <Route index element={<HangarPage/>}/>
              <Route path={'hangar'} element={<HangarPage/>}/>
              <Route path={'templates'} element={<TemplatePage/>}/>
              <Route path={'custom_ship'} element={<CustomShipPage/>}/>
            </Routes>
        </main>
      </div>
      </CustomShipsProvider>
    </ShipsProvider>
  );
}

export default App;
