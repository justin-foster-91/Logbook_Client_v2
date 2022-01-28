import React from 'react';
import {getTierData} from '../../metaTables'
import frames from '../../frames.json'
import { capitalizeEachWord, findComponentByFrameId } from '../../utils';

function SetFrame(props) {

  let {tierId} = props.customShipParts
  let {customShipParts, setCustomShipParts} = props;  

  const formatExpansions = (defaultString) => {
    if(defaultString.toString().search('unlimited') >= 0) return "Unlimited"

    return defaultString;
  }

  let frameId                 = capitalizeEachWord(customShipParts.frameId);
  let {startTotal, increment} = findComponentByFrameId(frames, frameId, 'hp')
  let size                    = findComponentByFrameId(frames, frameId, 'size')
  let maneuverability         = findComponentByFrameId(frames, frameId, 'maneuverability')
  let hp                      = startTotal + (increment * getTierData(tierId).hpIncrementMultiplier)
  let dt                      = findComponentByFrameId(frames, frameId, 'dt')
  let ct                      = findComponentByFrameId(frames, frameId, 'ct')
  let expansions              = formatExpansions(findComponentByFrameId(frames, frameId, 'expansions'))
  let minCrew                 = findComponentByFrameId(frames, frameId, 'minimumCrew')
  let maxCrew                 = findComponentByFrameId(frames, frameId, 'maximumCrew')
  let bpCost                  = findComponentByFrameId(frames, frameId, 'cost')

  const handleFrameIdChange = (ev) => {
    customShipParts.frameId = ev.target.value
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