import React, { useContext, useState, useEffect } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import * as Utils from '../References/utils'

function NonPrimaryComputers(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);

  const { computerId, tierId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const size = ship.getSize();
  const { setIsSupercolossal, isMononode } = props
  const [Mk, x] = Utils.capitalizeEachWord(computerId).split(' ')
  const networkNodeId = `${Mk} ${x}`

  const { 
    bonus: secondaryBonus,
     nodes: secondaryNodes, 
     pcuCost: secondaryPCUCost, 
     bpCost: secondaryBPCost 
  } = Tables.getComputerData(secondaryComputerId)

  const { 
    bonus: networkBonus, 
    nodeMax, 
    pcuCost: networkPCUCost, 
    bpCost: networkBPCost
  } = Tables.getNetworkNodeData(networkNodeId, ship.getSize())

  useEffect(() => {
    setIsSupercolossal(false);

    customShipParts.secondaryComputerId = "Basic Computer";
    setCustomShipParts({ ...customShipParts });
  }, [size]);

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

  return (
    <>
      Secondary Computer
      <br />
      <select
        defaultValue={secondaryComputerId}
        onChange={(ev) => handleSecondaryComputerChange(ev)}
      >
        <option key={-1}>Basic Computer</option>
        {Tables.getComputerIdList().map(
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
}

export default NonPrimaryComputers;