import React from 'react';
import {getThrusterData, getThrusterIdList, findComponentByFrameId, doesFrameSizeAllowThruster} from '../../metaTables';
import frames from '../../frames.json';
import {capitalizeEachWord} from '../../utils';

function SetThrusters(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {thrustersId} = customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let frameSize = findComponentByFrameId(frames, frameId, 'size')
  let {speed, pilotingModifier, pcuCost, bpCost} = getThrusterData(thrustersId)

  const handleThrusterChange = (ev) => {
    customShipParts.thrustersId = ev.target.value.split(' ')[0]
    setCustomShipParts({...customShipParts})
  }

  return (
    <>
      <h3>Thrusters</h3>

      <p></p>

      <select defaultValue={thrustersId === undefined || thrustersId === null ? 'None' : `${thrustersId} Thrusters`} onChange={handleThrusterChange}>
        <option key='null'>None</option>
        {getThrusterIdList().map((thruster, idx) => 
          doesFrameSizeAllowThruster(thruster, frameSize) && 
          <option key={idx}>{thruster} Thrusters</option>
        )}
      </select><br/>
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