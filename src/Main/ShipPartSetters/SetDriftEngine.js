import React, {useContext, useEffect, useState} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'
import PartTitle from '../Components/PartTitle';
import PartTotals from '../Components/PartTotals';

function SetDriftEngine(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { driftEngineId, frameId } = customShipParts
  const size = ship.getSize()
  const { rating, bpCost, special } = Tables.getDriftEngineData(driftEngineId, size)
  const { currentPart } = props;
  const pcuBudget = ship.getTotalPCUBudget()
  const [modifiedBPCost, setModifiedBPCost] = useState();
  
  useEffect(() => {
    if(frameId === "Oma") setModifiedBPCost(Math.ceil(bpCost*1.5))
  }, [frameId, bpCost])
  
  const handleDriftEngineChange = (ev) => {
    let engineOption = ev.target.value;
    if(engineOption === "None") engineOption = null

    ship.setDriftEngine(engineOption)
  }

  const isWithinBudget = (engine) => {
    const { minPCU } = Tables.getDriftEngineData(engine, size)

    return minPCU <= pcuBudget;
  }

  const isWithinMaxSize = (engine) => {
    let { maxSize } = Tables.getDriftEngineData(engine, size)
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

      <PartTotals part={currentPart} modifiedBPCost={modifiedBPCost} />
    </>
  );
}

export default SetDriftEngine;