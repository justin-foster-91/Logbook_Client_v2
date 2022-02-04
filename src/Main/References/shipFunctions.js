import {getPowerCoreData, getThrusterData} from './metaTables'
import { capitalizeEachWord, sizeLetterToStringConverter } from './utils';
import frames from './frames.json';

// TODO: add in bonus core from expansion
// Str size => Num core quantity
const getCoreQuantityFromSize = (size) => {
  size = size.toLowerCase() 

  if(size === 'small') return 1;
  if(size === 'medium' || size === 'large') return 1;
  if(size === 'huge') return 2;
  if(size === 'gargantuan') return 3;
  if(size === 'colossal') return 4;
  if(size === 'supercolossal') return 5;
}

// String core => Boolean
const doesFrameSizeAllowCore = (core, frameSize) => {
  let sizeLetterList = getPowerCoreData(core).sizes
  let sizeWordList = sizeLetterList.map(size => sizeLetterToStringConverter(size))

  if(frameSize === 'Supercolossal' && sizeWordList.includes('Huge')) return true;

  return sizeWordList.includes(frameSize);
}

const doesFrameSizeAllowThruster = (thruster, frameSize) => {
  let sizeLetter = getThrusterData(thruster).size
  let sizeWord = sizeLetterToStringConverter(sizeLetter)

  return sizeWord.match(frameSize) ? true : false;
}

const findComponentByFrameId = (frameId, returnComponent) => {
  let newFrame = frames.find(frame => frame.type === capitalizeEachWord(frameId))
   
  return newFrame[returnComponent]
}

// (Object, String) => void
const setNewFrame = (ship, frameId) => {

  ship.frameId = frameId

  updatePowerCoresToMatchFrame(ship)
  updateThrustersToMatchFrame(ship)
}

const updatePowerCoresToMatchFrame = (ship) => {
  // change power cores to null if they don't fit the new frame
  ship.powerCoreIds.forEach((core, idx) => {
    if(core !== null && !doesFrameSizeAllowCore(core, findComponentByFrameId(ship.frameId, 'size'))) {
      ship.powerCoreIds[idx] = null
    } 
  })

  // reduce length of the power core list if moving to a smaller frame
  let newCoreAmount = getCoreQuantityFromSize(findComponentByFrameId(ship.frameId, 'size'))
  if(ship.powerCoreIds.length > newCoreAmount) ship.powerCoreIds.length = newCoreAmount;
}

const updateThrustersToMatchFrame = (ship) => {
  // change thrusters to null if they don't fit the new frame
  if(ship.thrustersId !== null && !doesFrameSizeAllowThruster(ship.thrustersId, findComponentByFrameId(ship.frameId, 'size'))) {
    ship.thrustersId = null
  }
}

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validateShip = (ship) => {
  let powerCoreValidation = validatePowerCores(ship)
  let thrustersValidation = validateThrusters(ship)

  return mergeValidations([powerCoreValidation, thrustersValidation])
}

const mergeValidations = (validationList) => {
  let allValid = true
  let allErrors = []

  validationList.forEach(validation => {
    allValid = allValid && validation.validity;
    if(validation.errors) allErrors = allErrors.concat(validation.errors)
  })

  return {validity: allValid, errors: allErrors}
}

const validateThrusters = (ship) => {
  if(ship.thrustersId === null){
    return {validity: false, errors: [{shipPart: 'Thrusters', message: 'All ships must have at least 1 Thruster'}]}
  }

  return {validity: true, errors: []}
}

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validatePowerCores = (ship) => {

  // power core must fit frame size
  // limit core number by frame size

  if(ship.powerCoreIds.every(core => core === null)){
    // all power cores are empty

    return {validity: false, errors: [{shipPart: 'Power Cores', message: 'All ships must have at least 1 Power Core.'}]}
  }

  if(findComponentByFrameId(ship.frameId, 'size').toLowerCase() === 'supercolossal'){
    // ship frame is supercolossal

    let supercolossalCoreBoolArray = ship.powerCoreIds.map(core => getPowerCoreData(core).sizes.includes('Sc'))

    if(supercolossalCoreBoolArray.includes(true)){
      // at least one core is supercolossal size

      let indexOfFirstSupercolossalMatch = supercolossalCoreBoolArray.indexOf(true)
      let hugeCoreBoolArray = ship.powerCoreIds
        .filter((core, idx) => indexOfFirstSupercolossalMatch !== idx)
        .map(core => getPowerCoreData(core).sizes.includes('H') && !getPowerCoreData(core).sizes.includes('C'))
        

      if(hugeCoreBoolArray.includes(false)){
        // one of the remaining cores is not 'huge' size (all 'Gargantuan' sized cores also fit size 'Huge')

        return {validity: false, errors: [{shipPart: 'Power Cores', message: 'Colossal and supercolossal cores may not both be equipped on the same ship.'}]}
      } else{
        // all remaining cores are 'huge' size

        return {validity: true, errors: []}
      }
    } else{
      // no cores were supercolossal size

      let colossalCoreBoolArray = ship.powerCoreIds.map(core => getPowerCoreData(core).sizes.includes('C'))

      if(colossalCoreBoolArray.includes(false)){
        // not all cores were colossal size

        return {validity: false, errors: [{shipPart: 'Power Cores', message: 'Without a Supercolossal power core, all 5 cores must be designed for Colossal ships'}]}
      } else {
        // all cores were colossal size

        return {validity: true, errors: []}
      }
    }
  }

  return {validity: true, errors: []}
}

export {
  getCoreQuantityFromSize,
  doesFrameSizeAllowCore,
  doesFrameSizeAllowThruster,
  findComponentByFrameId,
  setNewFrame,
  validateShip
}