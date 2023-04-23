import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';

function SetCrewQuarters(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { crewQuartersId } = customShipParts
  const { bpCost, description } = Tables.getQuartersData(crewQuartersId)
  const { currentPart } = props;

  const handleQuartersChange = (ev) => {
    const quartersOption = ev.target.value;

    ship.setCrewQuarters(quartersOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <label htmlFor="quarters" className='hidden'>Crew Quarters</label>
        <select id="quarters" value={crewQuartersId} onChange={handleQuartersChange}>
          {Tables.getQuartersIdList().map((quarters, idx) => (
            <option key={idx}>{quarters}</option>
          ))}
        </select>
      </div>

      <div className="note">{description}</div>

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetCrewQuarters;