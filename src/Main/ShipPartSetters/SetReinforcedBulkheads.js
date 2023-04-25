import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';

//TODO: track the fortification %

function SetReinforcedBulkheads(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { reinforcedBulkheadId } = customShipParts
  const size = ship.getSize()
  const { fortPercent, bpCost } = Tables.getReinforcedBulkheadData(reinforcedBulkheadId, size)
  const { currentPart } = props

  const handleReinforcedBulkheadsChange = (ev) => {
    let bulkheadsOption = ev.target.value;
    if (bulkheadsOption === "None") bulkheadsOption = null;

    ship.setReinforcedBulkheads(bulkheadsOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className='dropdownBlock'>
        <label htmlFor="reinforcedBulkheads" className='hidden'>Reinforced Bulkheads</label>
        <select 
          id="reinforcedBulkheads" 
          value={reinforcedBulkheadId ? reinforcedBulkheadId : "None"} 
          onChange={handleReinforcedBulkheadsChange}
        >
          <option key={"None"}>None</option>
          {Tables.getReinforcedBulkheadIdList().map((bulkhead, idx) => (
            <option key={idx} value={bulkhead}>{bulkhead} Bulkhead</option>
          ))}
        </select>
      </div>
      
      <div className='row'>
        <div><strong>Fortification</strong>: {fortPercent}%</div>
      </div>
        
      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetReinforcedBulkheads;