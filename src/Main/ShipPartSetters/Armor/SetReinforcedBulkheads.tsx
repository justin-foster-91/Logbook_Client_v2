import React, {useContext} from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from '../CustomRefs/metaTables'
import PartTitle from '../Components/PartTitle';
import PartTotals from '../Components/PartTotals';
import AccordionText from '../Components/AccordionText';
import { isValidBulkhead } from '../CustomRefs/optionValidation';
import { SetterProps } from "../CustomRefs/customInterface";

function SetReinforcedBulkheads(props: SetterProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { reinforcedBulkheadId }: any = customShipParts
  const size = ship.getSize()
  const { fortPercent, bpCost } = Tables.getReinforcedBulkheadData(reinforcedBulkheadId, size)
  const { currentPart } = props

  const handleReinforcedBulkheadsChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    let bulkheadsOption: string | null = ev.target.value;
    if (bulkheadsOption === "None") bulkheadsOption = null;

    ship.setReinforcedBulkheads(bulkheadsOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <p>
        By dramatically strengthening a starship's bulkheads and other interior walls, its designer can reduce the odds of catastrophic system damage when the starship sustains damage. Whenever the starship would sustain critical damage, there is a percent chance based on the reinforced bulkhead's fortification rating that the critical damage effect is negated (though the attack still deals damage to the starship). The cost of reinforced bulkheads is based on the starship's size category.
        </p>
      </AccordionText>

      <div className='dropdownBlock'>
        <label htmlFor="reinforcedBulkheads" className='hidden'>Reinforced Bulkheads</label>
        <select 
          id="reinforcedBulkheads" 
          value={reinforcedBulkheadId || "None"} 
          onChange={handleReinforcedBulkheadsChange}
        >
          <option key={"None"}>None</option>
          {Tables.getReinforcedBulkheadIdList().map((bulkhead, idx) => (
            isValidBulkhead(ship, bulkhead)
            && <option key={idx} value={bulkhead}>{bulkhead} Bulkhead</option>
          ))}
        </select>
      </div>
      
      <div className='row'>
        <div><strong>Fortification</strong>: {fortPercent}%</div>
      </div>
        
      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetReinforcedBulkheads;