import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import * as SF from "../References/shipFunctions";
import { CustomShipContext } from "../Context/shipContext";

function SetThrusters(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { thrustersId } = customShipParts;
  const { speed, pilotingModifier, pcuCost, bpCost } = Tables.getThrusterData(thrustersId);
  const { size } = SF.getFramePackageFromShip(customShipParts);
  const { currentPart } = props;


  const handleThrusterChange = (ev) => {
    let thrusterOption = ev.target.value;
    // if (thrusterOption === "None") thrusterOption = null;

    ship.setThrusters(thrusterOption)
  };

  return (
    <>
      <h3>{currentPart.name.toUpperCase()}</h3>

      <select value={thrustersId ? thrustersId : "None"} onChange={handleThrusterChange}>
        {/* <option key="None">None</option> */}
        {Tables.getThrusterIdList().map((thruster, idx) =>
          SF.doesFrameSizeAllowThruster(thruster, size) 
          && <option key={idx} value={thruster}>
            {thruster} Thrusters
          </option>
        )}
      </select>

      {/* TODO: */}
      <div>Special Material:</div>
      {/* https://www.aonsrd.com/StarshipMaterials.aspx */}

      <div className="note">
        The maximum speed of a starship's thrusters may grant a bonus or impart a penalty to Piloting checks to fly the vessel.
      </div>

      <div className="row">
        <div>Speed (in hexes): {speed}</div>
        <div>Piloting Modifier: {pilotingModifier}</div>
      </div>

      <div className="row totals">
        <div>PCU cost: {pcuCost}</div>
        <div>BP cost: {bpCost}</div>
      </div>
    </>
  );
}

export default SetThrusters;
