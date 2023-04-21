import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';

//TODO: track the CT bonus

function SetFortifiedHull(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { fortifiedHullId } = customShipParts
  const size = ship.getSize()
  const { ctBonus, bpCost } = Tables.getFortifiedHullData(fortifiedHullId, size)
  const { currentPart } = props;

  const handleFortifiedHullChange = (ev) => {
    let hullsOption = ev.target.value;
    if (hullsOption === "None") hullsOption = null;

    ship.setFortifiedHull(hullsOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <label htmlFor="fortifiedHull" className='hidden'>Fortified Hull</label>
        <select 
          id="fortifiedHull" 
          value={fortifiedHullId || "None"} 
          onChange={handleFortifiedHullChange}
        >
          <option key={"None"}>None</option>
          {Tables.getFortifiedHullIdList().map((hull, idx) => (
            <option key={idx}>{hull}</option>
          ))}
        </select>
      </div>
      
      <div className='row'>
        <div><strong>CT Bonus</strong>: {ctBonus}</div>
      </div>
        
      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetFortifiedHull;