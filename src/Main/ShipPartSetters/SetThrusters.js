import React, { useContext } from 'react';
import {getThrusterData, getThrusterIdList } from '../References/metaTables';
import { findComponentByFrameId, doesFrameSizeAllowThruster } from '../References/shipFunctions';
import {capitalizeEachWord} from '../References/utils';
import { CustomShipContext } from "../Context/shipContext";

function SetThrusters() {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  let {thrustersId} = customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let frameSize = findComponentByFrameId(frameId, 'size')
  let {speed, pilotingModifier, pcuCost, bpCost} = getThrusterData(thrustersId)

  const handleThrusterChange = (ev) => {
    let thrusterOption = ev.target.value

    if(thrusterOption === 'None') thrusterOption = null

    customShipParts.thrustersId = thrusterOption
    setCustomShipParts({...customShipParts})
  }

  return (
    <>
      <h3>Thrusters</h3>

      <p></p>

      <select defaultValue={thrustersId === null ? 'None' : `${thrustersId} Thrusters`} onChange={handleThrusterChange}>
        <option key='null'>None</option>
        {getThrusterIdList().map((thruster, idx) => 
          doesFrameSizeAllowThruster(thruster, frameSize) && 
          <option key={idx} value={thruster}>{thruster} Thrusters</option>
        )}
      </select>
      <br/>
      {/* TODO: */}
      Special Material: 
      <p></p>

      <div>
        Speed (in hexes): {speed}; 
        Piloting Modifier: {pilotingModifier}
      </div>
        PCU cost: {pcuCost}; 
        BP cost: {bpCost}
    </>
  );
}

export default SetThrusters;