import React, { useState, createContext } from "react";
import defaultSelections from '../References/defaultShipSelection';

export const ShipsContext = createContext({userShips: [], setUserShips: ()=>{}});

export const ShipsProvider = ({children}) => {
  const [userShips, setUserShips] = useState([]);
  // const value = {userShips: [], setUserShips: ()=>{}};

  return (<ShipsContext.Provider value={{userShips, setUserShips}}>{children}</ShipsContext.Provider>)
}

export const CustomShipContext = createContext({customShip: {}, setCustomShip: ()=>{}})

export const CustomShipsProvider = ({children}) => {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)

  return (<CustomShipContext.Provider value={{customShipParts, setCustomShipParts}}>{children}</CustomShipContext.Provider>)
}