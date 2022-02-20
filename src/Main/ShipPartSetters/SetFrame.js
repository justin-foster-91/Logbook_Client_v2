import React, { useContext } from "react";
import frames from "../References/frames.json";
import * as Utils from "../References/utils";
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables';

function SetFrame() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  
  const frameId = Utils.capitalizeEachWord(customShipParts.frameId);
  let {size, maneuverability, hp, dt, ct, expansions, minCrew, maxCrew, bpCost} = ship.getFramePackage()
  const { length, weight, acMod } = Tables.getSizeData(size)

  const handleFrameIdChange = (ev) => {
    const frameOption = ev.target.value;

    ship.setFrame(frameOption)
    setCustomShipParts({ ...customShipParts });
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

      <div>Size: {size}</div>
      <div>
        Maneuverability {maneuverability}; HP {hp}; DT {dt}; CT{" "}
        {ct}; Expansion Bays {expansions}; Minimum Crew {minCrew}; Maximum Crew{" "}
        {maxCrew}
      </div>
      <div>
        Length: {length}; Weight: {weight}; AC and TL Mod: {acMod > 0 ? `+${acMod}` : acMod}
      </div>
      <div>BP Cost: {bpCost}</div>
    </>
  );
}

export default SetFrame;
