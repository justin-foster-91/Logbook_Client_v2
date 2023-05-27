import * as Tables from "../ShipPartSetters/CustomRefs/metaTables";
import * as Utils from "./utils";
import frames from "../ShipPartSetters/CustomRefs/frames";
import Ship from './ship'
import * as personnelWeapons from "../ShipPartSetters/CustomRefs/antiPersonnelData";
import * as Validate from "../ShipPartSetters/CustomRefs/optionValidation";

// TODO: add in bonus core from expansion
// Str size => Num core quantity
const getCoreQuantityFromSize = (size) => {
  size = size.toLowerCase();

  // TODO: condense this logic
  if (size === "tiny") return 1;
  if (size === "small") return 1;
  if (size === "medium" || size === "large") return 1;
  if (size === "huge") return 2;
  if (size === "gargantuan") return 3;
  if (size === "colossal") return 4;
  if (size === "supercolossal") return 5;
};

// String core => Boolean
const doesFrameSizeAllowCoreSize = (core, frameSize) => {
  let sizeLetterList = Tables.getPowerCoreData(core).sizes;
  let sizeWordList = sizeLetterList.map((size) =>
    Utils.sizeLetterToStringConverter(size)
  );

  // All sizes from Huge to Colossal have the Huge size
  if (frameSize === "Supercolossal" && sizeWordList.includes("Huge")) return true;
  
  return sizeWordList.includes(frameSize);
};

const doesFrameSizeAllowThruster = (thruster, frameSize) => {
  let sizeLetter = Tables.getThrusterData(thruster).size;
  let sizeWord = Utils.sizeLetterToStringConverter(sizeLetter);

  return sizeWord.match(frameSize) ? true : false;
};

const findComponentByFrameId = (frameId, returnComponent) => {
  let newFrame = frames.find(
    (frame) => frame.type === frameId
  );

  return newFrame[returnComponent];
};

const updateFrame = (ship) => {
  if (!Validate.isValidFrame(ship, ship.getParts().frameId)) {
    ship.setFrame("Light Freighter");
  }
}

const updatePowerCores = (ship) => {
  const { powerCoreIds } = ship.getParts();
  const size = ship.getSize()
  const powerCoreIdList = Tables.getPowerCoreIdList()
  let newCoreLength = getCoreQuantityFromSize(size);
  
  let firstValidCore = powerCoreIdList.find(core => doesFrameSizeAllowCoreSize(core, size))
  if (size === "Supercolossal") firstValidCore = 'Gateway Ultra'

  if (powerCoreIds.length > newCoreLength) ship.setPowerCoreArrayLength(newCoreLength);

  powerCoreIds.forEach((core, idx) => {
    if (idx === 0) {
      if (!core || (core && !Validate.isValidPowerCore(ship, core, idx))) {
        ship.setPowerCore(firstValidCore, idx);
      }
    } else {
      if (core && !Validate.isValidPowerCore(ship, core, idx)) {
        ship.setPowerCore(null, idx); 
      }
    }
  });
};

const updateThrusters = (ship) => {
  const { thrustersId } = ship.getParts()

  const thrusterIdList = Tables.getThrusterIdList()
  const firstValidThruster = thrusterIdList.find(thruster => Validate.isValidThruster(ship, thruster))
  
  if (thrustersId === null) ship.setThrusters(firstValidThruster)
  if (thrustersId !== firstValidThruster && !Validate.isValidThruster(ship, thrustersId)) ship.setThrusters(firstValidThruster);
};

const updateArmor = (ship) => {
  const { armorId } = ship.getParts()

  if (!Validate.isValidArmor(ship, armorId)) ship.setArmor(null)
}

const updateAblativeArmor = (ship) => {
  const { armorId } = ship.getParts()

  if (!Validate.isValidAblativeArmor(ship, armorId)) ship.setAblativeArmor(null)
}

