import React, {useEffect} from 'react';
import {getTierData, findComponentByFrameId, getPowerCoreData, getThrusterData} from '../../metaTables'
import frames from '../../frames.json'
import { capitalizeEachWord, sizeLetterToStringConverter } from '../../utils';

function SetFrame(props) {

  let {tierId, powerCoreIds, thrustersId} = props.customShipParts
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
    // TODO: tidy up other ship parts if sizes don't make sense

    customShipParts.frameId = ev.target.value
    setCustomShipParts({...customShipParts})
  }

  //If size of saved core does not fit with frame size, set to 'none'
  useEffect(() => {
    // powerCoreIds.current = powerCoreIds.map(core => {
    //   if(core === 'none' 
    //     ? 0 
    //     : getPowerCoreData(core).sizes.map(coreSize => sizeLetterToStringConverter(coreSize)).includes(size)) {
    //       return core
    //   } else return 'none'
    // })
  })

  //If size of saved core does not fit with frame size, set to 'none'
  useEffect(() => {
    // console.log(sizeLetterToStringConverter(getThrusterData(thrustersId).size));
  
  //   if(thrustersId === 'none' 
  //   ? 0 
  //   : getThrusterData(thrustersId).size.map(coreSize => sizeLetterToStringConverter(coreSize)).includes(size)) {
  //     return core
  // } else return 'none'
  })


  // powerCoreIds.current = powerCoreIds.map(core => {
  //   if(core === 'none' 
  //     ? 0 
  //     : getPowerCoreData(core).sizes.map(coreSize => sizeLetterToStringConverter(coreSize)).includes(size)) {
  //       return core
  //   } else return 'none'
  // })

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