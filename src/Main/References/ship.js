import * as Tables from "../ShipPartSetters/CustomRefs/metaTables";
import * as SF from "./shipFunctions";
import * as Utils from "./utils";
import * as Validate from "../ShipPartSetters/CustomRefs/optionValidation";


class Ship {
  #parts;
  #sources;

  constructor(parts, sources) {
    this.#parts = parts;
    this.#sources = sources;

    this.onShipChange = (parts) => {};

    if (parts) {
      const frameId = Utils.capitalizeEachWord(parts.frameId);
      const tierId = parts.tierId

      if (!this.#sources.includes("Starfinder Core Rulebook")) {
        throw new Error("Starfinder Core Rulebook cannot be disabled.")
      }
      
      this.updatePartsWithNewSources();
      // this.setFrame(frameId)
      this.setTier(tierId)
    }

  }

  // <... Getters ...>
  getParts() {
    return this.#parts;
  }

  // getSources() {
  //   return this.#sources;
  // }

  getActiveSources() {
    return this.#sources;
  }

  getFramePackage() {
    return SF.getFramePackage(this.#parts);
  }

  getSize() {
    return this.getFramePackage().size;
  }

  getTotalBPCosts() {
    return SF.getTotalBPCosts(this.#parts);
  }

  getTotalPCUCosts() {
    return SF.getTotalPCUCosts(this.#parts);
  }

  getTotalPCUBudget() {
    // TODO: 
    // An abysium power core increases the PCU it provides by 25% (maximum +50 PCU).
    // A djezet power core increases the PCU it provides by 10% (maximum +20 PCU), but it can direct that power only to fulfill the PCU requirements for expansion bays.
    return this.#parts.powerCoreIds
      .map((core) => Tables.getPowerCoreData(core).pcuProvided)
      .reduce((total, num) => total + num);
  }

  getBonusPackage() {}

  updatePartsWithNewSources() {
    SF.updateFrame(this);
    SF.updatePowerCores(this);
    SF.updateThrusters(this);
    SF.updateArmor(this);
    SF.updateAblativeArmor(this);
    SF.updateDriftEngine(this);
    SF.updateExpansionBays(this);
    // security
    // sensors
    SF.updateShields(this);
  }
  
  // <... Setters ...>
  setTier(tier) {
    tier = tier.toString();
    if (!Tables.getTierIdList().includes(tier)) {
      throw new Error("Tier input did not match allowed tier options");
    }

    this.#parts.tierId = tier;
    SF.updateAntiPersonnelToMatchTier(this.#parts);

    this.onShipChange(this.#parts);
    return this;
  }

  setFrame(frame) {
    if (!Tables.getFrameIdList().includes(frame)) {
      throw new Error("Frame input did not match allowed frame options");
    }

    this.#parts.frameId = frame;

    // Parts that are dependent on frame && not altered by setSource
    SF.updateComputer(this);
    SF.updateCrewQuarters(this);
    // frame reliant parts: powerCore, thrusters, computer, crewQuarters, driftEngine, expansionBays

    this.onShipChange(this.#parts);
    return this;
  }

  setPowerCore(powerCore, idx) {
    if (!Tables.getPowerCoreIdList().includes(powerCore) && powerCore !== null) {
      throw new Error("Power core input did not match allowed power core options");
    }
    if (idx === null) {
      throw new Error("setPowerCore(powerCore, idx) must take an index parameter");
    }

    const powerCoreQuantity = SF.getCoreQuantityFromSize(this.getSize());
    if (idx + 1 > powerCoreQuantity)
      throw new Error(`Attempted to set ${idx + 1} power cores when only ${powerCoreQuantity} allowed`);

    this.#parts.powerCoreIds[idx] = powerCore;
    this.onShipChange(this.#parts);
    return this;
  }

  setPowerCoreArrayLength(length) {
    if (length < 1) {
      throw new Error("Power core array length must be greater than 0");
    }
    
    this.#parts.powerCoreIds.length = length;
    this.onShipChange(this.#parts);
    return this;
  }

  setThrusters(thruster) {
    if (!Tables.getThrusterIdList().includes(thruster) && thruster !== null) {
      throw new Error("Thrusters input did not match allowed thruster options");
    }

    this.#parts.thrustersId = thruster;
    this.onShipChange(this.#parts);
    return this;
  }

  setArmor(armor) {
    if (!Tables.getArmorIdList().includes(armor) && armor !== null) {
      throw new Error("Armor input did not match allowed armor options");
    }
    const balancedHP = Tables.getArmorData(armor, this.getSize()).tempHP / 4;
    const arcList = ["forward", "port", "starboard", "aft"];

    // if armor is not ablative, empty ablative hp values
    if (!armor?.includes("ablative")) {
      arcList.map((arc) => this.setAblativeHPByPosition(arc, 0));
    }

    // if armor is ablative, balance hp values
    if (armor?.includes("ablative")) {
      arcList.map((arc) => this.setAblativeHPByPosition(arc, balancedHP));
    }

    this.#parts.armorId = armor;
    this.onShipChange(this.#parts);
    return this;
  }

  setAblativeArmor(armor) {
    if (!Tables.getAblativeArmorIdList().includes(armor) && armor !== null) {
      throw new Error("Ablative Armor input did not match allowed armor options");
    }

    this.#parts.ablativeArmorId = armor;
    this.onShipChange(this.#parts);
    return this;
  }

  setAblativeHPByPosition(pos, hp) {
    this.#parts.ablativeArmorByPosition[pos] = hp;

    this.onShipChange(this.#parts);
    return this;
  }

  setComputer(comp) {
    if (!Tables.getComputerIdList().includes(comp) && comp !== null) {
      throw new Error("Computer input did not match allowed computer options");
    }

    this.#parts.computerId = comp;
    this.onShipChange(this.#parts);
    return this;
  }

  setSecondaryComputer(comp) {
    this.#parts.secondaryComputerId = comp;
    this.onShipChange(this.#parts);
    return this;
  }

  setNetworkNodeCount(count) {
    this.#parts.ctNetworkNodes = count;
    this.onShipChange(this.#parts);
    return this;
  }

  setCrewQuarters(quarters) {
    console.log(quarters);
    this.#parts.crewQuartersId = quarters;
    this.onShipChange(this.#parts);
    return this;
  }

  setDefensiveCounters(defense) {
    if (!Tables.getDefensiveCounterIdList().includes(defense) && defense !== null) {
      throw new Error("Defensive counter input did not match allowed defensive options");
    }

    this.#parts.defensiveCountermeasuresId = defense;
    this.onShipChange(this.#parts);
    return this;
  }

  setDriftEngine(engine) {
    if (!Tables.getDriftEngineIdList().includes(engine) && engine !== null) {
      throw new Error("Drift engine input did not match allowed engine options");
    }

    this.#parts.driftEngineId = engine;
    this.onShipChange(this.#parts);
    return this;
  }

  setExpansionBay(expansion, idx, copy) {
    if (!Tables.getExpansionBayIdList().includes(expansion) && expansion !== null) {
      throw new Error("Expansion bay input did not match allowed expansion options");
    }
    if (idx === null) {
      throw new Error("setExpansionBay(bay, idx) must take an index parameter");
    }

    // External bay exception
    // if(idx+1 > expansionQuantity) throw new Error(`Expansion bay number ${idx+1} may not exceed the allowed ${expansionQuantity} expansions`)

    if (!copy) this.#parts.expansionBayIds[idx] = expansion;
    if (copy) SF.copyExpansion(this.#parts, expansion, idx);
    this.onShipChange(this.#parts);
    return this;
  }

  // TODO: Should this be part of setExpansionBay()?
  deleteExpansionBay(idx) {
    SF.removeExpansion(this.#parts, idx);

    this.onShipChange(this.#parts);
    return this;
  }

  setExpansionBayArrayLength(length) {
    this.#parts.expansionBayIds.length = length;
    this.onShipChange(this.#parts);
    return this;
  }

  setFortifiedHull(hull) {
    if (!Tables.getFortifiedHullIdList().includes(hull) && hull !== null) {
      throw new Error("Fortified hull input did not match allowed hull options");
    }

    this.#parts.fortifiedHullId = hull;
    this.onShipChange(this.#parts);
    return this;
  }

  setReinforcedBulkheads(bulkhead) {
    if (!Tables.getReinforcedBulkheadIdList().includes(bulkhead) &&bulkhead !== null) {
      throw new Error("Reinforced bulkhead input did not match allowed bulkhead options");
    }

    this.#parts.reinforcedBulkheadId = bulkhead;
    this.onShipChange(this.#parts);
    return this;
  }

  setSecurity(security) {
    // if (!Tables.getSecurityIdList().includes(security) && security !== null) {
    //   throw new Error("Security input did not match allowed security options");
    // }

    // FIXME: this implementation feels messy. Revisit later.
    const targetTranslation = {
      "Biometric Locks": "hasBiometricLocks",
      "Self-Destruct System": "hasSelfDestructSystem",
      "Emergency Accelerator": "hasEmergencyAccelerator",
      "Holographic Mantle": "hasHolographicMantle",
      "Reconfiguration System": "hasReconfigurationSystem",
      "shockGrid": "shockGridId",
      "Anti-Hacking Systems": "antiHackingSystemsId",
      "Anti-Personnel Weapon": "antiPersonnelWeaponId",
      "Cloaking Device": "cloakingId",
    }

    const translationKeys = Object.keys(targetTranslation);

    let { reference, value, parent } = security;

    if (translationKeys.includes(reference)) {
      reference = targetTranslation[reference];
    }

    if (parent) {
      this.#parts[parent][reference] = value;
    } else {
      this.#parts[reference] = value;
    }
    
    this.onShipChange(this.#parts);
    return this;
  }

  setAntiPersonnelWeapon(weapon) {
    this.#parts.antiPersonnelWeaponId = weapon;
    this.onShipChange(this.#parts);
    return this;
  }

  setSensors(sensor) {
    if (!Tables.getSensorsIdList().includes(sensor) && sensor !== null) {
      throw new Error("Sensor input did not match allowed sensor options");
    }

    this.#parts.sensorsId = sensor;
    this.onShipChange(this.#parts);
    return this;
  }

  setMaterial(part, material, idx) {
    const partTranslate = {
      "Power Core": "powerCoreSpecialMaterials", 
      "Thrusters": "thrustersMaterialId", 
      "Armor": "armorMaterialId",
      "Defensive Countermeasures": "defensiveCountermeasuresMaterialId",
      "Sensors": "sensorsMaterialId",
    }

    let keyId = partTranslate[part];
    if (part === "Power Core") {
      this.#parts[keyId][idx] = material;
    } else {
      this.#parts[keyId] = material;
    }

    this.onShipChange(this.#parts);
    return this;
  }

  setShields(shield) {
    if (!Tables.getShieldsIdList().includes(shield) && shield !== null) {
      throw new Error("Shield input did not match allowed shield options");
    }

    this.#parts.shieldsId = shield;
    this.onShipChange(this.#parts);
    return this;
  }

}

export default Ship;
