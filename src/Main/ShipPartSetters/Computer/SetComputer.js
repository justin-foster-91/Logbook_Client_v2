import React, { useContext, useState, useEffect } from "react";
import * as Tables from "../CustomRefs/metaTables";
import { CustomShipContext } from "../../Context/shipContext";
import NonPrimaryComputers from "./NonPrimaryComputers";
import * as SF from "../../References/shipFunctions";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";
import AccordionText from "../Components/AccordionText";
import { isValidComputer } from "../CustomRefs/optionValidation";

function SetComputer(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [isSupercolossal, setIsSupercolossal] = useState(false);
  const [isMononode, setIsMononode] = useState(true)

  const { computerId, tierId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const { nodes } = Tables.getComputerData(computerId);
  const size = ship.getSize();
  const { nodes: secondaryNodes } = Tables.getComputerData(secondaryComputerId)
  const { currentPart } = props;

  const { bpTotal, pcuTotal } = SF.getTotalCompCosts(customShipParts)
  const totalNodes = nodes + secondaryNodes + ctNetworkNodes
  const bonusList = SF.combineComputerBonuses(customShipParts, size)
  const computerTier = Math.max(Math.floor(parseInt(tierId) / 2), 1);
  const { hackDC } = Tables.getComputerHackDC(computerTier)

  useEffect(() => {
    if (size === "Supercolossal") {
      setIsSupercolossal(true);
      
      if(computerId.includes('Mononode')){
        setIsMononode(true)
      } else{
        setIsMononode(false)
      }
    } else {
      setIsSupercolossal(false);
    }
  }, [size, computerId]);

  const handleComputerChange = (ev) => {
    const computerOption = ev.target.value;
    
    ship.setComputer(computerOption).setNetworkNodeCount(0)
  };

  const renderComputerOptions = (computer, idx) => {
    if (isSupercolossal) {
      if (computer.split(" ")[1] >= 4) {
        return <option key={idx}>{computer}</option>;
      }
    } else {
      return <option key={idx}>{computer}</option>;
    }
  };

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <>
          <p>A computer system functions in many ways as a ship's brain. Most computers aboard starships have at least a rudimentary artificial personality, and while they can't fully perform the duties of a crew member, they can assist crew members in various tasks. However, many spacefarers claim that over time, a starship's computers can develop temperaments and personality quirks that set them apart from identical computers in other ships. A starship has a basic computer of a tier equal to half the starship's tier (minimum 1); see the Computers skill on page 137 and Computers on page 213 for more information about how a starship computer can be hacked or upgraded. Which upgrades a crew can purchase for its starship computer is determined by the GM; some upgrades can be purchased with Build Points (see page 294).</p>
          <p>While a starship's computer is responsible for operating and managing a wide variety of starship systems at any given point in time, only a starship with an integrated control module (ICM) can aid the crew in starship combat (the basic computer listed on the table below is the only option that lacks an ICM). In general, an ICM adds a flat circumstance bonus to one or more starship combat checks, decided just before the check is attempted. An ICM has a number of nodes; each node grants its bonus to one starship combat check per round. Multiple nodes allow an ICM to influence multiple starship combat checks in a round, but they do not allow a computer to add multiple bonuses to the same starship combat check.</p>
          <p>The cost of an ICM for the starship's computer is equal to the bonus it grants squared, multiplied by its number of nodes. ICMs can be purchased only with Build Points, not with credits.</p>
        </>
      </AccordionText>

      <div className="dropdownBlock">
        <label htmlFor="primaryComputer"><strong>Primary Computer</strong></label>

        <select id="primaryComputer" value={computerId} onChange={handleComputerChange}>
          {Tables.getComputerIdList().map((computer, idx) =>
            isValidComputer(ship, computer, "Primary") 
            && <option key={idx}>{computer}</option>
          )}
        </select>
      </div>

      {isSupercolossal && 
        <NonPrimaryComputers
          isMononode={isMononode}
        ></NonPrimaryComputers>
      }

      <div className="row">
        <div><strong>Skill Bonus</strong>: {bonusList}</div>
        <div><strong>Nodes</strong>: {totalNodes}</div>
        <div><strong>Tier</strong>: {computerTier}</div>
        <div><strong>Hack DC</strong>: {hackDC}</div>
      </div>

      <PartTotals part={currentPart} pcuCost={pcuTotal} bpCost={bpTotal}/>
    </>
  );
}

export default SetComputer;
