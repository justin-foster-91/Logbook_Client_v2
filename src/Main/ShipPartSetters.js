import React, {useState} from 'react';
import defaultSelections from '../defaultShipSelection';
import {getTierData, getTierIdList} from '../metaTables'
import frames from '../frames.json'
import { capitalizeEachWord, findComponentByFrameId } from '../utils';

function SetTier(props) {
  let [tierData, setTierData] = useState({})

  let {tierId, setCustomShipParts, constraints, setConstraints} = props;
  // TODO: constraints not working at all

  const handleChange = (ev) => {
    // { buildPoints: 205, hpIncrementMultiplier: 2 }
    setTierData(getTierData(ev.target.value))

    // setConstraints(...constraints, getTierData(ev.target.value))

    setCustomShipParts(tierId = ev.target.value)
    // console.log(constraints);
    
  }

  return (
    <>
      <h3>Tier</h3>

      <p></p>

      <select defaultValue={tierId} onChange={handleChange}>
        {getTierIdList().map((tier, idx) => <option key={idx}>{tier}</option>)}
      </select>

      <p></p>

      <div>
        BP Budget: {tierData.buildPoints || getTierData(tierId).buildPoints}; 
        HP Increments: {tierData.hpIncrementMultiplier || getTierData(tierId).hpIncrementMultiplier}
      </div>
    </>
  );
}

function SetFrame(props) {
  let [selected, setSelected] = useState('')

  let {setCustomShipParts, constraints, setConstraints} = props;
  

  let frameId = capitalizeEachWord(defaultSelections.frameId);
  let {startTotal, increment} = findComponentByFrameId(frames, frameId, 'hp')
  let frameSize = findComponentByFrameId(frames, frameId, 'size')
  let frameManeuverability = findComponentByFrameId(frames, frameId, 'maneuverability')
  // TODO: hp = hp.startTotal + (hp.increment * hpIncrementMultiplier)
  let frameHP = startTotal
  // console.log(constraints.hpIncrementMultiplier);
  let frameDT = findComponentByFrameId(frames, frameId, 'dt')
  let frameCT = findComponentByFrameId(frames, frameId, 'ct')

  // console.log(size);

  return (
    <>
      <h3>Frame</h3>

      <p></p>

      <select defaultValue={frameId} onChange={(ev) => setSelected(ev.target.value)}>
        {frames.map((frame, idx) => <option key={idx}>{frame.type}</option>)}
      </select>

      <p></p>

      <div>
        Size {frameSize}; 
        Maneuverability {frameManeuverability}; 
        HP {frameHP}; 
        DT {frameDT}; 
        CT {frameCT};
      {/* Size Small; Maneuverability good; HP 40; DT n/a; CT 8; Expansion Bays 3; Minimum Crew 1; Maximum Crew 6 */}
      </div>
      <div>BP Cost: </div>
    </>
  );
}

export {SetTier, SetFrame}