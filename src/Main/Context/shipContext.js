import React, { useState, createContext } from "react";
import defaultSelections from '../References/defaultShipSelection';
import { findComponentByFrameId } from '../References/shipFunctions';
import { capitalizeEachWord } from '../References/utils';
import { getTierData } from '../References/metaTables'

export const ShipsContext = createContext({userShips: [], setUserShips: ()=>{}});

export const ShipsProvider = ({children}) => {
  const [userShips, setUserShips] = useState([]);

  return (<ShipsContext.Provider value={{userShips, setUserShips}}>{children}</ShipsContext.Provider>)
}



export const CustomShipContext = createContext({customShip: {}, setCustomShip: ()=>{}, framePackage: {}})

export const CustomShipsProvider = ({children}) => {
  const [customShipParts, setCustomShipParts] = useState(defaultSelections)

  const formatExpansions = (defaultString) => {
    if(defaultString.toString().search('unlimited') >= 0) return "Unlimited"

    return defaultString;
  }

  let { tierId } = customShipParts
  let frameId                 = capitalizeEachWord(customShipParts.frameId);
  let {startTotal, increment} = findComponentByFrameId(frameId, 'hp')

  let framePackage = {
    size: findComponentByFrameId(frameId, 'size'),
    maneuverability: findComponentByFrameId(frameId, 'maneuverability'),
    hp: startTotal + (increment * getTierData(tierId).hpIncrementMultiplier),
    dt: findComponentByFrameId(frameId, 'dt'),
    ct: findComponentByFrameId(frameId, 'ct'),
    expansions: formatExpansions(findComponentByFrameId(frameId, 'expansions')),
    minCrew: findComponentByFrameId(frameId, 'minimumCrew'),
    maxCrew: findComponentByFrameId(frameId, 'maximumCrew'),
    bpCost: findComponentByFrameId(frameId, 'cost')
  }

  return (<CustomShipContext.Provider value={{customShipParts, setCustomShipParts, framePackage}}>{children}</CustomShipContext.Provider>)
}