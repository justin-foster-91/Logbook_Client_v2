import { capitalizeEachWord } from './utils';

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

let armor = {
  'Mk 1': [+1, null, null, 1],
  'Mk 2': [+2, null, null, 2],
  'Mk 3': [+3, null, null, 3],
  'Mk 4': [+4, null, null, 5],
  'Mk 5': [+5, -1, null, 7],
  'Mk 6': [+6, -1, null, 9],
  'Mk 7': [+7, -1, null, 12],
  'Mk 8': [+8, -1, null, 15],
  'Mk 9': [+9, -2, +1, 18],
  'Mk 10': [+10, -2, +1, 21],
  'Mk 11': [+11, -2, +1, 25],
  'Mk 12': [+12, -3, +2, 30],
  'Mk 13': [+13, -3, +2, 35],
  'Mk 14': [+14, -3, +2, 40],
  'Mk 15': [+15, -4, +3, 45]
}

const getTierData = (tierId) => {
  let array = shipTiers[tierId]

  return {buildPoints: array[0], hpIncrementMultiplier: array[1]}
}

const getPowerCoreData = (powerCoreId) => {
  if(powerCoreId === null) return {sizes: null, pcuProvided: 0, bpCost: 0, source: null, sfsLegal: true};

  let array = powerCores[capitalizeEachWord(powerCoreId)]

  return {sizes: array[0], pcuProvided: array[1], bpCost: array[2], source: array[3], sfsLegal: array[4]}
}

const getThrusterData = (thrustersId) => {
  if(thrustersId === null) return {size: null, speed: 0, pilotingModifier: 0, pcuCost: 0, bpCost: 0, source: null, sfsLegal: true};

  let array = thrusters[thrustersId]

  return {size: array[0], speed: array[1], pilotingModifier: array[2], pcuCost: array[3], bpCost: array[4], source: array[5], sfsLegal: array[6]}
}

const getArmorData = (armorId, size) => {
  if(armorId === null) return {acBonus: 0, tlPenalty: 0, turnDistance: 0, bpCost: 0}

  let sizeMod = {'Tiny': 1, 'Small': 2, 'Medium': 3, 'Large': 4, 'Huge': 5, 'Gargantuan': 6, 'Colossal': 7, 'Supercolossal': 8}
  let array = armor[armorId]

  return {acBonus: array[0], tlPenalty: array[1], turnDistance: array[2], bpCost: (array[3] * sizeMod[size]), sfsLegal: true}
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

const getArmorIdList = () => {
  return Object.keys(armor).sort((a, b) => a + b)
}


export {
  getTierData, 
  getPowerCoreData, 
  getThrusterData,
  getArmorData,
  getTierIdList, 
  getPowerCoreIdList, 
  getThrusterIdList,
  getArmorIdList,
}