const updateComputer = (ship) => {
  const { computerId, secondaryComputerId } = ship.getParts()

  const size = ship.getSize()
  const compList = Tables.getComputerIdList()
  
  if (size === "Supercolossal") {
    if (!Validate.isValidComputer(ship, computerId, "Primary")) {
      ship.setComputer('Mk 4 Mononode')
    }
    if (!Validate.isValidComputer(ship, computerId, "Secondary")) {
      ship.setSecondaryComputer('Basic Computer')
    }
  } else {
    if (secondaryComputerId !== null) ship.setSecondaryComputer('Basic Computer')
  }
}

const updateCrewQuarters = (ship) => {
  const { crewQuartersId, frameId } = ship.getParts();

  if (!Validate.isValidQuarters(ship, crewQuartersId)) ship.setCrewQuarters("Common");
  if (frameId === "Starship Drone") ship.setCrewQuarters(null);
}

const updateDriftEngine = (ship) => {
  const { driftEngineId } = ship.getParts()
  if (!Validate.isValidDriftEngine(ship, driftEngineId)) ship.setDriftEngine(null);
}

const updateExpansionBays = (ship) => {
  const { expansionBayIds } = ship.getParts()

  const { expansions: expansionCap } = getFramePackage(ship.getParts())

  if(expansionBayIds.length > expansionCap) ship.setExpansionBayArrayLength(expansionCap)

  // Set "Cargo Hold" as default selection for any expansion not specified
  expansionBayIds.forEach((expansion, idx) => {
    if(expansion === null) ship.setExpansionBay("Cargo Hold")
  })
}

const updateAntiPersonnelToMatchTier = (ship) => {
  let { antiPersonnelWeaponId: weaponId } = ship


  if (!weaponId) return;

  const foundLongarm = personnelWeapons.getLongarmIdList().indexOf(weaponId) >= 0
  const foundHeavy = personnelWeapons.getHeavyIdList().indexOf(weaponId) >= 0

  let type;
  if (foundLongarm) type = "longarm"
  if (foundHeavy) type = "heavy"
  if (!Validate.isValidSecurity(ship, weaponId, type)) ship.setAntiPersonnelWeapon(null);
}

const updateSecurity = (ship) => {

}

const updateSensors = (ship) => {
  const { sensorsId } = ship.getParts()

  if (!Validate.isValidSensors(ship, sensorsId)) ship.setSensors(null)
}

const updateShields = (ship) => {
  const { shieldsId } = ship.getParts()
  
  if (!Validate.isValidShields(ship, shieldsId)) ship.setShields(null);
}

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validateShip = (ship) => {
  let powerCoreValidation = validatePowerCores(ship);
  let thrustersValidation = validateThrusters(ship);
  let armorValidation = validateArmor(ship)

  return mergeValidations([powerCoreValidation, thrustersValidation, armorValidation]);
};

const mergeValidations = (validationList) => {
  let allValid = true;
  let allErrors = [];

  validationList.forEach((validation) => {
    allValid = allValid && validation.validity;
    if (validation.errors) allErrors = allErrors.concat(validation.errors);
  });

  return { validity: allValid, errors: allErrors };
};

