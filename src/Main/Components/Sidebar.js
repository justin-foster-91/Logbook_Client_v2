import React, { useState, useContext, useEffect } from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as SF from "../References/shipFunctions";
import * as Tables from '../References/metaTables'
import PointTotals from './PointTotals';

function Sidebar(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [validBP, setValidBP] = useState(true);
  const [validPCU, setValidPCU] = useState(true);

  const {setterList, partHighlight} = props;
  const { tierId, powerCoreIds } = customShipParts


  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = ship.getTotalPCUBudget()

  useEffect(() => {
    if (totalBPCosts > totalBPBudget) setValidBP(false);
    else setValidBP(true);
  }, [totalBPCosts, totalBPBudget])

  useEffect(() => {
    if (totalPCUCosts > totalPCUBudget) setValidPCU(false);
    else setValidPCU(true);
  }, [totalPCUCosts, totalPCUBudget])

  const sidebarList = () => {
    return setterList.map(part => {
      let { name } = part;

      let highlight = false;
      if (name === partHighlight) highlight = true;

      let shortName = null;
      // if (name === "Defensive Countermeasures") shortName = "Defensive Counter"

      return (
        <a href={`#${name}`} key={name} >
          <div className={highlight ? "sidebarHighlight" : ""}>
            {shortName || name}
          </div>
        </a>
    )})
  }

  return (
    <nav className='sidebarWrapper'>
      <div className='sidebar'>
        <h3>Ship Parts</h3>
        {sidebarList()}

        <PointTotals />
      </div>
    </nav>
  );
}

export default Sidebar;