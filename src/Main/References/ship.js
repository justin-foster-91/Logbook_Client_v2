import * as Tables from "../ShipPartSetters/CustomRefs/metaTables";
import * as SF from "./shipFunctions";
import * as Utils from "./utils";

class Ship {
  constructor(parts) {
    this.parts = parts;

    this.onShipChange = (parts) => {
    };

    if (parts) {
      const frameId = Utils.capitalizeEachWord(parts.frameId);
      const tierId = parts.tierId

      this.setFrame(frameId)
      this.setTier(tierId)
    }
  }

  getFramePackage() {
    return SF.getFramePackageFromShip(this.parts);
  }

  getSize() {
    return this.getFramePackage().size;
  }

  getTotalBPCosts() {
    return SF.getTotalBPCosts(this.parts);
  }

  getTotalPCUCosts() {
    return SF.getTotalPCUCosts(this.parts);
  }

  getTotalPCUBudget() {
    return this.parts.powerCoreIds
      .map((core) => Tables.getPowerCoreData(core).pcuProvided)
      .reduce((total, num) => total + num);
  }

  getBonusPackage() {}


  setTier(tier) {
    tier = tier.toString();
    if (!Tables.getTierIdList().includes(tier))
      throw new Error("Tier input did not match allowed tier options");

    this.parts.tierId = tier;
    SF.updateAntiPersonnelToMatchTier(this.parts);
    this.onShipChange(this.parts);
    return this;
  }

  setFrame(frame) {
    if (!Tables.getFrameIdList().includes(frame))
      throw new Error("Frame input did not match allowed frame options");

    this.parts.frameId = frame;
    SF.updatePowerCoresToMatchFrame(this.parts);
    SF.updateThrustersToMatchFrame(this.parts);
    SF.updateComputerToMatchFrame(this.parts);
    SF.updateDriftEngineToMatchFrame(this.parts);
    SF.updateExpansionBaysToMatchFrame(this.parts);
    this.onShipChange(this.parts);

    return this;
  }

  setPowerCore(powerCore, idx) {
    if (!Tables.getPowerCoreIdList().includes(powerCore) && powerCore !== null)
      throw new Error("Power core input did not match allowed power core options");
    if (idx === null)
      throw new Error("setPowerCore(powerCore, idx) must take an index parameter");

    const powerCoreQuantity = SF.getCoreQuantityFromSize(this.getSize());
    if (idx + 1 > powerCoreQuantity)
      throw new Error(`Power core number ${idx + 1} may not exceed the allowed ${powerCoreQuantity} power cores`);

    this.parts.powerCoreIds[idx] = powerCore;
    this.onShipChange(this.parts);
    return this;
  }

  setThrusters(thruster) {
    if (!Tables.getThrusterIdList().includes(thruster) && thruster !== null)
      throw new Error("Thrusters input did not match allowed thruster options");

    this.parts.thrustersId = thruster;
    this.onShipChange(this.parts);
    return this;
  }

  setArmor(armor) {
    if (!Tables.getArmorIdList().includes(armor) && armor !== null)
      throw new Error("Armor input did not match allowed armor options");
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

    this.parts.armorId = armor;
    this.onShipChange(this.parts);
    return this;
  }

  setAblativeHPByPosition(pos, hp) {
    this.parts.ablativeArmorByPosition[pos] = hp;

    // TODO: -1 piloting check if hp is not balanced

    this.onShipChange(this.parts);
    return this;
  }

  setComputer(comp) {
    if (!Tables.getComputerIdList().includes(comp) && comp !== null)
      throw new Error("Computer input did not match allowed computer options");

    this.parts.computerId = comp;
    this.onShipChange(this.parts);
    return this;
  }

  setSecondaryComputer(comp) {
    this.parts.secondaryComputerId = comp;
    this.onShipChange(this.parts);
    return this;
  }

  setNetworkNodeCount(count) {
    this.parts.ctNetworkNodes = count;
    this.onShipChange(this.parts);
    return this;
  }

  setCrewQuarters(quarters) {
    this.parts.crewQuartersId = quarters;
    this.onShipChange(this.parts);
    return this;
  }

  setDefensiveCounters(defense) {
    if (
      !Tables.getDefensiveCounterIdList().includes(defense) &&
      defense !== null
    )
      throw new Error("Defensive counter input did not match allowed defensive options");

    this.parts.defensiveCountermeasuresId = defense;
    this.onShipChange(this.parts);
    return this;
  }

  setDriftEngine(engine) {
    if (!Tables.getDriftEngineIdList().includes(engine) && engine !== null)
      throw new Error("Drift engine input did not match allowed engine options");

    this.parts.driftEngineId = engine;
    this.onShipChange(this.parts);
    return this;
  }

  setExpansionBay(expansion, idx, copy) {
    if (!Tables.getExpansionBayIdList().includes(expansion) && expansion !== null)
      throw new Error("Expansion bay input did not match allowed expansion options");
    if (idx === null)
      throw new Error("setExpansionBay(bay, idx) must take an index parameter");

    // External bay exception
    // if(idx+1 > expansionQuantity) throw new Error(`Expansion bay number ${idx+1} may not exceed the allowed ${expansionQuantity} expansions`)

    if (!copy) this.parts.expansionBayIds[idx] = expansion;
    if (copy) SF.copyExpansion(this.parts, expansion, idx);
    this.onShipChange(this.parts);
    return this;
  }

  setFortifiedHull(hull) {
    if (!Tables.getFortifiedHullIdList().includes(hull) && hull !== null)
      throw new Error("Fortified hull input did not match allowed hull options");

    this.parts.fortifiedHullId = hull;
    this.onShipChange(this.parts);
    return this;
  }

  setReinforcedBulkheads(bulkhead) {
    if (!Tables.getReinforcedBulkheadIdList().includes(bulkhead) &&bulkhead !== null)
      throw new Error("Reinforced bulkhead input did not match allowed bulkhead options");

    this.parts.reinforcedBulkheadId = bulkhead;
    this.onShipChange(this.parts);
    return this;
  }

  setSecurity(security) {
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
      this.parts[parent][reference] = value;
    } else {
      this.parts[reference] = value;
    }
    
    this.onShipChange(this.parts);
    return this;
  }

  setSensors(sensor) {
    if (!Tables.getSensorsIdList().includes(sensor) && sensor !== null)
      throw new Error("Sensor input did not match allowed sensor options");

    console.log({sensor});
    this.parts.sensorsId = sensor;
    this.onShipChange(this.parts);
    return this;
  }


  // TODO: Should this be part of setExpansionBay()?
  deleteExpansionBay(idx) {
    SF.removeExpansion(this.parts, idx);

    this.onShipChange(this.parts);
    return this;
  }
}

export default Ship;
