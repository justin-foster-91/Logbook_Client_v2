import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'

//TODO: track the fortification %

function SetReinforcedBulkheads() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const { reinforcedBulkheadId } = customShipParts
  const size = ship.getSize()
  const { fortification, bpCost } = Tables.getReinforcedBulkheadData(reinforcedBulkheadId, size)

  const handleReinforcedBulkheadsChange = (ev) => {
    let bulkheadsOption = ev.target.value;
    if (bulkheadsOption === "None") bulkheadsOption = null;

    ship.setReinforcedBulkheads(bulkheadsOption)
    setCustomShipParts({ ...customShipParts });
  }

  return (
    <>
      <h3>Reinforced Bulkheads</h3>

      <p></p>

      <select value={reinforcedBulkheadId ? reinforcedBulkheadId : "None"} onChange={handleReinforcedBulkheadsChange}>
        <option key={"None"}>None</option>
        {Tables.getReinforcedBulkheadIdList().map((bulkhead, idx) => (
          <option key={idx} value={bulkhead}>{bulkhead} Bulkhead</option>
        ))}
      </select>
      <br/>
      

      <p></p>
        Fortification: {fortification}%
      <div>
        BP Cost: {bpCost}
      </div>
    </>
  );
}

export default SetReinforcedBulkheads;