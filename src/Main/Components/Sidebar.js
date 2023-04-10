import React from 'react';
import { useContext, useEffect } from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as SF from "../References/shipFunctions";
import * as Tables from '../References/metaTables'


function Sidebar(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const {setterList, partHighlight} = props;
  const { tierId, powerCoreIds } = customShipParts


  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = ship.getTotalPCUBudget()

  const sidebarList = () => {
    return setterList.map(part => {
      let { name } = part;

      let highlight = false;
      if (name === partHighlight) highlight = true;

      let shortName = null;
      if (name === "Defensive Countermeasures") shortName = "Defensive Counter"

      return (
        <a href={`#${name}`} key={name} >
          <div className={highlight ? "sidebarHighlight" : ""}>
            {shortName || name}
          </div>
        </a>
    )})
  }

  return (
    <div className='sidebarWrapper'>
      <div className='sidebar'>
        <h3>Ship Parts</h3>
        {sidebarList()}

        <div className="row totals">
          <div>BP used: {totalBPCosts}</div>
          <div>BP Budget: {totalBPBudget}</div>
        </div>

        <div className="row totals">
          <div>PCU used: {totalPCUCosts}</div>
          <div>PCU Essentials: {essentialPCUCosts}</div>
          <div>PCU Budget: {totalPCUBudget}</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;