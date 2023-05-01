import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import SFS from '../Assets/Images/Starfinder_Society.png';

// https://paizo.com/starfindersociety/characteroptions
// TODO: There are Base Frames from DC and AA that Archives of Nethys indicates aren't legal, but Paizo refs indicate should be

// Allowed: CRB, AA, PW, DC, AA2
// Not Allowed: NS, SOM, EoB, DM, WotE,RotE, FotF, TLR, TR

// All supercolossals are in SOM/EoB


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

  const isSfsLegal = (source) => {
    return sources[source].sfsLegal;
  }
  // console.log(Society);

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
          {isSfsLegal(source) && <img className='sfsLogo' src={SFS} alt='SFS' />}
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