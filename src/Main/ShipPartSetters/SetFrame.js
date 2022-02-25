import React, { useContext, useEffect } from "react";
import frames from "../References/frames.json";
import * as Utils from "../References/utils";
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables';

function SetFrame() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const frameId = Utils.capitalizeEachWord(customShipParts.frameId);
  let {size, maneuverability, hp, dt, ct, expansions, minCrew, maxCrew, bpCost} = ship.getFramePackage()
  const { length, weight, acMod } = Tables.getSizeData(size)
  const { turnDistance, pilotingModifier } = Tables.getManeuverabilityData(maneuverability)

  useEffect(() => {
    // Running setFrame on render to initialize later components that depend on the frame 
    ship.setFrame(frameId)
  }, [])

  const handleFrameIdChange = (ev) => {
    const frameOption = ev.target.value;

    ship.setFrame(frameOption)
  };

  return (
    <>
      <h3>Frame</h3>

      <p></p>

      <select value={frameId} onChange={handleFrameIdChange}>
        {frames.map((frame, idx) => (
          <option key={idx}>{frame.type}</option>
        ))}
      </select>

      <p></p>

      <div>Size: {size}; Maneuverability: {maneuverability}</div>
      <div>
        HP {hp}; DT {dt}; CT{" "}
        {ct}; Expansion Bays {expansions}; Minimum Crew {minCrew}; Maximum Crew{" "}
        {maxCrew}
      </div>

      <fieldset>
        <legend>Maneuverability</legend>
        <div>
          Turn Distance: {turnDistance}; 
          Piloting Mod: {pilotingModifier > 0 && '+'}{pilotingModifier}
        </div>
      </fieldset>

      <fieldset>
        <legend>Size</legend>
        <div>
          Length: {length}; Weight: {weight}; AC and TL Mod: {acMod > 0 ? `+${acMod}` : acMod}
        </div>
      </fieldset>


      <div>BP Cost: {bpCost}</div>
    </>
  );
}

export default SetFrame;
