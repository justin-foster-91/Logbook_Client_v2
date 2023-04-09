import React from 'react';
import { useEffect } from 'react';

function Sidebar(props) {
  const {setterList, partHighlight} = props;

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
      </div>
    </div>
  );
}

export default Sidebar;