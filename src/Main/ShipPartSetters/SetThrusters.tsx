import React, { useContext } from "react";
import * as Tables from "./CustomRefs/metaTables";
import * as SF from "../References/shipFunctions";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "./Components/PartTitle";
import PartTotals from "./Components/PartTotals";
import SpecialMaterials from "./Components/SpecialMaterials";
import AccordionText from "./Components/AccordionText";
import { isValidThruster } from "./CustomRefs/optionValidation";
import { SetterProps } from "./CustomRefs/customInterface";


// TODO: Horacalcum increases the maximum speed of any thrusters by 1 and reduces a starship’s Piloting check penalty based on its maximum speed by 1 (minimum +0).
// ship.getSpeed() && ship.getPilotingMod()

function SetThrusters(props: SetterProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { thrustersId, frameId } = ship.getParts();
  const { speed, pilotingModifier, pcuCost, bpCost } = Tables.getThrusterData(thrustersId);
  const { size } = ship.getSize();
  const { currentPart } = props;

  const isHauler = frameId.includes("Hauler")

  const handleThrusterChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    let thrusterOption = ev.target.value;

    ship.setThrusters(thrusterOption)
  };

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <>
          <p>Ships rely on conventional thrusters to move between locations in a system, to navigate the reaches of the Drift once they arrive there, to explore, and to engage in combat They are designed for ships of a specific size (specified in the Size column of the table below), and they can't be installed in a ship of an incorrect size. The maximum speed of a starship's thrusters either grants a bonus or imparts a penalty to Piloting checks to fly the vessel, as noted on the table below.</p>
          <p>Thrusters are also used when landing on and taking off from a planet. Large and smaller Starships generally have little difficulty landing on and taking off from a planet with low gravity or standard gravity (unless there are atmospheric conditions such as high winds or storms). The GM determines whether or not a starship's pilot must attempt a Piloting check to land a starship with a speed lower than 8 on a planet with high gravity, with failure meaning it might crash. Due to their sheer size, Huge and larger starships can't land on planets, and must use shuttles or other means to ferry crew and goods to a planet and back.</p>
        </>
      </AccordionText>

      {isHauler && <div className="note">
        A hauler frame accommodates thrusters designed for starships 1 size category larger than normal.
      </div>}
      <div className="dropdownBlock">
        <label htmlFor="thrusters" className="hidden">Thruster Type</label>
        <select 
          id="thrusters"
          value={thrustersId || "None"} 
          onChange={handleThrusterChange}
        >
          {/* <option key="None">None</option> */}
          {Tables.getThrusterIdList().map((thruster, idx) =>
            isValidThruster(ship, thruster) 
            && <option key={idx} value={thruster}>
              {thruster} Thrusters
            </option>
          )}
        </select>
      </div>
      
      <SpecialMaterials part="Thrusters"/>
      
      <div className="note">
        The maximum speed of a starship's thrusters may grant a bonus or impart a penalty to Piloting checks to fly the vessel.
      </div>

      <div className="row">
        <div><strong>Speed (in hexes)</strong>: {speed}</div>
        <div><strong>Piloting Modifier</strong>: {pilotingModifier}</div>
      </div>
      {isHauler && <div><strong>Speed</strong>: {speed+2} -- while not hauling a ship</div>}

      <PartTotals part={currentPart} pcuCost={pcuCost} bpCost={bpCost} />
    </>
  );
}

export default SetThrusters;
