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
    if(!Tables.getTierIdList().includes(tierNum)) throw 'Tier input did not match allowed tier options'
    this.parts.tierId = tierNum
    return this
  }

  setFrame(frameType) {
    if(!Tables.getFrameIdList().includes(frameType)) throw 'Frame input did not match allowed frame options'
    this.parts.frameId = frameType
    SF.updatePowerCoresToMatchFrame(this.parts);
    SF.updateThrustersToMatchFrame(this.parts);
    SF.updateComputerToMatchFrame(this.parts);
    return this
  }
}

export default Ship