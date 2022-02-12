import { capitalizeEachWord } from './utils';

// https://www.aonsrd.com/Rules.aspx?ID=183
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

let shipSize = {
  // Size:	[Length,	Weight,	AC and TL Modifier]
  'Tiny':	['20-60 ft.',	'2-40 tons',	+2],
  'Small':	['60-120 ft.',	'30-250 tons',	+1],
  'Medium':	['120-300 ft.',	'50-2,500 tons',	+0],
  'Large':	['300-800 ft.',	'2,000-50,000 tons',	-1],
  'Huge':	['800-2,000 ft.',	'40,000-640,000 tons',	-2],
  'Gargantuan':	['2,000-15,000 ft.',	'600,000 tons to 250 megatons',	-4],
  'Colossal':	['Over 15,000 ft.',	'200-2,000 megatons',	-8],
}

// https://www.aonsrd.com/Starship_PowerCores.aspx
let powerCores = {
  // Power Core: [[Sizes], pcuProvided, bpCost, source, sfsLegal]
  'Micron Light':	[['T'],	50,	4, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Micron Heavy':	[['T'],	70,	6, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Micron Ultra':	[['T'],	80,	8, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Arcus Light':	[['T', 'S'],	75,	7, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Brown':	[['T', 'S'],	90,	9, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Black':	[['T', 'S'],	120,	12, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse White':	[['T', 'S'],	140,	14, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Gray':	[['T', 'S', 'M'],	100,	10, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Arcus Heavy':	[['T', 'S', 'M'],	130,	13, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Green':	[['T', 'S', 'M'],	150,	15, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Red':	[['T', 'S', 'M'],	175,	17, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Blue':	[['T', 'S', 'M'],	200,	20, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Arcus Ultra':	[['S', 'M', 'L'],	150,	15, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Arcus Maximum':	[['S', 'M', 'L'],	200,	20, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Orange':	[['S', 'M', 'L'],	250,	25, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Pulse Prismatic':	[['S', 'M', 'L'],	300,	30, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Nova Light':	[['M', 'L', 'H'],	150,	15, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Nova Heavy':	[['M', 'L', 'H'],	200,	20, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Nova Ultra':	[['M', 'L', 'H'],	300,	30, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Gateway Light':	[['L', 'H', 'G'],	300,	30, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Gateway Heavy':	[['L', 'H', 'G'],	400,	40, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Gateway Ultra':	[['H', 'G', 'C'],	500,	50, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Titan Light':	[['Sc'],	700,	50, 'EoB', false, 'Starfinder #6: Empire of Bones pg. 45', 'https://paizo.com/products/btpya1ai/'],
  'Titan Heavy':	[['Sc'],	950,	60, 'EoB', false, 'Starfinder #6: Empire of Bones pg. 45', 'https://paizo.com/products/btpya1ai/'],
  'Titan Ultra':	[['Sc'],	1200,	70, 'EoB', false, 'Starfinder #6: Empire of Bones pg. 45', 'https://paizo.com/products/btpya1ai/']
}

// https://www.aonsrd.com/Starship_Thrusters.aspx
let thrusters = {
  // Thruster: [size, speed, pilotingModifier, pcuCost, bpCost, source, sfsLegal, sourceFull, sourceLink]
  'T6':	['T',	6,	+1,	20,	3, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'T8':	['T',	8,	+0,	25,	4, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'T10':	['T',	10,	+0,	30,	5, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'T12':	['T',	12,	-1,	35,	6, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'T14':	['T',	14,	-2,	40,	7, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'S6':	['S',	6,	+1,	30,	3, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'S8':	['S',	8,	+0,	40,	4, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'S10':	['S',	10,	+0,	50,	5, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'S12':	['S',	12,	-1,	60,	6, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'M4':	['M',	4,	+2,	40,	2, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'M6':	['M',	6,	+1,	50,	3, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'M8':	['M',	8,	+0,	60,	4, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'M10':	['M',	10,	+0,	70,	5, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'M12':	['M',	12,	-1,	80,	6, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'L4':	['L',	4,	+2,	60,	4, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'L6':	['L',	6,	+1,	80,	6, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'L8':	['L',	8,	+0,	100,	8, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'L10':	['L',	10,	+0,	120,	10, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'H4':	['H',	4,	+2,	80,	4, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'H6':	['H',	6,	+1,	120,	6, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'H8':	['H',	8,	+0,	140,	8, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'H10':	['H',	10,	+0,	160,	10, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'G4':	['G',	4,	+2,	120,	8, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'G6':	['G',	6,	+1,	180,	12, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'G8':	['G',	8,	+0,	240,	16, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'C4':	['C',	4,	+2,	200,	8, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'C6':	['C',	6,	+1,	300,	12, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'C8':	['C',	8,	+0,	400,	16, 'CRB', true, 'Starfinder Core Rulebook pg. 296', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'SC4':	['Sc',	4,	+1,	300,	16, 'EoB', false, 'Starfinder #6: Empire of Bones pg. 45', 'https://paizo.com/products/btpya1ai/'],
  'SC6':	['Sc',	6,	+0,	400,	20, 'EoB', false, 'Starfinder #6: Empire of Bones pg. 45', 'https://paizo.com/products/btpya1ai/'],
  'SC8':	['Sc',	8,	-1,	500,	24, 'EoB', false, 'Starfinder #6: Empire of Bones pg. 45', 'https://paizo.com/products/btpya1ai/']
}

// https://www.aonsrd.com/Starship_Armor.aspx
let armor = {
  // Armor: [acBonus, tempHP, tlPenalty, turnDistance, bpCost, source, sfsLegal]
  'Mk 1': [+1, null, null, null, 1, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 2': [+2, null, null, null, 2, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 3': [+3, null, null, null, 3, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 4': [+4, null, null, null, 5, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 5': [+5, null, -1, null, 7, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 6': [+6, null, -1, null, 9, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 7': [+7, null, -1, null, 12, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 8': [+8, null, -1, null, 15, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 9': [+9, null, -2, +1, 18, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 10': [+10, null, -2, +1, 21, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 11': [+11, null, -2, +1, 25, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 12': [+12, null, -3, +2, 30, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 13': [+13, null, -3, +2, 35, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 14': [+14, null, -3, +2, 40, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Mk 15': [+15, null, -4, +3, 45, 'CRB', true, 'Starfinder Core Rulebook pg. 297', 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook'],
  'Energy-Absorbent Plating':	[null, null, null, null, 4, 'DM', false, 'Starfinder #27: Deceivers’ Moon pg. 47', 'https://paizo.com/products/btq0216g?Starfinder-Adventure-Path-27-Deceivers-Moon'],
  'Basic ablative armor 1': [null, 8, null, null,	2, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Basic ablative armor 2': [null, 16, null, null, 3, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Basic ablative armor 3': [null, 24, null, null, 4, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Basic ablative armor 4': [null, 32, null, null, 5, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Basic ablative armor 5': [null, 40, null, null, 6, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Light ablative armor 1': [null, 52, -1, null, 8, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Light ablative armor 2': [null, 64, -1, null, 10, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Light ablative armor 3': [null, 76, -1, null, 12, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Light ablative armor 4': [null, 88, -1, null, 13, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Light ablative armor 5': [null, 100, -1, null,	14, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Medium ablative armor 1': [null,	120, -2, +1, 16, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Medium ablative armor 2': [null,	140, -2, +1, 17, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Medium ablative armor 3': [null,	160, -2, +1, 19, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Medium ablative armor 4': [null,	180, -2, +1, 21, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Medium ablative armor 5': [null,	200, -2, +1, 22, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Heavy ablative armor 1': [null, 240, -2, +2, 24, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Heavy ablative armor 2': [null, 280, -2, +2, 27, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Heavy ablative armor 3': [null, 320, -2, +2, 29, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Heavy ablative armor 4': [null, 360, -2, +2, 31, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Heavy ablative armor 5': [null, 400, -2, +2, 34, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Superior ablative armor 1': [null,	460, -3, +2, 38, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Superior ablative armor 2': [null,	520, -4, +2, 45, 'COM', false, 'Starship Operations Manual pg. 20', 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual'],
  'Passive interposed defenses 1': [null,	10,	null, null,	3, 'WotE', false, 'Starfinder #42: Whispers of the Eclipse pg. 49', 'https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse'],
  'Passive interposed defenses 2': [null,	20,	null, null,	5, 'WotE', false, 'Starfinder #42: Whispers of the Eclipse pg. 49', 'https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse'],
  'Passive interposed defenses 3': [null,	32,	null, null,	10, 'WotE', false, 'Starfinder #42: Whispers of the Eclipse pg. 49', 'https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse'],
  'Active interposed defenses 1': [null, 50, null, null, 14, 'WotE', false, 'Starfinder #42: Whispers of the Eclipse pg. 49', 'https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse'],
  'Active interposed defenses 2': [null, 100, null, null, 22, 'WotE', false, 'Starfinder #42: Whispers of the Eclipse pg. 49', 'https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse'],
  'Active interposed defenses 3': [null, 160, null, null, 29, 'WotE', false, 'Starfinder #42: Whispers of the Eclipse pg. 49', 'https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse']
}

const getTierData = (tierId) => {
  let array = shipTiers[tierId]

  return {buildPoints: array[0], hpIncrementMultiplier: array[1]}
}

const getSizeData = (size) => {
  let array = shipSize[size]

  return {length: array[0], weight: array[1], acMod: array[2], tlMod: array[2]}
}

const getPowerCoreData = (powerCoreId) => {
  if(powerCoreId === null) return {sizes: null, pcuProvided: 0, bpCost: 0, source: null, sfsLegal: true};

  let array = powerCores[capitalizeEachWord(powerCoreId)]

  return {sizes: array[0], pcuProvided: array[1], bpCost: array[2], sourceShort: array[3], sfsLegal: array[4], sourceFull: array[5], sourceLink: array[6]}
}

const getThrusterData = (thrustersId) => {
  if(thrustersId === null) return {size: null, speed: 0, pilotingModifier: 0, pcuCost: 0, bpCost: 0, source: null, sfsLegal: true};

  let array = thrusters[thrustersId]

  return {size: array[0], speed: array[1], pilotingModifier: array[2], pcuCost: array[3], bpCost: array[4], sourceShort: array[5], sfsLegal: array[6], sourceFull: array[7], sourceLink: array[8]}
}

const getArmorData = (armorId, size) => {
  if(armorId === null) return {acBonus: 0, tlPenalty: 0, turnDistance: 0, bpCost: 0}

  let sizeMod = {'Tiny': 1, 'Small': 2, 'Medium': 3, 'Large': 4, 'Huge': 5, 'Gargantuan': 6, 'Colossal': 7, 'Supercolossal': 8}
  let array = armor[armorId]

  if(armorId.includes('Mk') || armorId.includes('Energy-Absorbent')){
    return {acBonus: array[0], tempHP: array[1], tlPenalty: array[2], turnDistance: array[3], bpCost: (array[4] * sizeMod[size]), sourceShort: array[5], sfsLegal: array[6], sourceFull: array[7], sourceLink: array[8]}
  } else{
    return {acBonus: array[0], tempHP: array[1], tlPenalty: array[2], turnDistance: array[3], bpCost: array[4], sourceShort: array[5], sfsLegal: array[6], sourceFull: array[7], sourceLink: array[8]}
  }
}

const getTierIdList = () => {
  return Object
    .keys(shipTiers)
    .map(key => key.includes('/') ? key.split('/').reduce((total, num) => total / num) : key)
    .sort((a, b) => a - b)
    .map(key => {
      if(key === .25) key = '1/4'
      if(key < .4 && key > .3) key = '1/3'
      if(key === .5) key = '1/2'
      return key
    })

  // return Object.keys(shipTiers).sort((a, b) => eval(a) - eval(b))
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
  getSizeData,
  getPowerCoreData, 
  getThrusterData,
  getArmorData,
  getTierIdList, 
  getPowerCoreIdList, 
  getThrusterIdList,
  getArmorIdList,
}