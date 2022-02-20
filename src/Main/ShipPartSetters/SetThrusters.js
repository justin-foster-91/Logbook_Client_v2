import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import * as SF from "../References/shipFunctions";
import { CustomShipContext } from "../Context/shipContext";

function SetThrusters() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  
  const { thrustersId } = customShipParts;
  const { speed, pilotingModifier, pcuCost, bpCost } = Tables.getThrusterData(thrustersId);
  const { size } = SF.getFramePackageFromShip(customShipParts);

  const handleThrusterChange = (ev) => {
    let thrusterOption = ev.target.value;
    if (thrusterOption === "None") thrusterOption = null;

    ship.setThrusters(thrusterOption)
    setCustomShipParts({ ...customShipParts });
  };

  return (
    <>
      <h3>Thrusters</h3>
      <p></p>
      <select value={thrustersId ? thrustersId : "None"} onChange={handleThrusterChange}>
        <option key="None">None</option>
        {Tables.getThrusterIdList().map((thruster, idx) =>
          SF.doesFrameSizeAllowThruster(thruster, size) 
          && <option key={idx} value={thruster}>
            {thruster} Thrusters
          </option>
        )}
      </select>
      <br />
      {/* TODO: */}
      Special Material:
      <p></p>
      The maximum speed of a starship’s thrusters may grant a bonus or impart a penalty to Piloting checks to fly the vessel.
      <div>
        Speed (in hexes): {speed}; Piloting Modifier: {pilotingModifier}
      </div>
      PCU cost: {pcuCost}; BP cost: {bpCost}
    </>
  );
}

export default SetThrusters;
