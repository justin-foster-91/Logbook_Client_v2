import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';


function SetSources(props) {
  const [checkedList, setCheckedList] = useState({})
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { sources } = Tables
  const sourceList = Object.keys(sources)

  useEffect(() => {
    sourceList.forEach(source => {
      setCheckedList(checkedList => ({
        ...checkedList,
        [source]: true
      }))
    })
  }, []) // can't fill dependency and can't remove it

  const handleClick = (ev) => {
    const checkbox = ev.target.name
    const checked = ev.target.checked

    setCheckedList(checkedList => ({
      ...checkedList,
      [checkbox]: checked
    }))
    console.log(checkedList);
  }

  const renderCheckboxes = () => {
    return sourceList.map(source => {
      return (
        <div className='row' key={source}>
          <input type="checkbox" id={source} name={source} 
            onChange={handleClick} 
            checked={checkedList[source] || false}
          />
          <label htmlFor={source}>{source}</label>
          <a 
            href={sources[source].link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inputImg"
          >
              {sources[source].abbrev}
          </a>
        </div>
      )
    })
  }

  return (
    <>
      <PartTitle currentPart={"Sources"} />
      
      {renderCheckboxes()}
    </>
  );
}

export default SetSources;