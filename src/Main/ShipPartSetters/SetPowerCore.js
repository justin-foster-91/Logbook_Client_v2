import React, { useContext } from 'react';
import { getPowerCoreData } from '../References/metaTables';
import PowerCoreSelections from './PowerCoreSelections';
import { CustomShipContext } from "../Context/shipContext";

function SetPowerCore() {
  const { customShipParts, setCustomShipParts, framePackage } = useContext(CustomShipContext);

  let {powerCoreIds} = customShipParts
  let {size} = framePackage

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
      {size.toLowerCase() === 'supercolossal' 
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