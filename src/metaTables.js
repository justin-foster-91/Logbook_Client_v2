import { capitalizeEachWord, sizeLetterToStringConverter } from './utils';
import frames from './frames.json';

let shipTiers = {
  // Tier: [buildPoints, hpIncrements]
  '1/4':	[25,	0],
  '1/3':	[30,	0],
  '1/2':	[40,	0],
  '1':	[55,	0],
  '2':	[75,	0],
  '3':	[95,	0],
  '4':	[115,	1],
  '5':	[135,	1],
  '6':	[155,	1],
  '7':	[180,	1],
  '8':	[205,	2],
  '9':	[230,	2],
  '10':	[270,	2],
  '11':	[310,	2],
  '12':	[350,	3],
  '13':	[400,	3],
  '14':	[450,	3],
  '15':	[500,	3],
  '16':	[600,	4],
  '17':	[700,	4],
  '18':	[800,	4],
  '19':	[900,	4],
  '20':	[1000, 5],
}

let powerCores = {
  // Power Core: [[Sizes], pcuProvided, bpCost, source, sfsLegal]
  'Micron Light':	[['T'],	50,	4, 'CRB', 'CRB', true],
  'Micron Heavy':	[['T'],	70,	6, 'CRB', true],
  'Micron Ultra':	[['T'],	80,	8, 'CRB', true],
  'Arcus Light':	[['T', 'S'],	75,	7, 'CRB', true],
  'Pulse Brown':	[['T', 'S'],	90,	9, 'CRB', true],
  'Pulse Black':	[['T', 'S'],	120,	12, 'CRB', true],
  'Pulse White':	[['T', 'S'],	140,	14, 'CRB', true],
  'Pulse Gray':	[['T', 'S', 'M'],	100,	10, 'CRB', true],
  'Arcus Heavy':	[['T', 'S', 'M'],	130,	13, 'CRB', true],
  'Pulse Green':	[['T', 'S', 'M'],	150,	15, 'CRB', true],
  'Pulse Red':	[['T', 'S', 'M'],	175,	17, 'CRB', true],
  'Pulse Blue':	[['T', 'S', 'M'],	200,	20, 'CRB', true],
  'Arcus Ultra':	[['S', 'M', 'L'],	150,	15, 'CRB', true],
  'Arcus Maximum':	[['S', 'M', 'L'],	200,	20, 'CRB', true],
  'Pulse Orange':	[['S', 'M', 'L'],	250,	25, 'CRB', true],
  'Pulse Prismatic':	[['S', 'M', 'L'],	300,	30, 'CRB', true],
  'Nova Light':	[['M', 'L', 'H'],	150,	15, 'CRB', true],
  'Nova Heavy':	[['M', 'L', 'H'],	200,	20, 'CRB', true],
  'Nova Ultra':	[['M', 'L', 'H'],	300,	30, 'CRB', true],
  'Gateway Light':	[['L', 'H', 'G'],	300,	30, 'CRB', true],
  'Gateway Heavy':	[['L', 'H', 'G'],	400,	40, 'CRB', true],
  'Gateway Ultra':	[['H', 'G', 'C'],	500,	50, 'CRB', true],
  'Titan Light':	[['Sc'],	700,	50, 'DS', false],
  'Titan Heavy':	[['Sc'],	950,	60, 'DS', false],
  'Titan Ultra':	[['Sc'],	1200,	70, 'DS', false]
}

let thrusters = {
  'T6':	['T',	6,	+1,	20,	3, 'CRB', true],
  'T8':	['T',	8,	+0,	25,	4, 'CRB', true],
  'T10':	['T',	10,	+0,	30,	5, 'CRB', true],
  'T12':	['T',	12,	-1,	35,	6, 'CRB', true],
  'T14':	['T',	14,	-2,	40,	7, 'CRB', true],
  'S6':	['S',	6,	+1,	30,	3, 'CRB', true],
  'S8':	['S',	8,	+0,	40,	4, 'CRB', true],
  'S10':	['S',	10,	+0,	50,	5, 'CRB', true],
  'S12':	['S',	12,	-1,	60,	6, 'CRB', true],
  'M4':	['M',	4,	+2,	40,	2, 'CRB', true],
  'M6':	['M',	6,	+1,	50,	3, 'CRB', true],
  'M8':	['M',	8,	+0,	60,	4, 'CRB', true],
  'M10':	['M',	10,	+0,	70,	5, 'CRB', true],
  'M12':	['M',	12,	-1,	80,	6, 'CRB', true],
  'L4':	['L',	4,	+2,	60,	4, 'CRB', true],
  'L6':	['L',	6,	+1,	80,	6, 'CRB', true],
  'L8':	['L',	8,	+0,	100,	8, 'CRB', true],
  'L10':	['L',	10,	+0,	120,	10, 'CRB', true],
  'H4':	['H',	4,	+2,	80,	4, 'CRB', true],
  'H6':	['H',	6,	+1,	120,	6, 'CRB', true],
  'H8':	['H',	8,	+0,	140,	8, 'CRB', true],
  'H10':	['H',	10,	+0,	160,	10, 'CRB', true],
  'G4':	['G',	4,	+2,	120,	8, 'CRB', true],
  'G6':	['G',	6,	+1,	180,	12, 'CRB', true],
  'G8':	['G',	8,	+0,	240,	16, 'CRB', true],
  'C4':	['C',	4,	+2,	200,	8, 'CRB', true],
  'C6':	['C',	6,	+1,	300,	12, 'CRB', true],
  'C8':	['C',	8,	+0,	400,	16, 'CRB', true],
  'SC4':	['Sc',	4,	+1,	300,	16, 'DS', false],
  'SC6':	['Sc',	6,	+0,	400,	20, 'DS', false],
  'SC8':	['Sc',	8,	-1,	500,	24, 'DS', false]
}

