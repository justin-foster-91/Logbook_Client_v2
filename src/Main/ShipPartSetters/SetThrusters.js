import React from 'react';
import {getThrusterData, getThrusterIdList, findComponentByFrameId, doesFrameSizeAllowThruster} from '../../metaTables';
import frames from '../../frames.json';
import {capitalizeEachWord} from '../../utils';

function SetThrusters(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {thrustersId} = customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let frameSize = findComponentByFrameId(frames, frameId, 'size')

  const handleThrusterChange = (ev) => {
    customShipParts.thrustersId = ev.target.value.split(' ')[0]
    setCustomShipParts({...customShipParts})
  }

  return (
    <>
      <h3>Thrusters</h3>

      <p></p>

      <select defaultValue={thrustersId === undefined || thrustersId === 'none' ? 'None' : `${thrustersId} Thrusters`} onChange={handleThrusterChange}>
        <option key='null'>None</option>
        {getThrusterIdList().map((thruster, idx) => 
          doesFrameSizeAllowThruster(thruster, frameSize) && 
          <option key={idx}>{thruster} Thrusters</option>
        )}
      </select>

      <p></p>

      <div>
        Speed (in hexes): {getThrusterData(thrustersId).speed}; 
        Piloting Modifier: {getThrusterData(thrustersId).pilotingModifier}
      </div>
        PCU cost: {getThrusterData(thrustersId).pcuCost}; 
        BP cost: {getThrusterData(thrustersId).bpCost}
    </>
  );
}

export default SetThrusters;