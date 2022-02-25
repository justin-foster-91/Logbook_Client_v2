import { Link } from "react-router-dom";
import React, { useContext } from "react";
import * as Utils from "../References/utils";
import * as SF from "../References/shipFunctions";
import { ShipsContext } from "../Context/shipContext";
import TemplateConverter from './TemplateConverter'

// Statikete: EMP Dispersal (Ex) "When a starship built with a statikete frame is hit with an EMP weapon, it reduces the duration of that weapon’s effect by half, rounded down to a minimum of 0 rounds."
// Vermelith: Extreme Resistance (Ex) "An EMP weapon has half its normal duration against a vessel built using this frame. The vessel has a +1 bonus to its AC against direct fire weapons that use gravity and a +1 bonus to Piloting checks the pilot attempts due to gravity, such as escaping a tractor beam. In addition, a biomechanical ship built from this frame treats its radiation exposure as 1 level lower when determining critical damage effects due to radiation."

// TODO: edits to ships from HangarPage should alter a temporary ship object until it is saved

const HangarPage = () => {
  const { userShips } = useContext(ShipsContext);

  return (
    <div className="hangarDisplay">
      <h2>Hangar Page</h2>

      <p></p>

      {/* Display ships that have been selected */}
      {userShips.map((ship, idx) => {
        return (
          <div className="hangarShips" key={ship.shipName + idx}>
            {/* TODO: double check this replace usage */}
            {ship.shipName} (Tier {ship.tierId} [
            {SF.findComponentByFrameId(ship.frameId.replace("-", " "), "size")}]{" "}
            {ship.frameId})
          </div>
        );
      })}

      <p></p>

      <Link to="/templates">
        <button>Ship Templates</button>
      </Link>
      <br/>
      <Link to="/template_converter">
        <button>Converter</button>
      </Link>

    </div>
  );
};

export default HangarPage;
