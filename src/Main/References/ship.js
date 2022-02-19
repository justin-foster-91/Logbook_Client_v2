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

  setTier(tierNum) {
    if(!Tables.getTierIdList().includes(tierNum)) throw new Error('Tier input did not match allowed tier options')
    this.parts.tierId = tierNum
    return this
  }

  setFrame(frameType) {
    if(!Tables.getFrameIdList().includes(frameType)) throw new Error('Frame input did not match allowed frame options')
    this.parts.frameId = frameType
    SF.updatePowerCoresToMatchFrame(this.parts);
    SF.updateThrustersToMatchFrame(this.parts);
    SF.updateComputerToMatchFrame(this.parts);
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
  
    // if armor is not ablative, empty ablative hp values
    if(armor === null || !armor.includes('ablative')){
      this.parts.ablativeArmorByPosition.forward = 0;
      this.parts.ablativeArmorByPosition.port = 0;
      this.parts.ablativeArmorByPosition.starboard = 0;
      this.parts.ablativeArmorByPosition.aft = 0;
    }

    this.parts.armorId = armor
    return this
  }
}

export default Ship