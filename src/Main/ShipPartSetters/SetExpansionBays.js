import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'
import ExpansionBaySelections from './ExpansionBaySelections';

// TODO: carrier frame must have 1 hangar expansion
// TODO: track stat changes and exceptions of each expansion type
//64 Expansion Bay Types

//Pioneer 1 (usually cargo hold)
//Shuttle 3 (usually cargo holds or passenger seating)
//Carrier 10 (must have at least 1 hanger bay)

function SetExpansionBays() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { expansionBayIds } = customShipParts
  const size = ship.getSize()
  let { expansions: expansionCap } = ship.getFramePackage()

  let pcuCostTotal = 0
  let bpCostTotal = 0

  // This if condition may not be necessary with better checks when setting variables
  if(expansionBayIds.length){
    pcuCostTotal = expansionBayIds
      .map((expansion) => Tables.getExpansionBayData(expansion, size).pcuCost)
      .reduce((total, pcu) => total + pcu);

    bpCostTotal = expansionBayIds
      .map((expansion) => Tables.getExpansionBayData(expansion, size).bpCost)
      .reduce((total, bp) => total + bp);
  } 
  
  if (expansionCap === 0) return '';

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