import React, { useState, createContext, useEffect } from "react";
import defaultSelections from '../ShipPartSetters/CustomRefs/defaultShipSelection';
import Ship from '../References/ship';
import * as Utils from '../References/utils';
import * as Tables from '../ShipPartSetters/CustomRefs/metaTables';


export const ShipsContext = createContext({userShips: [], setUserShips: ()=>{}});
export const ShipsProvider = ({children}) => {
  const [userShips, setUserShips] = useState([]);

  return (<ShipsContext.Provider value={{userShips, setUserShips}}>{children}</ShipsContext.Provider>)
}


export const CustomShipContext = createContext({
  customShipParts: {}, 
  setCustomShipParts: ()=>{}, 
  ship: new Ship(), 
  sourceStatus: {},
  setSourceStatus: ()=>{},
  activeSources: []
})
export const CustomShipProvider = ({children}) => {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)
  
  const sourceList = Object.keys(Tables.sources)
  const [sourceStatus, setSourceStatus] = useState(
    sourceList.reduce((accum, cur) => {
      accum[cur] = true;
      return accum;
    }, {})
  )
    
  const activeSources = Object.keys(sourceStatus).filter((source) => sourceStatus[source] === true)
    
  const ship = new Ship(customShipParts, activeSources)
  
  ship.onShipChange = (parts) => setCustomShipParts({...parts})

  return (<CustomShipContext.Provider value={{customShipParts, setCustomShipParts, ship, sourceStatus, setSourceStatus, activeSources}}>{children}</CustomShipContext.Provider>)
}