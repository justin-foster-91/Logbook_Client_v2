import React, {useContext} from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from '../CustomRefs/metaTables'
import PartTitle from '../Components/PartTitle';
import PartTotals from '../Components/PartTotals';
import AccordionText from '../Components/AccordionText';
import { isValidHull } from '../CustomRefs/optionValidation';
import { SetterProps } from "../CustomRefs/customInterface";

//TODO: track the CT bonus

function SetFortifiedHull(props: SetterProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { fortifiedHullId } = customShipParts
  const size = ship.getSize()
  const { ctBonus, bpCost } = Tables.getFortifiedHullData(fortifiedHullId, size)
  const { currentPart } = props;

  const handleFortifiedHullChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    let hullsOption: string | null = ev.target.value;
    if (hullsOption === "None") hullsOption = null;

    ship.setFortifiedHull(hullsOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <p>By reinforcing critical starship systems with extra-thick armor, a starship's designer can limit catastrophic failures caused by incoming attacks. A starship can incorporate one fortified hull upgrade, which increases the vessel's Critical Threshold (CT) value by an amount based on the fortified hull's material and the starship's size category. A fortified hull is a passive system that requires no PCU to function.</p>
      </AccordionText>

      <div className="dropdownBlock">
        <label htmlFor="fortifiedHull" className='hidden'>Fortified Hull</label>
        <select 
          id="fortifiedHull" 
          value={fortifiedHullId || "None"} 
          onChange={handleFortifiedHullChange}
        >
          <option key={"None"}>None</option>
          {Tables.getFortifiedHullIdList().map((hull, idx) => (
            isValidHull(ship, hull)
            && <option key={idx}>{hull}</option>
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