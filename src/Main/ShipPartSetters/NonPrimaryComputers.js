import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import * as Utils from '../References/utils'

function NonPrimaryComputers(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);

  let { computerId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const { isMononode } = props
  const [Mk, x] = Utils.capitalizeEachWord(computerId).split(' ')
  const networkNodeId = `${Mk} ${x}`

  const { nodeMax } = Tables.getNetworkNodeData(networkNodeId, ship.getSize())

  const handleSecondaryComputerChange = (ev) => {
    const secondaryComputerOption = ev.target.value;

    customShipParts.secondaryComputerId = secondaryComputerOption;
    setCustomShipParts({ ...customShipParts });
  };

  const handleNodeChange = (ev) => {
    const nodeAmount = Number(ev.target.value)

    if(nodeAmount < 0 || nodeAmount > nodeMax) return

    customShipParts.ctNetworkNodes = nodeAmount
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
        <select value={ctNetworkNodes} onChange={(ev) => handleNodeChange(ev)}>
          {Array(nodeMax+1).fill(1).map((node, idx) => 
            <option key={idx}>{idx}</option>
          )}
        </select>
      </div>}
    </>

  );
}

export default NonPrimaryComputers;