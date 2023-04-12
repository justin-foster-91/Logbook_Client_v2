import React, {useContext} from 'react';
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
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
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
      </div>

      {special && 
        <div className='note'>Note: <i>{special}</i></div>
      }

      <div className='row'>
        <div><strong>Engine Rating</strong>: {rating}</div>
      </div>

      <PartTotals part={currentPart} bpCost={bpCost} modifiedBPCost={modifiedBPCost} />
      {/* <div className='row totals'>
        <div>BP Cost: {modifiedBPCost 
          ? <>{modifiedBPCost} <i>(Oma 50% increase)</i></> 
          : bpCost}
        </div>
      </div> */}
    </>
  );
}

export default SetDriftEngine;