const validateThrusters = (ship) => {
  if (ship.thrustersId === null) {
    return {
      validity: false,
      errors: [
        {
          shipPart: "Thrusters",
          message: "All ships must have at least 1 Thruster",
        },
      ],
    };
  }

  return { validity: true, errors: [] };
};

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validatePowerCores = (ship) => {
  // power core must fit frame size
  // limit core number by frame size

  if (ship.powerCoreIds.every((core) => core === null)) {
    // all power cores are empty

    return {
      validity: false,
      errors: [
        {
          shipPart: "Power Cores",
          message: "All ships must have at least 1 Power Core.",
        },
      ],
    };
  }

  if (
    findComponentByFrameId(ship.frameId, "size").toLowerCase() ===
    "supercolossal"
  ) {
    // ship frame is supercolossal

    let supercolossalCoreBoolArray = ship.powerCoreIds.map((core) =>
      Tables.getPowerCoreData(core).sizes.includes("Sc")
    );

    if (supercolossalCoreBoolArray.includes(true)) {
      // at least one core is supercolossal size

      let indexOfFirstSupercolossalMatch =
        supercolossalCoreBoolArray.indexOf(true);
      let hugeCoreBoolArray = ship.powerCoreIds
        .filter((core, idx) => indexOfFirstSupercolossalMatch !== idx)
        .map(
          (core) =>
            Tables.getPowerCoreData(core).sizes.includes("H") &&
            !Tables.getPowerCoreData(core).sizes.includes("C")
        );

      if (hugeCoreBoolArray.includes(false)) {
        // one of the remaining cores is not 'huge' size (all 'Gargantuan' sized cores also fit size 'Huge')

        return {
          validity: false,
          errors: [
            {
              shipPart: "Power Cores",
              message:
                "Colossal and supercolossal cores may not both be equipped on the same ship.",
            },
          ],
        };
      } else {
        // all remaining cores are 'huge' size

        return { validity: true, errors: [] };
      }
    } else {
      // no cores were supercolossal size

      let colossalCoreBoolArray = ship.powerCoreIds.map((core) =>
        Tables.getPowerCoreData(core).sizes.includes("C")
      );

      if (colossalCoreBoolArray.includes(false)) {
        // not all cores were colossal size

        return {
          validity: false,
          errors: [
            {
              shipPart: "Power Cores",
              message:
                "Without a Supercolossal power core, all 5 cores must be designed for Colossal ships",
            },
          ],
        };
      } else {
        // all cores were colossal size

        return { validity: true, errors: [] };
      }
    }
  }

  return { validity: true, errors: [] };
};

const validateArmor = (ship) => {
  // let { size } = getFramePackage(ship)

  // ship = new Ship(ship)

  const { armorId, ablativeArmorByPosition } = ship.getParts();
  const { forward, port, starboard, aft } = ablativeArmorByPosition;
  const totalUsedTempHP = forward + port + starboard + aft
  const totalAllowedTempHP = Tables.getArmorData(ship.getParts().armorId, ship.getSize()).tempHP
  
  if(armorId && armorId.includes('ablative')){
    if(totalAllowedTempHP !== totalUsedTempHP){
      return {
        validity: false,
        errors: [
          {
            shipPart: "Armor",
            message: "Total temporary HP used must equal the total amount that is allowed.",
          },
        ],
      };
    }
  }

  return { validity: true, errors: [] };
}

const formatExpansions = (defaultString) => {
  if (defaultString.toString().search("unlimited") >= 0) return "Unlimited";

  return defaultString;
};

const getFramePackage = (ship) => {
  const { tierId, frameId } = ship;

  let { type, source, size, maneuverability, hp, dt, ct, mounts, expansions, minimumCrew: minCrew, maximumCrew: maxCrew, cost: bpCost, specialAbility } = Tables.getFrameData(frameId)

  const { startTotal, increment } = hp
  const { hpIncrementMultiplier } = Tables.getTierData(tierId)
  hp = startTotal + (increment * hpIncrementMultiplier)

  return { type, source, size, maneuverability, hp, dt, ct, mounts, expansions, minCrew, maxCrew, bpCost, specialAbility };
};

