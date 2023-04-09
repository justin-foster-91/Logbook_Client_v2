import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'
import PartTitle from '../Components/PartTitle';

function SetDefensiveCounters(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { defensiveCountermeasuresId: defensiveId } = customShipParts
  const { tlBonus, pcuCost, bpCost } = Tables.getDefensiveCounterData(defensiveId)
  const { currentPart } = props;

  const handleDefensiveCounterChange = (ev) => {
    let defensiveOption = ev.target.value;
    if(defensiveOption === "None") defensiveOption = null

    ship.setDefensiveCounters(defensiveOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className='dropdownBlock'>
        <select value={defensiveId ? defensiveId : "None"} onChange={handleDefensiveCounterChange}>
          <option key="None">None</option>
          {Tables.getDefensiveCounterIdList().map((defense, idx) => (
            <option key={idx} value={defense}>{defense} Defenses</option>
          ))}
        </select>
      </div>

      <div className='row'>
        <div>TL Bonus: {`+${tlBonus}`}</div>
      </div>

      <div className='row totals'>
        <div>PCU Cost: {pcuCost}</div>
        <div>BP Cost: {bpCost}</div>
      </div>
    </>
  );
}

export default SetDefensiveCounters;