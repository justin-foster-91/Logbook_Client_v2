import React, { useState, useContext, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as SF from "../../References/shipFunctions";
import * as Tables from '../../ShipPartSetters/CustomRefs/metaTables'
import PointTotals from '../../ShipPartSetters/Components/PointTotals';

function Sidebar(props: any) {
  const {setterList, partHighlight} = props;

  const sidebarList = () => {
    return setterList.map((part: any) => {
      let { name, subComponents } = part;


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
        
          <a href="#top">
            <h3>Ship Parts</h3>
          </a>
        
        {sidebarList()}

        <PointTotals layout={"summary"}/>
      </div>
    </nav>
  );
}

export default Sidebar;