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
    (frame) => frame.type === Utils.capitalizeEachWord(frameId)
  );

  return newFrame[returnComponent];
};

const updatePowerCoresToMatchFrame = (ship) => {
  const size = findComponentByFrameId(ship.frameId, "size")

  // change power cores to null if they don't fit the new frame
  ship.powerCoreIds.forEach((core, idx) => {
    if (
      core !== null &&
      !doesFrameSizeAllowCore(core, size)
    ) {
      ship.powerCoreIds[idx] = null;
    }
  });

  // reduce length of the power core list if moving to a smaller frame
  let newCoreAmount = getCoreQuantityFromSize(size);
  if (ship.powerCoreIds.length > newCoreAmount)
  ship.powerCoreIds.length = newCoreAmount;
};

const updateThrustersToMatchFrame = (ship) => {
  const size = findComponentByFrameId(ship.frameId, "size")
  
  // change thrusters to null if they don't fit the new frame
  if (ship.thrustersId !== null && !doesFrameSizeAllowThruster(ship.thrustersId, size)) {
    ship.thrustersId = null;
  }
};

const updateComputerToMatchFrame = (ship) => {
  const size = findComponentByFrameId(ship.frameId, "size")

  // change computer to 'Mk 4 Mononode' if size changes to supercolossal
  if(size === 'Supercolossal'){
    ship.computerId = 'Mk 4 Mononode'
  }
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
    size: findComponentByFrameId(frameId, "size"),
    maneuverability: findComponentByFrameId(frameId, "maneuverability"),
    hp: startTotal + increment * Tables.getTierData(tierId).hpIncrementMultiplier,
    dt: findComponentByFrameId(frameId, "dt"),
    ct: findComponentByFrameId(frameId, "ct"),
    expansions: formatExpansions(findComponentByFrameId(frameId, "expansions")),
    minCrew: findComponentByFrameId(frameId, "minimumCrew"),
    maxCrew: findComponentByFrameId(frameId, "maximumCrew"),
    bpCost: findComponentByFrameId(frameId, "cost"),
  };

  return framePackage;
};

const getTotalBPCosts = (ship) => {
  // console.log("Total BP");
  const { thrustersId, powerCoreIds, armorId } = ship
  const powerCoreTotalBPCost = powerCoreIds.map(core => Tables.getPowerCoreData(core).bpCost).reduce((total, num) => total + num)

  const bpExpenses = [
    getFramePackageFromShip(ship).bpCost,
    powerCoreTotalBPCost,
    Tables.getThrusterData(thrustersId).bpCost,
    Tables.getArmorData(armorId, getFramePackageFromShip(ship).size).bpCost,
    getTotalCompBPCosts(ship),
    // crew quarters
    // defensive countermeasures
    // drift engine
    // expansion bays
    // fortified hull
    // reinforced bulkhead
    // security (misc)
    // sensors
    // shields
    // weapons
    // other systems
  ]

  return bpExpenses.reduce((total, num) => total + num);
};

const getTotalPCUCosts = (ship) => {
  // console.log("Total PCU");
  const { thrustersId } = ship

  const pcuExpenses = [
    Tables.getThrusterData(thrustersId).pcuCost,
    getTotalCompPCUCosts(ship),
    // defensive countermeasures
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
    // defensive countermeasures
    // shields
    // weapons
  ]

  return pcuExpenses.reduce((total, num) => total + num);
}

const getTotalCompBPCosts = (ship) => {
  // console.log('Total comp BP');
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
  // console.log('Total comp PCU');
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
    (see Type on page 303) hit a starship. TL is calculated based on the starship’s 
    size, defensive countermeasures (see page 298), and armor, plus the pilot’s number of ranks 
    in the Piloting skill. See page 320 for details.
  */
}

const getTotalAC = () => {
  /* 
    Armor Class (AC): This value is used when determining whether direct-fire weapons 
    (see Type on page 303) hit a starship. AC is calculated based on the ship’s 
    size, maneuverability, and physical armor, as well as the pilot’s number of ranks 
    in the Piloting skill. See page 320 for details on calculating AC.
  */
}

const shipSetter = (ship, part, value) => {
  ship[part] = value;
}


export {
  getCoreQuantityFromSize,
  doesFrameSizeAllowCore,
  doesFrameSizeAllowThruster,
  findComponentByFrameId,
  updatePowerCoresToMatchFrame,
  updateThrustersToMatchFrame,
  updateComputerToMatchFrame,
  validateShip,
  getFramePackageFromShip,
  getTotalBPCosts,
  getTotalPCUCosts,
  getEssentialPCUCosts,
  getTotalCompBPCosts,
  getTotalCompPCUCosts,
  shipSetter
};
