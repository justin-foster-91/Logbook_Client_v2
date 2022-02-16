import { 
  getPowerCoreData, 
  getThrusterData, 
  getTierData, 
  getArmorData, 
  getComputerData, 
  getTierIdList,
  getFrameIdList 
} from "./metaTables";
import { capitalizeEachWord, sizeLetterToStringConverter } from "./utils";
import frames from "./frames.json";

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
  let sizeLetterList = getPowerCoreData(core).sizes;
  let sizeWordList = sizeLetterList.map((size) =>
    sizeLetterToStringConverter(size)
  );

  if (frameSize === "Supercolossal" && sizeWordList.includes("Huge"))
    return true;

  return sizeWordList.includes(frameSize);
};

const doesFrameSizeAllowThruster = (thruster, frameSize) => {
  let sizeLetter = getThrusterData(thruster).size;
  let sizeWord = sizeLetterToStringConverter(sizeLetter);

  return sizeWord.match(frameSize) ? true : false;
};

const findComponentByFrameId = (frameId, returnComponent) => {
  let newFrame = frames.find(
    (frame) => frame.type === capitalizeEachWord(frameId)
  );

  return newFrame[returnComponent];
};

// (Object, String) => void
// const setNewFrame = (ship, frameId) => {
//   ship.frameId = frameId;

//   updatePowerCoresToMatchFrame(ship);
//   updateThrustersToMatchFrame(ship);
// };

const updatePowerCoresToMatchFrame = (ship) => {
  let { frameId, powerCoreIds } = ship
  const size = findComponentByFrameId(frameId, "size")

  // change power cores to null if they don't fit the new frame
  powerCoreIds.forEach((core, idx) => {
    if (
      core !== null &&
      !doesFrameSizeAllowCore(core, size)
    ) {
      powerCoreIds[idx] = null;
    }
  });

  // reduce length of the power core list if moving to a smaller frame
  let newCoreAmount = getCoreQuantityFromSize(size);
  if (powerCoreIds.length > newCoreAmount)
    powerCoreIds.length = newCoreAmount;
};

const updateThrustersToMatchFrame = (ship) => {
  let { frameId, thrustersId } = ship
  const size = findComponentByFrameId(frameId, "size")
  
  // change thrusters to null if they don't fit the new frame
  if (thrustersId !== null && !doesFrameSizeAllowThruster(thrustersId, size)) {
    thrustersId = null;
  }
};

const updateComputerToMatchFrame = (ship) => {
  let { frameId, computerId } = ship
  const size = findComponentByFrameId(frameId, "size")

  console.log(size);
  // change computer to 'mk 4 mono' if size changes to supercolossal
  if(size === 'Supercolossal'){
    // FIXME: WHYYYYY
    computerId = 'Mk 4 Mononode'
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
      getPowerCoreData(core).sizes.includes("Sc")
    );

    if (supercolossalCoreBoolArray.includes(true)) {
      // at least one core is supercolossal size

      let indexOfFirstSupercolossalMatch =
        supercolossalCoreBoolArray.indexOf(true);
      let hugeCoreBoolArray = ship.powerCoreIds
        .filter((core, idx) => indexOfFirstSupercolossalMatch !== idx)
        .map(
          (core) =>
            getPowerCoreData(core).sizes.includes("H") &&
            !getPowerCoreData(core).sizes.includes("C")
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
        getPowerCoreData(core).sizes.includes("C")
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
  const totalAllowedTempHP = getArmorData(ship.parts.armorId, ship.getSize()).tempHP
  
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
  let frameId = capitalizeEachWord(ship.frameId);
  let { startTotal, increment } = findComponentByFrameId(frameId, "hp");

  let framePackage = {
    size: findComponentByFrameId(frameId, "size"),
    maneuverability: findComponentByFrameId(frameId, "maneuverability"),
    hp: startTotal + increment * getTierData(tierId).hpIncrementMultiplier,
    dt: findComponentByFrameId(frameId, "dt"),
    ct: findComponentByFrameId(frameId, "ct"),
    expansions: formatExpansions(findComponentByFrameId(frameId, "expansions")),
    minCrew: findComponentByFrameId(frameId, "minimumCrew"),
    maxCrew: findComponentByFrameId(frameId, "maximumCrew"),
    bpCost: findComponentByFrameId(frameId, "cost"),
  };

  return framePackage;
};

class Ship {
  constructor(parts) {
    this.parts = parts;
  }

  getFramePackage() {
    return getFramePackageFromShip(this.parts);
  }

  getSize() {
    return this.getFramePackage().size;
  }

  setTier(tierNum) {
    if(!getTierIdList().includes(tierNum)) throw 'Tier input did not match allowed tier options'
    return this.parts.tierId = tierNum
  }

  setFrame(frameType) {
    if(!getFrameIdList().includes(frameType)) throw 'Frame input did not match allowed frame options'
    updatePowerCoresToMatchFrame(this.parts);
    updateThrustersToMatchFrame(this.parts);
    updateComputerToMatchFrame(this.parts);
    return this.parts.frameId = frameType
  }
}

const getTotalBPCosts = (ship) => {
  const { thrustersId, powerCoreIds, armorId, computerId } = ship
  const powerCoreTotalBPCost = powerCoreIds.map(core => getPowerCoreData(core).bpCost).reduce((total, num) => total + num)

  const bpExpenses = [
    getFramePackageFromShip(ship).bpCost,
    powerCoreTotalBPCost,
    getThrusterData(thrustersId).bpCost,
    getArmorData(armorId, getFramePackageFromShip(ship).size).bpCost,
    getComputerData(computerId).bpCost,
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
  const { thrustersId, computerId } = ship

  const pcuExpenses = [
    getThrusterData(thrustersId).pcuCost,
    getComputerData(computerId).pcuCost,
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
    getThrusterData(thrustersId).pcuCost,
    // defensive countermeasures
    // shields
    // weapons
  ]

  return pcuExpenses.reduce((total, num) => total + num);
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
  // setNewFrame,
  validateShip,
  getFramePackageFromShip,
  Ship,
  getTotalBPCosts,
  getTotalPCUCosts,
  getEssentialPCUCosts,
  shipSetter
};
