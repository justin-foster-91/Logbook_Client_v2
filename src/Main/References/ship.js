import * as Tables from "./metaTables";
import * as SF from './shipFunctions';

class Ship {
  constructor(parts) {
    this.parts = parts;
  }

  getFramePackage() {
    return SF.getFramePackageFromShip(this.parts);
  }

  getSize() {
    return this.getFramePackage().size;
  }

  getTotalBPCosts() {
    return SF.getTotalBPCosts(this.parts)
  }

  getTotalPCUCosts() {
    return SF.getTotalPCUCosts(this.parts)
  }

  getTotalPCUBudget() {
    return this.parts.powerCoreIds
      .map(core => Tables.getPowerCoreData(core).pcuProvided)
      .reduce((total, num) => total + num)
  }

  getBonusPackage() {

  }



  setTier(tier) {
    if(!Tables.getTierIdList().includes(tier)) throw new Error('Tier input did not match allowed tier options')
    
    this.parts.tierId = tier
    return this
  }

  setFrame(frame) {
    if(!Tables.getFrameIdList().includes(frame)) throw new Error('Frame input did not match allowed frame options')
    
    this.parts.frameId = frame
    SF.updatePowerCoresToMatchFrame(this.parts);
    SF.updateThrustersToMatchFrame(this.parts);
    SF.updateComputerToMatchFrame(this.parts);
    SF.updateExpansionBaysToMatchFrame(this.parts);
    return this
  }

  setPowerCore(powerCore, idx) {
    if(!Tables.getPowerCoreIdList().includes(powerCore) && powerCore !== null) throw new Error("Power core input did not match allowed power core options")
    if(idx === null) throw new Error("setPowerCore(powerCore, idx) must take an index parameter")
    const powerCoreQuantity = SF.getCoreQuantityFromSize(this.getSize());
    if(idx+1 > powerCoreQuantity) throw new Error(`Power core number ${idx+1} may not exceed the allowed ${powerCoreQuantity} power cores`)

    this.parts.powerCoreIds[idx] = powerCore
    return this
  }

  setThrusters(thruster) {
    if(!Tables.getThrusterIdList().includes(thruster) && thruster !== null) throw new Error('Thrusters input did not match allowed thruster options')

    this.parts.thrustersId = thruster
    return this
  }

  setArmor(armor) {
    if(!Tables.getArmorIdList().includes(armor) && armor !== null) throw new Error('Armor input did not match allowed armor options')
    const balancedHP = Tables.getArmorData(armor, this.getSize()).tempHP / 4;
    const arcList = ['forward', 'port', 'starboard', 'aft']

    // if armor is not ablative, empty ablative hp values
    if(armor === null || !armor.includes('ablative')){
      arcList.map(arc => this.setAblativeHPByPosition(arc, 0))
    }

    // if armor is ablative, balance hp values
    if(armor.includes('ablative')){
      arcList.map(arc => this.setAblativeHPByPosition(arc, balancedHP))
    }

    this.parts.armorId = armor
    return this
  }

  setAblativeHPByPosition(pos, hp) {
    this.parts.ablativeArmorByPosition[pos] = hp
    return this
  }

  setComputer(comp) {
    if(!Tables.getComputerIdList().includes(comp) && comp !== null) throw new Error('Computer input did not match allowed computer options')

    this.parts.computerId = comp
    return this
  }

  setSecondaryComputer(comp) {
    this.parts.secondaryComputerId = comp
    return this
  }

  setNetworkNodeCount(count) {
    this.parts.ctNetworkNodes = count
    return this
  }

  setCrewQuarters(quarters) {
    this.parts.crewQuartersId = quarters
    return this
  }

  setDefensiveCounters(defense) {
    if(!Tables.getDefensiveCounterIdList().includes(defense) && defense !== null) throw new Error('Defensive counter input did not match allowed defensive options')

    this.parts.defensiveCountermeasuresId = defense
    return this
  }

  setDriftEngine(engine) {
    if(!Tables.getDriftEngineIdList().includes(engine) && engine !== null) throw new Error('Drift engine input did not match allowed engine options')

    this.parts.driftEngineId = engine
    return this
  }

  setExpansionBay(expansion, idx) {
    if(!Tables.getExpansionBayIdList().includes(expansion) && expansion !== null) throw new Error("Expansion bay input did not match allowed expansion options")
    if(idx === null) throw new Error("setExpansionBay(bay, idx) must take an index parameter")

    const expansionQuantity = this.getFramePackage().expansions
    
    // External bay exception
    if(idx+1 > expansionQuantity) throw new Error(`Expansion bay number ${idx+1} may not exceed the allowed ${expansionQuantity} expansions`)
  
    this.parts.expansionBayIds[idx] = expansion
    return this
  }

  setFortifiedHull(hull) {
    if(!Tables.getFortifiedHullIdList().includes(hull) && hull !== null) throw new Error('Fortified hull input did not match allowed hull options')

    this.parts.fortifiedHullId = hull
    return this
  }

  setReinforcedBulkheads(bulkhead) {
    if(!Tables.getReinforcedBulkheadIdList().includes(bulkhead) && bulkhead !== null) throw new Error('Reinforced bulkhead input did not match allowed bulkhead options')

    this.parts.reinforcedBulkheadId = bulkhead
    return this
  }
}

export default Ship