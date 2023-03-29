import React from 'react';

function Sidebar(props) {
  const {setterList} = props;

  const sidebarList = () => {
    return setterList.map(part => {
      return (
        // <button className="scrollLink" onClick={() => `window.location.href='#${part.name}'`}>
        //   {part.name}
        // </button>
        
        // <div>
          <a href={`#${part.name}`} key={`${part.name}`}>
            <div>
              {part.name}
            </div>
          </a>
        // </div>
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