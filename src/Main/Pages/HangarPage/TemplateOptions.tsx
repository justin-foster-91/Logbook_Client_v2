import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import templates from "../../References/shipTemplates";
import { ShipsContext } from "../../Context/shipContext";
import TemplateBreakdown from '../TemplateBreakdown';
import { ShipParts, ShipPartKeys } from "../../ShipPartSetters/CustomRefs/customInterface";

const TemplatePage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ShipParts>({});
  const { setUserShips } = useContext(ShipsContext);

  return (
    <div className="templateDisplay hangarCard">
      <h3>New Ship</h3>

      {/* Display template options */}
      <div className="row">
        {templates.map((template, idx) => {
          return (
            <button
              onClick={() => setSelectedTemplate(template)}
              value={template.shipName}
              key={"template" + idx}
            >
              {template.shipName || "Template"}
            </button>
          );
        })}
      </div>

      {/* Display details of selected template */}
      {selectedTemplate.shipName && (
        <TemplateBreakdown {...selectedTemplate} />
      )}

      <div className="row">
        <Link to="/custom_ship">
          <button>Custom Ship</button>
        </Link>

        <Link to="/">
          {/* <button>Cancel</button> */}
          <button
            onClick={() => setUserShips((userShips: any) => userShips.concat([selectedTemplate]))}
          >
            Add Ship
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TemplatePage;
