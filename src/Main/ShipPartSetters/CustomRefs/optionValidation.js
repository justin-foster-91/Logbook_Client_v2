import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";


const isValidFrame = (ship, frameOption, activeSources) => {
  let { source, cost } = Tables.getFrameData(frameOption);
  const { buildPoints } = Tables.getTierData(ship.tierId);

  if (source) source = source.substring(0, source.indexOf(" pg"))
  const allowedBySources = (source && activeSources.includes(source));
  if (!allowedBySources) return false;

  return true;
}

const isValidDriftEngine = (ship, engineOption, activeSources) => {
  const { frameId, powerCoreIds } = ship;
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
  isValidDriftEngine
}