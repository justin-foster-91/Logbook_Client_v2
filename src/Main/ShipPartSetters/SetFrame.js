import React, { useContext, useEffect, useState } from "react";
import frames from "./CustomRefs/frames";
import * as Utils from "../References/utils";
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables';
import PartTitle from "./Components/PartTitle";
import PartTotals from "./Components/PartTotals";
import AccordionText from "./Components/AccordionText";

function SetFrame(props) {
  const { customShipParts, ship, activeSources } = useContext(CustomShipContext);
  const [specialName, setSpecialName] = useState(null);
  
  const frameId = Utils.capitalizeEachWord(customShipParts.frameId);
  let {size, maneuverability, hp, dt, ct, expansions, minCrew, maxCrew, bpCost, specialAbility } = ship.getFramePackage()
  const { length, weight, acMod } = Tables.getSizeData(size)
  const { turnDistance, pilotingModifier } = Tables.getManeuverabilityData(maneuverability)
  const { currentPart } = props;

  const frameList = Tables.getFrameIdList();

  useEffect(() => {
    if (specialAbility) setSpecialName(Object.keys(specialAbility)[0])
  }, [specialAbility])

  const abbreviateSize = (size) => {
    if (size === "Supercolossal") return "Sc";
    return size[0];
  }

  const handleFrameIdChange = (ev) => {
    const frameOption = ev.target.value;
    
    ship.setFrame(frameOption, activeSources)
  };

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <p>Each starship has a base frame that determines its size, maneuverability, starting weapon mounts, hull strength, room for expansion, and other capacities. Although two ships that use the same frame might look radically different, they both have some of these base statistics in common. The frame of a starship includes all life support and artificial gravity systems necessary to keep the crew (and any passengers) alive and comfortable. The starship's frame is also built with a transponder that is essentially the ship's “address” for standard system-wide and unlimited-range communications (see page 430, CRB); this transponder can be turned off, during which time the starship can't send or receive messages, but neither can it be tracked down by conventional means.</p>
      </AccordionText>

      <div className="dropdownBlock">
        <label htmlFor="frameId" className="hidden">Frame Type</label>
        <select id="frameId" onChange={handleFrameIdChange}>
          {frames.map((frame, idx) => (
            <option key={idx} id={frame.type} value={frame.type}>{`${frame.type} [${abbreviateSize(frame.size)}]`}</option>
          ))}
        </select>
      </div>

      <div className="row">
        <div><strong>Size</strong>: {size}</div>
        <div><strong>Maneuverability</strong>: {maneuverability}</div>
      </div>
      
      <div className="row">
        <div><strong>HP</strong>: {hp}</div>
        <div><strong>DT</strong>: {dt || "n/a"}</div>
        <div><strong>CT</strong>: {ct}</div>
        <div><strong>Expansion Bays</strong>: {expansions}</div>
        <div><strong>Minimum Crew</strong>: {minCrew}</div>
        <div><strong>Maximum Crew</strong>: {maxCrew}</div>
      </div>

      <fieldset>
        <legend>Maneuverability</legend>
        <div className="row">
          <div><strong>Turn Distance</strong>: {turnDistance}</div>
          <div><strong>Piloting Mod</strong>: {pilotingModifier > 0 && '+'}{pilotingModifier}</div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Size</legend>
        <div className="row">
          <div><strong>Length</strong>: {length}</div> 
          <div><strong>Weight</strong>: {weight}</div> 
          <div><strong>AC and TL Mod</strong>: {acMod > 0 && '+'}{acMod}</div>
        </div>
      </fieldset>

      {specialAbility &&
        <fieldset>
          <legend>Special Ability</legend>
          <div><strong>{specialName}</strong> {specialAbility[specialName]}</div>
        </fieldset>
      }

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetFrame;
