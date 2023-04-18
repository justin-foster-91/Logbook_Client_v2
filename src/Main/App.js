import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HangarPage from './Pages/HangarPage';
import TemplatePage from './Pages/TemplatePage';
import CustomShipPage from './Pages/CustomShipPage';
import { ShipsProvider, CustomShipProvider } from "./Context/shipContext";
import TemplateConverter from './Pages/TemplateConverter';

function App() {
  // const [userShips, setUserShips] = useState([])

  return (
    <ShipsProvider>
      <CustomShipProvider>
      <div className="App full-height">
        <main className="Routes full-height">
            <Routes>
              <Route index element={<HangarPage/>}/>
              {/* <Route path={'hangar'} element={<HangarPage/>}/> */}
              {/* <Route path={'templates'} element={<TemplatePage/>}/> */}
              <Route path={'custom_ship'} element={<CustomShipPage/>}/>
              <Route path={'template_converter'} element={<TemplateConverter/>}/>
            </Routes>
        </main>
      </div>
      </CustomShipProvider>
    </ShipsProvider>
  );
}

export default App;
