import React, { useContext, useState, useEffect } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import NonPrimaryComputers from "./NonPrimaryComputers";
import * as SF from "../References/shipFunctions";

function SetComputer() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [isSupercolossal, setIsSupercolossal] = useState(false);
  const [isMononode, setIsMononode] = useState(true)

  const { computerId, tierId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const { nodes } = Tables.getComputerData(computerId);
  const size = ship.getSize();
  const { nodes: secondaryNodes } = Tables.getComputerData(secondaryComputerId)
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
      <h3>Computer</h3>
      <p></p>
      Primary Computer
      <br />
      <select value={computerId} onChange={handleComputerChange}>
        {Tables.getComputerIdList().map((computer, idx) =>
          renderComputerOptions(computer, idx)
        )}
      </select>
      <p></p>
      {isSupercolossal && 
        <NonPrimaryComputers
          isMononode={isMononode}
        ></NonPrimaryComputers>
      }
      <p></p>
      <div>
        Bonus: {bonusList}; Nodes: {totalNodes}; Tier: {computerTier}
      </div>
      <div>
        PCU Cost: {totalCompPCUCosts}; BP Cost: {totalCompBPCosts}
      </div>
    </>
  );
}

export default SetComputer;
