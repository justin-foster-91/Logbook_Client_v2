import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'
import ExpansionBaySelections from './ExpansionBaySelections';

//TODO: track stat changes and exceptions of each expansion type
//64 Expansion Bay Types

function SetExpansionBays() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { expansionBayIds } = customShipParts
  const size = ship.getSize()

  let pcuCostTotal = 0
  let bpCostTotal = 0
  // workaround for frame with 0 expansion bays
  // may not be needed if this component is conditionally rendered based on expansion bay allowance
  if(expansionBayIds.length){
    pcuCostTotal = expansionBayIds
      .map((expansion) => Tables.getExpansionBayData(expansion, size).pcuCost)
      .reduce((total, pcu) => total + pcu);

    bpCostTotal = expansionBayIds
      .map((expansion) => Tables.getExpansionBayData(expansion, size).bpCost)
      .reduce((total, bp) => total + bp);
  } 
  

  return (
    <>
      <h3>Expansion Bays</h3>

      <p></p>

      <ExpansionBaySelections></ExpansionBaySelections>      

      <p></p>

      <div>
        Total PCU Costs: {pcuCostTotal}; 
        Total BP Costs: {bpCostTotal}
      </div>
    </>
  );
}

export default SetExpansionBays;