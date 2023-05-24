import * as Tables from "./metaTables.js";
import * as SF from "../../References/shipFunctions.js";
import * as Utils from "../../References/utils.js";
import { getLongarmData, getHeavyData, getLongarmIdList, getHeavyIdList } from '../CustomRefs/antiPersonnelData';

const isAllowedBySources = (ship, partSource) => {
  const activeSources = ship.getActiveSources();

  if (partSource) partSource = partSource.substring(0, partSource.indexOf(" pg"))
  const allowedBySources = (partSource && activeSources.includes(partSource));

  return allowedBySources;
}

const isValidFrame = (ship, frameOption) => {
  let { source } = Tables.getFrameData(frameOption);

  // const activeSources = ship.getActiveSources();
  // console.log(activeSources);
  // console.log(source);

  if (!frameOption) console.trace(frameOption)
  if (!isAllowedBySources(ship, source)) return false; 

  return true;
}

const isValidPowerCore = (ship, coreOption, idx) => {
  const { powerCoreIds, frameId } = ship.getParts();
  const frameSize = ship.getSize()
  const { sizes: optionSizes, pcuProvided, bpCost, source } = Tables.getPowerCoreData(coreOption);
  
  if (!isAllowedBySources(ship, source)) return false; 
  
  if (!SF.doesFrameSizeAllowCoreSize(coreOption, frameSize)) return false;

  if (frameSize !== "Supercolossal") return true;

  const usedSizes = new Set();
  powerCoreIds.forEach(core => {
    if (!core) return;
    const coreSizes = Tables.getPowerCoreData(core).sizes
    coreSizes.forEach(size => usedSizes.add(size))
  })

  if (usedSizes.has("Sc")) {
    const indexCoreSizes = Tables.getPowerCoreData(powerCoreIds[idx]).sizes;
    if (indexCoreSizes && indexCoreSizes.includes("Sc")) {
      if (optionSizes.includes("Sc") || optionSizes.includes("C")) return true;
      return false;
    }

    if (optionSizes.includes("Sc")) return false;
    if (optionSizes.includes("H")) return true;
  } else {
    if (optionSizes.includes("Sc") || optionSizes.includes("C")) return true;
    else return false;
  }

  return true;
}

const isValidThruster = (ship, thrusterOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize()
  const { source } = Tables.getThrusterData(thrusterOption);
  let largerFrameSize;
  
  if (!isAllowedBySources(ship, source)) return false; 
  
  // A hauler frame can accommodate [thrusters] designed for starships 1 size category larger than normal.
  if (frameId.includes("Hauler")) {
    const largerFrameCategory = Tables.sizeCategory[frameSize] + 1
    Object.keys(Tables.sizeCategory).forEach(key => {
      if(Tables.sizeCategory[key] === largerFrameCategory) largerFrameSize = key;
    })
  }

  if (!SF.doesFrameSizeAllowThruster(thrusterOption, largerFrameSize ? largerFrameSize : frameSize)) return false;

  return true;
}

const isValidArmor = (ship, armorOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  let { source } = Tables.getArmorData(armorOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false; 



  return true;
}

const isValidAblativeArmor = (ship, armorOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  let { tempHP, source } = Tables.getAblativeArmorData(armorOption, frameSize, frameId);
  const { hp } = SF.getFramePackage(ship.getParts());

  if (!isAllowedBySources(ship, source)) return false; 

  if (tempHP && tempHP >= (hp * 2)) return false;

  return true;
}

const isValidComputer = (ship, computerOption, system) => {
  const frameSize = ship.getSize();

  let optionMk = computerOption.split(" ")[1];
  if (computerOption === "Basic Computer") optionMk = 0;

  if (system === "Primary" && frameSize === "Supercolossal" && optionMk < 4) return false;

  if (system === "Secondary" && optionMk > 4) return false;

  return true;
}

const isValidQuarters = (ship, quartersOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  const { source } = Tables.getQuartersData(quartersOption, frameSize, frameId);

  if (quartersOption && !isAllowedBySources(ship, source)) return false; 

  if (frameId === "Starship Drone") return false;

  return true;
}

const isValidDefensiveCounter = (ship, counterOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  const { source } = Tables.getDefensiveCounterData(counterOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false; 

  return true;
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

const isValidExpansionBay = (ship, bayOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  const { source } = Tables.getExpansionBayData(bayOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false; 

  if (frameSize !== "Supercolossal") {
    if (bayOption === "Drift Booster" || bayOption === "Recycling System") return false;
  }

  return true;
}

const isValidHull = (ship, hullOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  const { source } = Tables.getFortifiedHullData(hullOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false; 

  return true;
}

const isValidBulkhead = (ship, bulkheadOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  const { source } = Tables.getReinforcedBulkheadData(bulkheadOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false; 

  return true;
}

const isValidSecurity = (ship, securityOption, type, sourceCategory) => {
  let { frameId, tierId } = ship.getParts();
  const frameSize = ship.getSize();
  let source, sfsLegal;
  let longarmLevel, heavyLevel;
  if (tierId === "1/4" || tierId === "1/3" || tierId === "1/2") tierId = 0;
  tierId = parseInt(tierId);

  if (!type) return false;
  
  // antiPersonnel
  if (type === "longarm") {
    // An antipersonnel weapon must be mounted near the boarding ramp of a Medium or smaller starship.
    if ((Tables.sizeCategory[frameSize] > 3)) return false;
    sfsLegal = getLongarmData(securityOption).sfsLegal;
    longarmLevel = getLongarmData(securityOption).level
    // Redundant code AntiPersonnel renderDropdownSelection() prunes the full list by tier already
    if (longarmLevel > tierId) return false;
  }
  if (type === "heavy") {
    // An antipersonnel weapon must be mounted near the boarding ramp of a Medium or smaller starship.
    if ((Tables.sizeCategory[frameSize] > 3)) return false;
    sfsLegal = getHeavyData(securityOption).sfsLegal;
    heavyLevel = getHeavyData(securityOption).level
    // Redundant code AntiPersonnel renderDropdownSelection() prunes the full list by tier already
    if (heavyLevel > tierId) return false;
  }
  if (!sfsLegal && sourceCategory === "sfsLegal") return false;


  // cloaking
  if (type === "cloaking") {
    source = Tables.getCloakingData(securityOption, frameSize, frameId).source;
  }

  // securityCheckboxes
  if (type === "securityCheckbox") {
    source = Tables.getSecurityCheckboxData(securityOption, frameSize, frameId).source;
  }

  if (source && !isAllowedBySources(ship, source)) return false; 

  return true;
}

const isValidSensors = (ship, sensorsOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  const { source } = Tables.getSensorsData(sensorsOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false; 

  return true;
}

const isValidShields = (ship, shieldsOption) => {
  const { frameId } = ship.getParts();
  const frameSize = ship.getSize();
  const { source } = Tables.getShieldsData(shieldsOption, frameSize, frameId);

  if (!isAllowedBySources(ship, source)) return false;

  return true;
}

export {
  isValidFrame,
  isValidPowerCore,
  isValidThruster,
  isValidArmor,
  isValidAblativeArmor,
  isValidComputer,
  isValidQuarters,
  isValidDefensiveCounter,
  isValidDriftEngine,
  isValidExpansionBay,
  isValidHull,
  isValidBulkhead,
  isValidSecurity,
  isValidSensors,
  isValidShields,
}