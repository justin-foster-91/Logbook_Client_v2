import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import templates from "../References/shipTemplates";
import { ShipsContext } from "../Context/shipContext";
import TemplateBreakdown from './TemplateBreakdown';

const TemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const { setUserShips } = useContext(ShipsContext);

  return (
    <div className="templateDisplay">
      <h2>Template Page</h2>

      <p></p>

      {/* Display template options */}
      {templates.map((template, idx) => {
        return (
          <button
            onClick={() => setSelectedTemplate(template)}
            value={template.shipName}
            key={"template" + idx}
          >
            {template.shipName || "Template"}{" "}
          </button>
        );
      })}

      <p></p>

      {/* Display details of selected template */}
      {selectedTemplate.shipName ? (
        <TemplateBreakdown {...selectedTemplate} />
      ) : (
        <div></div>
      )}

      <p></p>

      <Link to="/custom_ship">
        <button>Custom Ship</button>
      </Link>

      <p></p>

      <Link to="/hangar">
        <button>Cancel</button>
        <button
          onClick={() =>
            setUserShips((userShips) => userShips.concat([selectedTemplate]))
          }
        >
          Add Ship
        </button>
      </Link>
    </div>
  );
};

export default TemplatePage;
