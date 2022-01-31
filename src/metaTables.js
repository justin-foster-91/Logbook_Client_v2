import { capitalizeEachWord, sizeLetterToStringConverter } from './utils';

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

const getTierData = (tierId) => {
  let array = shipTiers[tierId]

  return {buildPoints: array[0], hpIncrementMultiplier: array[1]}
}

const getPowerCoreData = (powerCoreId) => {
  if(powerCoreId === 'none') return {sizes: 'none', pcuProvided: 0, bpCost: 0, source: 'none', sfsLegal: true};

  let array = powerCores[capitalizeEachWord(powerCoreId)]

  return {sizes: array[0], pcuProvided: array[1], bpCost: array[2], source: array[3], sfsLegal: array[4]}
}

const getTierIdList = () => {
  return Object.keys(shipTiers).sort((a, b) => eval(a) - eval(b))
}

const getPowerCoreIdList = () => {
  return Object.keys(powerCores).sort((a, b) => a + b)
}


  // Small - Large: 1 Core
  // Medium & Large: 1 Core + 1 Core optional (bonus from expansion bay)
  // Huge: 2 Cores
  // Gargantuan: 3 Cores
  // Colossal: 4 Cores
  // Supercolossal: 5 (colossal) Cores OR 1 (supercolossal) + 4 (huge or gargantuan) Cores

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

// Supercolossal: 5 (colossal) Cores OR 1 (supercolossal) + 4 (huge or gargantuan) Cores

// String core => Boolean
const doesFrameSizeAllowCore = (core, frameSize) => {
  let sizeLetterList = getPowerCoreData(core).sizes
  let sizeWordList = sizeLetterList.map(size => sizeLetterToStringConverter(size))

  if(frameSize === 'Supercolossal' && sizeWordList.includes('Huge')) return true;

  return sizeWordList.includes(frameSize);
}

const findComponentByFrameId = (frames, frameId, returnComponent) => {
  let newFrame = frames.find(frame => frame.type.toLowerCase() === frameId.toLowerCase())
  
  return newFrame[returnComponent]
}

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validateShip = (ship) => {
  return validatePowerCores(ship)

  // return true;
}


  

// Object ship => {validity: Bool, errors: [Error]}
// Error = {shipPart: String, message: String}
const validatePowerCores = (ship) => {
  // Supercolossal: 5 (colossal) Cores OR 1 (supercolossal) + 4 (huge or gargantuan) Cores

  // power core must fit frame size

  // supercolossal frame: 5 cores
  // if one of powerCores is supercolossal
  //// then the other 4 must fit size huge
  // if no supercolossal powerCore
  //// then all 5 must be colossal

}


export {
  getTierData, 
  getPowerCoreData, 
  getTierIdList, 
  getPowerCoreIdList, 
  getCoreQuantityFromSize,
  doesFrameSizeAllowCore,
  findComponentByFrameId,
  validateShip
}