import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import SFS from '../Assets/Images/Starfinder_Society.png';

// https://paizo.com/starfindersociety/characteroptions
// TODO: There are Base Frames from DC and AA that Archives of Nethys indicates aren't legal, but Paizo refs indicate should be

function SetSources(props) {
  const { sourceStatus, setSourceStatus } = useContext(CustomShipContext);

  const { sources: sourceTable } = Tables
  const sourceList = Object.keys(sourceTable)
  
  const isSfsLegal = (source) => {
    return sourceTable[source].sfsLegal;
  }

  const handleCheckboxClick = (ev) => {
    const checkbox = ev.target.name
    const checked = ev.target.checked

    setSourceStatus(activeSources => ({
      ...activeSources,
      [checkbox]: checked
    }))
  }

  const changeActiveSources = (newValFunc) => {
    return sourceList.reduce((accum, cur) => {
        accum[cur] = newValFunc(cur);
        return accum;
      }, {})
  }

  const handleButtonClick = (ev) => {
    const clicked = ev.target.value;

    let updatedSources = {}

    if (clicked === 'All') {
      updatedSources = changeActiveSources((cur) => true)
    }

    if (clicked === 'None') {
      updatedSources = changeActiveSources((cur) => false)

      updatedSources['Starfinder Core Rulebook'] = true;
    }

    if (clicked === 'SFS Legal') {
      updatedSources = changeActiveSources(isSfsLegal)
    }

    setSourceStatus(updatedSources)
  }

  const renderButtons = () => {
    return (
      <>
        <input type="button" onClick={handleButtonClick} value="All" />
        <input type="button" onClick={handleButtonClick} value="SFS Legal" />
        <input type="button" onClick={handleButtonClick} value="None" />
      </>
    )
  }

  const renderCheckboxes = () => {
    return sourceList.map(source => {
      return (
        <div className='row' key={source}>
          <input type="checkbox" id={source} name={source} 
            onChange={handleCheckboxClick} 
            checked={sourceStatus[source]}
            disabled={source === 'Starfinder Core Rulebook'}
          />
          {isSfsLegal(source) && <img className='sfsLogo' src={SFS} alt='[SFS Legal] ' />}
          <label htmlFor={source}>{source}</label>
          <a 
            href={sourceTable[source].link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inputImg"
          >
            {sourceTable[source].abbrev}
          </a>
        </div>
      )
    })
  }

  return (
    <>
      <PartTitle currentPart={"Sources"} />
      {renderButtons()}
      {renderCheckboxes()}
    </>
  );
}

export default SetSources;