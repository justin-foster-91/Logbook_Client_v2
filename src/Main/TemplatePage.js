import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import templates from '../shipTemplates';
import frames from '../frames.json';
import {findComponentByFrameId, capitalizeEachWord} from '../utils';


const TemplatePage = (props) => {
  const [selectedTemplate, setSelectedTemplate] = useState({});

  return (
    <div className="templateDisplay">
      Template Page
      {/* {console.log(props.userShips)} */}
      <p></p>

      {
        templates.map((template, idx) => {
          return <button onClick={() => setSelectedTemplate(template)} value={template.shipName} key={idx}>{template.shipName || 'Template'} </button>
        })
      }

      <p></p>

      {selectedTemplate.shipName ?
        <div className="templateRender">
          {selectedTemplate.shipName} (Tier {selectedTemplate.tierId} {findComponentByFrameId(frames, selectedTemplate.frameId.replace("-", " "), 'size')} {capitalizeEachWord(selectedTemplate.frameId)})
        </div>
      : <div></div>}

      <p></p>

      <Link to="/hangar">
        <button>Cancel</button>
        <button onClick={() => props.setUserShips((userShips) => userShips.concat([selectedTemplate]))}>Add Ship</button>
      </Link>
      
    </div>
  );
}

export default TemplatePage;