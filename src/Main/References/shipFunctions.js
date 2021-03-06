import * as Tables from "./metaTables";
import * as Utils from "./utils";
import frames from "./frames.json";
import Ship from './ship'

// TODO: add in bonus core from expansion
// Str size => Num core quantity
const getCoreQuantityFromSize = (size) => {
  size = size.toLowerCase();

  if (size === "small") return 1;
  if (size === "medium" || size === "large") return 1;
  if (size === "huge") return 2;
  if (size === "gargantuan") return 3;
  if (size === "colossal") return 4;
  if (size === "supercolossal") return 5;
};

// String core => Boolean
const doesFrameSizeAllowCore = (core, frameSize) => {
  let sizeLetterList = Tables.getPowerCoreData(core).sizes;
  let sizeWordList = sizeLetterList.map((size) =>
    Utils.sizeLetterToStringConverter(size)
  );

  if (frameSize === "Supercolossal" && sizeWordList.includes("Huge"))
    return true;

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

const updatePowerCoresToMatchFrame = (ship) => {
  const size = findComponentByFrameId(ship.frameId, "size")
  const computerIdList = Tables.getPowerCoreIdList()
  const firstMatch = computerIdList.find(core => doesFrameSizeAllowCore(core, size))
  let newCoreAmount = getCoreQuantityFromSize(size);

  ship.powerCoreIds.forEach((core, idx) => {
    if(core !== null && !doesFrameSizeAllowCore(core, size)) ship.powerCoreIds[idx] = null;   
    if(idx === 0 && ship.powerCoreIds[idx] !== firstMatch) ship.powerCoreIds[idx] = firstMatch
  });

  // reduce length of the power core list if moving to a smaller frame
  if (ship.powerCoreIds.length > newCoreAmount)
  ship.powerCoreIds.length = newCoreAmount;
};

const updateThrustersToMatchFrame = (ship) => {
  const size = findComponentByFrameId(ship.frameId, "size")
  // let { thrustersId } = ship
  const thrusterIdList = Tables.getThrusterIdList()
  const firstMatch = thrusterIdList.find(thruster => doesFrameSizeAllowThruster(thruster, size))

  if (ship.thrustersId === null) ship.thrustersId = firstMatch
  // change thrusters to firstMatch if they don't fit the new frame
  if (ship.thrustersId !== firstMatch && !doesFrameSizeAllowThruster(ship.thrustersId, size)) ship.thrustersId = firstMatch;
};

const updateComputerToMatchFrame = (ship) => {
  const size = findComponentByFrameId(ship.frameId, "size")
  // let { computerId, secondaryComputerId: secondary} = ship
  const compList = Tables.getComputerIdList()

  // change computer to 'Mk 4 Mononode' if size changes to supercolossal
  if(size === 'Supercolossal'){
    if(compList.indexOf(ship.computerId) < 13) ship.computerId = 'Mk 4 Mononode'
  } else{
    if(ship.secondaryComputerId !== 'Basic Computer') ship.secondaryComputerId = 'Basic Computer'
  }
}

const updateExpansionBaysToMatchFrame = (ship) => {
  // const size = findComponentByFrameId(ship.frameId, "size")
  const { expansions } = getFramePackageFromShip(ship)

  if(ship.expansionBayIds.length > expansions) ship.expansionBayIds.length = expansions

  ship.expansionBayIds.forEach((expansion, idx) => {
    if(expansion === null) ship.expansionBayIds[idx] = "Cargo Hold"
  })
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
  // let { size } = getFramePackageFromShip(ship)
  ship = new Ship(ship)

  const { forward, port, starboard, aft } = ship.parts.ablativeArmorByPosition
  const totalUsedTempHP = forward + port + starboard + aft
  const totalAllowedTempHP = Tables.getArmorData(ship.parts.armorId, ship.getSize()).tempHP
  
  if(ship.parts.armorId && ship.parts.armorId.includes('ablative')){
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

const getFramePackageFromShip = (ship) => {
  let { tierId } = ship;
  let frameId = Utils.capitalizeEachWord(ship.frameId);
  let { startTotal, increment } = findComponentByFrameId(frameId, "hp");

  let framePackage = {
    source: findComponentByFrameId(frameId, "source"),
    size: findComponentByFrameId(frameId, "size"),
    maneuverability: findComponentByFrameId(frameId, "maneuverability"),
    hp: startTotal + increment * Tables.getTierData(tierId).hpIncrementMultiplier,
    dt: findComponentByFrameId(frameId, "dt"),
    ct: findComponentByFrameId(frameId, "ct"),
    mounts: findComponentByFrameId(frameId, "mounts"),
    expansions: formatExpansions(findComponentByFrameId(frameId, "expansions")),
    minCrew: findComponentByFrameId(frameId, "minimumCrew"),
    maxCrew: findComponentByFrameId(frameId, "maximumCrew"),
    bpCost: findComponentByFrameId(frameId, "cost"),
    specialAbility: findComponentByFrameId(frameId, "specialAbility"),
  };

  return framePackage;
};

const getTotalBPCosts = (ship) => {
  const powerCoreTotalBPCost = ship.powerCoreIds.map(core => Tables.getPowerCoreData(core).bpCost).reduce((total, num) => total + num)
  const { size } = getFramePackageFromShip(ship)
  const driftEngineBPCost = ship.frameId === "Oma" 
    ? Math.ceil(Tables.getDriftEngineData(ship.driftEngineId, size).bpCost * 1.5)
    : Tables.getDriftEngineData(ship.driftEngineId, size).bpCost

  const bpExpenses = [
    getFramePackageFromShip(ship).bpCost,
    powerCoreTotalBPCost,
    Tables.getThrusterData(ship.thrustersId).bpCost,
    Tables.getArmorData(ship.armorId, size).bpCost,
    getTotalCompBPCosts(ship),
    Tables.getQuartersData(ship.crewQuartersId).bpCost,
    Tables.getDefensiveCounterData(ship.defensiveCountermeasuresId).bpCost,
    driftEngineBPCost,
    // expansion bays
    Tables.getFortifiedHullData(ship.fortifiedHullId, size).bpCost,
    Tables.getReinforcedBulkheadData(ship.reinforcedBulkheadId, size).bpCost,
    // security (misc)
    // sensors
    // shields
    // weapons
    // other systems
  ]

  return bpExpenses.reduce((total, num) => total + num);
};

const getTotalPCUCosts = (ship) => {
  const { thrustersId } = ship

  const pcuExpenses = [
    Tables.getThrusterData(thrustersId).pcuCost,
    getTotalCompPCUCosts(ship),
    Tables.getDefensiveCounterData(ship.defensiveCountermeasuresId).pcuCost,
    // expansion bays
    // security (misc)
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

const getTotalCompBPCosts = (ship) => {
  const { size } = getFramePackageFromShip(ship)
  const { bpCost } = Tables.getComputerData(ship.computerId);
  const { ctNetworkNodes } = ship
  const [Mk, x] = Utils.capitalizeEachWord(ship.computerId).split(' ')
  const networkNodeId = `${Mk} ${x}`
  const { bpCost: secondaryBPCost } = Tables.getComputerData(ship.secondaryComputerId)
  const { bpCost: networkBPCost } = Tables.getNetworkNodeData(networkNodeId, size)

  return bpCost + secondaryBPCost + (networkBPCost * ctNetworkNodes)
}

const getTotalCompPCUCosts = (ship) => {
  const { size } = getFramePackageFromShip(ship)
  const { pcuCost } = Tables.getComputerData(ship.computerId);
  const { ctNetworkNodes } = ship
  const [Mk, x] = Utils.capitalizeEachWord(ship.computerId).split(' ')
  const networkNodeId = `${Mk} ${x}`
  const { pcuCost: secondaryPCUCost } = Tables.getComputerData(ship.secondaryComputerId)
  const { pcuCost: networkPCUCost } = Tables.getNetworkNodeData(networkNodeId, size)

  return pcuCost + secondaryPCUCost + (networkPCUCost * ctNetworkNodes)
}

const getTotalTL = () => {
  /* 
    Target Lock (TL): This value is used when determining whether tracking weapons 
    (see Type on page 303) hit a starship. TL is calculated based on the starship???s 
    size, defensive countermeasures (see page 298), and armor, plus the pilot???s number of ranks 
    in the Piloting skill. See page 320 for details.
  */
}

const getTotalAC = () => {
  /* 
    Armor Class (AC): This value is used when determining whether direct-fire weapons 
    (see Type on page 303) hit a starship. AC is calculated based on the ship???s 
    size, maneuverability, and physical armor, as well as the pilot???s number of ranks 
    in the Piloting skill. See page 320 for details on calculating AC.
  */
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

  // console.log(firstPiece, lastPiece);
  console.log([...firstPiece, ...middlePiece, ...lastPiece]);
  ship.expansionBayIds = [...firstPiece, ...middlePiece, ...lastPiece]
}



export {
  getCoreQuantityFromSize,
  doesFrameSizeAllowCore,
  doesFrameSizeAllowThruster,
  findComponentByFrameId,
  updatePowerCoresToMatchFrame,
  updateThrustersToMatchFrame,
  updateComputerToMatchFrame,
  updateExpansionBaysToMatchFrame,
  validateShip,
  getFramePackageFromShip,
  getTotalBPCosts,
  getTotalPCUCosts,
  getEssentialPCUCosts,
  getTotalCompBPCosts,
  getTotalCompPCUCosts,
  combineComputerBonuses,
  copyExpansion,
};
