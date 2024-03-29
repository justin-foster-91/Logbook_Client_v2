import React, { useContext } from "react";
import * as Tables from "../CustomRefs/metaTables";
import { CustomShipContext } from "../../Context/shipContext";
import * as Utils from '../../References/utils'
import { isValidComputer } from "../CustomRefs/optionValidation";

function NonPrimaryComputers(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { computerId, secondaryComputerId, ctNetworkNodes } = customShipParts;
  const { isMononode } = props

  const mkNumber = Utils.capitalizeEachWord(computerId).split(' ')[1]
  const networkNodeId = `Mk ${mkNumber}`
  const { nodeMax } = Tables.getNetworkNodeData(networkNodeId, ship.getSize())

  const handleSecondaryComputerChange = (ev) => {
    const secondaryOption = ev.target.value;

    ship.setSecondaryComputer(secondaryOption)
  };

  const handleNodeChange = (ev) => {
    const nodeAmount = Number(ev.target.value)

    ship.setNetworkNodeCount(nodeAmount)
  };

  return (
    <>

      <div className="dropdownBlock">
        <label htmlFor="secondaryComputer"><strong>Secondary Computer</strong></label>

        <select
          id="secondaryComputer"
          value={secondaryComputerId}
          onChange={handleSecondaryComputerChange}
        >
          {Tables.getComputerIdList().map(
            (computer, idx) =>
              isValidComputer(ship, computer, "Secondary") && (
                <option key={idx}>{computer}</option>
              )
          )}
        </select>
      </div>
      
      {isMononode &&
      <div className="dropdownBlock">
        <label htmlFor="networkNodes"><strong>Network Nodes</strong></label>

        <select id="networkNodes" value={ctNetworkNodes} onChange={handleNodeChange}>
          {Array(nodeMax+1).fill(1).map((node, idx) => 
            <option key={idx}>{idx}</option>
          )}
        </select>
      </div>}
    </>

  );
}

export default NonPrimaryComputers;