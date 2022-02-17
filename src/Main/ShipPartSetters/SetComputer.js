import React, { useContext, useState, useEffect } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import * as Utils from '../References/utils'
import NonPrimaryComputers from "./NonPrimaryComputers";
import * as SF from "../References/shipFunctions";

function SetComputer() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const [isSupercolossal, setIsSupercolossal] = useState(false);
  const [isMononode, setIsMononode] = useState(true)

  const { computerId, tierId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const { bonus, nodes } = Tables.getComputerData(computerId);
  const size = ship.getSize();
  const [Mk, x] = Utils.capitalizeEachWord(computerId).split(' ')
  const networkNodeId = `${Mk} ${x}`

  const { 
    bonus: secondaryBonus,
    nodes: secondaryNodes, 
  } = Tables.getComputerData(secondaryComputerId)

  const { 
    bonus: networkBonus, 
  } = Tables.getNetworkNodeData(networkNodeId, size)

  const totalCompBPCosts = SF.getTotalCompBPCosts(customShipParts)
  const totalCompPCUCosts = SF.getTotalCompPCUCosts(customShipParts)
  const totalNodes = nodes + secondaryNodes + ctNetworkNodes

  const combineBonuses = () => {
    let primaryBonusArr = bonusSplitter(bonus, nodes)

    if(!isSupercolossal){
      return primaryBonusArr.join("/");
    } else{
      let secondaryBonusArr = bonusSplitter(secondaryBonus, secondaryNodes)
      let networkBonusArr = bonusSplitter(networkBonus, ctNetworkNodes)

      return primaryBonusArr.concat(networkBonusArr).concat(secondaryBonusArr).join('/')
    }
  }

  const bonusSplitter = (bonus, nodes) => {
    if(computerId.includes("Basic")) return ['+0']

    return Array(nodes).fill(`+${bonus}`)
  }

  const bonusList = combineBonuses()
  const computerTier = Math.max(Math.floor(tierId / 2), 1);

  useEffect(() => {
    if (size === "Supercolossal") {
      setIsSupercolossal(true);

      customShipParts.computerId = "Mk 4 Mononode";
      setCustomShipParts({ ...customShipParts });
    } else {
      setIsSupercolossal(false);

      customShipParts.secondaryComputerId = "Basic Computer";
      setCustomShipParts({ ...customShipParts });
    }
  }, [size]);

  const handleComputerChange = (ev) => {
    const computerOption = ev.target.value;

    if(computerOption.includes('Mononode')){
      setIsMononode(true)
    } else{
      setIsMononode(false)
    }
    
    customShipParts.ctNetworkNodes = 0;
    customShipParts.computerId = computerOption;
    setCustomShipParts({ ...customShipParts });
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
      <select defaultValue={computerId} onChange={handleComputerChange}>
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
