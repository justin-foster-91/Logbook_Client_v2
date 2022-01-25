import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HangarPage from './HangarPage';
import TemplatePage from './TemplatePage';

function App() {
  const [userShips, setUserShips] = useState([])

  return (
    <div className="App">
      <main className="Routes">
          <Routes>
            <Route index 
              element={<HangarPage
                userShips={userShips}
                setUserShips={setUserShips} 
              />}
            />
            <Route path={'hangar'} 
              element={<HangarPage 
                userShips={userShips}
                setUserShips={setUserShips} 
              />}
            />
            <Route path={'templates'} 
              element={<TemplatePage
                userShips={userShips}
                setUserShips={setUserShips} 
              />}
            />
          </Routes>
      </main>
    </div>
  );
}

export default App;
