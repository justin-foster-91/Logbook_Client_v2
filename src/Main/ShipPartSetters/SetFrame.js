import React, { useContext } from 'react';
import { getTierData } from '../References/metaTables'
import { findComponentByFrameId, setNewFrame } from '../References/shipFunctions';
import frames from '../References/frames.json'
import { capitalizeEachWord } from '../References/utils';
import { CustomShipContext } from "../Context/shipContext";


function SetFrame() {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  let { tierId } = customShipParts

  const formatExpansions = (defaultString) => {
    if(defaultString.toString().search('unlimited') >= 0) return "Unlimited"

    return defaultString;
  }

  let frameId                 = capitalizeEachWord(customShipParts.frameId);
  let {startTotal, increment} = findComponentByFrameId(frameId, 'hp')
  let size                    = findComponentByFrameId(frameId, 'size')
  let maneuverability         = findComponentByFrameId(frameId, 'maneuverability')
  let hp                      = startTotal + (increment * getTierData(tierId).hpIncrementMultiplier)
  let dt                      = findComponentByFrameId(frameId, 'dt')
  let ct                      = findComponentByFrameId(frameId, 'ct')
  let expansions              = formatExpansions(findComponentByFrameId(frameId, 'expansions'))
  let minCrew                 = findComponentByFrameId(frameId, 'minimumCrew')
  let maxCrew                 = findComponentByFrameId(frameId, 'maximumCrew')
  let bpCost                  = findComponentByFrameId(frameId, 'cost')

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