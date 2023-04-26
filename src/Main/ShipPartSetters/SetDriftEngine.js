import React, {useContext, useEffect, useState} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';
import * as Valid from './CustomRefs/optionValidation';

function SetDriftEngine(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { driftEngineId, frameId } = customShipParts
  const size = ship.getSize()
  const { rating, bpCost, special } = Tables.getDriftEngineData(driftEngineId, size, frameId)
  const { currentPart } = props;
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
            Valid.driftEngine(ship.parts, engine) && 
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