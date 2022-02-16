import React, { useContext, useState, useEffect } from "react";
import { getComputerData, getComputerIdList, getNetworkNodeData, getNetworkNodeIdList } from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { capitalizeEachWord } from '../References/utils'

function SetComputer() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const [isSupercolossal, setIsSupercolossal] = useState(false);
  const [isMononode, setIsMononode] = useState(true)

  const { computerId, tierId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const { bonus, nodes, pcuCost, bpCost } = getComputerData(computerId);
  const size = ship.getSize();
  const [Mk, x] = capitalizeEachWord(computerId).split(' ')
  const networkNodeId = `${Mk} ${x}`

  const { 
    bonus: secondaryBonus,
     nodes: secondaryNodes, 
     pcuCost: secondaryPCUCost, 
     bpCost: secondaryBPCost 
  } = getComputerData(secondaryComputerId)

  const { 
    bonus: networkBonus, 
    nodeMax, 
    pcuCost: networkPCUCost, 
    bpCost: networkBPCost
  } = getNetworkNodeData(networkNodeId, ship.getSize())

  const totalCompBPCosts = bpCost + (0 || secondaryBPCost) + ((0 || networkBPCost) * (0 || ctNetworkNodes))
  const totalCompPCUCosts = pcuCost + (0 || secondaryPCUCost) + ((0 || networkPCUCost) * (0 || ctNetworkNodes))
  const totalNodes = nodes + (0 || secondaryNodes) + (0 || ctNetworkNodes)

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
    if(!isSupercolossal) return Array(nodes || 1).fill(`+${bonus}`)

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
      customShipParts.ctNetworkNodes = 0
    }

    customShipParts.computerId = computerOption;
    setCustomShipParts({ ...customShipParts });
  };

  const handleSecondaryComputerChange = (ev) => {
    const secondaryComputerOption = ev.target.value;

    customShipParts.secondaryComputerId = secondaryComputerOption;
    setCustomShipParts({ ...customShipParts });
  };

  const handleNodeChange = (ev) => {
    const nodeAmount = ev.target.value
    console.log(nodeAmount, nodeMax);

    if(nodeAmount < 0 || nodeAmount > nodeMax) return

    customShipParts.ctNetworkNodes = Number(nodeAmount)
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

  const renderNonPrimaryComputers = () => {
    return (
      <>
        Secondary Computer
        <br />
        <select
          defaultValue={secondaryComputerId}
          onChange={(ev) => handleSecondaryComputerChange(ev)}
        >
          <option key={-1}>Basic Computer</option>
          {getComputerIdList().map(
            (computer, idx) =>
              computer.split(" ")[1] < 4 && (
                <option key={idx}>{computer}</option>
              )
          )}
        </select>

        <p></p>
        
        {isMononode &&
        <div>
          <label htmlFor="networkNodes">Network Nodes</label>
          <br/>
          <select onChange={(ev) => handleNodeChange(ev)}>
            {Array(nodeMax+1).fill(1).map((node, idx) => 
              <option key={idx}>{idx}</option>
            )}
          </select>
        </div>}
      </>
    );
  };

  return (
    <>
      <h3>Computer</h3>
      <p></p>
      Primary Computer
      <br />
      <select defaultValue={computerId} onChange={handleComputerChange}>
        {getComputerIdList().map((computer, idx) =>
          renderComputerOptions(computer, idx)
        )}
      </select>
      <p></p>
      {isSupercolossal && renderNonPrimaryComputers()}
      <p></p>
      <div>
        Bonus: {bonusList}; Total Nodes: {totalNodes}; Tier: {computerTier}
      </div>
      <div>
        PCU Cost: {totalCompPCUCosts}; BP Cost: {totalCompBPCosts}
      </div>
    </>
  );
}

export default SetComputer;
