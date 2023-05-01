import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";

const isValidTier = (ship, tier) => {

}

const isValidFrame = (ship, frame) => {

}

const isValidDriftEngine = (ship, engine) => {
  const { frameId, powerCoreIds } = ship;
  const frameSize = SF.findComponentByFrameId(frameId, "size")
  const maxPower = Tables.getPowerCoreData(powerCoreIds[0]).pcuProvided
  const { size } = SF.getFramePackage(ship);

  let { maxSize: maxEngineSize, minPCU } = Tables.getDriftEngineData(engine, frameSize, frameId);
  if (maxEngineSize === null) maxEngineSize = "Supercolossal";

  let withinMaxSize = (Tables.sizeCategory[frameSize] <= Tables.sizeCategory[maxEngineSize]);
  let withinPowerBudget = (minPCU <= maxPower);

  if (size === "Supercolossal" && engine !== "Signal Basic") return false;
  if (!withinMaxSize || !withinPowerBudget) return false;
  return true;
}

export {
  isValidTier,
  isValidFrame,
  isValidDriftEngine
}