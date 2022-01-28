import React from 'react';
import {getPowerCoreData, getPowerCoreIdList, getCoreQuantityFromSize, findComponentByFrameId, doesFrameSizeAllowCore} from '../../metaTables'
import frames from '../../frames.json'
import { capitalizeEachWord, sizeLetterToStringConverter } from '../../utils';

function SetPowerCore(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {tierId, powerCoreIds} = props.customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let frameSize = findComponentByFrameId(frames, frameId, 'size')
  let powerCoreQuantity = getCoreQuantityFromSize(frameSize)
  // console.log(size, getCoreQuantityFromSize(size));

  let pcuProvided = powerCoreIds
    .map(core => core === null ? 0 : getPowerCoreData(core).pcuProvided)
    .reduce((total, pcu) => total + pcu)

  let bpCost = powerCoreIds
    .map(core => core === null ? 0 : getPowerCoreData(core).bpCost)
    .reduce((total, bp) => total + bp)


  const handlePowerCoreChange = (event) => {
    let coreIndex = event.target.name
    let selectedOption = event.target.value

    if(selectedOption === 'None') selectedOption = null
    else selectedOption = selectedOption.split(' ').slice(0, 2).join(' ')

    customShipParts.powerCoreIds[coreIndex] = selectedOption
    setCustomShipParts({...customShipParts})
  }


  // Small - Large: 1 Core
  // Medium & Large: 1 Core + 1 Core optional (bonus from expansion bay)
  // Huge: 2 Cores
  // Gargantuan: 3 Cores
  // Colossal: 4 Cores
  // Supercolossal: 5 (colossal) Cores OR 1 (supercolossal) + 4 (huge or gargantuan) Cores

  // A power core typically has a backup battery system for use in emergencies 
  // that can provide limited power—enough for life support, gravity, and comms (see page 430), 
  // but no other systems—for 2d6 days.
  
  return (
    <>
      <h3>Power Core</h3>

      <p></p>

      {/* Create array of length powerCoreQuantity, create a dropdown for each length value */}
      {Array(powerCoreQuantity).fill(1).map((dropdown, idx) => {
        console.log(powerCoreIds[idx])
        return <select 
          // defaultValue must match the option's string
          defaultValue={powerCoreIds[idx] === undefined ? 'None' : `${capitalizeEachWord(powerCoreIds[idx])} (PCU ${getPowerCoreData(powerCoreIds[idx]).pcuProvided} | Size: ${getPowerCoreData(powerCoreIds[idx]).sizes.join(', ')})`} 
          key={'dropdown'+idx} name={idx} onChange={handlePowerCoreChange}>
          
          <option>None</option>
          {getPowerCoreIdList().map((core, idx) => 
            !doesFrameSizeAllowCore(core, frameSize) ||
            <option key={'option'+idx}>
              {`${core} (PCU ${getPowerCoreData(core).pcuProvided} | Size: ${getPowerCoreData(core).sizes.join(', ')})`}
            </option>
          )}

        </select>
      })}
      
      <p></p>

      <div>
        PCU Budget: {pcuProvided}
      </div>
      <div>BP Cost: {bpCost}</div>
    </>
  );
}

export default SetPowerCore;