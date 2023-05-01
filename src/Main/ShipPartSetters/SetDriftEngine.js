import React, {useContext, useEffect, useState} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';
// import * as Valid from './CustomRefs/optionValidation';
import { isValidDriftEngine } from './CustomRefs/optionValidation';
import AccordionText from './Components/AccordionText';

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

      <AccordionText>
        <>
          <p>These engines let you travel to and from the Drift (see page 290, CRB). The better the engine rating, the faster you can reach distant destinations. Drift engines have a PCU requirement and a maximum frame size. The cost in Build Points is based on the starship's size category. See the table below for the statistics of the various Drift engines.</p>
          <p>For a starship to engage its Drift engines to either enter or exit the Drift, its conventional thrusters must be turned off for 1 minute.</p>
        </>
      </AccordionText>

      <div className="dropdownBlock">
        <label htmlFor="driftEngine" className="hidden">Drift Engine</label>
        <select 
          id="driftEngine" 
          value={driftEngineId ? driftEngineId : "None"} 
          onChange={handleDriftEngineChange}
        >
          <option key="None">None</option>
          {Tables.getDriftEngineIdList().map((engine, idx) => 
            isValidDriftEngine(ship.parts, engine, size) && 
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