import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";


const isValidFrame = (ship, frameOption, activeSources) => {
  // const { frameId } = ship;
  return true;

  let { source } = Tables.getFrameData(frameOption);

  if (source && !activeSources.includes(source)) return false;
}

const isValidDriftEngine = (ship, engineOption, activeSources) => {
  const { frameId, powerCoreIds } = ship;
  // const { sources: activeSources } = ship;
  // console.log(ship.parts);
  console.log({activeSources});
  const frameSize = SF.findComponentByFrameId(frameId, "size")
  let { maxSize: maxEngineSize, minPCU, source } = Tables.getDriftEngineData(engineOption, frameSize, frameId);

  if (source) source = source.substring(0, source.indexOf(" pg"))
  const allowedBySources = (source && activeSources.includes(source));
  if (!allowedBySources) return false;

  const maxPower = Tables.getPowerCoreData(powerCoreIds[0]).pcuProvided
  const withinPowerBudget = (minPCU <= maxPower);
  if (!withinPowerBudget) return false;

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
  isValidDriftEngine
}