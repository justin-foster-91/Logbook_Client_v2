import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'

function SetDefensiveCounters() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { defensiveCountermeasuresId: defensiveId } = customShipParts
  const { tlBonus, pcuCost, bpCost } = Tables.getDefensiveCounterData(defensiveId)

  const handleDefensiveCounterChange = (ev) => {
    let defensiveOption = ev.target.value;
    if(defensiveOption === "None") defensiveOption = null

    ship.setDefensiveCounters(defensiveOption)
  }

  return (
    <>
      <h3>Defensive Countermeasures</h3>

      <p></p>

      <select value={defensiveId ? defensiveId : "None"} onChange={handleDefensiveCounterChange}>
        <option key="None">None</option>
        {Tables.getDefensiveCounterIdList().map((defense, idx) => (
          <option key={idx} value={defense}>{defense} Defenses</option>
        ))}
      </select>

      <p></p>

      <div>
        TL Bonus: {`+${tlBonus}`}
      </div>
      <div>
        PCU Cost: {pcuCost}; 
        BP Cost: {bpCost}
      </div>
    </>
  );
}

export default SetDefensiveCounters;