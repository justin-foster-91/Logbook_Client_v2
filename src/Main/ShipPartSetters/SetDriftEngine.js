import React, {useContext, useEffect, useState} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';

function SetDriftEngine(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { driftEngineId, frameId } = customShipParts
  const size = ship.getSize()
  const { rating, bpCost, special } = Tables.getDriftEngineData(driftEngineId, size, frameId)
  const { currentPart } = props;
  const pcuBudget = ship.getTotalPCUBudget()
  const [note, setNote] = useState(null);
  
  useEffect(() => {
    if (frameId === "Oma") setNote(<div><em>(Oma 50% increase)</em></div>)
    else setNote(null)
  }, [frameId])
  
  const handleDriftEngineChange = (ev) => {
    let engineOption = ev.target.value;
    if(engineOption === "None") engineOption = null

    ship.setDriftEngine(engineOption)
  }

  const isWithinBudget = (engine) => {
    const { minPCU } = Tables.getDriftEngineData(engine, size, frameId)

    return minPCU <= pcuBudget;
  }

  const isWithinMaxSize = (engine) => {
    let { maxSize } = Tables.getDriftEngineData(engine, size, frameId)
    if(maxSize === null) maxSize = 'Supercolossal'

    return Tables.sizeMod[size] <= Tables.sizeMod[maxSize];
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <label htmlFor="driftEngine" className="hidden">Drift Engine</label>
        <select 
          id="driftEngine" 
          value={driftEngineId ? driftEngineId : "None"} 
          onChange={handleDriftEngineChange}
        >
          <option key="None">None</option>
          {Tables.getDriftEngineIdList().map((engine, idx) => 
            isWithinBudget(engine) && 
            isWithinMaxSize(engine) && 
            <option key={idx} value={engine}>
              {engine}
            </option>
          )}
        </select>
      </div>

      {special && 
        <div className='note'>Note: <i>{special}</i></div>
      }

      <div className='row'>
        <div><strong>Engine Rating</strong>: {rating}</div>
      </div>

      <PartTotals part={currentPart} bpCost={bpCost} note={note} />
    </>
  );
}

export default SetDriftEngine;