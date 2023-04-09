import React, { useContext, useEffect } from "react";
import frames from "../References/frames.json";
import * as Utils from "../References/utils";
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables';

function SetFrame(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const frameId = Utils.capitalizeEachWord(customShipParts.frameId);
  let {size, maneuverability, hp, dt, ct, expansions, minCrew, maxCrew, bpCost, specialAbility } = ship.getFramePackage()
  const { length, weight, acMod } = Tables.getSizeData(size)
  const { turnDistance, pilotingModifier } = Tables.getManeuverabilityData(maneuverability)
  const { currentPart } = props;

  let specialName = null
  if(specialAbility)specialName = Object.keys(specialAbility)[0]
  if (!dt) dt = 'n/a'

  useEffect(() => {
    // Running setFrame on render to initialize later components that depend on the frame 
    // This may not be needed this later
    ship.setFrame(frameId)
  }, [])

  const abbreviateSize = (size) => {
    if (size === "Supercolossal") return "Sc";
    return size[0];
  }

  const handleFrameIdChange = (ev) => {
    const frameOption = ev.target.value;
    
    ship.setFrame(frameOption)
  };

  return (
    <>
      <h3>{currentPart.name.toUpperCase()}</h3>

      <div className="dropdownBlock">
        <select onChange={handleFrameIdChange}>
          {frames.map((frame, idx) => (
            <option key={idx} id={frame.type} value={frame.type}>{`${frame.type} [${abbreviateSize(frame.size)}]`}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <div>Size: {size}</div>
        <div>Maneuverability: {maneuverability}</div>
      </div>
      
      <div className="row">
        <div>HP: {hp}</div>
        <div>DT: {dt}</div>
        <div>CT: {ct}</div>
        <div>Expansion Bays: {expansions}</div>
        <div>Minimum Crew: {minCrew}</div>
        <div>Maximum Crew: {maxCrew}</div>
      </div>

      <fieldset>
        <legend>Maneuverability</legend>
        <div className="row">
          <div>Turn Distance: {turnDistance}</div>
          <div>Piloting Mod: {pilotingModifier > 0 && '+'}{pilotingModifier}</div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Size</legend>
        <div className="row">
          <div>Length: {length}</div> 
          <div>Weight: {weight}</div> 
          <div>AC and TL Mod: {acMod > 0 ? `+${acMod}` : acMod}</div>
        </div>
      </fieldset>

      {specialAbility &&
        <fieldset>
          <legend>Special Ability</legend>
          <div><b>{specialName}</b> {specialAbility[specialName]}</div>
        </fieldset>
      }

      <div className="row totals">
        <div>BP Cost: {bpCost}</div>
      </div>
    </>
  );
}

export default SetFrame;
