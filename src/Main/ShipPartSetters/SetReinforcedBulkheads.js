import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'
import PartTitle from '../Components/PartTitle';

//TODO: track the fortification %

function SetReinforcedBulkheads(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { reinforcedBulkheadId } = customShipParts
  const size = ship.getSize()
  const { fortification, bpCost } = Tables.getReinforcedBulkheadData(reinforcedBulkheadId, size)
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
        <select value={reinforcedBulkheadId ? reinforcedBulkheadId : "None"} onChange={handleReinforcedBulkheadsChange}>
          <option key={"None"}>None</option>
          {Tables.getReinforcedBulkheadIdList().map((bulkhead, idx) => (
            <option key={idx} value={bulkhead}>{bulkhead} Bulkhead</option>
          ))}
        </select>
      </div>
      
      <div className='row'>
        <div>Fortification: {fortification}%</div>
      </div>
        
      <div className='row totals'>
        <div>BP Cost: {bpCost}</div>
      </div>
    </>
  );
}

export default SetReinforcedBulkheads;