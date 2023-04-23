import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';

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
        <label htmlFor="defensiveCounter" className='hidden'>Defensive Countermeasures</label>
        <select 
          id="defensiveCounter" 
          value={defensiveId ? defensiveId : "None"} 
          onChange={handleDefensiveCounterChange}
        >
          <option key="None">None</option>
          {Tables.getDefensiveCounterIdList().map((defense, idx) => (
            <option key={idx} value={defense}>{defense} Defenses</option>
          ))}
        </select>
      </div>

      <div className='row'>
        <div><strong>TL Bonus</strong>: +{tlBonus}</div>
      </div>

      <PartTotals part={currentPart} pcuCost={pcuCost} bpCost={bpCost} />
    </>
  );
}

export default SetDefensiveCounters;