const getTotalBPCosts = (ship) => {
  const powerCoreTotalBPCost = ship.powerCoreIds.map(core => Tables.getPowerCoreData(core).bpCost).reduce((total, num) => total + num)
  const { size } = getFramePackage(ship)

  const bpExpenses = [
    getFramePackage(ship).bpCost,
    powerCoreTotalBPCost,
    Tables.getThrusterData(ship.thrustersId).bpCost,
    Tables.getArmorData(ship.armorId, size).bpCost,
    getTotalCompCosts(ship).bpTotal,
    Tables.getQuartersData(ship.crewQuartersId).bpCost,
    Tables.getDefensiveCounterData(ship.defensiveCountermeasuresId).bpCost,
    Tables.getDriftEngineData(ship.driftEngineId, size, ship.frameId).bpCost,
    getTotalExpansionCosts(ship).bpTotal,
    Tables.getFortifiedHullData(ship.fortifiedHullId, size).bpCost,
    Tables.getReinforcedBulkheadData(ship.reinforcedBulkheadId, size).bpCost,
    getTotalSecurityCosts(ship).totalBpCosts,
    Tables.getSensorsData(ship.sensorsId).bpCost,
    // shields
    // weapons
    // other systems
    // getTotalSpecialMaterialCosts(ship).bpTotal
  ]

  return bpExpenses.reduce((total, num) => total + num);
};

const getTotalPCUCosts = (ship) => {
  const { thrustersId } = ship

  const pcuExpenses = [
    Tables.getThrusterData(thrustersId).pcuCost,
    getTotalCompCosts(ship).pcuTotal,
    Tables.getDefensiveCounterData(ship.defensiveCountermeasuresId).pcuCost,
    getTotalExpansionCosts(ship).pcuTotal,
    getTotalSecurityCosts(ship).totalPcuCosts,
    // shields
    // weapons
    // other systems
  ]

  return pcuExpenses.reduce((total, num) => total + num);
}

const getEssentialPCUCosts = (ship) => {
  const { thrustersId } = ship

  const pcuExpenses = [
    Tables.getThrusterData(thrustersId).pcuCost,
    Tables.getDefensiveCounterData(ship.defensiveCountermeasuresId).pcuCost,
    // shields
    // weapons
  ]

  return pcuExpenses.reduce((total, num) => total + num);
}

const getTotalCompCosts = (ship) => {
  const { size } = getFramePackage(ship)
  const { bpCost, pcuCost } = Tables.getComputerData(ship.computerId);
  const { ctNetworkNodes } = ship
  const [Mk, x] = Utils.capitalizeEachWord(ship.computerId).split(' ')
  const networkNodeId = `${Mk} ${x}`
  const { bpCost: secondaryBPCost, pcuCost: secondaryPCUCost } = Tables.getComputerData(ship.secondaryComputerId)
  const { bpCost: networkBPCost, pcuCost: networkPCUCost } = Tables.getNetworkNodeData(networkNodeId, size)

  const bpTotal = bpCost + secondaryBPCost + (networkBPCost * ctNetworkNodes)
  const pcuTotal = pcuCost + secondaryPCUCost + (networkPCUCost * ctNetworkNodes)

  return { bpTotal, pcuTotal }
}

const getTotalExpansionCosts = (ship) => {
  const { size } = getFramePackage(ship)

  if (!ship.expansionBayIds.length) return { bpTotal: 0, pcuTotal: 0 }

  const bpTotal = ship.expansionBayIds
    .map((expansion) => Tables.getExpansionBayData(expansion, size).bpCost)
    .reduce((total, bp) => total + bp);

  const pcuTotal = ship.expansionBayIds
    .map((expansion) => Tables.getExpansionBayData(expansion, size).pcuCost)
    .reduce((total, bp) => total + bp);

  return { bpTotal, pcuTotal }
}

const getTotalTL = () => {
  /* 
    Target Lock (TL): This value is used when determining whether tracking weapons 
    (see Type on page 303) hit a starship. TL is calculated based on the starship’s 
    size, defensive countermeasures (see page 298), and armor, plus the pilot’s number of ranks 
    in the Piloting skill. See page 320 for details.
  */

    // A horacalcum lattice incorporated into a starship’s defensive countermeasures creates a field of space-time fluctuation that slows larger incoming projectiles. The speed of any tracking weapon fired at the starship is reduced by 25% (round down the final speed).
}

