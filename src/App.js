import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import templates from './shipTemplates';

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

const HangarPage = (props) => {
  return (
    <div className="hangarDisplay">
      Hangar Page
      {console.log(props.userShips)}
      <p></p>

      {props.userShips.map((ship) => {return ship.shipName})}
      
      <p></p>
      <Link to='/templates' >
        <button>Templates</button>
      </Link>
    </div>
  );
}

const TemplatePage = (props) => {
  const [selectedTemplate, setSelectedTemplate] = useState({});

  return (
    <div className="templateDisplay">
      Template Page
      {console.log(props.userShips)}
      <p></p>

      {
        templates.map((template, idx) => {
          return <button onClick={() => setSelectedTemplate(template)} value={template.shipName} key={idx}>{template.shipName || 'Template'} </button>
        })
      }

      <p></p>

      {selectedTemplate.shipName ?
        <div className="templateRender">
          {selectedTemplate.shipName} (Tier {selectedTemplate.tierId} {selectedTemplate.frameId})
        </div>
      : <div></div>}

      <p></p>

      <Link to="/hangar">
        <button>Cancel</button>
        <button onClick={() => props.setUserShips((userShips) => userShips.concat([selectedTemplate]))}>Select</button>
      </Link>
      
    </div>
  );
}

export default App;
