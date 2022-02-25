import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'

function SetDriftEngine() {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { driftEngineId, frameId } = customShipParts
  const size = ship.getSize()
  const { rating, bpCost, special } = Tables.getDriftEngineData(driftEngineId, size)
  const pcuBudget = ship.getTotalPCUBudget()
  let modifiedBPCost = 0;
  if(frameId === "Oma") modifiedBPCost = Math.ceil(bpCost*1.5)
  

  const handleDriftEngineChange = (ev) => {
    let engineOption = ev.target.value;
    if(engineOption === "None") engineOption = null

    ship.setDriftEngine(engineOption)
  }

  const isWithinBudget = (engine) => {
    const { minPCU } = Tables.getDriftEngineData(engine, size)

    return minPCU <= pcuBudget
  }

  const isWithinMaxSize = (engine) => {
    let { maxSize } = Tables.getDriftEngineData(engine, size)
    if(maxSize === null) maxSize = 'Supercolossal'

    return Tables.sizeMod[size] <= Tables.sizeMod[maxSize]
  }

  return (
    <>
      <h3>Drift Engines</h3>

      <p></p>
      <select value={driftEngineId ? driftEngineId : "None"} onChange={handleDriftEngineChange}>
        <option key="None">None</option>
        {Tables.getDriftEngineIdList().map((engine, idx) => 
          isWithinBudget(engine) && 
          isWithinMaxSize(engine) && 
          <option key={idx} value={engine}>
            {engine}
          </option>
        )}
      </select>

      <p></p>
      {special && <>Note: <i>{special}</i></>}
      <div>
        Engine Rating: {rating}
      </div>
      <div>
        BP Cost: {modifiedBPCost 
          ? <>{modifiedBPCost} <i>(Oma 50% increase)</i></> 
          : bpCost}
      </div>
    </>
  );
}

export default SetDriftEngine;