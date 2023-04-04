import React, { useContext, useEffect } from "react";
import frames from "../References/frames.json";
import * as Utils from "../References/utils";
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables';

function SetFrame() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const frameId = Utils.capitalizeEachWord(customShipParts.frameId);
  let {size, maneuverability, hp, dt, ct, expansions, minCrew, maxCrew, bpCost, specialAbility } = ship.getFramePackage()
  const { length, weight, acMod } = Tables.getSizeData(size)
  const { turnDistance, pilotingModifier } = Tables.getManeuverabilityData(maneuverability)
  let specialName = null
  if(specialAbility)specialName = Object.keys(specialAbility)[0]

  // FIXME: default should be "Light Freighter"

  useEffect(() => {
    // console.log("start frame: ", customShipParts.frameId);
    console.log("frameId: ", frameId);
    // Running setFrame on render to initialize later components that depend on the frame 
    // This may not be needed this later
    ship.setFrame(frameId)
  }, [])

  const abbreviateSize = (size) => {
    if (size === "Supercolossal") return "Sc";
    return size[0];
  }

  const handleFrameIdChange = (ev) => {
    const frameOption = ev.target.selectedOptions[0].id;
    
    // console.log(ev.target.selectedOptions[0].id);
    // console.log(ev.target);
    // console.log(ev.target.innerHTML);

    ship.setFrame(frameOption)
    console.log("frame option: ", frameOption);
    console.log("frame: ", ship.frameId);
  };

  return (
    <>
      <h3>Frame</h3>

      <p></p>

      <select value={`${frameId} [${abbreviateSize(size)}]`} onChange={handleFrameIdChange}>
        {frames.map((frame, idx) => (
          <option key={idx} id={frame.type}>{`${frame.type} [${abbreviateSize(frame.size)}]`}</option>
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

      {specialAbility &&
      <fieldset>
        <legend>Special Ability</legend>
        <div><b>{specialName}</b> {specialAbility[specialName]}</div>
      </fieldset>}


      <div>BP Cost: {bpCost}</div>
    </>
  );
}

export default SetFrame;
