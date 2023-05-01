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
  customShip: {}, 
  setCustomShip: ()=>{}, 
  ship: new Ship(), 
  sources: {}
})
export const CustomShipProvider = ({children}) => {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)
  const [sources, setSources] = useState({})
  const ship = new Ship(customShipParts)

  ship.onShipChange = (parts) => setCustomShipParts({...parts})

  return (<CustomShipContext.Provider value={{customShipParts, setCustomShipParts, ship}}>{children}</CustomShipContext.Provider>)
}