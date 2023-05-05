import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";

const isAllowedBySources = (source, activeSources) => {
  if (source) source = source.substring(0, source.indexOf(" pg"))
  const allowedBySources = (source && activeSources.includes(source));
  if (!allowedBySources) return false;
}

const isValidFrame = (ship, frameOption, activeSources) => {
  let { source, cost } = Tables.getFrameData(frameOption);
  const { buildPoints } = Tables.getTierData(ship.tierId);

  // console.log(ship.sources);
  // console.log(activeSources);
  // console.log(ship);

  if (source) source = source.substring(0, source.indexOf(" pg"))
  const allowedBySources = (source && activeSources.includes(source));
  if (!allowedBySources) return false;

  return true;
}


// const doesFrameSizeAllowCore = (core, frameSize) => {
//   let sizeLetterList = Tables.getPowerCoreData(core).sizes;
//   let sizeWordList = sizeLetterList.map((size) =>
//     Utils.sizeLetterToStringConverter(size)
//   );

//   if (frameSize === "Supercolossal" && sizeWordList.includes("Huge"))
//     return true;

//   return sizeWordList.includes(frameSize);
// };
const isValidPowerCore = (ship, coreOption, activeSources) => {
  const { powerCoreIds, frameId } = ship;
  const frameSize = SF.findComponentByFrameId(frameId, "size")





  // TODO: Only allow 1 supercolossal core

}

const isValidThruster = (ship, thrusterOption, activeSources) => {


  // A hauler can accommodate [thrusters] designed for starships 1 size category larger than normal.
  // if (frameId.includes("Hauler")) [thruster size] += 1;

}


const isValidDriftEngine = (ship, engineOption, activeSources) => {
  const { frameId } = ship;
  const frameSize = SF.findComponentByFrameId(frameId, "size")
  let { maxSize: maxEngineSize, minPCU, source } = Tables.getDriftEngineData(engineOption, frameSize, frameId);

  if (source) source = source.substring(0, source.indexOf(" pg"))
  const allowedBySources = (source && activeSources.includes(source));
  if (!allowedBySources) return false;

  const { size } = SF.getFramePackage(ship);
  if (!maxEngineSize) maxEngineSize = "Supercolossal";
  const withinMaxSize = (Tables.sizeCategory[frameSize] <= Tables.sizeCategory[maxEngineSize]);
  if (!withinMaxSize) return false;

  // A Supercolossal starship can mount only a Signal Basic Drift engine
  if (size === "Supercolossal" && engineOption !== "Signal Basic") return false;

  return true;
}

export {
  isValidFrame,
  isValidPowerCore,
  isValidThruster,
  isValidDriftEngine,
}