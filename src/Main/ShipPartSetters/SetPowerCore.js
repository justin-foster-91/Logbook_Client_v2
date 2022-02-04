import React from 'react';
import { getPowerCoreData } from '../References/metaTables';
import { findComponentByFrameId } from '../References/shipFunctions';
import { capitalizeEachWord } from '../References/utils';
import PowerCoreSelections from './PowerCoreSelections';

function SetPowerCore(props) {
  let {customShipParts, setCustomShipParts} = props;
  let {powerCoreIds} = customShipParts

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let frameSize = findComponentByFrameId(frameId, 'size')

  let pcuProvided = powerCoreIds
    .map(core => getPowerCoreData(core).pcuProvided)
    .reduce((total, pcu) => total + pcu)

  let bpCost = powerCoreIds
    .map(core => getPowerCoreData(core).bpCost)
    .reduce((total, bp) => total + bp)
  
  return (
    <>
      <h3>Power Core</h3>

      <p></p>
      {frameSize.toLowerCase() === 'supercolossal' 
        && '**A Supercolossal ship may have up to 5 Colossal sized cores OR 1 Supercolossal core with up to 4 Huge/Gargantuan cores.**' 
      }
      <p></p>

      {/* Create array of length powerCoreQuantity, create a dropdown for each length value */}
      <PowerCoreSelections setCustomShipParts={setCustomShipParts} customShipParts={customShipParts}></PowerCoreSelections>
      
      <p></p>

      <div>
        PCU Budget: {pcuProvided}
      </div>
      <div>BP Cost: {bpCost}</div>
    </>
  );
}

export default SetPowerCore;