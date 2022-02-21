import { capitalizeEachWord } from './utils';
import frames from "../References/frames.json";

const sources = {
// source: [link, abbrev., sfsLegal]
// an item can have multiple sources**
  'Starfinder Core Rulebook': ['https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook', 'CRB', true],
  'Pact Worlds': ['https://paizo.com/products/btpy9zkn?Starfinder-Pact-Worlds', 'PW', true],
  'Starship Operations Manual': ['https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual', 'COM', false],
  'Starfinder #6: Empire of Bones': ['https://paizo.com/products/btpya1ai/', 'EoB', false],
  'Starfinder #7: The Reach of Empire': ['https://paizo.com/products/btpya1rp?Starfinder-Adventure-Path-7-The-Reach-of-Empire', 'RotE', false],
  'Starfinder #20: The Last Refuge': ['https://paizo.com/products/btq01zo2?Starfinder-Adventure-Path-20-The-Last-Refuge', false],
  'Starfinder #27: Deceivers’ Moon': ['https://paizo.com/products/btq0216g?Starfinder-Adventure-Path-27-Deceivers-Moon', 'DM', false],
  'Starfinder #42: Whispers of the Eclipse': ['https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse', false],
  'Near Space': ['https://paizo.com/products/btq01zud?Starfinder-RPG-Near-Space', 'NS', false],
  'Tech Revolution': ['https://paizo.com/products/btq026mr/discuss?Starfinder-Tech-Revolution', 'TR', false],
  'Alien Archive': ['https://paizo.com/products/btq01wt9?Starfinder-Alien-Archive-3', false],
}

// https://www.aonsrd.com/Rules.aspx?ID=183
const shipTiers = {
  // Tier: [buildPoints, hpIncrements]
  '1/4': [25, 0],
  '1/3': [30, 0],
  '1/2': [40, 0],
  '1': [55, 0],
  '2': [75, 0],
  '3': [95, 0],
  '4': [115, 1],
  '5': [135, 1],
  '6': [155, 1],
  '7': [180, 1],
  '8': [205, 2],
  '9': [230, 2],
  '10': [270, 2],
  '11': [310, 2],
  '12': [350, 3],
  '13': [400, 3],
  '14': [450, 3],
  '15': [500, 3],
  '16': [600, 4],
  '17': [700, 4],
  '18': [800, 4],
  '19': [900, 4],
  '20': [1000, 5],
}

const shipSize = {
  // Size: [Length, Weight, AC and TL Modifier]
  'Tiny': ['20-60 ft.', '2-40 tons', +2],
  'Small': ['60-120 ft.', '30-250 tons', +1],
  'Medium': ['120-300 ft.', '50-2,500 tons', +0],
  'Large': ['300-800 ft.', '2,000-50,000 tons', -1],
  'Huge': ['800-2,000 ft.', '40,000-640,000 tons', -2],
  'Gargantuan': ['2,000-15,000 ft.', '600,000 tons to 250 megatons', -4],
  'Colossal': ['Over 15,000 ft.', '200-2,000 megatons', -8],
  'Supercolossal': ['Over 6 miles', 'Over 2,000 megatons', -8]
}

const sizeMod = {
  'Tiny': 1, 
  'Small': 2, 
  'Medium': 3, 
  'Large': 4, 
  'Huge': 5, 
  'Gargantuan': 6, 
  'Colossal': 7, 
  'Supercolossal': 8
}