const getTierData = (tierId) => {
  let array = shipTiers[tierId]

  return {buildPoints: array[0], hpIncrementMultiplier: array[1]}
}

const getPowerCoreData = (powerCoreId) => {
  if(powerCoreId === 'none') return {sizes: 'none', pcuProvided: 0, bpCost: 0, source: 'none', sfsLegal: true};

  let array = powerCores[capitalizeEachWord(powerCoreId)]

  return {sizes: array[0], pcuProvided: array[1], bpCost: array[2], source: array[3], sfsLegal: array[4]}
}

const getThrusterData = (thrustersId) => {
  if(thrustersId === 'none') return {size: 'none', speed: 'none', pilotingModifier: 'none', pcuCost: 0, bpCost: 0, source: 'none', sfsLegal: true};

  let array = thrusters[capitalizeEachWord(thrustersId)]

  return {size: array[0], speed: array[1], pilotingModifier: array[2], pcuCost: array[3], bpCost: array[4], source: array[5], sfsLegal: array[6]}
}

const getTierIdList = () => {
  return Object.keys(shipTiers).sort((a, b) => eval(a) - eval(b))
}

const getPowerCoreIdList = () => {
  return Object.keys(powerCores).sort((a, b) => a + b)
}

const getThrusterIdList = () => {
  return Object.keys(thrusters).sort((a, b) => a + b)
}

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

  return sizeWord.match(frameSize);
}

const findComponentByFrameId = (frames, frameId, returnComponent) => {
  let newFrame = frames.find(frame => frame.type === capitalizeEachWord(frameId))
  
  return newFrame[returnComponent]
}

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validateShip = (ship) => {
  let functionList = [validatePowerCores(ship)]

  let allValid = functionList.every(func => func.valid === true)
  let invalidShipParts = []

  // functionList.forEach(func => func.errors.push(invalidShipParts))

  // return allValid 
  //   ? {validity: true, errors: []} 
  //   : {validity: false, errors: invalidShipParts}

  return allValid 
    ? {validity: true, errors: []} 
    : {validity: false}
}

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validatePowerCores = (ship) => {

  // power core must fit frame size
  // limit core number by frame size

  if(ship.powerCoreIds.every(core => core === 'none')){
    // all power cores are empty

    return {validity: false, error: [{shipPart: 'Power Cores', message: 'All ships must have at least 1 Power Core.'}]}
  }

  if(findComponentByFrameId(frames, ship.frameId, 'size').toLowerCase() === 'supercolossal'){
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

        return {validity: false, error: [{shipPart: 'Power Cores', message: 'Colossal and supercolossal cores may not both be equipped on the same ship.'}]}
      } else{
        // all remaining cores are 'huge' size

        return {validity: true, error: []}
      }
    } else{
      // no cores were supercolossal size

      let colossalCoreBoolArray = ship.powerCoreIds.map(core => getPowerCoreData(core).sizes.includes('C'))

      if(colossalCoreBoolArray.includes(false)){
        // not all cores were colossal size

        return {validity: false, error: [{shipPart: 'Power Cores', message: 'Without a Supercolossal power core, all 5 cores must be designed for Colossal ships'}]}
      } else {
        // all cores were colossal size

        return {validity: true, error: []}
      }
    }
  }

  return {validity: true, error: []}
}


export {
  getTierData, 
  getPowerCoreData, 
  getThrusterData,
  getTierIdList, 
  getPowerCoreIdList, 
  getThrusterIdList,
  getCoreQuantityFromSize,
  doesFrameSizeAllowCore,
  doesFrameSizeAllowThruster,
  findComponentByFrameId,
  validateShip
}