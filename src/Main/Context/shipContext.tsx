import React, { useState, createContext, useEffect } from "react";
import defaultSelections from '../ShipPartSetters/CustomRefs/defaultShipSelection';
import Ship from '../References/ship';
import * as Utils from '../References/utils';
import * as Tables from '../ShipPartSetters/CustomRefs/metaTables';


export const ShipsContext = createContext({userShips: [], setUserShips: (ships: any)=>{}});
export const ShipsProvider = ({children}: any) => {
  const [userShips, setUserShips] = useState<any>([]);

  return (<ShipsContext.Provider value={{userShips, setUserShips}}>{children}</ShipsContext.Provider>)
}


interface CustomShipInterface {
  customShipParts: any,
  setCustomShipParts: any, 
  ship: any, 
  sourceStatus: any,
  setSourceStatus: any,
  activeSources: any
}
export const CustomShipContext = createContext<CustomShipInterface>({
  customShipParts: {}, 
  setCustomShipParts: (shipParts: any)=>{}, 
  ship: new Ship(), 
  sourceStatus: {},
  setSourceStatus: (sources: any)=>{},
  activeSources: []
})
export const CustomShipProvider = ({children}: any) => {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)
  
  const sourceList = Object.keys(Tables.sources)
  const [sourceStatus, setSourceStatus] = useState(
    sourceList.reduce((accum: any, cur: string) => {
      accum[cur] = true;
      return accum;
    }, {})
  )
    
  const activeSources = Object.keys(sourceStatus).filter((source) => sourceStatus[source] === true)
    
  const ship = new Ship(customShipParts, activeSources)
  
  ship.onShipChange = (parts) => setCustomShipParts({...parts})

  return (<CustomShipContext.Provider value={{customShipParts, setCustomShipParts, ship, sourceStatus, setSourceStatus, activeSources}}>{children}</CustomShipContext.Provider>)
}


// interface SourceStatus {
//   [x: string]: bool;
// }