import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';
import AccordionText from './Components/AccordionText';

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

      <AccordionText>
        <p>Most starships larger than Tiny have places where their crew can eat, sleep, and bathe during long journeys through space. These quarters can range from hammocks strung between cargo containers to cozy chambers with custom furnishings and private bathrooms. Crew quarters consume a negligible amount of PCU, though amenities in fancier quarters require an operational power core to function.</p>
      </AccordionText>

      <div className="dropdownBlock">
        <label htmlFor="quarters" className='hidden'>Crew Quarters</label>
        <select id="quarters" value={crewQuartersId} onChange={handleQuartersChange}>
          {Tables.getQuartersIdList().map((quarters, idx) => (
            <option key={idx}>{quarters}</option>
          ))}
        </select>
      </div>

      {/* <div className='note'>{description}</div> */}
      <AccordionText>{description}</AccordionText>

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetCrewQuarters;