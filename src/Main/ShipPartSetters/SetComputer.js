import React, { useContext, useState, useEffect } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import NonPrimaryComputers from "../Components/NonPrimaryComputers";
import * as SF from "../References/shipFunctions";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";

function SetComputer(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [isSupercolossal, setIsSupercolossal] = useState(false);
  const [isMononode, setIsMononode] = useState(true)

  const { computerId, tierId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const { nodes } = Tables.getComputerData(computerId);
  const size = ship.getSize();
  const { nodes: secondaryNodes } = Tables.getComputerData(secondaryComputerId)
  const { currentPart } = props;

  const totalCompBPCosts = SF.getTotalCompBPCosts(customShipParts)
  const totalCompPCUCosts = SF.getTotalCompPCUCosts(customShipParts)
  const totalNodes = nodes + secondaryNodes + ctNetworkNodes
  const bonusList = SF.combineComputerBonuses(customShipParts, size)
  const computerTier = Math.max(Math.floor(tierId / 2), 1);

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

      <div className="dropdownBlock">
        <label htmlFor="primaryComputer"><strong>Primary Computer</strong></label>

        <select id="primaryComputer" value={computerId} onChange={handleComputerChange}>
          {Tables.getComputerIdList().map((computer, idx) =>
            renderComputerOptions(computer, idx)
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
      </div>

      <PartTotals part={currentPart} pcuCost={totalCompPCUCosts} bpCost={totalCompBPCosts}/>
    </>
  );
}

export default SetComputer;
