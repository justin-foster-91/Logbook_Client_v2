import React, { useContext, useState, useEffect } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import NonPrimaryComputers from "./NonPrimaryComputers";
import * as SF from "../References/shipFunctions";

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
      <h3>{currentPart.name.toUpperCase()}</h3>

      <div className="dropdownBlock">
        <div>Primary Computer</div>

        <select value={computerId} onChange={handleComputerChange}>
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
        <div>Bonus: {bonusList}</div>
        <div>Nodes: {totalNodes}</div>
        <div>Tier: {computerTier}</div>
      </div>

      <div className="row totals">
        <div>PCU Cost: {totalCompPCUCosts}</div>
        <div>BP Cost: {totalCompBPCosts}</div>
      </div>
    </>
  );
}

export default SetComputer;
