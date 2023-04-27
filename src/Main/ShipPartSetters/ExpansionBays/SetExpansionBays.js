import React, {useContext, useState, useEffect} from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from '../CustomRefs/metaTables'
import ExpansionBaySelections from './ExpansionBaySelections';
import PartTitle from '../Components/PartTitle';
import PartTotals from '../Components/PartTotals';
import AccordionText from '../Components/AccordionText';

// TODO: carrier frame must have 1 hangar expansion
// TODO: track stat changes and exceptions of each expansion type
//64 Expansion Bay Types

//Pioneer 1 (usually cargo hold)
//Shuttle 3 (usually cargo holds or passenger seating)
//Carrier 10 (must have at least 1 hanger bay)

function SetExpansionBays(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { expansionBayIds } = customShipParts
  const size = ship.getSize()
  const { expansions: expansionCap } = ship.getFramePackage()
  const { currentPart } = props;
  const [pcuCostTotal, setPcuCostTotal] = useState(0)
  const [bpCostTotal, setBpCostTotal] = useState(0)

  useEffect(() => {
    // This if condition may not be necessary with better checks when setting variables
    if(expansionBayIds.length){
      setPcuCostTotal(expansionBayIds
        .map((expansion) => Tables.getExpansionBayData(expansion, size).pcuCost)
        .reduce((total, pcu) => total + pcu));
  
      setBpCostTotal(expansionBayIds
        .map((expansion) => Tables.getExpansionBayData(expansion, size).bpCost)
        .reduce((total, bp) => total + bp));
    } 
  }, [expansionBayIds, size])

  useEffect(() => {
    if (expansionCap === 0) return;
  }, [expansionCap])
  

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <>
          <p>Most starships have room within their hull for one or more expansion bays, each of which can be converted to function in a wide variety of roles. Unfilled, these bays are simply storage space (and count as cargo holds), and for many large transport vessels, they remain this way. If a starship's bays are instead used for guest quarters, the ship can serve as a transport vessel for soldiers, travelers, or refugees. If its bays are filled with medical bays and guest quarters, the ship becomes a mobile hospital.</p>
          <p>The following options are available for most ships that have available expansion bays. If an option requires multiple bays, this is noted in its description; if it must consume PCU to function, the amount is listed in the table on page 300. An entire expansion bay must be used for a single purpose, even if it gives you multiple instances of that option. For example, if you select escape pods, that expansion bay gains all six escape pods—you can't combine three escape pods and one life boat.</p>
        </>
      </AccordionText>

      <ExpansionBaySelections></ExpansionBaySelections>      

      <PartTotals part={currentPart} pcuCost={pcuCostTotal} bpCost={bpCostTotal} />
    </>
  );
}

export default SetExpansionBays;