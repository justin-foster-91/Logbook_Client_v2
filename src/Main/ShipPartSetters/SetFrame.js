import React, { useContext } from 'react';
import { setNewFrame } from '../References/shipFunctions';
import frames from '../References/frames.json'
import { capitalizeEachWord } from '../References/utils';
import { CustomShipContext } from "../Context/shipContext";


function SetFrame() {
  const { customShipParts, setCustomShipParts, framePackage } = useContext(CustomShipContext);

  let frameId = capitalizeEachWord(customShipParts.frameId);

  let {size, maneuverability, hp, dt, ct, expansions, minCrew, maxCrew, bpCost} = framePackage

  const handleFrameIdChange = (ev) => {
    let frameOption = ev.target.value

    setNewFrame(customShipParts, frameOption)
    setCustomShipParts({...customShipParts})
  }

  return (
    <>
      <h3>Frame</h3>

      <p></p>

      <select defaultValue={frameId} onChange={handleFrameIdChange}>
        {frames.map((frame, idx) => <option key={idx}>{frame.type}</option>)}
      </select>

      <p></p>

      <div>
        Size {size}; 
        Maneuverability {maneuverability}; 
        HP {hp}; 
        DT {dt}; 
        CT {ct};
        Expansion Bays {expansions};
        Minimum Crew {minCrew};
        Maximum Crew {maxCrew}
      </div>
      <div>BP Cost: {bpCost}</div>
    </>
  );
}

export default SetFrame;