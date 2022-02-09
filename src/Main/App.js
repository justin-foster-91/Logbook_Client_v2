import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HangarPage from './Pages/HangarPage';
import TemplatePage from './Pages/TemplatePage';
import CustomShipPage from './Pages/CustomShipPage';
import { ShipsProvider } from "./Context/shipContext";

function App() {
  // const [userShips, setUserShips] = useState([])

  return (
    <ShipsProvider>
      <div className="App">
        <main className="Routes">
            <Routes>
              <Route index 
                element={<HangarPage
                  // userShips={userShips}
                  // setUserShips={setUserShips} 
                />}
              />
              <Route path={'hangar'} 
                element={<HangarPage 
                  // userShips={userShips}
                  // setUserShips={setUserShips} 
                />}
              />
              <Route path={'templates'} 
                element={<TemplatePage
                  // userShips={userShips}
                  // setUserShips={setUserShips} 
                />}
              />
              <Route path={'custom_ship'} element={<CustomShipPage/>}/>
            </Routes>
        </main>
      </div>
    </ShipsProvider>
  );
}

export default App;
