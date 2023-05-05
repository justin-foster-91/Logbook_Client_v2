import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";

const isAllowedBySources = (ship, partSource) => {
  const activeSources = ship.getActiveSources();

  if (partSource) partSource = partSource.substring(0, partSource.indexOf(" pg"))
  const allowedBySources = (partSource && activeSources.includes(partSource));

  return allowedBySources;
}

const isValidFrame = (ship, frameOption) => {
  let { source: partSource } = Tables.getFrameData(frameOption);

  if (!isAllowedBySources(ship, partSource)) return false; 

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

// const doesFrameSizeAllowCore = (core, frameSize) => {
//   let sizeLetterList = Tables.getPowerCoreData(core).sizes;
//   let sizeWordList = sizeLetterList.map((size) =>
//     Utils.sizeLetterToStringConverter(size)
//   );

//   if (frameSize === "Supercolossal" && sizeWordList.includes("Huge"))
//     return true;

//   return sizeWordList.includes(frameSize);
// };
const isValidPowerCore = (ship, coreOption) => {
  const { powerCoreIds, frameId } = ship;
  const frameSize = SF.findComponentByFrameId(frameId, "size")





  // TODO: Only allow 1 supercolossal core

}

const isValidThruster = (ship, thrusterOption, activeSources) => {


  // A hauler can accommodate [thrusters] designed for starships 1 size category larger than normal.
  // if (frameId.includes("Hauler")) [thruster size] += 1;

}


const isValidDriftEngine = (ship, engineOption) => {
  const { frameId, powerCoreIds } = ship.parts;
  const frameSize = ship.getSize();
  let { maxSize: maxEngineSize, source: partSource, minPCU } = Tables.getDriftEngineData(engineOption, frameSize, frameId);

  if (!isAllowedBySources(ship, partSource)) return false; 

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