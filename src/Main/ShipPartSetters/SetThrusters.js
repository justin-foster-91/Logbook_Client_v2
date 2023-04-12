import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import * as SF from "../References/shipFunctions";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";
import PowerIcon from "../IconRefs/PowerIcon";
import BuildIcon from "../IconRefs/BuildIcon";

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
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <select value={thrustersId ? thrustersId : "None"} onChange={handleThrusterChange}>
          {/* <option key="None">None</option> */}
          {Tables.getThrusterIdList().map((thruster, idx) =>
            SF.doesFrameSizeAllowThruster(thruster, size) 
            && <option key={idx} value={thruster}>
              {thruster} Thrusters
            </option>
          )}
        </select>
      </div>

      {/* TODO: */}
      <div>Special Material:</div>
      {/* https://www.aonsrd.com/StarshipMaterials.aspx */}

      <div className="note">
        The maximum speed of a starship's thrusters may grant a bonus or impart a penalty to Piloting checks to fly the vessel.
      </div>

      <div className="row">
        <div><strong>Speed (in hexes)</strong>: {speed}</div>
        <div><strong>Piloting Modifier</strong>: {pilotingModifier}</div>
      </div>

      <PartTotals part={currentPart} pcuCost={pcuCost} bpCost={bpCost} />
    </>
  );
}

export default SetThrusters;
