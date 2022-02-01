import React, {useState, useEffect} from 'react';
import {getPowerCoreData, getPowerCoreIdList, getCoreQuantityFromSize, findComponentByFrameId, doesFrameSizeAllowCore} from '../../metaTables'
import frames from '../../frames.json'
import { capitalizeEachWord, sizeLetterToStringConverter } from '../../utils';

function SetPowerCore(props) {
  let {customShipParts, setCustomShipParts} = props;
  let {tierId, powerCoreIds} = customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let frameSize = findComponentByFrameId(frames, frameId, 'size')
  let powerCoreQuantity = getCoreQuantityFromSize(frameSize)

  //If size of saved core does not fit with frame size, set to 'none'
  powerCoreIds = powerCoreIds.map(core => {
    if(core === 'none' ? 0 
      : getPowerCoreData(core).sizes.map(size => sizeLetterToStringConverter(size)).includes(frameSize)) {
        return core
    } else return 'none'
  })

  let pcuProvided = powerCoreIds
    .map(core => getPowerCoreData(core).pcuProvided)
    .reduce((total, pcu) => total + pcu)

  let bpCost = powerCoreIds
    .map(core => getPowerCoreData(core).bpCost)
    .reduce((total, bp) => total + bp)

  const handlePowerCoreChange = (event) => {
    let coreIndex = event.target.name
    let selectedCoreOption = event.target.value

    if(selectedCoreOption === 'None') selectedCoreOption = 'none'
    else selectedCoreOption = selectedCoreOption.split(' ').slice(0, 2).join(' ')

    customShipParts.powerCoreIds[coreIndex] = selectedCoreOption
    setCustomShipParts({...customShipParts})
  }
  
  return (
    <>
      <h3>Power Core</h3>

      <p></p>
      {/* {frameSize.toLowerCase() === 'supercolossal' 
        ? '**A Supercolossal ship may have up to 5 Colossal sized cores OR 1 Supercolossal core with up to 4 Huge/Gargantuan cores.**' 
        : ''} */}
      {frameSize.toLowerCase() === 'supercolossal' 
        && '**A Supercolossal ship may have up to 5 Colossal sized cores OR 1 Supercolossal core with up to 4 Huge/Gargantuan cores.**' 
      }
      <p></p>

      {/* Create array of length powerCoreQuantity, create a dropdown for each length value */}
      {Array(powerCoreQuantity).fill(1).map((dropdown, idx) => {
        return <div key={'powerCore'+idx}>
          Power Core {idx+1} <br/>
          {/* defaultValue must match the option's string */}
          <select 
            defaultValue={
              (powerCoreIds[idx] === undefined || powerCoreIds[idx] === 'none')
                ? 'None' 
                : `${capitalizeEachWord(powerCoreIds[idx])} (PCU ${getPowerCoreData(powerCoreIds[idx]).pcuProvided} | Size: ${getPowerCoreData(powerCoreIds[idx]).sizes.join(', ')})`
            } 
            name={idx} onChange={handlePowerCoreChange}
          >
            
            <option key='null'>None</option>
            {getPowerCoreIdList().map((core, idx) => 
              doesFrameSizeAllowCore(core, frameSize) &&
              <option key={'option'+idx}>
                {`${core} (PCU ${getPowerCoreData(core).pcuProvided} | Size: ${getPowerCoreData(core).sizes.join(', ')})`}
              </option>
            )}

          </select><br/>
          Special Material: 
          <p></p>
        </div>
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