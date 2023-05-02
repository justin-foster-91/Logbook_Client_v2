import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';
import AccordionText from './Components/AccordionText';

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

      <AccordionText>
        <p>Defensive countermeasures systems protect a ship from tracking weapons such as missiles, and they make it difficult for enemies using sensors to get a solid reading on the ship. They do this via a complicated suite of electronic sensors and broadcasting equipment that's designed to jam enemy sensors and create false readings. These systems grant a bonus to a ship's TL (see page 320, CRB).</p>
      </AccordionText>

      <div className='dropdownBlock'>
        <label htmlFor="defensiveCounter" className='hidden'>Defensive Countermeasures</label>
        <select 
          id="defensiveCounter" 
          value={defensiveId || "None"} 
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