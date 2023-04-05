import React from 'react';
import { useEffect } from 'react';

function Sidebar(props) {
  const {setterList, partHighlight} = props;

  const sidebarList = () => {
    return setterList.map(part => {
      let highlight = false;
      if (part.name === partHighlight) highlight = true;

      return (
        <a href={`#${part.name}`} key={part.name} >
          <div className={highlight ? "sidebarHighlight" : ""}>
            {part.name}
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