const getTotalAC = () => {
  /* 
    Armor Class (AC): This value is used when determining whether direct-fire weapons 
    (see Type on page 303) hit a starship. AC is calculated based on the ship’s 
    size, maneuverability, and physical armor, as well as the pilot’s number of ranks 
    in the Piloting skill. See page 320 for details on calculating AC.
  */
}

const getTotalSpecialMaterialCosts = () => {
  // armorMaterialId
  // defensiveCountermeasuresMaterialId
  // powerCoreSpecialMaterials []
  // sensorsMaterialId
  // thrustersMaterialId
  // weaponMounts per weapon, per arc
}

const getSpeed = () => {
  // Horacalcum increases the maximum speed of any thrusters by 1 and reduces a starship’s Piloting check penalty based on its maximum speed by 1 (minimum +0).
}

const getPilotingMod = () => {
  // -1 piloting check if using ablative && ablative armor hp is not balanced
  // Horacalcum increases the maximum speed of any thrusters by 1 and reduces a starship’s Piloting check penalty based on its maximum speed by 1 (minimum +0).
}

const combineComputerBonuses = (ship, size) => {
  const { 
    computerId: primary, 
    secondaryComputerId: secondary, 
    ctNetworkNodes: networkCount, 
  } = ship
  const isSuperC = size === 'Supercolossal'

  const { bonus, nodes } = Tables.getComputerData(primary);
  const [Mk, x] = Utils.capitalizeEachWord(primary).split(' ')
  const networkId = `${Mk} ${x}`
  const { 
    bonus: secondaryBonus,
    nodes: secondaryNodes, 
  } = Tables.getComputerData(secondary)
  const { 
    bonus: networkBonus, 
  } = Tables.getNetworkNodeData(networkId, size)

  const combineBonuses = () => {
    let primaryBonusArr = bonusSplitter(primary, bonus, nodes, true)

    if(!isSuperC){
      return primaryBonusArr.join("/");
    } else{
      let secondaryBonusArr = bonusSplitter(secondary, secondaryBonus, secondaryNodes, false)
      let networkBonusArr = bonusSplitter(networkId, networkBonus, networkCount, false)

      return primaryBonusArr.concat(networkBonusArr).concat(secondaryBonusArr).join('/')
    }
  }

  return combineBonuses()
}

const bonusSplitter = (comp, bonus, nodes, isPrimary) => {
  if(comp.includes("Basic") && isPrimary) return ['+0']

  return Array(nodes).fill(`+${bonus}`)
}

const copyExpansion = (ship, expansion, index) => {
  let expansionArray = ship.expansionBayIds
  const firstPiece = expansionArray.slice(0, index+1)
  const lastPiece = expansionArray.slice(index+1)
  const middlePiece = [expansion]

  // console.log([...firstPiece, ...middlePiece, ...lastPiece]);
  ship.expansionBayIds = [...firstPiece, ...middlePiece, ...lastPiece]
}

const removeExpansion = (ship, idx) => {
  // const { expansions } = getFramePackage(ship)

  ship.expansionBayIds.splice(idx, 1)
}

const getTotalSecurityCosts = (shipParts) => {
  const antiPersonnelCost = getAntiPersonnelCosts(shipParts);
  const compCounterCost = getCompCounterCosts(shipParts);
  const hackAndCloakCost = getHackAndCloakCosts(shipParts);
  const checkboxBpCosts = getSecurityCheckboxCosts(shipParts).totalBpCosts;

  const checkboxPcuCosts = getSecurityCheckboxCosts(shipParts).totalPcuCosts;

  const totalBpCosts = antiPersonnelCost + compCounterCost + hackAndCloakCost + checkboxBpCosts;
  const totalPcuCosts = checkboxPcuCosts;

  return { totalBpCosts, totalPcuCosts };
}

