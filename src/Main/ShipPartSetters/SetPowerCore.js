import React from 'react';
import {getPowerCoreData, getPowerCoreIdList, getCoreQuantityFromSize} from '../../metaTables'
import frames from '../../frames.json'
import { capitalizeEachWord, findComponentByFrameId } from '../../utils';

function SetPowerCore(props) {

  let {customShipParts, setCustomShipParts} = props;
  let {tierId, powerCoreIds} = props.customShipParts

  // TODO: accommodate multiple power cores

  let frameId = capitalizeEachWord(customShipParts.frameId);
  let size = findComponentByFrameId(frames, frameId, 'size')
  let powerCoreQuantity = getCoreQuantityFromSize(size)
  // console.log(size, getCoreQuantityFromSize(size));

  let pcuProvided = powerCoreIds
    .map(core => getPowerCoreData(core).pcuProvided)
    .reduce((total, pcu) => total + pcu)

  let bpCost = powerCoreIds
    .map(core => getPowerCoreData(core).bpCost)
    .reduce((total, bp) => total + bp)


  const handlePowerCoreChange = (ev) => {
    // FIXME:
    console.log(ev.target.value);
    customShipParts.powerCoreIds[0] = ev.target.value
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

      {(() => new Array(powerCoreQuantity).fill(1))().map((core, idx) => {
        return <select defaultValue={tierId} onChange={handlePowerCoreChange}>
          {getPowerCoreIdList().map((tier, idx) => <option key={idx}>{tier}</option>)}
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