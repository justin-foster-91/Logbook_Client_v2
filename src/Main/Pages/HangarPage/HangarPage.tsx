// import { Link } from "react-router-dom";
import React, { useContext } from "react";
// import * as Utils from "../References/utils";
import * as SF from "../../References/shipFunctions";
import { ShipsContext } from "../../Context/shipContext";
// import TemplateConverter from './TemplateConverter'
import "./HangarPage.css";
import TemplatePage from "./TemplateOptions";

// Statikete: EMP Dispersal (Ex) "When a starship built with a statikete frame is hit with an EMP weapon, it reduces the duration of that weapon’s effect by half, rounded down to a minimum of 0 rounds."
// Vermelith: Extreme Resistance (Ex) "An EMP weapon has half its normal duration against a vessel built using this frame. The vessel has a +1 bonus to its AC against direct fire weapons that use gravity and a +1 bonus to Piloting checks the pilot attempts due to gravity, such as escaping a tractor beam. In addition, a biomechanical ship built from this frame treats its radiation exposure as 1 level lower when determining critical damage effects due to radiation."

// TODO: edits to ships from HangarPage should alter a temporary ship object until it is saved

const HangarPage = () => {
  const { userShips } = useContext(ShipsContext);

  return (
    <div className="hangarWrapper">
      <div className="hangarDisplay full-height">
        <h2>Hangar Page</h2>

        {/* Display ships that are present in the hangar */}
        {userShips.map((ship: any, idx: number) => {
          return (
            <div className="hangarShips hangarCard" key={ship.shipName + idx}>
              <div className="row">
                <div>{ship.shipName}</div>
                <div>(Tier {ship.tierId} [{SF.findComponentByFrameId(ship.frameId, "size")}]{" "}
                  {ship.frameId})
                </div>
              </div>
            </div>
          );
        })}

        <TemplatePage />

        {/* <Link to="/templates">
          <button>Ship Templates</button>
        </Link> */}
        <br/>
        {/* <Link to="/template_converter">
          <button>Converter</button>
        </Link> */}

      </div>
    </div>
  );
};

export default HangarPage;
