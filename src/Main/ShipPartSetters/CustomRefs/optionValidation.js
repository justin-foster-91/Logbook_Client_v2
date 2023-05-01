import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";

const isValidDriftEngine = (ship, engine, size) => {
  const { frameId, powerCoreIds } = ship;
  const frameSize = SF.findComponentByFrameId(frameId, "size")
  const maxPower = Tables.getPowerCoreData(powerCoreIds[0]).pcuProvided
  let { maxSize: maxEngineSize, minPCU } = Tables.getDriftEngineData(engine, frameSize, frameId);
  if (maxEngineSize === null) maxEngineSize = "Supercolossal";

  let withinMaxSize = (Tables.sizeCategory[frameSize] <= Tables.sizeCategory[maxEngineSize]);
  let withinPowerBudget = (minPCU <= maxPower);

  if (size === "Supercolossal" && engine !== "Signal Basic") return false;
  if (!withinMaxSize || !withinPowerBudget) return false;
  return true;
}

export {
  isValidDriftEngine
}