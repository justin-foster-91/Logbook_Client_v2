import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'

function SetDriftEngine() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const { driftEngineId } = customShipParts
  const size = ship.getSize()
  const { rating, bpCost, special } = Tables.getDriftEngineData(driftEngineId, size)
  const pcuBudget = ship.getTotalPCUBudget()

  const handleDriftEngineChange = (ev) => {
    let engineOption = ev.target.value;
    if(engineOption === "None") engineOption = null

    ship.setDriftEngine(engineOption)
    setCustomShipParts({ ...customShipParts });
  }

  const engineMinPCU = (engine) => {
    return Tables.getDriftEngineData(engine, size).minPCU
  }

  const isWithinBudget = (engine) => {
    return engineMinPCU(engine) <= pcuBudget
  }

  const isWithinMaxSize = (engine) => {
    let { maxSize } = Tables.getDriftEngineData(engine, size)
    if(maxSize === null) maxSize = Infinity

    return Tables.sizeMod[size] <= Tables.sizeMod[maxSize]
  }

  return (
    <>
      <h3>Drift Engines</h3>

      <p></p>
      {/* engineMinPCU(engine) > pcuBudget */}
      <select value={driftEngineId ? driftEngineId : "None"} onChange={handleDriftEngineChange}>
        <option key="None">None</option>
        {Tables.getDriftEngineIdList().map((engine, idx) => 
          isWithinBudget(engine) 
          && isWithinMaxSize(engine)
          && <option key={idx} value={engine}>
            {engine}
          </option>
        )}
      </select>

      <p></p>
      {special && `Note: ${special}`}
      <div>
        Engine Rating: {rating}
      </div>
      <div>
        BP Cost: {bpCost}
      </div>
    </>
  );
}

export default SetDriftEngine;