// https://www.aonsrd.com/Starship_PowerCores.aspx
const powerCores = {
  // Power Core: [[Sizes], pcuProvided, bpCost, source]
  'Micron Light': [['T'], 50, 4, 'Starfinder Core Rulebook pg. 296'],
  'Micron Heavy': [['T'], 70, 6, 'Starfinder Core Rulebook pg. 296'],
  'Micron Ultra': [['T'], 80, 8, 'Starfinder Core Rulebook pg. 296'],
  'Arcus Light': [['T', 'S'], 75, 7, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Brown': [['T', 'S'], 90, 9, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Black': [['T', 'S'], 120, 12, 'Starfinder Core Rulebook pg. 296'],
  'Pulse White': [['T', 'S'], 140, 14, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Gray': [['T', 'S', 'M'], 100, 10, 'Starfinder Core Rulebook pg. 296'],
  'Arcus Heavy': [['T', 'S', 'M'], 130, 13, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Green': [['T', 'S', 'M'], 150, 15, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Red': [['T', 'S', 'M'], 175, 17, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Blue': [['T', 'S', 'M'], 200, 20, 'Starfinder Core Rulebook pg. 296'],
  'Arcus Ultra': [['S', 'M', 'L'], 150, 15, 'Starfinder Core Rulebook pg. 296'],
  'Arcus Maximum': [['S', 'M', 'L'], 200, 20, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Orange': [['S', 'M', 'L'], 250, 25, 'Starfinder Core Rulebook pg. 296'],
  'Pulse Prismatic': [['S', 'M', 'L'], 300, 30, 'Starfinder Core Rulebook pg. 296'],
  'Nova Light': [['M', 'L', 'H'], 150, 15, 'Starfinder Core Rulebook pg. 296'],
  'Nova Heavy': [['M', 'L', 'H'], 200, 20, 'Starfinder Core Rulebook pg. 296'],
  'Nova Ultra': [['M', 'L', 'H'], 300, 30, 'Starfinder Core Rulebook pg. 296'],
  'Gateway Light': [['L', 'H', 'G'], 300, 30, 'Starfinder Core Rulebook pg. 296'],
  'Gateway Heavy': [['L', 'H', 'G'], 400, 40, 'Starfinder Core Rulebook pg. 296'],
  'Gateway Ultra': [['H', 'G', 'C'], 500, 50, 'Starfinder Core Rulebook pg. 296'],
  'Titan Light': [['Sc'], 700, 50, 'Starfinder #6: Empire of Bones pg. 45'],
  'Titan Heavy': [['Sc'], 950, 60, 'Starfinder #6: Empire of Bones pg. 45'],
  'Titan Ultra': [['Sc'], 1200, 70, 'Starfinder #6: Empire of Bones pg. 45']
}

// https://www.aonsrd.com/Starship_Thrusters.aspx
const thrusters = {
  // Thruster: [size, speed, pilotingModifier, pcuCost, bpCost, source]
  'T6': ['T', 6, +1, 20, 3, 'Starfinder Core Rulebook pg. 296'],
  'T8': ['T', 8, +0, 25, 4, 'Starfinder Core Rulebook pg. 296'],
  'T10': ['T', 10, +0, 30, 5, 'Starfinder Core Rulebook pg. 296'],
  'T12': ['T', 12, -1, 35, 6, 'Starfinder Core Rulebook pg. 296'],
  'T14': ['T', 14, -2, 40, 7, 'Starfinder Core Rulebook pg. 296'],
  'S6': ['S', 6, +1, 30, 3, 'Starfinder Core Rulebook pg. 296'],
  'S8': ['S', 8, +0, 40, 4, 'Starfinder Core Rulebook pg. 296'],
  'S10': ['S', 10, +0, 50, 5, 'Starfinder Core Rulebook pg. 296'],
  'S12': ['S', 12, -1, 60, 6, 'Starfinder Core Rulebook pg. 296'],
  'M4': ['M', 4, +2, 40, 2, 'Starfinder Core Rulebook pg. 296'],
  'M6': ['M', 6, +1, 50, 3, 'Starfinder Core Rulebook pg. 296'],
  'M8': ['M', 8, +0, 60, 4, 'Starfinder Core Rulebook pg. 296'],
  'M10': ['M', 10, +0, 70, 5, 'Starfinder Core Rulebook pg. 296'],
  'M12': ['M', 12, -1, 80, 6, 'Starfinder Core Rulebook pg. 296'],
  'L4': ['L', 4, +2, 60, 4, 'Starfinder Core Rulebook pg. 296'],
  'L6': ['L', 6, +1, 80, 6, 'Starfinder Core Rulebook pg. 296'],
  'L8': ['L', 8, +0, 100, 8, 'Starfinder Core Rulebook pg. 296'],
  'L10': ['L', 10, +0, 120, 10, 'Starfinder Core Rulebook pg. 296'],
  'H4': ['H', 4, +2, 80, 4, 'Starfinder Core Rulebook pg. 296'],
  'H6': ['H', 6, +1, 120, 6, 'Starfinder Core Rulebook pg. 296'],
  'H8': ['H', 8, +0, 140, 8, 'Starfinder Core Rulebook pg. 296'],
  'H10': ['H', 10, +0, 160, 10, 'Starfinder Core Rulebook pg. 296'],
  'G4': ['G', 4, +2, 120, 8, 'Starfinder Core Rulebook pg. 296'],
  'G6': ['G', 6, +1, 180, 12, 'Starfinder Core Rulebook pg. 296'],
  'G8': ['G', 8, +0, 240, 16, 'Starfinder Core Rulebook pg. 296'],
  'C4': ['C', 4, +2, 200, 8, 'Starfinder Core Rulebook pg. 296'],
  'C6': ['C', 6, +1, 300, 12, 'Starfinder Core Rulebook pg. 296'],
  'C8': ['C', 8, +0, 400, 16, 'Starfinder Core Rulebook pg. 296'],
  'SC4': ['Sc', 4, +1, 300, 16, 'Starfinder #6: Empire of Bones pg. 45'],
  'SC6': ['Sc', 6, +0, 400, 20, 'Starfinder #6: Empire of Bones pg. 45'],
  'SC8': ['Sc', 8, -1, 500, 24, 'Starfinder #6: Empire of Bones pg. 45']
}

// https://www.aonsrd.com/Starship_Armor.aspx
const armor = {
  // Armor: [acBonus, tempHP, tlPenalty, turnDistance, bpCost, source]
  'Mk 1': [+1, null, null, null, 1, 'Starfinder Core Rulebook pg. 297'],
  'Mk 2': [+2, null, null, null, 2, 'Starfinder Core Rulebook pg. 297'],
  'Mk 3': [+3, null, null, null, 3, 'Starfinder Core Rulebook pg. 297'],
  'Mk 4': [+4, null, null, null, 5, 'Starfinder Core Rulebook pg. 297'],
  'Mk 5': [+5, null, -1, null, 7, 'Starfinder Core Rulebook pg. 297'],
  'Mk 6': [+6, null, -1, null, 9, 'Starfinder Core Rulebook pg. 297'],
  'Mk 7': [+7, null, -1, null, 12, 'Starfinder Core Rulebook pg. 297'],
  'Mk 8': [+8, null, -1, null, 15, 'Starfinder Core Rulebook pg. 297'],
  'Mk 9': [+9, null, -2, +1, 18, 'Starfinder Core Rulebook pg. 297'],
  'Mk 10': [+10, null, -2, +1, 21, 'Starfinder Core Rulebook pg. 297'],
  'Mk 11': [+11, null, -2, +1, 25, 'Starfinder Core Rulebook pg. 297'],
  'Mk 12': [+12, null, -3, +2, 30, 'Starfinder Core Rulebook pg. 297'],
  'Mk 13': [+13, null, -3, +2, 35, 'Starfinder Core Rulebook pg. 297'],
  'Mk 14': [+14, null, -3, +2, 40, 'Starfinder Core Rulebook pg. 297'],
  'Mk 15': [+15, null, -4, +3, 45, 'Starfinder Core Rulebook pg. 297'],
  'Energy-Absorbent Plating': [null, null, null, null, 4, 'Starfinder #27: Deceivers’ Moon pg. 47'],
  'Basic ablative armor 1': [null, 8, null, null, 2, 'Starship Operations Manual pg. 20'],
  'Basic ablative armor 2': [null, 16, null, null, 3, 'Starship Operations Manual pg. 20'],
  'Basic ablative armor 3': [null, 24, null, null, 4, 'Starship Operations Manual pg. 20'],
  'Basic ablative armor 4': [null, 32, null, null, 5, 'Starship Operations Manual pg. 20'],
  'Basic ablative armor 5': [null, 40, null, null, 6, 'Starship Operations Manual pg. 20'],
  'Light ablative armor 1': [null, 52, -1, null, 8, 'Starship Operations Manual pg. 20'],
  'Light ablative armor 2': [null, 64, -1, null, 10, 'Starship Operations Manual pg. 20'],
  'Light ablative armor 3': [null, 76, -1, null, 12, 'Starship Operations Manual pg. 20'],
  'Light ablative armor 4': [null, 88, -1, null, 13, 'Starship Operations Manual pg. 20'],
  'Light ablative armor 5': [null, 100, -1, null, 14, 'Starship Operations Manual pg. 20'],
  'Medium ablative armor 1': [null, 120, -2, +1, 16, 'Starship Operations Manual pg. 20'],
  'Medium ablative armor 2': [null, 140, -2, +1, 17, 'Starship Operations Manual pg. 20'],
  'Medium ablative armor 3': [null, 160, -2, +1, 19, 'Starship Operations Manual pg. 20'],
  'Medium ablative armor 4': [null, 180, -2, +1, 21, 'Starship Operations Manual pg. 20'],
  'Medium ablative armor 5': [null, 200, -2, +1, 22, 'Starship Operations Manual pg. 20'],
  'Heavy ablative armor 1': [null, 240, -2, +2, 24, 'Starship Operations Manual pg. 20'],
  'Heavy ablative armor 2': [null, 280, -2, +2, 27, 'Starship Operations Manual pg. 20'],
  'Heavy ablative armor 3': [null, 320, -2, +2, 29, 'Starship Operations Manual pg. 20'],
  'Heavy ablative armor 4': [null, 360, -2, +2, 31, 'Starship Operations Manual pg. 20'],
  'Heavy ablative armor 5': [null, 400, -2, +2, 34, 'Starship Operations Manual pg. 20'],
  'Superior ablative armor 1': [null, 460, -3, +2, 38, 'Starship Operations Manual pg. 20'],
  'Superior ablative armor 2': [null, 520, -4, +2, 45, 'Starship Operations Manual pg. 20'],
  'Passive interposed defenses 1': [null, 10, null, null, 3, 'Starfinder #42: Whispers of the Eclipse pg. 49'],
  'Passive interposed defenses 2': [null, 20, null, null, 5, 'Starfinder #42: Whispers of the Eclipse pg. 49'],
  'Passive interposed defenses 3': [null, 32, null, null, 10, 'Starfinder #42: Whispers of the Eclipse pg. 49'],
  'Active interposed defenses 1': [null, 50, null, null, 14, 'Starfinder #42: Whispers of the Eclipse pg. 49'],
  'Active interposed defenses 2': [null, 100, null, null, 22, 'Starfinder #42: Whispers of the Eclipse pg. 49'],
  'Active interposed defenses 3': [null, 160, null, null, 29, 'Starfinder #42: Whispers of the Eclipse pg. 49']
}

// https://www.aonsrd.com/Starship_Computers.aspx
const computers = {
  // Name: [Bonus, Nodes, PCU cost, BP cost, source]
  'Basic Computer': [+0, 0, 0, 0, 'Starfinder Core Rulebook pg. 297'],
  'Mk 1 Mononode': [+1, 1, 10, 1, 'Starfinder Core Rulebook pg. 297'],
  'Mk 1 Duonode': [+1, 2, 10, 2, 'Starfinder Core Rulebook pg. 297'],
  'Mk 1 Trinode': [+1, 3, 10, 3, 'Starfinder Core Rulebook pg. 297'],
  'Mk 1 Tetranode': [+1, 4, 10, 4, 'Starfinder Core Rulebook pg. 297'],
  'Mk 2 Mononode': [+2, 1, 15, 4, 'Starfinder Core Rulebook pg. 297'],
  'Mk 2 Duonode': [+2, 2, 15, 8, 'Starfinder Core Rulebook pg. 297'],
  'Mk 2 Trinode': [+2, 3, 15, 12, 'Starfinder Core Rulebook pg. 297'],
  'Mk 2 Tetranode': [+2, 4, 15, 16, 'Starfinder Core Rulebook pg. 297'],
  'Mk 3 Mononode': [+3, 1, 20, 9, 'Starfinder Core Rulebook pg. 297'],
  'Mk 3 Duonode': [+3, 2, 20, 18, 'Starfinder Core Rulebook pg. 297'],
  'Mk 3 Trinode': [+3, 3, 20, 27, 'Starfinder Core Rulebook pg. 297'],
  'Mk 3 Tetranode': [+3, 4, 20, 36, 'Starfinder Core Rulebook pg. 297'],
  'Mk 4 Mononode': [+4, 1, 25, 16, 'Starfinder Core Rulebook pg. 297'],
  'Mk 4 Duonode': [+4, 2, 25, 32, 'Starfinder Core Rulebook pg. 297'],
  'Mk 4 Trinode': [+4, 3, 25, 48, 'Starfinder Core Rulebook pg. 297'],
  'Mk 5 Mononode': [+5, 1, 30, 25, 'Starfinder Core Rulebook pg. 297'],
  'Mk 5 Duonode': [+5, 2, 30, 50, 'Starfinder Core Rulebook pg. 297'],
  'Mk 5 Trinode': [+5, 3, 30, 75, 'Starfinder Core Rulebook pg. 297'],
  'Mk 6 Mononode': [+6, 1, 35, 36, 'Starfinder Core Rulebook pg. 297'],
  'Mk 6 Duonode': [+6, 2, 35, 72, 'Starfinder Core Rulebook pg. 297'],
  'Mk 7 Mononode': [+7, 1, 40, 49, 'Starfinder Core Rulebook pg. 297'],
  'Mk 7 Duonode': [+7, 2, 40, 98, 'Starfinder Core Rulebook pg. 297'],
  'Mk 8 Mononode': [+8, 1, 45, 64, 'Starfinder Core Rulebook pg. 297'],
  'Mk 8 Duonode': [+8, 2, 45, 128, 'Starfinder Core Rulebook pg. 297'],
  'Mk 9 Mononode': [+9, 1, 50, 81, 'Starfinder Core Rulebook pg. 297'],
  'Mk 9 Duonode': [+9, 2, 50, 162, 'Starfinder Core Rulebook pg. 297'],
  'Mk 10 Mononode': [+10, 1, 55, 100, 'Starfinder Core Rulebook pg. 297'],
  'Mk 10 Duonode': [+10, 2, 55, 200, 'Starfinder Core Rulebook pg. 297']
}

const networkNodes = {
  // Name:	[Bonus,	Node Maximum,	PCU Cost,	BP Cost]
  'Mk 4':	[+4,	2,	8,	4],
  'Mk 5':	[+5,	2,	10,	5],
  'Mk 6':	[+6,	3,	11,	6],
  'Mk 7':	[+7,	3,	13,	7],
  'Mk 8':	[+8,	4,	15,	8],
  'Mk 9':	[+9,	4,	17,	9],
  'Mk 10':	[+10,	5,	19,	10]
}

// https://www.aonsrd.com/Starship_CrewQuarters.aspx?ItemName=All
const crewQuarters = {
// Quality: [bpCost, source, description] 
  "Common": [0, 'Starfinder Core Rulebook pg. 298', "Common crew quarters are the most basic type. They consist of simple bunks (sometimes folding out from the side of a hallway) or other similarly austere places to rest. Crew members who sleep in common quarters usually keep their personal possessions in a footlocker. Common crew quarters also include a communal bathroom (which includes a military-style shower) and a tiny galley (big enough to prepare only the most basic of meals). Starships with crews numbering in the dozens or hundreds often have massive barracks where crew members sleep in shifts."],
  "Good": [2, 'Starfinder Core Rulebook pg. 298', "Good crew quarters are a bit more upscale than common crew quarters. They consist of dormitory-style rooms that can hold one or two small beds (larger starships usually require lower-ranking crew members to share these quarters) and sometimes a personal closet or drawer space for each occupant. Good crew quarters also include one or two shared bathrooms with multiple sinks and shower stalls, and a dining space with an attached galley. Crews of larger starships eat in this dining space in shifts."],
  "Luxurious": [5, 'Starfinder Core Rulebook pg. 298', "Luxurious crew quarters are the pinnacle of comfort. They consist of private rooms for each crew member, with personal bathrooms (including showers with high water pressure) and furnishings that match the resident’s tastes. Some luxurious crew quarters also feature a kitchenette, gaming areas, or intimate meeting spaces."]
}

// https://aonsrd.com/Starship_DefCounters.aspx
const defensiveCounter = {
  // Name:	[TL bonus,	PCU cost,	BP cost, source]
  'Mk 1': [+1,	1,	2, 'Starfinder Core Rulebook pg. 298'],
  'Mk 2': [+2,	1,	3, 'Starfinder Core Rulebook pg. 298'],
  'Mk 3': [+3,	2,	4, 'Starfinder Core Rulebook pg. 298'],
  'Mk 4': [+4,	3,	6, 'Starfinder Core Rulebook pg. 298'],
  'Mk 5': [+5,	4,	8, 'Starfinder Core Rulebook pg. 298'],
  'Mk 6': [+6,	5,	11, 'Starfinder Core Rulebook pg. 298'],
  'Mk 7': [+7,	7,	14, 'Starfinder Core Rulebook pg. 298'],
  'Mk 8': [+8,	9,	18, 'Starfinder Core Rulebook pg. 298'],
  'Mk 9': [+9,	11,	22, 'Starfinder Core Rulebook pg. 298'],
  'Mk 10': [+10,	13,	27, 'Starfinder Core Rulebook pg. 298'],
  'Mk 11': [+11,	16,	33, 'Starfinder Core Rulebook pg. 298'],
  'Mk 12': [+12,	20,	40, 'Starfinder Core Rulebook pg. 298'],
  'Mk 13': [+13,	25,	50, 'Starfinder Core Rulebook pg. 298'],
  'Mk 14': [+14,	32,	65, 'Starfinder Core Rulebook pg. 298'],
  'Mk 15': [+15,	45,	90, 'Starfinder Core Rulebook pg. 298']
}

// https://www.aonsrd.com/Starship_DriftEngines.aspx
// https://aonsrd.com/StarshipInterstellar.aspx
const driftEngines = {
  // Drift Engine:	[Rating, 	Minimum PCU,	Maximum Size,	BP Cost, source, special]
  'Signal Basic':	[1,	75,	null,	2, null, 'Starfinder Core Rulebook pg. 298'],
  'Signal Booster':	[2,	100,	'Huge',	5, null, 'Starfinder Core Rulebook pg. 298'],
  'Signal Major':	[3,	150,	'Large',	10, null, 'Starfinder Core Rulebook pg. 298'],
  'Signal Superior':	[4,	175,	'Large',	15, null, 'Starfinder Core Rulebook pg. 298'],
  'Signal Ultra':	[5,	200,	'Medium',	20, null, 'Starfinder Core Rulebook pg. 298'],
  'Archon Drive':	[1,	150,	null,	15,	'Starship Operations Manual pg. 9', 'Restricted (Church of Iomedae, Knights of Golarion)'],
  'Chaos Sail':	[1,	75,	null,	4,	'Starship Operations Manual pg. 9', 'Restricted (Church of Besmara)'],
  'Constellation Orrery':	[2,	150,	'Huge',	10,	'Starship Operations Manual pg. 10', 'Restricted (Church of Ibra)'],
  'Elemental Engine':	[1,	100,	null,	5,	'Starship Operations Manual pg. 10', 'Restricted (Elemental Plane)'],
  'First Drive':	[3,	175,	'Large',	12,	'Starship Operations Manual pg. 10', 'Restricted (Eldest, fey)'],
  'Fold Gates':	['Special',	200,	'Huge',	0,	'Starship Operations Manual pg. 10', 'Journeying between a pair of fold gates is limited to predetermined destinations—those locations with functioning fold gates (determined by the GM).'],
  'Helldrive':	[1,	100,	null,	10,	'Starship Operations Manual pg. 11', 'Restricted (Church of Asmodeus, Hellknights)'],
  'Planar Aperture Drive':	[2,	150,	null,	15,	'Starship Operations Manual pg. 11', 'Restricted (Tetrad, witchwyrds)'],
  'Shadow Engine':	[1,	75,	null,	3,	'Starship Operations Manual pg. 11', 'Painful, Restricted (Church of Zon-Kuthon, velstracs)', ],
  'Onos drive':	[1/2,	150,	'Medium',	10,	'Starfinder #42: Whispers of the Eclipse pg. 50', 'Restricted (Azlanti Star Empire)', ]
}

//https://www.aonsrd.com/Starship_ExpBays.aspx?ItemName=All&Family=None
const expansionBays = {
// Name:	[PCU cost,	BP cost, source, description]
  'Aeon Comm':	[5,	3, 'Starfinder #7: The Reach of Empire pg. 47', 'An aeon comm is a cylindrical booth constructed of resonant crystal that allows remote observation of and communication to space around an aeon stone. A pedestal in the center of the booth can hold one aeon stone, and as an action, a user can mystically connect that stone to the nearest stone of the same type with a system-wide range. Alternatively, a user can attune the booth to a known aeon stone of the same type in the same system. In either case, the booth creates an invisible magical sensor centered on the targeted aeon stone. The booth’s crystal reflects the targeted stone’s visual and auditory surroundings as if the user were standing at the stone’s location. This view doesn’t move unless the targeted stone does, but a viewer can turn within the booth to observe the area as desired. A user within the booth can activate the aeon comm’s communication function to speak through the targeted aeon stone, and unlike with technological system-wide communications, the message is transmitted instantaneously.'],
  'Amenities':	[4,	2, 'Near Space pg. 114', 'In luxury cruise liners, residential starships, and other Huge or larger starships with large crews, some expansion bays are devoted to businesses that serve the population. An amenity might be a high-end restaurant or spa, a night club or theater, or a shopping center. If using downtime rules, an amenity can provide a +1 bonus to all skill checks for one downtime activity, selected when the amenity is installed.'],
  'Arcane Laboratory':	[1,	1, 'Starfinder Core Rulebook pg. 299', 'An arcane laboratory contains all the tools and space necessary to craft magic items (see page 235), though the crafter must still provide the necessary raw materials. Such a laboratory reduces the crafting time by half.'],
  'Arcane Mortuary':	[1,	2, 'Starship Operations Manual pg. 24 & Starfinder #6: Empire of Bones pg. 49', 'An arcane mortuary contains equipment that aids spellcasters in creating undead. A spellcaster using this mortuary must still provide any special materials required for undead creation. Undead created in an arcane mortuary have 10% more Hit Points than a typical undead creature of the same CR. An arcane mortuary can also store up to five Medium or smaller corpses without them deteriorating due to time. One Large corpse can be stored in place of two Medium ones.'],
  'Biological Experimentation Chamber':	[5,	9, 'Starfinder #27: Deceivers’ Moon pg. 47', 'Gray starships are often equipped with a room designed for the study of—and experimentation on—biological creatures. A biological experimentation chamber can be used as either a medical bay or a life science lab but can only be used on organisms that have first been subjected to examination in the chamber, a painful and invasive process that takes 1 hour.'],
  'Booster Thruster Housing':	[0,	3, 'Starship Operations Manual pg. 24', 'When properly reinforced to absorb the strain, an expansion bay along a starship’s aft or sides can house additional thrusters and fuel tanks (the thrusters must be purchased separately and be an appropriate size for the starship) as well as separate fuel tanks. During starship combat, the pilot can activate these additional thrusters before moving the starship during the helm phase as part of their crew action. When activated, the additional boosters increase the starship’s speed by an amount equal to the boosters’ listed speed divided by 4 (rounded down) and increase the DC of Piloting checks to perform stunts that round by an equal amount. The boosters’ supplemental fuel supply can power them for 5 rounds, after which the thrusters need 24 hours to recharge from the ship’s power core. A starship can have only one such additional booster active at a time.'],
  'Breaching Pod, Autonomous Combatants':	[5,	7, 'Starship Operations Manual pg. 24', 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \nExpended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod’s BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \nBy increasing a breaching pod’s BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. '],
  'Breaching Pod':	[5,	5, 'Starship Operations Manual pg. 24', 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \nExpended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod’s BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \nBy increasing a breaching pod’s BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. '],
  'Breaching Pod, Skilled Autonomous Combatants':	[5,	9, 'Starship Operations Manual pg. 24', 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \nExpended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod’s BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \nBy increasing a breaching pod’s BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. '],
  'Breaching Pod, Specialized Autonomous Combatants':	[5,	11, 'Starship Operations Manual pg. 24', 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \nExpended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod’s BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \nBy increasing a breaching pod’s BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. '],
  'Brig':	[1,	1, 'Pact Worlds pg. 153', 'A brig contains all the necessary restraints and security systems to incarcerate up to eight Medium creatures.'],
  'Cargo Hold':	[0,	0, 'Starfinder Core Rulebook pg. 298', 'Unconverted expansion bays count as cargo holds. A cargo hold can contain approximately 25 tons of goods, with no item being larger than Large. A starship with multiple cargo holds can hold larger objects; usually 4 contiguous cargo holds are required to hold Huge objects and 8 for Gargantuan objects. These size restrictions can be overridden at the GM’s discretion.'],
  'Combat Training Facility, Advanced':	[5,	8, 'Starship Operations Manual pg. 24', 'This specialized gym and miniature arena provides an array of holographic threats, tactical dilemmas, and automated combat simulations that help crew members practice close-quarters tactics and self-defense. This facility also adds several caches of weapons and armor spread throughout the starship, ensuring that the crew always have essential armaments close at hand in the event of an emergency. A basic combat training facility improves the crew’s battle readiness, treating them as skilled (and granting a bonus) when resolving boarding events (page 40). Specialized and elite combat training facilities incorporate much more complicated simulations and rigorous protocols, and the crew are treated as specialized or elite, respectively, when resolving boarding encounters. '],
  'Combat Training Facility, Basic':	[3,	3, 'Starship Operations Manual pg. 24', 'This specialized gym and miniature arena provides an array of holographic threats, tactical dilemmas, and automated combat simulations that help crew members practice close-quarters tactics and self-defense. This facility also adds several caches of weapons and armor spread throughout the starship, ensuring that the crew always have essential armaments close at hand in the event of an emergency. A basic combat training facility improves the crew’s battle readiness, treating them as skilled (and granting a bonus) when resolving boarding events (page 40). Specialized and elite combat training facilities incorporate much more complicated simulations and rigorous protocols, and the crew are treated as specialized or elite, respectively, when resolving boarding encounters. '],
  'Combat Training Facility, Elite':	[5,	10, 'Starship Operations Manual pg. 24', 'This specialized gym and miniature arena provides an array of holographic threats, tactical dilemmas, and automated combat simulations that help crew members practice close-quarters tactics and self-defense. This facility also adds several caches of weapons and armor spread throughout the starship, ensuring that the crew always have essential armaments close at hand in the event of an emergency. A basic combat training facility improves the crew’s battle readiness, treating them as skilled (and granting a bonus) when resolving boarding events (page 40). Specialized and elite combat training facilities incorporate much more complicated simulations and rigorous protocols, and the crew are treated as specialized or elite, respectively, when resolving boarding encounters. '],
  'Conference and Meeting Rooms':	[1,	1, 'Near Space pg. 114', 'Installed with top-notch telecommunication equipment (including integral system-wide comm units), this high-end office space is often featured in starships used to transport government officials or top business leaders. Starships with this expansion bay can even host sizable conferences.'],
  'Corpse Recycler':	[2,	2, 'Starship Operations Manual pg. 24 & Starfinder #6: Empire of Bones pg. 49', 'A corpse recycler allows a starship crew to render bodies into parts for necrografts. In a process that takes 1 hour, a carcass fed into the recycler produces a number of necrograft UPBs equal to 10 × the CR of the creature from which the corpse originated. These UPBs can be used only to create necrografts.'],
  'Cryo-chamber':	[10,	5, 'Starship Operations Manual pg. 25', 'This high-tech chamber allows biological organisms to enter a form of stasis via a rapid freezing process and be sustained in pods for a long duration. Cryo-chambers can be set to keep an organism in stasis for a set duration, indefinitely, or until certain conditions are met, such as arrival at a navigational milestone or if the vessel comes under attack. During the days before Drift travel, most starship crews used these chambers to survive the months-long trips between destinations. Some exploration ships still use cryo-chambers in lieu of crew quarters, particularly those that regularly travel in the Vast. The Azlanti Star Empire has developed its own variation on the cryo-chamber, which is more compact but virtually unknown outside of Azlanti space. \nA cryo-chamber can hold up to eight Medium or smaller creatures or four Large creatures in stasis for as long as the systems have adequate power. A cryo-chamber can instead be outfitted to hold a single Huge or Gargantuan creature, and two cryo-chambers can be combined to hold a single Colossal creature. \nWhile in stasis in a cryo-chamber, a creature no longer advances on affliction tracks, and doesn’t suffer from starvation, thirst, or sleep deprivation. Placing a creature in stasis or removing it from stasis takes 1 hour, after which the creature is sickened for 1 day unless it succeeds at a DC 25 Fortitude save'],
  'Cultural Preparation Facility':	[3,	2, 'Starfinder #27: Deceivers’ Moon pg. 47', 'This expansion bay serves as a training facility and database for agents preparing to infiltrate a group or species. Clothing and personal items can be crafted in half the normal time at a cultural preparation facility, though the crafter must still provide the necessary raw materials. The facility’s computer system also trains personnel in the languages and accents, cultural behaviors, social norms, and even body language and facial expressions of the group the users expect to infiltrate. To use this aspect of a cultural preparation facility, a creature chooses a single species or cultural group and then spends three 8-hour sessions (which can be over the course of several days) within the facility. After this time, for 1 day, the creature has a +2 circumstance bonus on Culture checks relating to the chosen species or cultural group. In addition, the creature can replace one of the languages it knows (except for Common, their racial tongue, or the language of their home planet) with a language spoken by the chosen species or cultural group. At the GM’s discretion, the cultural preparation facility might not be able to teach a rare or unusual language.'],
  'Decoy Husk':	[15,	4, 'Starfinder #20: The Last Refuge pg. 48', 'A decoy husk is a living case that can be regrown when ejected from a starship, expands to mimic that vessel and flies in another direction. This expansion takes up one bay in a Small starship, two in a Medium or Large vessel, three in a Huge starship, four in a Gargantuan craft, and five in a Colossal one. Super-colossal vessels cannot install or use this expansion. Once a decoy husk has been deployed, it cannot be recovered, and it takes the deploying vessel a week to grow another decoy. \nA crew member must deploy the decoy as a crew action during the helm phase. Other vessels that fail a Computers check (DC = 10 + the deploying crew member’s Computers bonus) to scan the deploying vessel and its decoy cannot tell the two apart, although this scan can be repeated during each helm phase. The decoy moves in an evasive trajectory chosen by the deploying crew and at the deploying vessel’s speed, and it generates Shield Points equal to its cost in Build Points, but these shields falsely mimic those of the deploying starship when scanned. The decoy can’t attack, and it has a number of Hull Points equal to 20% of the deploying starship’s Hull Points. \nA decoy husk can also be used as weapon. If it enters the hex of another vessel, a crew member aboard the deploying starship can make a gunnery check against the target’s TL. On a hit, the decoy explodes, dealing damage according to its size—Small: 5d8; Medium: 5d10; Large: 10d8; Huge: 2d6 x 10; Colossal: 2d8 x 10. If the attack misses, the decoy is still destroyed in the resulting explosion.'],
  'Dedicated Computer Housing':	[0,	2, 'Starship Operations Manual pg. 25', 'An expansion bay can be outfitted with power conduits and wires needed to house an additional mononode computer core (which must be purchased separately). This additional computer has an integrated control module (ICM) that is dedicated to a single starship combat crew action (for example, an engineer’s checks to divert or a gunner’s check to fire at will), chosen when the computer is installed. The ICM grants its flat circumstance bonus once per round to the check for the chosen starship combat action. This bonus does not stack with the circumstance bonus granted by the main computer’s ICM.'],
  'Docking Canopy':	[15,	4, 'Starfinder #20: The Last Refuge pg. 48', 'A docking canopy is a branch- or vine-like formation that allows up to four Tiny or two Small starships to attach to a Huge or larger biomechanical starship. The canopy takes up two expansion bays, and one can fulfill the hangar requirement for a carrier-class vessel. The starships attached to the docking canopy move with the larger ship, and the canopy provides a narrow passage between each docked starship and the larger vessel. Moving through this passage to the vessel to which the docking canopy is attached or back to the attached smaller ship takes 1 round of starship combat or 10 minutes. In addition, if the larger starship benefits from self-repair while vessels are docked, an engineer attending the process can amass the repair capabilities of the starship and any docked biomechanical craft as a pool of Hull Points; the engineer can then distribute these Hull Points among the starships linked by the docking canopy. \nA docking canopy doesn’t enclose docked ships the way a hangar bay does. Therefore, a science officer can use the target system crew action to target a docked vessel instead of a specific system on the starship that has the docking canopy as an expansion.'],
  'Drift Booster':	[40,	20, 'Starfinder #6: Empire of Bones pg. 46', 'A Drift booster is a rail for launching smaller ships into the Drift from within a Supercolossal vessel’s hangar bay. A smaller ship that launches from within the Supercolossal vessel’s hangar bay using the Drift booster can temporarily raise its Drift engine rating by 1. This increase lasts only as long as the smaller ship stays in the Drift and on the same course after launching using the Drift booster. If the boosted ship changes course or leaves the Drift, this temporary increase ends.'],
  'Drift Shadow Projector':	[5,	15, 'Pact Worlds pg. 153', 'Created by the Hellknights to aid them in capturing enemy vessels, this device creates an area of “Drift shadow” when activated. The Drift shadow extends out to a range of 10 hexes from the activating ship, and each vessel in this area treats the Drift rating of its engine as if it were 2 lower. If this reduces the engine’s rating to less than 1, that vessel cannot enter the Drift while in the shadow. Ships attempting enter normal space from the Drift into an area of Drift shadow are affected in the same way. Shadows created by multiple vessels stack, making it impossible for any ship to enter or exit the Drift.'],
  'Drift Stasis Unit':	[15,	10, 'Starfinder #7: The Reach of Empire pg. 47', 'Used in the Azlanti Star Empire for moving large numbers of troops efficiently, a Drift stasis unit holds living creatures in a state of suspended animation ideal for long periods of Drift travel. Placing creatures into stasis or removing them from stasis takes 1 hour. An unwilling creature can be placed in a Drift stasis unit only if it is unconscious. While in stasis, a creature is unconscious and doesn’t need to breathe, drink, or eat. One stasis unit can hold 32 Medium creatures in stasis for 30 days with no ill effects. (A Large creature counts as 2 Medium ones for this purpose.) \nAfter 30 days, creatures held in stasis are at risk of Drift stasis sickness, a disease with the parameters shown in the stat block below. '],
  'Drone Tube':	[15,	5, 'Starfinder #7: The Reach of Empire pg. 47', 'A drone tube is a hangar modification designed to facilitate the use of automated drones, such as the Klokworx drone. A drone tube can be installed only in an existing hangar bay and doesn’t take up additional expansion bays. If a hangar bay has a drone tube, the bay can hold one additional Tiny starship, but five of those ships must be drones. One hangar bay can hold up to two drone tubes and thereby hold up to ten drones. \nEach drone tube can launch up to two drones per round of starship combat. To launch a drone, a science officer can take an action during the helm phase to attempt a Computers check (DC = 10 + the tier of the launching ship). If the science officer succeeds, up to two drones emerge in different hexes adjacent to the launching ship, and the drones can act last in the helm and gunnery phases of that same round. On a failure, the drones still emerge but don’t act until the next round. In either case, each round after a drone is launched, the drone attempts its own Piloting check to determine when it acts. \nThe drone tube also facilitates the launching ship’s communications with its drones in combination with the vessel’s sensors. A science officer on a ship that has active drones can take an action during the helm phase to aid drone attacks. If the science officer succeeds at a Computers check (DC = 10 + 1-1/2 × the launching ship’s tier), up to five of the ship’s drones can use that science officer’s ranks in the Computers skill plus the officer’s Intelligence modifier for gunnery checks during the next gunnery phase. \nA science officer can take an action during the helm phase to jam drone communications. Doing so takes an improve countermeasures action, targeting the drone-launching ship. Succeeding at this check means the target’s drones can’t benefit from an action to aid drone attacks until the next round.'],
  'Drop Pod, Colossal':	[10,	10, 'Starship Operations Manual pg. 25', 'A drop pod is a reinforced vehicle designed to transport a group of soldiers or small vehicles from a starship orbiting high above a planet to that planet’s surface. Each drop pod is a single-use device equipped with heat shields to deflect the heat of atmospheric entry as well as thrusters strong enough to make small course corrections and slow the rate of descent before reaching the surface.'],
  'Drop Pod':	[5,	5, 'Starship Operations Manual pg. 25', 'A typical expansion bay can store and launch one Gargantuan drop pod that can hold up to four Huge creatures, eight Large creatures, or 16 Medium or smaller creatures or vehicles. Alternatively, an expansion bay can be outfitted with two Huge drop pods. A Colossal drop pod takes up two expansion bays, costs twice as many PCU and BP, and doubles the number of creatures and vehicles the pod can carry (or allows the drop pod to carry up to four Gargantuan creatures). '],
  'Escape Pods':	[2,	1, 'Starfinder Core Rulebook pg. 299', 'Escape pods give the crew of a severely damaged or destroyed starship a way to avoid imminent death. An escape pod fits one Medium or smaller creature and has enough supplies and life-support capacity for that creature to survive for 7 days. It is also fitted with a distress beacon that is easily identified by long-range scanners. An escape pod has heat shields that allow it to crash-land on a planet with an atmosphere, but no means of propulsion. A single expansion bay can be converted into six escape pods.'],
  'External Expansion Bay':	[0,	3, 'Starship Operations Manual pg. 25', 'A starship can increase its number of expansion bays by attaching additional modules to its exterior or towing them. The additional mass and volume of external expansion bays reduce the starship’s maneuverability; increase the turn distance of a starship by 1 for every three external expansion bays it has, rounded up. External expansion bays can be installed only on a Small or larger starship, and the number of external expansion bays cannot exceed the number of expansion bays provided by the starship’s base frame.'],
  'Fuel Synthesizer':	[4,	1, 'Starfinder #42: Whispers of the Eclipse pg. 50', 'The empire developed miniaturized fuelprocessing plants that extracted usable hydrocarbons for fuel and compressible gases for thrusters. When paired with a robotic appendage system (Starship Operations Manual 29) to retrieve and load material, a ship could travel from planet to planet, processing its own fuel.'],
  'Ghost Drive':	[10,	5, 'Starship Operations Manual pg. 26 & Starfinder #6: Empire of Bones pg. 49', 'A ghost drive can be installed only on a Large or smaller starship. During the helm phase, as a crew action, a science officer can attempt a Computers check (DC = 10 + 1-1/2 × the starship’s tier) to activate the ghost drive. If the check is successful, the ghost drive becomes active and the vessel in which it is installed becomes insubstantial. \nAn active ghost drive has several effects in starship combat. The drive pulls power from the thrusters, so the insubstantial starship’s speed is 2 lower and its distance between turns is 1 higher. An insubstantial starship can move through hexes containing enemy starships without allowing those foes to make free attacks; conversely, the insubstantial starship can’t make free attacks on ships that pass through its hex. The starship’s science officer can freely deactivate the ghost drive at the beginning of the helm phase; otherwise, the effect continues indefinitely.'],
  'Guest Quarters':	[1,	1, 'Starfinder Core Rulebook pg. 299', 'Starships that function as passenger vessels require spaces apart from their crew quarters for their guests to sleep. A single expansion bay can be converted into common quarters (usually simple bunks or hammocks) for six passengers, good quarters (usually a comfortable bed, a desk with a chair, and a small set of drawers) for four passengers, or luxurious quarters (usually a large bed, a wardrobe, a couch, a desk with a nice chair, and a private washroom) for two passengers.'],
  'Habitat Simulator':	[4,	6, 'Starfinder #27: Deceivers’ Moon pg. 47', 'This expansion bay can be configured to duplicate various environments, simulating them down to the smallest detail. The simulator is primarily used to clandestinely move creatures without their knowledge. For example, the grays have transplanted individuals threatened by natural disaster or environmental concerns without revealing their own existence. When used for this purpose, the simulator even slowly changes the appearance of stars in the sky until they match the night sky of the location to which the creatures in the simulator will be moved. The bay can also be used to covertly observe creatures in a simulation of their natural environment, benefiting from greater control over environmental effects such as weather. A habitat simulator can hold up to four Medium creatures (while still providing a believable simulation) and takes up 3 expansion bays. The simulator can sustain a particular environment for 1 month before it needs to be cleaned out, refreshed, and resupplied.'],
  'Hanger Bay':	[30,	10, 'Starfinder Core Rulebook pg. 299', 'A hangar bay can be installed only in a Gargantuan or larger starship and takes up 4 expansion bays. A hangar bay provides a place for up to 8 Tiny starships to dock.'],
  'Healing Pods':	[2,	3, 'Starship Operations Manual pg. 26 & Starfinder #20: The Last Refuge pg. 48', 'Healing pods can be installed only in a biomechanical starship. \nA biomechanical starship can channel energy from its self-repair mechanism to its parts, including its healing pods. These pods benefit any creature that rests in them whenever the biomechanical starship’s self-repair criteria are met. A creature that does so regains twice the number of ability points or Hit Points it would by healing naturally. Resting in a healing pod also grants a creature a +2 circumstance bonus to Constitution checks for long-term stability and saving throws against diseases, drugs, and poisons for 24 hours. A healing pods expansion bay contains six pods that can each accommodate a Medium or smaller creature. A Large pod can be installed in place of two Medium ones.'],
  'Hive Bay':	[5,	10, 'Pact Worlds pg. 153', 'Xenowarden capital ships have the ability to launch pod ships to use as shuttles or other short-range vessels. A hive bay can launch up to two pod ships. For each pod launched in this way, the arkship loses 15 Hull Points and takes a –2 penalty to its AC and TL, and all crew actions take a –2 penalty. As long as the capital ship has an unoccupied slot in a hive bay, it can reabsorb a pod ship to regain these Hull Points and negate the penalties. If the pod returns damaged, the capital vessel regains 1 fewer Hull Point for every 2 points of Hull Point damage taken by the pod ship. The penalties are negated regardless of the pod ship’s condition.'],
  'Hydroponic Garden':	[0,	5, 'Pact Worlds pg. 153', 'This space holds an entirely self-sustaining garden, complete with oxygen recycling, food production, and lighting that fosters advanced growth. A hydroponic garden takes up two expansion bays and can provide food for up to 10 Medium-sized creatures indefinitely, even if the rest of the vessel is without full power or propulsion. Multiple hydroponic gardens can be linked together to form one massive garden space.'],
  'Imperial Shrine':	[1,	1, 'Starfinder #7: The Reach of Empire pg. 47', 'A shrine venerating the history and legacy of the Azlanti Star Empire encourages patriotism and obedience among imperial citizens and servants. Once per starship combat, during a captain action that targets fellow crew members, the captain of a vessel that has an imperial shrine can evoke the Aeon Throne. If the captain does so, provided the targeted crew members are Azlanti citizens or have positive associations with the Aeon Throne, the captain gains a +4 circumstance modifier to the skill check the captain action requires.'],
  'Industry':	[40,	10, 'Near Space pg. 114', 'As functioning factories or industrial centers, some starships allow a specific Profession skill to be used to make money during voyages (or, at a GM’s discretion, a set of linked Professions), though money earned is not collected until the starship makes port at a major settlement. For example, mining starships often feature a refinery, since miners can efficiently purify the metals or other mined substances onboard before transporting the refined product. Starships with industry bays can go directly to a construction or market area on another planet to sell goods without needing to return to a home planet first.'],
  'Launch Tubes':	[10,	5, 'Pact Worlds pg. 153', 'Designed to fit on Medium and Large vessels, these tubes allow a ship to carry a single smaller vessel that can be launched at the start of any helm phase. A launch tube takes up two expansion bays and can hold one Tiny starship. If a vessel needs to dock in a launch tube during combat, it occurs at the end of the helm phase and requires a successful DC 10 Piloting skill check; this check takes a –1 penalty for each hex the smaller ship has moved this round. A failed check means that the ship doesn’t dock with the larger vessel.'],
  'Life Boats':	[5,	3, 'Starfinder Core Rulebook pg. 299', 'A life boat is a more sophisticated version of an escape pod. It has room for one Large creature, or two Medium or smaller creatures, and enough supplies to last those passengers 15 days (or 30 days of supplies for one Medium or smaller creature). While it has the same kind of distress beacon as an escape pod, a life boat also has an on-board computer that automatically detects the nearest hospitable celestial body and minimal thrusters to get the craft there (though a life boat can’t participate in starship combat). A single expansion bay can be converted into two life boats.'],
  'Medical Bay':	[4,	8, 'Starfinder Core Rulebook pg. 299', 'A medical bay functions as a medical lab (see page 220).'],
  'Park':	[1,	2, 'Near Space pg. 114', 'Parks are common on starships designed to spend years between ports and include native plant life from one or more planets with compatible biomes. Parks are lighted, irrigated, and ventilated to replicate terrestrial conditions. Many crew members stationed on starships for long periods avoid cabin fever by spending time in a park expansion bay. Parks typically include a hydroponic system for plants as well as benches, walkways, and sometimes games or playgrounds if families are on board. Abilities that require a natural or wild environment (such as a trailblazer weapon’s ability to ignore natural cover) function within a park.'],
  'Passenger Seating':	[0,	0, 'Starfinder Core Rulebook pg. 299', 'An expansion bay can be converted into rows of seating for passengers at no cost. A single expansion bay can hold seating for 16 Medium passengers (though seats can be built for larger creatures). This upgrade is appropriate only for taking many passengers on short trips; starships on journeys lasting multiple days should instead have guest quarters installed.'],
  'Power Core Housing':	[0,	10, 'Starfinder Core Rulebook pg. 299', 'An expansion bay can be set aside for an additional power core (which must be purchased separately) and the associated wiring and safety apparatuses. A power core housing can be installed on only a Medium or larger starship.'],
  'Quantum Defender':	['Special', 	'Special', 'Starship Operations Manual pg. 26 & Starfinder #7: The Reach of Empire pg. 47', 'A quantum defender enables a starship to enter an unpredictable quantum state for a short time, enabling it to phase in and out of existence at just the right time to avoid harm. During the helm phase, as a crew action, a science officer can activate the quantum defender by succeeding at a Computers check (DC = 10 + 1-1/2 × the starship’s tier). While the quantum defender is active, if an attack would normally hit the ship, the attacker must reroll the gunnery check and take the lower result. After that reroll, or at the end of a round during which no such reroll occurs, the ship returns to its normal state as the quantum defender deactivates. \nA quantum defender’s BP cost is equal to 4 × the starship’s size category (for the purpose of this calculation, Tiny = 1, Small = 2, Medium = 3, etc.) or 10 BP, whichever is greater. A quantum defender’s PCU requirement is either 20 or is equal to 5 × the starship’s size category, whichever is greater.'],
  'Quick-skip Module':	[10,	5, 'Tech Revolution pg. 50', 'Essentially a miniature onos drive, a quick-skip module can be activated at a moment’s notice to skip a starship forward a short distance. During the helm phase, as a crew action, a science officer can activate the quick-skip module by succeeding at a Computers check (DC = 10 + 1-1/2 × the starship’s tier). If successful, the ship moves 1d3+2 hexes in the direction of its facing, moving safely past any obstacles or ships in its way. If this movement would end in a hex occupied by an object, including another ship, the skipping ship and the object take damage equal to 5 × the skipping ship’s tier, and the skip ends in the nearest unoccupied hex.'],
  'Recreation Suite, Gym':	[0,	1, 'Starfinder Core Rulebook pg. 299', 'A recreation suite includes entertainments that help the crew (or passengers) relax and blow off steam. These diversions can be wide-ranging, with some consuming more PCU than others (see the table on page 300). Example recreation suites include a gym, sparring arena, or other exercise area; a trivid den or other comfortable space in which to consume passive entertainment; or a holographic amusement chamber (or HAC), vidgame arcade, or other high-tech interactive entertainment center.'],
  'Recreation Suite, HAC':	[3,	1, 'Starfinder Core Rulebook pg. 299', 'A recreation suite includes entertainments that help the crew (or passengers) relax and blow off steam. These diversions can be wide-ranging, with some consuming more PCU than others (see the table on page 300). Example recreation suites include a gym, sparring arena, or other exercise area; a trivid den or other comfortable space in which to consume passive entertainment; or a holographic amusement chamber (or HAC), vidgame arcade, or other high-tech interactive entertainment center.'],
  'Recreation Suite, Trivid Den':	[1,	1, 'Starfinder Core Rulebook pg. 299', 'A recreation suite includes entertainments that help the crew (or passengers) relax and blow off steam. These diversions can be wide-ranging, with some consuming more PCU than others (see the table on page 300). Example recreation suites include a gym, sparring arena, or other exercise area; a trivid den or other comfortable space in which to consume passive entertainment; or a holographic amusement chamber (or HAC), vidgame arcade, or other high-tech interactive entertainment center.'],
  'Recycling System':	[2,	1, 'Starfinder #6: Empire of Bones pg. 46', 'A recycling system enables a Supercolossal starship to be nearly self-sustaining, operating independently for decades or even centuries. A combination of smelters, biomass processors, manufacturing, and UPB converters allows the ship to convert almost all its waste into goods and materials.'],
  'Sample Acquisition Bay':	[7,	10, 'Starfinder #27: Deceivers’ Moon pg. 47', 'This bay is equipped with a hybrid tractor beam that quickly pulls a target into the vessel. This beam can target a Large or smaller creature (or object of similar size) that is within 500 feet and visible to the starship’s sensors. However, the beam can’t be activated if the vessel is in starship combat. While within the beam, the target’s molecules are phased slightly, rendering the target incorporeal. The beam moves the target from its original position into the bay (or vice versa) over 2 rounds. If the target is conscious and unwilling, it can attempt a Fortitude saving throw (DC = 10 + 1-1/2 × the starship’s tier) when it is first struck with the beam to negate its effect.'],
  'Science Lab':	[2,	1, 'Starfinder Core Rulebook pg. 299', 'A science lab contains scientific apparatuses and other laboratory equipment to aid in the research of certain topics. A general science lab provides a +1 circumstance bonus to Life Science and Physical Science checks (and is called a general science lab), a life science lab provides a +2 circumstance bonus to Life Science checks, and a physical science lab provides a +2 circumstance bonus to Physical Science checks. The lab type is chosen when the expansion bay is converted.'],
  'Sealed Environment Chamber':	[2,	1, 'Starfinder Core Rulebook pg. 299', 'Occasionally, a starship will need to host an alien or other creature whose biology is radically different from that of the crew. The passenger might be able to breathe only methane gas or can survive in only below-freezing temperatures. In such a case, a sealed environment chamber is required for the passenger to remain comfortable (and alive).'],
  'Shuttle Bay':	[10,	4, 'Starfinder Core Rulebook pg. 299', 'A shuttle bay can be installed only in a Huge or larger starship and takes up two expansion bays. A shuttle bay provides a place for a Small or smaller starship to dock.'],
  'Smuggler Compartment':	[4,	2, 'Starfinder Core Rulebook pg. 299', 'Smuggler compartments are cargo holds hidden behind false bulkheads and are shielded from most scanning, allowing a starship equipped with them to haul illegal goods without detection. A smuggler compartment can contain 10 tons of goods, with no item being larger than Medium. A creature on the starship must succeed at a DC 20 Perception check to detect a basic smuggler compartment on the starship. A creature scanning the starship must succeed at a DC 20 Computers check to detect one (this additional check is part of the science officer’s scan action in starship combat; see page 325). For each Build Point spent over the base cost, these DCs increase by 5 (maximum DC 50), though the amount of power the compartment uses also increases by 1.'],
  'Surveying Sensors':	[3,	3, 'Starship Operations Manual pg. 26', 'This room of specialized analytical equipment and sensory technology augments a starship’s sensors when scanning planetary bodies, spatial anomalies, debris, and similar phenomena. When scanning such targets, the science officer doubles the bonus to Computers checks granted by the starship’s sensors (maximum +8). The surveying sensors also double the range of the starship’s sensors to 500 feet while in atmosphere or on planets. The augmented sensors provide no special benefits during starship combat.'],
  'Synthesis Bay':	[2,	1, 'Starfinder Core Rulebook pg. 300', 'A synthesis bay contains all the space and tools required to craft drugs, medicine, or poison (see page 235), though the crafter must still provide the necessary raw materials. A synthesis bay reduces the crafting time by half.'],
  'Tactical Sensor Tank':	[2,	1, 'Starfinder #6: Empire of Bones pg. 46', 'A tactical sensor tank (TST) allows a Supercolossal ship to coordinate the sensor readings of multiple escort craft into a unified picture of surrounding space and then share this information with each starship. Science officers can use a TST to link the sensors of any number of allied vessels in range of the TST-equipped ship’s sensors. The sensor range for all linked ships extends as far as the farthest-reaching range among them, since the TST system collects data from linked vessels, correlates possible sensor targets, and sends that information to all linked ships.'],
  'Tech Workshop': [3,	1, 'Starfinder Core Rulebook pg. 1', 'A tech workshop contains all the space and tools necessary to craft technological items (see page 235), though the crafter must still provide the necessary raw materials. Such a workshop reduces the crafting time by half.'],
  'Telelith Matrix':	[10,	8, 'Alien Archive 3 pg. 111', 'A telelith matrix contains bizarre fibers that flex when they build up enough energy. When they do, they can hurl the connected starship through a temporary wormhole. A telelith matrix takes 1 expansion bay, consumes 10 PCUs, and costs 8 Build Points. A telelith matrix works only in starships of Large or smaller size. \nAllows for Telelith Gambit (Stunt)'],
  'Thrusters Primer':	[5,	1, 'Starship Operations Manual pg. 27', 'By dedicating additional space to the thrusters and related systems, a starship can vastly decrease the amount of time needed for its thrusters to warm up and engage. The thrusters primer reduces the time needed to start the thrusters from 1 minute per size category to 1 round per size category, allowing even immense starships to finish the ignition sequence in less than a minute. During the first engineering phase of starship combat, a thrusters primer grants a short boost to a starship’s propulsion, automatically increasing the starship’s speed by 2 as though the engineer had used the divert action to direct power to the engines.'],
  'Vault':	[3,	2, 'Near Space pg. 114', 'Some crews need a secure vault to store valuables. Breaking into a vault generally requires two skill checks (determined by the GM, though Computers and Engineering are common) with a DC equal to 10 + 1-1/2 × the ship’s tier. Failing either check by 5 or more sets off alarms, alerting the whole ship.']
}

//https://www.aonsrd.com/StarshipHulls.aspx
const fortifiedHulls = {
  // Material:	[CT bonus,	BP cost, source]
  'Steel composite':	[1,	2, 'Starship Operations Manual pg. 21'],
  'Adamantine alloy':	[2,	4, 'Starship Operations Manual pg. 21'],
  'Nanocarbon plate':	[3,	6, 'Starship Operations Manual pg. 21'],
  'Polycarbon plate':	[4,	9, 'Starship Operations Manual pg. 21'],
  'Pure adamantine':	[5,	12, 'Starship Operations Manual pg. 21']
}

//https://www.aonsrd.com/StarshipBulkheads.aspx
const reinforcedBulkheads = {
// Bulkhead:	[Fortification %,	BP cost]
  'Mk 1':	[10,	2, 'Starship Operations Manual pg. 21'],
  'Mk 2':	[20,	3, 'Starship Operations Manual pg. 21'],
  'Mk 3':	[30,	5, 'Starship Operations Manual pg. 21'],
  'Mk 4':	[40,	7, 'Starship Operations Manual pg. 21'],
  'Mk 5':	[50,	10, 'Starship Operations Manual pg. 21']
}


// <--- Data extractions --->
const getTierData = (tierId) => {
  const array = shipTiers[tierId]

  return {buildPoints: array[0], hpIncrementMultiplier: array[1]}
}

const getSizeData = (size) => {
  const array = shipSize[size]

  return {length: array[0], weight: array[1], acMod: array[2], tlMod: array[2]}
}

const getPowerCoreData = (powerCoreId) => {
  if(powerCoreId === null) return {sizes: null, pcuProvided: 0, bpCost: 0, source: null};

  const array = powerCores[capitalizeEachWord(powerCoreId)]

  return {sizes: array[0], pcuProvided: array[1], bpCost: array[2], source: array[3]}
}

const getThrusterData = (thrustersId) => {
  if(thrustersId === null) return {size: null, speed: 0, pilotingModifier: 0, pcuCost: 0, bpCost: 0, source: null};

  const array = thrusters[thrustersId]

  return {size: array[0], speed: array[1], pilotingModifier: array[2], pcuCost: array[3], bpCost: array[4], source: array[5]}
}

const getArmorData = (armorId, size) => {
  if(size === undefined) throw new Error("getArmorData(armorId, size) must take in a size parameter")
  if(armorId === null) return {acBonus: 0, tlPenalty: 0, turnDistance: 0, bpCost: 0, source: null}

  const array = armor[armorId]

  return {acBonus: array[0], tempHP: array[1], tlPenalty: array[2], turnDistance: array[3], 
    bpCost: (armorId.includes('Mk') || armorId.includes('Energy-Absorbent')) ? (array[4] * sizeMod[size]) : array[4], 
    source: array[5]}
}

const getComputerData = (computerId) => {
  if(computerId === null) return {bonus: 0, nodes: 0, pcuCost: 0, bpCost: 0, source: null}

  computerId = capitalizeEachWord(computerId)
  const array = computers[computerId]

  return {bonus: array[0], nodes: array[1], pcuCost: array[2], bpCost: array[3], source: array[4]}
}

const getNetworkNodeData = (nodeId, size) => { 
  if(size === undefined) throw new Error("getNetworkNodeData(nodeId, size) must take in a size parameter")
  if(nodeId === null || nodeId === "Basic Computer" || size !== "Supercolossal") return {bonus: 0, nodeMax: 0, pcuCost: 0, bpCost: 0}

  const array = networkNodes[nodeId]

  return {bonus: array[0], nodeMax: array[1], pcuCost: array[2], bpCost: array[3]}
}

const getQuartersData = (quartersId) => {
  const array = crewQuarters[quartersId]

  return {bpCost: array[0], source: array[1], description: array[2]}
}

const getDefensiveCounterData = (defensiveCounterId) => {
  if(defensiveCounterId === null) return {tlBonus: 0, pcuCost: 0, bpCost: 0, source: null}

  const array = defensiveCounter[defensiveCounterId]

  return {tlBonus: array[0], pcuCost: array[1], bpCost: array[2], source: array[3]}
}

const getDriftEngineData = (driftEngineId, size) => {
  if(size === undefined) throw new Error("getDriftEngineData(driftEngines, size) must take in a size parameter")
  if(driftEngineId === null) return {rating: 0, minPCU: 0, maxSize: null, bpCost: 0, source: null, special: null}

  const array = driftEngines[driftEngineId]

  return {rating: array[0], minPCU: array[1], maxSize: array[2], bpCost: (array[3] * sizeMod[size]), source: array[7], special: array[4]}
}

const getExpansionBayData = (expansionBayId, size) => {
  if(size === undefined) throw new Error("getExpansionBayData(expansionBayId, size) must take in a size parameter")
  if(expansionBayId === null || expansionBayId === undefined) return {pcuCost: 0, bpCost: 0, source: null}

  const array = expansionBays[expansionBayId]

  if(expansionBayId === 'Quantum Defender') {
    return {pcuCost: Math.max(20, (5 * sizeMod[size])), bpCost: Math.max(10, (4 * sizeMod[size])), source: array[2]}
  }
  if(expansionBayId === 'Decoy Husk') return {pcuCost: (array[0] + sizeMod[size]), bpCost: (array[1] * sizeMod[size]), source: array[2]}
  
  return {pcuCost: array[0], bpCost: array[1], source: array[2]}
}

const getFortifiedHullData = (fortifiedHullId, size) => {
  if(size === undefined) throw new Error("getFortifiedHullData(fortifiedHullId, size) must take in a size parameter")
  if(fortifiedHullId === null) return {ctBonus: 0, bpCost: 0, source: null}

  const array = fortifiedHulls[fortifiedHullId]

  return {ctBonus: (array[0] * sizeMod[size]), bpCost: (array[1] * sizeMod[size]), source: array[2]}
}

const getReinforcedBulkheadData = (reinforcedBulkheadId, size) => {
  if(size === undefined) throw new Error("getReinforcedBulkeadData(reinforcedBulkheadId, size) must take in a size parameter")
  if(reinforcedBulkheadId === null) return {fortification: 0, bpCost: 0, source: null}

  const array = reinforcedBulkheads[reinforcedBulkheadId]

  //fortification is a %
  return {fortification: array[0], bpCost: (array[1] * sizeMod[size]), source: array[2]}
}



// <--- ID extractions -->
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

const getFrameIdList = () => {
  return frames.map(frame => frame.type)
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

const getComputerIdList = () => {
  return Object.keys(computers).sort((a, b) => a + b)
}

const getNetworkNodeIdList = () => {
  return Object.keys(networkNodes).sort((a, b) => a + b)
}

const getQuartersIdList = () => {
  return Object.keys(crewQuarters).sort((a, b) => a + b)
}

const getDefensiveCounterIdList = () => {
  return Object.keys(defensiveCounter).sort((a, b) => a + b)
}

const getDriftEngineIdList = () => {
  return Object.keys(driftEngines).sort((a, b) => a + b)
}

const getExpansionBayIdList = () => {
  return Object.keys(expansionBays).sort((a, b) => a + b)
}

const getFortifiedHullIdList = () => {
  return Object.keys(fortifiedHulls).sort((a, b) => a + b)
}

const getReinforcedBulkheadIdList = () => {
  return Object.keys(reinforcedBulkheads).sort((a, b) => a + b)
}

export {
  sources,
  sizeMod,

  getTierData, 
  getSizeData,
  getPowerCoreData, 
  getThrusterData,
  getArmorData,
  getComputerData,
  getNetworkNodeData,
  getQuartersData,
  getDefensiveCounterData,
  getDriftEngineData,
  getExpansionBayData,
  getFortifiedHullData,
  getReinforcedBulkheadData,

  getTierIdList, 
  getFrameIdList,
  getPowerCoreIdList, 
  getThrusterIdList,
  getArmorIdList,
  getComputerIdList,
  getNetworkNodeIdList,
  getQuartersIdList,
  getDefensiveCounterIdList,
  getDriftEngineIdList,
  getExpansionBayIdList,
  getFortifiedHullIdList,
  getReinforcedBulkheadIdList,
}