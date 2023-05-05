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
  const size = ship.getSize();

  // None:
  // Tiny: disable other options
  // > TIny: note that common is free
  const noQuartersAndTiny = !crewQuartersId && (Tables.sizeCategory[size] > Tables.sizeCategory["Tiny"]);
  const noteForNone = "Most starships larger than Tiny have Crew Quarters. Common Crew Quarters have no additional cost."

  const handleQuartersChange = (ev) => {
    let quartersOption = ev.target.value;
    if (quartersOption === "None") quartersOption = null;

    ship.setCrewQuarters(quartersOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <p>Most starships larger than Tiny have places where their crew can eat, sleep, and bathe during long journeys through space. These quarters can range from hammocks strung between cargo containers to cozy chambers with custom furnishings and private bathrooms. Crew quarters consume a negligible amount of PCU, though amenities in fancier quarters require an operational power core to function.</p>
      </AccordionText>

      {size === "Supercolossal" &&
        <div className="note">
          On a Supercolossal ship with common crew quarters, the vessel's size enables 10% of the crew to have good quarters and 1% to have luxurious quarters at no additional cost. On a Supercolossal ship with good quarters for the majority of the crew, 10% have luxurious quarters at no additional cost.
        </div>
      }

      <div className="dropdownBlock">
        <label htmlFor="quarters" className='hidden'>Crew Quarters</label>
        <select 
          id="quarters" 
          value={crewQuartersId || "None"} 
          onChange={handleQuartersChange}
        >
          <option key="None">None</option>
          {Tables.getQuartersIdList().map((quarters, idx) => (
            <option key={idx} value={quarters}>{quarters}</option>
          ))}
        </select>
      </div>

      {noQuartersAndTiny && <div className='warning'>{noteForNone}</div>}
      {crewQuartersId && <AccordionText>{description}</AccordionText>}

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetCrewQuarters;