import { getPowerCoreData, getThrusterData, getTierData, getArmorData } from "./metaTables";
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
const setNewFrame = (ship, frameId) => {
  ship.frameId = frameId;

  updatePowerCoresToMatchFrame(ship);
  updateThrustersToMatchFrame(ship);
};

const updatePowerCoresToMatchFrame = (ship) => {
  // change power cores to null if they don't fit the new frame
  ship.powerCoreIds.forEach((core, idx) => {
    if (
      core !== null &&
      !doesFrameSizeAllowCore(
        core,
        findComponentByFrameId(ship.frameId, "size")
      )
    ) {
      ship.powerCoreIds[idx] = null;
    }
  });

  // reduce length of the power core list if moving to a smaller frame
  let newCoreAmount = getCoreQuantityFromSize(
    findComponentByFrameId(ship.frameId, "size")
  );
  if (ship.powerCoreIds.length > newCoreAmount)
    ship.powerCoreIds.length = newCoreAmount;
};

const updateThrustersToMatchFrame = (ship) => {
  // change thrusters to null if they don't fit the new frame
  if (
    ship.thrustersId !== null &&
    !doesFrameSizeAllowThruster(
      ship.thrustersId,
      findComponentByFrameId(ship.frameId, "size")
    )
  ) {
    ship.thrustersId = null;
  }
};

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
  
  // if ablative
  // temp hp allocation must equal the total allowed
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

  //has ablative armor
  //ablative armor used temp hp
  //ablative armor total temp hp

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
}

const getTotalBPCostsFromShip = (ship) => {
  let totalBPCost = 0;

  totalBPCost +=
    //frame
    //power core
    getThrusterData(ship.thrusterId).bpCost;
    //armor

  return totalBPCost;
};

const getTotalTL = () => {
  /* 
    Target Lock (TL): This value is used when determining whether tracking weapons 
    (see Type on page 303) hit a starship. TL is calculated based on the starship’s 
    size, defensive countermeasures (see page 298), and armor, plus the pilot’s number of ranks 
    in the Piloting skill. See page 320 for details.
  */
}

const getTotalAB = () => {
  /* 
    Armor Class (AC): This value is used when determining whether direct-fire weapons 
    (see Type on page 303) hit a starship. AC is calculated based on the ship’s 
    size, maneuverability, and physical armor, as well as the pilot’s number of ranks 
    in the Piloting skill. See page 320 for details on calculating AC.
  */
}


export {
  getCoreQuantityFromSize,
  doesFrameSizeAllowCore,
  doesFrameSizeAllowThruster,
  findComponentByFrameId,
  setNewFrame,
  validateShip,
  getFramePackageFromShip,
  Ship,
  getTotalBPCostsFromShip,
};
