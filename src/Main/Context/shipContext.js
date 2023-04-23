import React, { useState, createContext } from "react";
import defaultSelections from '../ShipPartSetters/CustomRefs/defaultShipSelection';
import Ship from '../References/ship';


export const ShipsContext = createContext({userShips: [], setUserShips: ()=>{}});
export const ShipsProvider = ({children}) => {
  const [userShips, setUserShips] = useState([]);

  return (<ShipsContext.Provider value={{userShips, setUserShips}}>{children}</ShipsContext.Provider>)
}


export const CustomShipContext = createContext({customShip: {}, setCustomShip: ()=>{}, ship: new Ship()})
export const CustomShipProvider = ({children}) => {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)
  const ship = new Ship(customShipParts)
  ship.onShipChange = (parts) => setCustomShipParts({...parts})

  return (<CustomShipContext.Provider value={{customShipParts, setCustomShipParts, ship}}>{children}</CustomShipContext.Provider>)
}