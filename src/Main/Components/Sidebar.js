import React from 'react';

function Sidebar(props) {
  const {setterList} = props;

  const sidebarList = () => {
    return setterList.map(part => {
      return (
      <div>
        <a href={`#${part.name}`}>{part.name}</a>
      </div>
    )})
  }


  return (
    <div className='sidebar'>
      SIDEBAR
      {sidebarList()}
    </div>
  );
}

export default Sidebar;