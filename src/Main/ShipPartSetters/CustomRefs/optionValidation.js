import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";
import * as Utils from "../../References/utils.js";

const isAllowedBySources = (ship, partSource) => {
  const activeSources = ship.getActiveSources();

  if (partSource) partSource = partSource.substring(0, partSource.indexOf(" pg"))
  const allowedBySources = (partSource && activeSources.includes(partSource));

  return allowedBySources;
}

const isValidFrame = (ship, frameOption) => {
  let { source } = Tables.getFrameData(frameOption);

  if (!frameOption) console.trace(frameOption)
  if (!isAllowedBySources(ship, source)) return false; 

  return true;
}

// const updatePowerCoresToMatchFrame = (ship) => {
//   const size = findComponentByFrameId(ship.frameId, "size")
//   const computerIdList = Tables.getPowerCoreIdList()
//   const firstMatch = computerIdList.find(core => doesFrameSizeAllowCore(core, size))
//   let newCoreAmount = getCoreQuantityFromSize(size);

//   ship.powerCoreIds.forEach((core, idx) => {
//     if(core !== null && !doesFrameSizeAllowCore(core, size)) ship.powerCoreIds[idx] = null;   
//     if(idx === 0 && ship.powerCoreIds[idx] !== firstMatch) ship.powerCoreIds[idx] = firstMatch
//   });

//   // reduce length of the power core list if moving to a smaller frame
//   if (ship.powerCoreIds.length > newCoreAmount) ship.powerCoreIds.length = newCoreAmount;
// };

// 1 Supercolossal && up to 4 of Huge or Gargantuan
// OR
// Up to 5 Colossal
const isValidPowerCore = (ship, coreOption) => {
  const { powerCoreIds, frameId } = ship.getParts();
  const frameSize = ship.getSize()
  const { sizes, pcuProvided, bpCost, source } = Tables.getPowerCoreData(coreOption);
  
  if (!isAllowedBySources(ship, source)) return false; 
  
  if (!SF.doesFrameSizeAllowCoreSize(coreOption, frameSize)) return false;

  if (frameSize !== "Supercolossal") return true;

  const usedSizes = new Set();
  powerCoreIds.forEach(core => {
    if (!core) return;
    const coreSizes = Tables.getPowerCoreData(core).sizes
    coreSizes.forEach(size => usedSizes.add(size))
  })

  console.log(usedSizes);
  console.log(usedSizes.size);
  // first dropdown only allow Sc or C

  // if Sc, allow smaller options && exclude other Sc --- also exclude C?
  // if C, only allow C options

  return true;
}

const isValidThruster = (ship, thrusterOption, activeSources) => {


  // A hauler can accommodate [thrusters] designed for starships 1 size category larger than normal.
  // if (frameId.includes("Hauler")) [thruster size] += 1;

}


const isValidDriftEngine = (ship, engineOption) => {
  const { frameId, powerCoreIds } = ship.getParts();
  const frameSize = ship.getSize();
  let { maxSize: maxEngineSize, source, minPCU } = Tables.getDriftEngineData(engineOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false; 

  const withinMaxSize = (Tables.sizeCategory[frameSize] <= Tables.sizeCategory[maxEngineSize]);
  if (!withinMaxSize) return false;

  const maxPower = Tables.getPowerCoreData(powerCoreIds[0]).pcuProvided
  const withinPowerBudget = (minPCU <= maxPower);
  if (!withinPowerBudget) return false;
  
  // A Supercolossal starship can mount only a Signal Basic Drift engine
  if (frameSize === "Supercolossal" && engineOption !== "Signal Basic") return false;

  return true;
}

export {
  isValidFrame,
  isValidPowerCore,
  isValidThruster,
  isValidDriftEngine,
}