const getAntiPersonnelCosts = (shipParts) => {
  const { antiPersonnelWeaponId: weaponId } = shipParts;

  if (!weaponId) return 0;
  
  const longarmLevel = personnelWeapons.getLongarmData(weaponId).level
  const heavyLevel = personnelWeapons.getHeavyData(weaponId).level

  if (longarmLevel !== 0) {
    return Number(longarmLevel)
  } else if (heavyLevel !== 0) {
    return 5 + Number(heavyLevel)
  } else {
    //weaponId didn't match any valid inputs
    return 0;
  }
}

const getCompCounterCosts = (shipParts) => {
  const { computerCountermeasures: compCounter, tierId } = shipParts;

  const computerTier = Math.max(Math.floor(parseInt(tierId) / 2), 1);
  let totalCost = 0;

  Object.keys(compCounter).forEach((counter) => {
    let counterReadable = Utils.readableIds(counter);
    
    if (counterReadable !== "Shock Grid" && compCounter[counter]) {
      totalCost += Tables.getComputerCountermeasureData(counterReadable, computerTier).cost
    } 

    if (counterReadable === "Shock Grid" && compCounter[counter]) {
      totalCost += Tables.getComputerShockGridData(compCounter[counter], computerTier).cost
    }
  })

  return totalCost;
}

const getHackAndCloakCosts = (shipParts) => {
  const { antiHackingSystemsId, cloakingId } = shipParts;

  const { bpCost: hackingBpCost } = Tables.getAntiHackingData(antiHackingSystemsId);
  const { bpCost: cloakingBpCost } = Tables.getCloakingData(cloakingId);

  return hackingBpCost + cloakingBpCost;
}

const getSecurityCheckboxCosts = (shipParts) => {
  const { hasBiometricLocks, hasSelfDestructSystem, hasEmergencyAccelerator, hasHolographicMantle, hasReconfigurationSystem, frameId } = shipParts;

  const size = findComponentByFrameId(frameId, "size")

  const biometricBpCost = hasBiometricLocks && Tables.getSecurityCheckboxData("Biometric Locks", size).bpCost;
  const selfDestructBpCost = hasSelfDestructSystem && Tables.getSecurityCheckboxData("Self-Destruct System", size).bpCost;
  const emergencyBpCost = hasEmergencyAccelerator && Tables.getSecurityCheckboxData("Emergency Accelerator", size).bpCost;
  const holographicBpCost = hasHolographicMantle && Tables.getSecurityCheckboxData("Holographic Mantle", size).bpCost;
  const reconfigurationBpCost = hasReconfigurationSystem && Tables.getSecurityCheckboxData("Reconfiguration System", size).bpCost;

  const emergencyPcuCost = hasEmergencyAccelerator && Tables.getSecurityCheckboxData("Emergency Accelerator", size).pcuCost;
  const holographicPcuCost = hasHolographicMantle && Tables.getSecurityCheckboxData("Holographic Mantle", size).pcuCost;
  const reconfigurationPcuCost = hasReconfigurationSystem && Tables.getSecurityCheckboxData("Reconfiguration System", size).pcuCost;

  const totalBpCosts = biometricBpCost + selfDestructBpCost + emergencyBpCost + holographicBpCost + reconfigurationBpCost;
  const totalPcuCosts = emergencyPcuCost + holographicPcuCost + reconfigurationPcuCost;

  return { totalBpCosts, totalPcuCosts };
}

export {
  getCoreQuantityFromSize,
  doesFrameSizeAllowCoreSize,
  doesFrameSizeAllowThruster,
  findComponentByFrameId,
  updateFrame,
  updateDriftEngine,
  updatePowerCores,
  updateThrusters,
  updateArmor,
  updateAblativeArmor,
  updateComputer,
  updateCrewQuarters,
  updateExpansionBays,
  updateAntiPersonnelToMatchTier,
  updateSecurity,
  updateSensors,
  updateShields,
  validateShip,
  getFramePackage,
  getTotalBPCosts,
  getTotalPCUCosts,
  getEssentialPCUCosts,
  getTotalCompCosts,
  combineComputerBonuses,
  copyExpansion,
  removeExpansion,
  getTotalSecurityCosts,
};
