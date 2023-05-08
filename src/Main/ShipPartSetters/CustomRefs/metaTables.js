import { capitalizeEachWord } from "../../References/utils";
import frames from "./frames";
import { getLongarmData, getHeavyData, getLongarmIdList, getHeavyIdList } from "./antiPersonnelData";

const sources = {
  // an item can have multiple sources
  'Starfinder Core Rulebook': {
    link: 'https://paizo.com/products/btpy9ssr?Starfinder-Core-Rulebook',
    abbrev: 'CRB',
    sfsLegal: true
  },
  'Pact Worlds': {
    link: 'https://paizo.com/products/btpy9zkn?Starfinder-Pact-Worlds',
    abbrev: 'PW',
    sfsLegal: true
  },
  'Alien Archive': {
    link: 'https://paizo.com/products/btq01wt9?Starfinder-Alien-Archive-3',
    abbrev: 'AA',
    sfsLegal: true
  },
  'Alien Archive 2': {
    link: 'https://paizo.com/products/btpya20r?Starfinder-Alien-Archive-2',
    abbrev: 'AA2',
    sfsLegal: true
  },
  'Drift Crisis': {
    link: 'https://paizo.com/products/btq02aly?Starfinder-Drift-Crisis',
    abbrev: 'DC',
    sfsLegal: true
  },
  'Starship Operations Manual': {
    link: 'https://paizo.com/products/btq0225g?Starfinder-RPG-Starship-Operations-Manual',
    abbrev: 'SOM',
    sfsLegal: false
  },
  'Near Space': {
    link: 'https://paizo.com/products/btq01zud?Starfinder-RPG-Near-Space',
    abbrev: 'NS',
    sfsLegal: false
  },
  'Tech Revolution': {
    link: 'https://paizo.com/products/btq026mr/discuss?Starfinder-Tech-Revolution',
    abbrev: 'TR',
    sfsLegal: false
  },
  'Starfinder #6: Empire of Bones': {
    link: 'https://paizo.com/products/btpya1ai/',
    abbrev: 'EoB',
    sfsLegal: false
  },
  'Starfinder #7: The Reach of Empire': {
    link: 'https://paizo.com/products/btpya1rp?Starfinder-Adventure-Path-7-The-Reach-of-Empire',
    abbrev: 'RotE',
    sfsLegal: false
  },
  'Starfinder #19: Fate of the Fifth': {
    link: 'https://paizo.com/products/btq01wtb?Starfinder-Adventure-Path-19-Fate-of-the-Fifth',
    abbrev: 'FotF',
    sfsLegal: false
  },
  'Starfinder #20: The Last Refuge': {
    link: 'https://paizo.com/products/btq01zo2?Starfinder-Adventure-Path-20-The-Last-Refuge',
    abbrev: 'TLR',
    sfsLegal: false
  },
  "Starfinder #27: Deceivers' Moon": {
    link: 'https://paizo.com/products/btq0216g?Starfinder-Adventure-Path-27-Deceivers-Moon',
    abbrev: 'DM',
    sfsLegal: false
  },
  'Starfinder #42: Whispers of the Eclipse': {
    link: 'https://paizo.com/products/btq027nt/discuss?Starfinder-Adventure-Path-42-Whispers-of-the-Eclipse',
    abbrev: 'WotE',
    sfsLegal: false
  },
}

// https://www.aonsrd.com/Rules.aspx?ID=183
const shipTiers = {
  '1/4': { buildPoints: 25, hpIncrement: 0 },
  '1/3': { buildPoints: 30, hpIncrement: 0 },
  '1/2': { buildPoints: 40, hpIncrement: 0 },
  '1': { buildPoints: 55, hpIncrement: 0 },
  '2': { buildPoints: 75, hpIncrement: 0 },
  '3': { buildPoints: 95, hpIncrement: 0 },
  '4': { buildPoints: 115, hpIncrement: 1 },
  '5': { buildPoints: 135, hpIncrement: 1 },
  '6': { buildPoints: 155, hpIncrement: 1 },
  '7': { buildPoints: 180, hpIncrement: 1 },
  '8': { buildPoints: 205, hpIncrement: 2 },
  '9': { buildPoints: 230, hpIncrement: 2 },
  '10': { buildPoints: 270, hpIncrement: 2 },
  '11': { buildPoints: 310, hpIncrement: 2 },
  '12': { buildPoints: 350, hpIncrement: 3 },
  '13': { buildPoints: 400, hpIncrement: 3 },
  '14': { buildPoints: 450, hpIncrement: 3 },
  '15': { buildPoints: 500, hpIncrement: 3 },
  '16': { buildPoints: 600, hpIncrement: 4 },
  '17': { buildPoints: 700, hpIncrement: 4 },
  '18': { buildPoints: 800, hpIncrement: 4 },
  '19': { buildPoints: 900, hpIncrement: 4 },
  '20': { buildPoints: 1000, hpIncrement: 5 },
}

const shipSize = {
  Tiny: { length: '20-60 ft.', weight: '2-40 tons', acMod: 2, tlMod: 2 },
  Small: { length: '60-120 ft.', weight: '30-250 tons', acMod: 1, tlMod: 1 },
  Medium: {
    length: '120-300 ft.',
    weight: '50-2,500 tons',
    acMod: 0,
    tlMod: 0
  },
  Large: {
    length: '300-800 ft.',
    weight: '2,000-50,000 tons',
    acMod: -1,
    tlMod: -1
  },
  Huge: {
    length: '800-2,000 ft.',
    weight: '40,000-640,000 tons',
    acMod: -2,
    tlMod: -2
  },
  Gargantuan: {
    length: '2,000-15,000 ft.',
    weight: '600,000 tons to 250 megatons',
    acMod: -4,
    tlMod: -4
  },
  Colossal: {
    length: 'Over 15,000 ft.',
    weight: '200-2,000 megatons',
    acMod: -8,
    tlMod: -8
  },
  Supercolossal: {
    length: 'Over 6 miles',
    weight: 'Over 2,000 megatons',
    acMod: -8,
    tlMod: -8
  }
}

const maneuverability = {
  Clumsy: { turnDistance: 4, pilotingModifier: -2 },
  Poor: { turnDistance: 3, pilotingModifier: -1 },
  Average: { turnDistance: 2, pilotingModifier: 0 },
  Good: { turnDistance: 1, pilotingModifier: 1 },
  Perfect: { turnDistance: 0, pilotingModifier: 2 }
}

const sizeCategory = {
  "Tiny": 1, 
  "Small": 2, 
  "Medium": 3, 
  "Large": 4, 
  "Huge": 5, 
  "Gargantuan": 6, 
  "Colossal": 7, 
  "Supercolossal": 8
}

// https://www.aonsrd.com/Starship_PowerCores.aspx
const powerCores = {
  'Micron Light': {
    sizes: [ 'T' ],
    pcuProvided: 50,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Micron Heavy': {
    sizes: [ 'T' ],
    pcuProvided: 70,
    bpCost: 6,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Micron Ultra': {
    sizes: [ 'T' ],
    pcuProvided: 80,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Arcus Light': {
    sizes: [ 'T', 'S' ],
    pcuProvided: 75,
    bpCost: 7,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Brown': {
    sizes: [ 'T', 'S' ],
    pcuProvided: 90,
    bpCost: 9,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Black': {
    sizes: [ 'T', 'S' ],
    pcuProvided: 120,
    bpCost: 12,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse White': {
    sizes: [ 'T', 'S' ],
    pcuProvided: 140,
    bpCost: 14,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Gray': {
    sizes: [ 'T', 'S', 'M' ],
    pcuProvided: 100,
    bpCost: 10,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Arcus Heavy': {
    sizes: [ 'T', 'S', 'M' ],
    pcuProvided: 130,
    bpCost: 13,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Green': {
    sizes: [ 'T', 'S', 'M' ],
    pcuProvided: 150,
    bpCost: 15,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Red': {
    sizes: [ 'T', 'S', 'M' ],
    pcuProvided: 175,
    bpCost: 17,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Blue': {
    sizes: [ 'T', 'S', 'M' ],
    pcuProvided: 200,
    bpCost: 20,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Arcus Ultra': {
    sizes: [ 'S', 'M', 'L' ],
    pcuProvided: 150,
    bpCost: 15,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Arcus Maximum': {
    sizes: [ 'S', 'M', 'L' ],
    pcuProvided: 200,
    bpCost: 20,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Orange': {
    sizes: [ 'S', 'M', 'L' ],
    pcuProvided: 250,
    bpCost: 25,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Pulse Prismatic': {
    sizes: [ 'S', 'M', 'L' ],
    pcuProvided: 300,
    bpCost: 30,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Nova Light': {
    sizes: [ 'M', 'L', 'H' ],
    pcuProvided: 150,
    bpCost: 15,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Nova Heavy': {
    sizes: [ 'M', 'L', 'H' ],
    pcuProvided: 200,
    bpCost: 20,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Nova Ultra': {
    sizes: [ 'M', 'L', 'H' ],
    pcuProvided: 300,
    bpCost: 30,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Gateway Light': {
    sizes: [ 'L', 'H', 'G' ],
    pcuProvided: 300,
    bpCost: 30,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Gateway Heavy': {
    sizes: [ 'L', 'H', 'G' ],
    pcuProvided: 400,
    bpCost: 40,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Gateway Ultra': {
    sizes: [ 'H', 'G', 'C' ],
    pcuProvided: 500,
    bpCost: 50,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  'Titan Light': {
    sizes: [ 'Sc' ],
    pcuProvided: 700,
    bpCost: 50,
    source: 'Starship Operations Manual pg. 36'
  },
  'Titan Heavy': {
    sizes: [ 'Sc' ],
    pcuProvided: 950,
    bpCost: 60,
    source: 'Starship Operations Manual pg. 36'
  },
  'Titan Ultra': {
    sizes: [ 'Sc' ],
    pcuProvided: 1200,
    bpCost: 70,
    source: 'Starship Operations Manual pg. 36'
  }
}

// https://www.aonsrd.com/Starship_Thrusters.aspx
const thrusters = {
  T6: {
    size: 'T',
    speed: 6,
    pilotingModifier: 1,
    pcuCost: 20,
    bpCost: 3,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  T8: {
    size: 'T',
    speed: 8,
    pilotingModifier: 0,
    pcuCost: 25,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  T10: {
    size: 'T',
    speed: 10,
    pilotingModifier: 0,
    pcuCost: 30,
    bpCost: 5,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  T12: {
    size: 'T',
    speed: 12,
    pilotingModifier: -1,
    pcuCost: 35,
    bpCost: 6,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  T14: {
    size: 'T',
    speed: 14,
    pilotingModifier: -2,
    pcuCost: 40,
    bpCost: 7,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  S6: {
    size: 'S',
    speed: 6,
    pilotingModifier: 1,
    pcuCost: 30,
    bpCost: 3,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  S8: {
    size: 'S',
    speed: 8,
    pilotingModifier: 0,
    pcuCost: 40,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  S10: {
    size: 'S',
    speed: 10,
    pilotingModifier: 0,
    pcuCost: 50,
    bpCost: 5,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  S12: {
    size: 'S',
    speed: 12,
    pilotingModifier: -1,
    pcuCost: 60,
    bpCost: 6,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  M4: {
    size: 'M',
    speed: 4,
    pilotingModifier: 2,
    pcuCost: 40,
    bpCost: 2,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  M6: {
    size: 'M',
    speed: 6,
    pilotingModifier: 1,
    pcuCost: 50,
    bpCost: 3,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  M8: {
    size: 'M',
    speed: 8,
    pilotingModifier: 0,
    pcuCost: 60,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  M10: {
    size: 'M',
    speed: 10,
    pilotingModifier: 0,
    pcuCost: 70,
    bpCost: 5,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  M12: {
    size: 'M',
    speed: 12,
    pilotingModifier: -1,
    pcuCost: 80,
    bpCost: 6,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  L4: {
    size: 'L',
    speed: 4,
    pilotingModifier: 2,
    pcuCost: 60,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  L6: {
    size: 'L',
    speed: 6,
    pilotingModifier: 1,
    pcuCost: 80,
    bpCost: 6,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  L8: {
    size: 'L',
    speed: 8,
    pilotingModifier: 0,
    pcuCost: 100,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  L10: {
    size: 'L',
    speed: 10,
    pilotingModifier: 0,
    pcuCost: 120,
    bpCost: 10,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  H4: {
    size: 'H',
    speed: 4,
    pilotingModifier: 2,
    pcuCost: 80,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  H6: {
    size: 'H',
    speed: 6,
    pilotingModifier: 1,
    pcuCost: 120,
    bpCost: 6,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  H8: {
    size: 'H',
    speed: 8,
    pilotingModifier: 0,
    pcuCost: 140,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  H10: {
    size: 'H',
    speed: 10,
    pilotingModifier: 0,
    pcuCost: 160,
    bpCost: 10,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  G4: {
    size: 'G',
    speed: 4,
    pilotingModifier: 2,
    pcuCost: 120,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  G6: {
    size: 'G',
    speed: 6,
    pilotingModifier: 1,
    pcuCost: 180,
    bpCost: 12,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  G8: {
    size: 'G',
    speed: 8,
    pilotingModifier: 0,
    pcuCost: 240,
    bpCost: 16,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  C4: {
    size: 'C',
    speed: 4,
    pilotingModifier: 2,
    pcuCost: 200,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  C6: {
    size: 'C',
    speed: 6,
    pilotingModifier: 1,
    pcuCost: 300,
    bpCost: 12,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  C8: {
    size: 'C',
    speed: 8,
    pilotingModifier: 0,
    pcuCost: 400,
    bpCost: 16,
    source: 'Starfinder Core Rulebook pg. 296'
  },
  SC4: {
    size: 'Sc',
    speed: 4,
    pilotingModifier: 1,
    pcuCost: 300,
    bpCost: 16,
    source: 'Starship Operations Manual pg. 36'
  },
  SC6: {
    size: 'Sc',
    speed: 6,
    pilotingModifier: 0,
    pcuCost: 400,
    bpCost: 20,
    source: 'Starship Operations Manual pg. 36'
  },
  SC8: {
    size: 'Sc',
    speed: 8,
    pilotingModifier: -1,
    pcuCost: 500,
    bpCost: 24,
    source: 'Starship Operations Manual pg. 36'
  }
}

// https://www.aonsrd.com/Starship_Armor.aspx
const armor = {
  'Mk 1': {
    acBonus: 1,
    tempHP: null,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 2': {
    acBonus: 2,
    tempHP: null,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 2,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 3': {
    acBonus: 3,
    tempHP: null,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 3,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 4': {
    acBonus: 4,
    tempHP: null,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 5,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 5': {
    acBonus: 5,
    tempHP: null,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 7,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 6': {
    acBonus: 6,
    tempHP: null,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 9,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 7': {
    acBonus: 7,
    tempHP: null,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 12,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 8': {
    acBonus: 8,
    tempHP: null,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 15,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 9': {
    acBonus: 9,
    tempHP: null,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 18,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 10': {
    acBonus: 10,
    tempHP: null,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 21,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 11': {
    acBonus: 11,
    tempHP: null,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 25,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 12': {
    acBonus: 12,
    tempHP: null,
    tlPenalty: -3,
    turnDistance: 2,
    bpCost: 30,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 13': {
    acBonus: 13,
    tempHP: null,
    tlPenalty: -3,
    turnDistance: 2,
    bpCost: 35,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 14': {
    acBonus: 14,
    tempHP: null,
    tlPenalty: -3,
    turnDistance: 2,
    bpCost: 40,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 15': {
    acBonus: 15,
    tempHP: null,
    tlPenalty: -4,
    turnDistance: 3,
    bpCost: 45,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Energy-Absorbent Plating': {
    acBonus: null,
    tempHP: null,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 4,
    source: "Starfinder #27: Deceivers' Moon pg. 47"
  },
  'Basic ablative armor 1': {
    acBonus: null,
    tempHP: 8,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 2,
    source: 'Starship Operations Manual pg. 20'
  },
  'Basic ablative armor 2': {
    acBonus: null,
    tempHP: 16,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 20'
  },
  'Basic ablative armor 3': {
    acBonus: null,
    tempHP: 24,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 4,
    source: 'Starship Operations Manual pg. 20'
  },
  'Basic ablative armor 4': {
    acBonus: null,
    tempHP: 32,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 5,
    source: 'Starship Operations Manual pg. 20'
  },
  'Basic ablative armor 5': {
    acBonus: null,
    tempHP: 40,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 6,
    source: 'Starship Operations Manual pg. 20'
  },
  'Light ablative armor 1': {
    acBonus: null,
    tempHP: 52,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 8,
    source: 'Starship Operations Manual pg. 20'
  },
  'Light ablative armor 2': {
    acBonus: null,
    tempHP: 64,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 10,
    source: 'Starship Operations Manual pg. 20'
  },
  'Light ablative armor 3': {
    acBonus: null,
    tempHP: 76,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 12,
    source: 'Starship Operations Manual pg. 20'
  },
  'Light ablative armor 4': {
    acBonus: null,
    tempHP: 88,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 13,
    source: 'Starship Operations Manual pg. 20'
  },
  'Light ablative armor 5': {
    acBonus: null,
    tempHP: 100,
    tlPenalty: -1,
    turnDistance: null,
    bpCost: 14,
    source: 'Starship Operations Manual pg. 20'
  },
  'Medium ablative armor 1': {
    acBonus: null,
    tempHP: 120,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 16,
    source: 'Starship Operations Manual pg. 20'
  },
  'Medium ablative armor 2': {
    acBonus: null,
    tempHP: 140,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 17,
    source: 'Starship Operations Manual pg. 20'
  },
  'Medium ablative armor 3': {
    acBonus: null,
    tempHP: 160,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 19,
    source: 'Starship Operations Manual pg. 20'
  },
  'Medium ablative armor 4': {
    acBonus: null,
    tempHP: 180,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 21,
    source: 'Starship Operations Manual pg. 20'
  },
  'Medium ablative armor 5': {
    acBonus: null,
    tempHP: 200,
    tlPenalty: -2,
    turnDistance: 1,
    bpCost: 22,
    source: 'Starship Operations Manual pg. 20'
  },
  'Heavy ablative armor 1': {
    acBonus: null,
    tempHP: 240,
    tlPenalty: -2,
    turnDistance: 2,
    bpCost: 24,
    source: 'Starship Operations Manual pg. 20'
  },
  'Heavy ablative armor 2': {
    acBonus: null,
    tempHP: 280,
    tlPenalty: -2,
    turnDistance: 2,
    bpCost: 27,
    source: 'Starship Operations Manual pg. 20'
  },
  'Heavy ablative armor 3': {
    acBonus: null,
    tempHP: 320,
    tlPenalty: -2,
    turnDistance: 2,
    bpCost: 29,
    source: 'Starship Operations Manual pg. 20'
  },
  'Heavy ablative armor 4': {
    acBonus: null,
    tempHP: 360,
    tlPenalty: -2,
    turnDistance: 2,
    bpCost: 31,
    source: 'Starship Operations Manual pg. 20'
  },
  'Heavy ablative armor 5': {
    acBonus: null,
    tempHP: 400,
    tlPenalty: -2,
    turnDistance: 2,
    bpCost: 34,
    source: 'Starship Operations Manual pg. 20'
  },
  'Superior ablative armor 1': {
    acBonus: null,
    tempHP: 460,
    tlPenalty: -3,
    turnDistance: 2,
    bpCost: 38,
    source: 'Starship Operations Manual pg. 20'
  },
  'Superior ablative armor 2': {
    acBonus: null,
    tempHP: 520,
    tlPenalty: -4,
    turnDistance: 2,
    bpCost: 45,
    source: 'Starship Operations Manual pg. 20'
  },
  'Passive interposed defenses 1': {
    acBonus: null,
    tempHP: 10,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 3,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 49'
  },
  'Passive interposed defenses 2': {
    acBonus: null,
    tempHP: 20,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 5,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 49'
  },
  'Passive interposed defenses 3': {
    acBonus: null,
    tempHP: 32,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 10,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 49'
  },
  'Active interposed defenses 1': {
    acBonus: null,
    tempHP: 50,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 14,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 49'
  },
  'Active interposed defenses 2': {
    acBonus: null,
    tempHP: 100,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 22,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 49'
  },
  'Active interposed defenses 3': {
    acBonus: null,
    tempHP: 160,
    tlPenalty: null,
    turnDistance: null,
    bpCost: 29,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 49'
  }
}

// https://www.aonsrd.com/Starship_Computers.aspx
const computers = {
  'Basic Computer': {
    bonus: 0,
    nodes: 0,
    pcuCost: 0,
    bpCost: 0,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 1 Mononode': {
    bonus: 1,
    nodes: 1,
    pcuCost: 10,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 1 Duonode': {
    bonus: 1,
    nodes: 2,
    pcuCost: 10,
    bpCost: 2,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 1 Trinode': {
    bonus: 1,
    nodes: 3,
    pcuCost: 10,
    bpCost: 3,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 1 Tetranode': {
    bonus: 1,
    nodes: 4,
    pcuCost: 10,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 2 Mononode': {
    bonus: 2,
    nodes: 1,
    pcuCost: 15,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 2 Duonode': {
    bonus: 2,
    nodes: 2,
    pcuCost: 15,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 2 Trinode': {
    bonus: 2,
    nodes: 3,
    pcuCost: 15,
    bpCost: 12,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 2 Tetranode': {
    bonus: 2,
    nodes: 4,
    pcuCost: 15,
    bpCost: 16,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 3 Mononode': {
    bonus: 3,
    nodes: 1,
    pcuCost: 20,
    bpCost: 9,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 3 Duonode': {
    bonus: 3,
    nodes: 2,
    pcuCost: 20,
    bpCost: 18,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 3 Trinode': {
    bonus: 3,
    nodes: 3,
    pcuCost: 20,
    bpCost: 27,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 3 Tetranode': {
    bonus: 3,
    nodes: 4,
    pcuCost: 20,
    bpCost: 36,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 4 Mononode': {
    bonus: 4,
    nodes: 1,
    pcuCost: 25,
    bpCost: 16,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 4 Duonode': {
    bonus: 4,
    nodes: 2,
    pcuCost: 25,
    bpCost: 32,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 4 Trinode': {
    bonus: 4,
    nodes: 3,
    pcuCost: 25,
    bpCost: 48,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 5 Mononode': {
    bonus: 5,
    nodes: 1,
    pcuCost: 30,
    bpCost: 25,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 5 Duonode': {
    bonus: 5,
    nodes: 2,
    pcuCost: 30,
    bpCost: 50,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 5 Trinode': {
    bonus: 5,
    nodes: 3,
    pcuCost: 30,
    bpCost: 75,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 6 Mononode': {
    bonus: 6,
    nodes: 1,
    pcuCost: 35,
    bpCost: 36,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 6 Duonode': {
    bonus: 6,
    nodes: 2,
    pcuCost: 35,
    bpCost: 72,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 7 Mononode': {
    bonus: 7,
    nodes: 1,
    pcuCost: 40,
    bpCost: 49,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 7 Duonode': {
    bonus: 7,
    nodes: 2,
    pcuCost: 40,
    bpCost: 98,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 8 Mononode': {
    bonus: 8,
    nodes: 1,
    pcuCost: 45,
    bpCost: 64,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 8 Duonode': {
    bonus: 8,
    nodes: 2,
    pcuCost: 45,
    bpCost: 128,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 9 Mononode': {
    bonus: 9,
    nodes: 1,
    pcuCost: 50,
    bpCost: 81,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 9 Duonode': {
    bonus: 9,
    nodes: 2,
    pcuCost: 50,
    bpCost: 162,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 10 Mononode': {
    bonus: 10,
    nodes: 1,
    pcuCost: 55,
    bpCost: 100,
    source: 'Starfinder Core Rulebook pg. 297'
  },
  'Mk 10 Duonode': {
    bonus: 10,
    nodes: 2,
    pcuCost: 55,
    bpCost: 200,
    source: 'Starfinder Core Rulebook pg. 297'
  }
}

const networkNodes = {
  'Mk 4': { bonus: 4, nodeMax: 2, pcuCost: 8, bpCost: 4 },
  'Mk 5': { bonus: 5, nodeMax: 2, pcuCost: 10, bpCost: 5 },
  'Mk 6': { bonus: 6, nodeMax: 3, pcuCost: 11, bpCost: 6 },
  'Mk 7': { bonus: 7, nodeMax: 3, pcuCost: 13, bpCost: 7 },
  'Mk 8': { bonus: 8, nodeMax: 4, pcuCost: 15, bpCost: 8 },
  'Mk 9': { bonus: 9, nodeMax: 4, pcuCost: 17, bpCost: 9 },
  'Mk 10': { bonus: 10, nodeMax: 5, pcuCost: 19, bpCost: 10 }
}

// https://www.aonsrd.com/Starship_CrewQuarters.aspx?ItemName=All
const crewQuarters = {
  Common: {
    bpCost: 0,
    source: 'Starfinder Core Rulebook pg. 298',
    description: 'Common crew quarters are the most basic type. They consist of simple bunks (sometimes folding out from the side of a hallway) or other similarly austere places to rest. Crew members who sleep in common quarters usually keep their personal possessions in a footlocker. Common crew quarters also include a communal bathroom (which includes a military-style shower) and a tiny galley (big enough to prepare only the most basic of meals). Starships with crews numbering in the dozens or hundreds often have massive barracks where crew members sleep in shifts.'
  },
  Good: {
    bpCost: 2,
    source: 'Starfinder Core Rulebook pg. 298',
    description: 'Good crew quarters are a bit more upscale than common crew quarters. They consist of dormitory-style rooms that can hold one or two small beds (larger starships usually require lower-ranking crew members to share these quarters) and sometimes a personal closet or drawer space for each occupant. Good crew quarters also include one or two shared bathrooms with multiple sinks and shower stalls, and a dining space with an attached galley. Crews of larger starships eat in this dining space in shifts.'
  },
  Luxurious: {
    bpCost: 5,
    source: 'Starfinder Core Rulebook pg. 298',
    description: "Luxurious crew quarters are the pinnacle of comfort. They consist of private rooms for each crew member, with personal bathrooms (including showers with high water pressure) and furnishings that match the resident's tastes. Some luxurious crew quarters also feature a kitchenette, gaming areas, or intimate meeting spaces."
  }
}

// https://aonsrd.com/Starship_DefCounters.aspx
const defensiveCounter = {
  'Mk 1': {
    tlBonus: 1,
    pcuCost: 1,
    bpCost: 2,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 2': {
    tlBonus: 2,
    pcuCost: 1,
    bpCost: 3,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 3': {
    tlBonus: 3,
    pcuCost: 2,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 4': {
    tlBonus: 4,
    pcuCost: 3,
    bpCost: 6,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 5': {
    tlBonus: 5,
    pcuCost: 4,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 6': {
    tlBonus: 6,
    pcuCost: 5,
    bpCost: 11,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 7': {
    tlBonus: 7,
    pcuCost: 7,
    bpCost: 14,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 8': {
    tlBonus: 8,
    pcuCost: 9,
    bpCost: 18,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 9': {
    tlBonus: 9,
    pcuCost: 11,
    bpCost: 22,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 10': {
    tlBonus: 10,
    pcuCost: 13,
    bpCost: 27,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 11': {
    tlBonus: 11,
    pcuCost: 16,
    bpCost: 33,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 12': {
    tlBonus: 12,
    pcuCost: 20,
    bpCost: 40,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 13': {
    tlBonus: 13,
    pcuCost: 25,
    bpCost: 50,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 14': {
    tlBonus: 14,
    pcuCost: 32,
    bpCost: 65,
    source: 'Starfinder Core Rulebook pg. 298'
  },
  'Mk 15': {
    tlBonus: 15,
    pcuCost: 45,
    bpCost: 90,
    source: 'Starfinder Core Rulebook pg. 298'
  }
}

// https://www.aonsrd.com/Starship_DriftEngines.aspx
// https://aonsrd.com/StarshipInterstellar.aspx
const driftEngines = {
  'Signal Basic': {
    rating: 1,
    minPCU: 75,
    maxSize: null,
    bpCost: 2,
    source: 'Starfinder Core Rulebook pg. 298',
    special: null
  },
  'Signal Booster': {
    rating: 2,
    minPCU: 100,
    maxSize: 'Huge',
    bpCost: 5,
    source: 'Starfinder Core Rulebook pg. 298',
    special: null
  },
  'Signal Major': {
    rating: 3,
    minPCU: 150,
    maxSize: 'Large',
    bpCost: 10,
    source: 'Starfinder Core Rulebook pg. 298',
    special: null
  },
  'Signal Superior': {
    rating: 4,
    minPCU: 175,
    maxSize: 'Large',
    bpCost: 15,
    source: 'Starfinder Core Rulebook pg. 298',
    special: null
  },
  'Signal Ultra': {
    rating: 5,
    minPCU: 200,
    maxSize: 'Medium',
    bpCost: 20,
    source: 'Starfinder Core Rulebook pg. 298',
    special: null
  },
  'Archon Drive': {
    rating: 1,
    minPCU: 150,
    maxSize: null,
    bpCost: 15,
    source: 'Starship Operations Manual pg. 9',
    special: 'Restricted (Church of Iomedae, Knights of Golarion)'
  },
  'Chaos Sail': {
    rating: 1,
    minPCU: 75,
    maxSize: null,
    bpCost: 4,
    source: 'Starship Operations Manual pg. 9',
    special: 'Restricted (Church of Besmara)'
  },
  'Constellation Orrery': {
    rating: 2,
    minPCU: 150,
    maxSize: 'Huge',
    bpCost: 10,
    source: 'Starship Operations Manual pg. 10',
    special: 'Restricted (Church of Ibra)'
  },
  'Elemental Engine': {
    rating: 1,
    minPCU: 100,
    maxSize: null,
    bpCost: 5,
    source: 'Starship Operations Manual pg. 10',
    special: 'Restricted (Elemental Plane)'
  },
  'First Drive': {
    rating: 3,
    minPCU: 175,
    maxSize: 'Large',
    bpCost: 12,
    source: 'Starship Operations Manual pg. 10',
    special: 'Restricted (Eldest, fey)'
  },
  'Fold Gates': {
    rating: 'Special',
    minPCU: 200,
    maxSize: 'Huge',
    bpCost: 0,
    source: 'Starship Operations Manual pg. 10',
    special: 'Journeying between a pair of fold gates is limited to predetermined destinations—those locations with functioning fold gates (determined by the GM).'  },
  Helldrive: {
    rating: 1,
    minPCU: 100,
    maxSize: null,
    bpCost: 10,
    source: 'Starship Operations Manual pg. 11',
    special: 'Restricted (Church of Asmodeus, Hellknights)'
  },
  'Planar Aperture Drive': {
    rating: 2,
    minPCU: 150,
    maxSize: null,
    bpCost: 15,
    source: 'Starship Operations Manual pg. 11',
    special: 'Restricted (Tetrad, witchwyrds)'
  },
  'Shadow Engine': {
    rating: 1,
    minPCU: 75,
    maxSize: null,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 11',
    special: 'Painful, Restricted (Church of Zon-Kuthon, velstracs)'
  },
  'Onos drive': {
    rating: 0.5,
    minPCU: 150,
    maxSize: 'Medium',
    bpCost: 10,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 50',
    special: 'Restricted (Azlanti Star Empire)'
  }
}

//https://www.aonsrd.com/Starship_ExpBays.aspx?ItemName=All&Family=None
const expansionBays = {
  'Aeon Comm': {
    pcuCost: 5,
    bpCost: 3,
    source: 'Starfinder #7: The Reach of Empire pg. 47',
    description: "An aeon comm is a cylindrical booth constructed of resonant crystal that allows remote observation of and communication to space around an aeon stone. A pedestal in the center of the booth can hold one aeon stone, and as an action, a user can mystically connect that stone to the nearest stone of the same type with a system-wide range. Alternatively, a user can attune the booth to a known aeon stone of the same type in the same system. In either case, the booth creates an invisible magical sensor centered on the targeted aeon stone. The booth's crystal reflects the targeted stone's visual and auditory surroundings as if the user were standing at the stone's location. This view doesn't move unless the targeted stone does, but a viewer can turn within the booth to observe the area as desired. A user within the booth can activate the aeon comm's communication function to speak through the targeted aeon stone, and unlike with technological system-wide communications, the message is transmitted instantaneously."
  },
  Amenities: {
    pcuCost: 4,
    bpCost: 2,
    source: 'Near Space pg. 114',
    description: 'In luxury cruise liners, residential starships, and other Huge or larger starships with large crews, some expansion bays are devoted to businesses that serve the population. An amenity might be a high-end restaurant or spa, a night club or theater, or a shopping center. If using downtime rules, an amenity can provide a +1 bonus to all skill checks for one downtime activity, selected when the amenity is installed.'
  },
  'Arcane Laboratory': {
    pcuCost: 1,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'An arcane laboratory contains all the tools and space necessary to craft magic items (see page 235), though the crafter must still provide the necessary raw materials. Such a laboratory reduces the crafting time by half.'
  },
  'Arcane Mortuary': {
    pcuCost: 1,
    bpCost: 2,
    source: 'Starship Operations Manual pg. 24 & Starfinder #6: Empire of Bones pg. 49',
    description: 'An arcane mortuary contains equipment that aids spellcasters in creating undead. A spellcaster using this mortuary must still provide any special materials required for undead creation. Undead created in an arcane mortuary have 10% more Hit Points than a typical undead creature of the same CR. An arcane mortuary can also store up to five Medium or smaller corpses without them deteriorating due to time. One Large corpse can be stored in place of two Medium ones.'     
  },
  'Biological Experimentation Chamber': {
    pcuCost: 5,
    bpCost: 9,
    source: "Starfinder #27: Deceivers' Moon pg. 47",
    description: 'Gray starships are often equipped with a room designed for the study of—and experimentation on—biological creatures. A biological experimentation chamber can be used as either a medical bay or a life science lab but can only be used on organisms that have first been subjected to examination in the chamber, a painful and invasive process that takes 1 hour.'
  },
  'Booster Thruster Housing': {
    pcuCost: 0,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 24',
    description: "When properly reinforced to absorb the strain, an expansion bay along a starship's aft or sides can house additional thrusters and fuel tanks (the thrusters must be purchased separately and be an appropriate size for the starship) as well as separate fuel tanks. During starship combat, the pilot can activate these additional thrusters before moving the starship during the helm phase as part of their crew action. When activated, the additional boosters increase the starship's speed by an amount equal to the boosters' listed speed divided by 4 (rounded down) and increase the DC of Piloting checks to perform stunts that round by an equal amount. The boosters' supplemental fuel supply can power them for 5 rounds, after which the thrusters need 24 hours to recharge from the ship's power core. A starship can have only one such additional booster active at a time."
  },
  'Breaching Pod, Autonomous Combatants': {
    pcuCost: 5,
    bpCost: 7,
    source: 'Starship Operations Manual pg. 24',
    description: 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \n' +
    "Expended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod's BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \n" +
    "By increasing a breaching pod's BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. "
  },
  'Breaching Pod': {
    pcuCost: 5,
    bpCost: 5,
    source: 'Starship Operations Manual pg. 24',
    description: 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \n' +
    "Expended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod's BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \n" +
    "By increasing a breaching pod's BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. "
  },
  'Breaching Pod, Skilled Autonomous Combatants': {
    pcuCost: 5,
    bpCost: 9,
    source: 'Starship Operations Manual pg. 24',
    description: 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \n' +
    "Expended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod's BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \n" +
    "By increasing a breaching pod's BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. "
  },
  'Breaching Pod, Specialized Autonomous Combatants': {
    pcuCost: 5,
    bpCost: 11,
    source: 'Starship Operations Manual pg. 24',
    description: 'These high-speed pods can each transport up to two Huge creatures, four Large creatures, or eight Medium or smaller creatures at high velocity toward another vessel with the intention of forcefully boarding that starship. A breaching pod travels in the same way as a long-range tracking weapon with a speed of 8, but its size and composition make it unable to pierce functioning shields. When a breaching pod strikes an unshielded quadrant, it deals 1d6 damage to the target, bypassing any Damage Threshold. The occupants—protected in robust safety harnesses so as to avoid damage from the collision—can then disembark and begin boarding combat on the following round, though the breaching pod is damaged to the point of being inoperable. A breaching pod that fails to hit its target functions as an escape pod and can be retrieved for reuse. Outside of starship combat, a breaching pod can serve as a crude shuttle to dock with a disabled or willing vessel without destroying the pod. \n' +
    "Expended breaching pods are replaced automatically whenever the starship is upgraded to the next tier. A breaching pod can also be replaced as though the crew were repairing damage to the starship, using the breaching pod's BP cost as the number of Hull Points to be repaired. A starship that also has a tech workshop expansion bay halves the time needed to replace a breaching pod. \n" +
    "By increasing a breaching pod's BP cost to 7, the pod is automatically outfitted with robotic combatants that function as a typical boarding crew. By increasing the price to 9 or 11 BP, the robots function as skilled or specialized combatants, respectively, for the purpose of calculating their boarding attack modifier. "
  },
  Brig: {
    pcuCost: 1,
    bpCost: 1,
    source: 'Pact Worlds pg. 153',
    description: 'A brig contains all the necessary restraints and security systems to incarcerate up to eight Medium creatures.'
  },
  'Cargo Hold': {
    pcuCost: 0,
    bpCost: 0,
    source: 'Starfinder Core Rulebook pg. 298',
    description: "Unconverted expansion bays count as cargo holds. A cargo hold can contain approximately 25 tons of goods, with no item being larger than Large. A starship with multiple cargo holds can hold larger objects; usually 4 contiguous cargo holds are required to hold Huge objects and 8 for Gargantuan objects. These size restrictions can be overridden at the GM's discretion."
  },
  'Combat Training Facility, Advanced': {
    pcuCost: 5,
    bpCost: 8,
    source: 'Starship Operations Manual pg. 24',
    description: "This specialized gym and miniature arena provides an array of holographic threats, tactical dilemmas, and automated combat simulations that help crew members practice close-quarters tactics and self-defense. This facility also adds several caches of weapons and armor spread throughout the starship, ensuring that the crew always have essential armaments close at hand in the event of an emergency. A basic combat training facility improves the crew's battle readiness, treating them as skilled (and granting a bonus) when resolving boarding events (page 40). Specialized and elite combat training facilities incorporate much more complicated simulations and rigorous protocols, and the crew are treated as specialized or elite, respectively, when resolving boarding encounters. "
  },
  'Combat Training Facility, Basic': {
    pcuCost: 3,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 24',
    description: "This specialized gym and miniature arena provides an array of holographic threats, tactical dilemmas, and automated combat simulations that help crew members practice close-quarters tactics and self-defense. This facility also adds several caches of weapons and armor spread throughout the starship, ensuring that the crew always have essential armaments close at hand in the event of an emergency. A basic combat training facility improves the crew's battle readiness, treating them as skilled (and granting a bonus) when resolving boarding events (page 40). Specialized and elite combat training facilities incorporate much more complicated simulations and rigorous protocols, and the crew are treated as specialized or elite, respectively, when resolving boarding encounters. "
  },
  'Combat Training Facility, Elite': {
    pcuCost: 5,
    bpCost: 10,
    source: 'Starship Operations Manual pg. 24',
    description: "This specialized gym and miniature arena provides an array of holographic threats, tactical dilemmas, and automated combat simulations that help crew members practice close-quarters tactics and self-defense. This facility also adds several caches of weapons and armor spread throughout the starship, ensuring that the crew always have essential armaments close at hand in the event of an emergency. A basic combat training facility improves the crew's battle readiness, treating them as skilled (and granting a bonus) when resolving boarding events (page 40). Specialized and elite combat training facilities incorporate much more complicated simulations and rigorous protocols, and the crew are treated as specialized or elite, respectively, when resolving boarding encounters. "
  },
  'Conference and Meeting Rooms': {
    pcuCost: 1,
    bpCost: 1,
    source: 'Near Space pg. 114',
    description: 'Installed with top-notch telecommunication equipment (including integral system-wide comm units), this high-end office space is often featured in starships used to transport government officials or top business leaders. Starships with this expansion bay can even host sizable conferences.'
  },
  'Corpse Recycler': {
    pcuCost: 2,
    bpCost: 2,
    source: 'Starship Operations Manual pg. 24 & Starfinder #6: Empire of Bones pg. 49',
    description: 'A corpse recycler allows a starship crew to render bodies into parts for necrografts. In a process that takes 1 hour, a carcass fed into the recycler produces a number of necrograft UPBs equal to 10 x the CR of the creature from which the corpse originated. These UPBs can be used only to create necrografts.'
  },
  'Cryo-chamber': {
    pcuCost: 10,
    bpCost: 5,
    source: 'Starship Operations Manual pg. 25',
    description: 'This high-tech chamber allows biological organisms to enter a form of stasis via a rapid freezing process and be sustained in pods for a long duration. Cryo-chambers can be set to keep an organism in stasis for a set duration, indefinitely, or until certain conditions are met, such as arrival at a navigational milestone or if the vessel comes under attack. During the days before Drift travel, most starship crews used these chambers to survive the months-long trips between destinations. Some exploration ships still use cryo-chambers in lieu of crew quarters, particularly those that regularly travel in the Vast. The Azlanti Star Empire has developed its own variation on the cryo-chamber, which is more compact but virtually unknown outside of Azlanti space. \n' +
    'A cryo-chamber can hold up to eight Medium or smaller creatures or four Large creatures in stasis for as long as the systems have adequate power. A cryo-chamber can instead be outfitted to hold a single Huge or Gargantuan creature, and two cryo-chambers can be combined to hold a single Colossal creature. \n' +        
    "While in stasis in a cryo-chamber, a creature no longer advances on affliction tracks, and doesn't suffer from starvation, thirst, or sleep deprivation. Placing a creature in stasis or removing it from stasis takes 1 hour, after which the creature is sickened for 1 day unless it succeeds at a DC 25 Fortitude save"    
  },
  'Cultural Preparation Facility': {
    pcuCost: 3,
    bpCost: 2,
    source: "Starfinder #27: Deceivers' Moon pg. 47",
    description: "This expansion bay serves as a training facility and database for agents preparing to infiltrate a group or species. Clothing and personal items can be crafted in half the normal time at a cultural preparation facility, though the crafter must still provide the necessary raw materials. The facility's computer system also trains personnel in the languages and accents, cultural behaviors, social norms, and even body language and facial expressions of the group the users expect to infiltrate. To use this aspect of a cultural preparation facility, a creature chooses a single species or cultural group and then spends three 8-hour sessions (which can be over the course of several days) within the facility. After this time, for 1 day, the creature has a +2 circumstance bonus on Culture checks relating to the chosen species or cultural group. In addition, the creature can replace one of the languages it knows (except for Common, their racial tongue, or the language of their home planet) with a language spoken by the chosen species or cultural group. At the GM's discretion, the cultural preparation facility might not be able to teach a rare or unusual language."
  },
  'Decoy Husk': {
    pcuCost: 15,
    bpCost: 4,
    source: 'Starfinder #20: The Last Refuge pg. 48',
    description: 'A decoy husk is a living case that can be regrown when ejected from a starship, expands to mimic that vessel and flies in another direction. This expansion takes up one bay in a Small starship, two in a Medium or Large vessel, three in a Huge starship, four in a Gargantuan craft, and five in a Colossal one. Super-colossal vessels cannot install or use this expansion. Once a decoy husk has been deployed, it cannot be recovered, and it takes the deploying vessel a week to grow another decoy. \n' +
    "A crew member must deploy the decoy as a crew action during the helm phase. Other vessels that fail a Computers check (DC = 10 + the deploying crew member's Computers bonus) to scan the deploying vessel and its decoy cannot tell the two apart, although this scan can be repeated during each helm phase. The decoy moves in an evasive trajectory chosen by the deploying crew and at the deploying vessel's speed, and it generates Shield Points equal to its cost in Build Points, but these shields falsely mimic those of the deploying starship when scanned. The decoy can't attack, and it has a number of Hull Points equal to 20% of the deploying starship's Hull Points. \n" +
    "A decoy husk can also be used as weapon. If it enters the hex of another vessel, a crew member aboard the deploying starship can make a gunnery check against the target's TL. On a hit, the decoy explodes, dealing damage according to its size—Small: 5d8; Medium: 5d10; Large: 10d8; Huge: 2d6 x 10; Colossal: 2d8 x 10. If the attack misses, the decoy is still destroyed in the resulting explosion."
  },
  'Dedicated Computer Housing': {
    pcuCost: 0,
    bpCost: 2,
    source: 'Starship Operations Manual pg. 25',
    description: "An expansion bay can be outfitted with power conduits and wires needed to house an additional mononode computer core (which must be purchased separately). This additional computer has an integrated control module (ICM) that is dedicated to a single starship combat crew action (for example, an engineer's checks to divert or a gunner's check to fire at will), chosen when the computer is installed. The ICM grants its flat circumstance bonus once per round to the check for the chosen starship combat action. This bonus does not stack with the circumstance bonus granted by the main computer's ICM."
  },
  'Docking Canopy': {
    pcuCost: 15,
    bpCost: 4,
    source: 'Starfinder #20: The Last Refuge pg. 48',
    description: 'A docking canopy is a branch- or vine-like formation that allows up to four Tiny or two Small starships to attach to a Huge or larger biomechanical starship. The canopy takes up two expansion bays, and one can fulfill the hangar requirement for a carrier-class vessel. The starships attached to the docking canopy move with the larger ship, and the canopy provides a narrow passage between each docked starship and the larger vessel. Moving through this passage to the vessel to which the docking canopy is attached or back to the attached smaller ship takes 1 round of starship combat or 10 minutes. In addition, if the larger starship benefits from self-repair while vessels are docked, an engineer attending the process can amass the repair capabilities of the starship and any docked biomechanical craft as a pool of Hull Points; the engineer can then distribute these Hull Points among the starships linked by the docking canopy. \n' +
    "A docking canopy doesn't enclose docked ships the way a hangar bay does. Therefore, a science officer can use the target system crew action to target a docked vessel instead of a specific system on the starship that has the docking canopy as an expansion."
  },
  'Drift Booster': {
    pcuCost: 40,
    bpCost: 20,
    source: 'Starship Operations Manual pg. 36',
    description: "A Drift booster is a rail for launching smaller ships into the Drift from within a Supercolossal vessel's hangar bay. A smaller ship that launches from within the Supercolossal vessel's hangar bay using the Drift booster can temporarily raise its Drift engine rating by 1. This increase lasts only as long as the smaller ship stays in the Drift and on the same course after launching using the Drift booster. If the boosted ship changes course or leaves the Drift, this temporary increase ends."
  },
  'Drift Shadow Projector': {
    pcuCost: 5,
    bpCost: 15,
    source: 'Pact Worlds pg. 153',
    description: "Created by the Hellknights to aid them in capturing enemy vessels, this device creates an area of “Drift shadow” when activated. The Drift shadow extends out to a range of 10 hexes from the activating ship, and each vessel in this area treats the Drift rating of its engine as if it were 2 lower. If this reduces the engine's rating to less than 1, that vessel cannot enter the Drift while in the shadow. Ships attempting enter normal space from the Drift into an area of Drift shadow are affected in the same way. Shadows created by multiple vessels stack, making it impossible for any ship to enter or exit the Drift."
  },
  'Drift Stasis Unit': {
    pcuCost: 15,
    bpCost: 10,
    source: 'Starfinder #7: The Reach of Empire pg. 47',
    description: "Used in the Azlanti Star Empire for moving large numbers of troops efficiently, a Drift stasis unit holds living creatures in a state of suspended animation ideal for long periods of Drift travel. Placing creatures into stasis or removing them from stasis takes 1 hour. An unwilling creature can be placed in a Drift stasis unit only if it is unconscious. While in stasis, a creature is unconscious and doesn't need to breathe, drink, or eat. One stasis unit can hold 32 Medium creatures in stasis for 30 days with no ill effects. (A Large creature counts as 2 Medium ones for this purpose.) \n" +
    'After 30 days, creatures held in stasis are at risk of Drift stasis sickness, a disease with the parameters shown in the stat block below. '
  },
  'Drone Tube': {
    pcuCost: 15,
    bpCost: 5,
    source: 'Starfinder #7: The Reach of Empire pg. 47',
    description: "A drone tube is a hangar modification designed to facilitate the use of automated drones, such as the Klokworx drone. A drone tube can be installed only in an existing hangar bay and doesn't take up additional expansion bays. If a hangar bay has a drone tube, the bay can hold one additional Tiny starship, but five of those ships must be drones. One hangar bay can hold up to two drone tubes and thereby hold up to ten drones. \n" +
    "Each drone tube can launch up to two drones per round of starship combat. To launch a drone, a science officer can take an action during the helm phase to attempt a Computers check (DC = 10 + the tier of the launching ship). If the science officer succeeds, up to two drones emerge in different hexes adjacent to the launching ship, and the drones can act last in the helm and gunnery phases of that same round. On a failure, the drones still emerge but don't act until the next round. In either case, each round after a drone is launched, the drone attempts its own Piloting check to determine when it acts. \n" +
    "The drone tube also facilitates the launching ship's communications with its drones in combination with the vessel's sensors. A science officer on a ship that has active drones can take an action during the helm phase to aid drone attacks. If the science officer succeeds at a Computers check (DC = 10 + 1-1/2 x the launching ship's tier), up to five of the ship's drones can use that science officer's ranks in the Computers skill plus the officer's Intelligence modifier for gunnery checks during the next gunnery phase. \n" +
    "A science officer can take an action during the helm phase to jam drone communications. Doing so takes an improve countermeasures action, targeting the drone-launching ship. Succeeding at this check means the target's drones can't benefit from an action to aid drone attacks until the next round."
  },
  'Drop Pod, Colossal': {
    pcuCost: 10,
    bpCost: 10,
    source: 'Starship Operations Manual pg. 25',
    description: "A drop pod is a reinforced vehicle designed to transport a group of soldiers or small vehicles from a starship orbiting high above a planet to that planet's surface. Each drop pod is a single-use device equipped with heat shields to deflect the heat of atmospheric entry as well as thrusters strong enough to make small course corrections and slow the rate of descent before reaching the surface."
  },
  'Drop Pod': {
    pcuCost: 5,
    bpCost: 5,
    source: 'Starship Operations Manual pg. 25',
    description: 'A typical expansion bay can store and launch one Gargantuan drop pod that can hold up to four Huge creatures, eight Large creatures, or 16 Medium or smaller creatures or vehicles. Alternatively, an expansion bay can be outfitted with two Huge drop pods. A Colossal drop pod takes up two expansion bays, costs twice as many PCU and BP, and doubles the number of creatures and vehicles the pod can carry (or allows the drop pod to carry up to four Gargantuan creatures). ' 
  },
  'Escape Pods': {
    pcuCost: 2,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'Escape pods give the crew of a severely damaged or destroyed starship a way to avoid imminent death. An escape pod fits one Medium or smaller creature and has enough supplies and life-support capacity for that creature to survive for 7 days. It is also fitted with a distress beacon that is easily identified by long-range scanners. An escape pod has heat shields that allow it to crash-land on a planet with an atmosphere, but no means of propulsion. A single expansion bay can be converted into six escape pods.'
  },
  'External Expansion Bay': {
    pcuCost: 0,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 25',
    description: "A starship can increase its number of expansion bays by attaching additional modules to its exterior or towing them. The additional mass and volume of external expansion bays reduce the starship's maneuverability; increase the turn distance of a starship by 1 for every three external expansion bays it has, rounded up. External expansion bays can be installed only on a Small or larger starship, and the number of external expansion bays cannot exceed the number of expansion bays provided by the starship's base frame."
  },
  'Fuel Synthesizer': {
    pcuCost: 4,
    bpCost: 1,
    source: 'Starfinder #42: Whispers of the Eclipse pg. 50',
    description: 'The empire developed miniaturized fuelprocessing plants that extracted usable hydrocarbons for fuel and compressible gases for thrusters. When paired with a robotic appendage system (Starship Operations Manual 29) to retrieve and load material, a ship could travel from planet to planet, processing its own fuel.'
  },
  'Ghost Drive': {
    pcuCost: 10,
    bpCost: 5,
    source: 'Starship Operations Manual pg. 26 & Starfinder #6: Empire of Bones pg. 49',
    description: "A ghost drive can be installed only on a Large or smaller starship. During the helm phase, as a crew action, a science officer can attempt a Computers check (DC = 10 + 1-1/2 x the starship's tier) to activate the ghost drive. If the check is successful, the ghost drive becomes active and the vessel in which it is installed becomes insubstantial. \n" +
    "An active ghost drive has several effects in starship combat. The drive pulls power from the thrusters, so the insubstantial starship's speed is 2 lower and its distance between turns is 1 higher. An insubstantial starship can move through hexes containing enemy starships without allowing those foes to make free attacks; conversely, the insubstantial starship can't make free attacks on ships that pass through its hex. The starship's science officer can freely deactivate the ghost drive at the beginning of the helm phase; otherwise, the effect continues indefinitely."
  },
  'Guest Quarters': {
    pcuCost: 1,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'Starships that function as passenger vessels require spaces apart from their crew quarters for their guests to sleep. A single expansion bay can be converted into common quarters (usually simple bunks or hammocks) for six passengers, good quarters (usually a comfortable bed, a desk with a chair, and a small set of drawers) for four passengers, or luxurious quarters (usually a large bed, a wardrobe, a couch, a desk with a nice chair, and a private washroom) for two passengers.'
  },
  'Habitat Simulator': {
    pcuCost: 4,
    bpCost: 6,
    source: "Starfinder #27: Deceivers' Moon pg. 47",
    description: 'This expansion bay can be configured to duplicate various environments, simulating them down to the smallest detail. The simulator is primarily used to clandestinely move creatures without their knowledge. For example, the grays have transplanted individuals threatened by natural disaster or environmental concerns without revealing their own existence. When used for this purpose, the simulator even slowly changes the appearance of stars in the sky until they match the night sky of the location to which the creatures in the simulator will be moved. The bay can also be used to covertly observe creatures in a simulation of their natural environment, benefiting from greater control over environmental effects such as weather. A habitat simulator can hold up to four Medium creatures (while still providing a believable simulation) and takes up 3 expansion bays. The simulator can sustain a particular environment for 1 month before it needs to be cleaned out, refreshed, and resupplied.'
  },
  'Hanger Bay': {
    pcuCost: 30,
    bpCost: 10,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'A hangar bay can be installed only in a Gargantuan or larger starship and takes up 4 expansion bays. A hangar bay provides a place for up to 8 Tiny starships to dock.'
  },
  'Healing Pods': {
    pcuCost: 2,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 26 & Starfinder #20: The Last Refuge pg. 48',
    description: 'Healing pods can be installed only in a biomechanical starship. \n' +
      "A biomechanical starship can channel energy from its self-repair mechanism to its parts, including its healing pods. These pods benefit any creature that rests in them whenever the biomechanical starship's self-repair criteria are met. A creature that does so regains twice the number of ability points or Hit Points it would by healing naturally. Resting in a healing pod also grants a creature a +2 circumstance bonus to Constitution checks for long-term stability and saving throws against diseases, drugs, and poisons for 24 hours. A healing pods expansion bay contains six pods that can each accommodate a Medium or smaller creature. A Large pod can be installed in place of two Medium ones."
  },
  'Hive Bay': {
    pcuCost: 5,
    bpCost: 10,
    source: 'Pact Worlds pg. 153',
    description: "Xenowarden capital ships have the ability to launch pod ships to use as shuttles or other short-range vessels. A hive bay can launch up to two pod ships. For each pod launched in this way, the arkship loses 15 Hull Points and takes a -2 penalty to its AC and TL, and all crew actions take a -2 penalty. As long as the capital ship has an unoccupied slot in a hive bay, it can reabsorb a pod ship to regain these Hull Points and negate the penalties. If the pod returns damaged, the capital vessel regains 1 fewer Hull Point for every 2 points of Hull Point damage taken by the pod ship. The penalties are negated regardless of the pod ship's condition."
  },
  'Hydroponic Garden': {
    pcuCost: 0,
    bpCost: 5,
    source: 'Pact Worlds pg. 153',
    description: 'This space holds an entirely self-sustaining garden, complete with oxygen recycling, food production, and lighting that fosters advanced growth. A hydroponic garden takes up two expansion bays and can provide food for up to 10 Medium-sized creatures indefinitely, even if the rest of the vessel is without full power or propulsion. Multiple hydroponic gardens can be linked together to form one massive garden space.'
  },
  'Imperial Shrine': {
    pcuCost: 1,
    bpCost: 1,
    source: 'Starfinder #7: The Reach of Empire pg. 47',
    description: 'A shrine venerating the history and legacy of the Azlanti Star Empire encourages patriotism and obedience among imperial citizens and servants. Once per starship combat, during a captain action that targets fellow crew members, the captain of a vessel that has an imperial shrine can evoke the Aeon Throne. If the captain does so, provided the targeted crew members are Azlanti citizens or have positive associations with the Aeon Throne, the captain gains a +4 circumstance modifier to the skill check the captain action requires.'
  },
  Industry: {
    pcuCost: 40,
    bpCost: 10,
    source: 'Near Space pg. 114',
    description: "As functioning factories or industrial centers, some starships allow a specific Profession skill to be used to make money during voyages (or, at a GM's discretion, a set of linked Professions), though money earned is not collected until the starship makes port at a major settlement. For example, mining starships often feature a refinery, since miners can efficiently purify the metals or other mined substances onboard before transporting the refined product. Starships with industry bays can go directly to a construction or market area on another planet to sell goods without needing to return to a home planet first."
  },
  'Launch Tubes': {
    pcuCost: 10,
    bpCost: 5,
    source: 'Pact Worlds pg. 153',
    description: "Designed to fit on Medium and Large vessels, these tubes allow a ship to carry a single smaller vessel that can be launched at the start of any helm phase. A launch tube takes up two expansion bays and can hold one Tiny starship. If a vessel needs to dock in a launch tube during combat, it occurs at the end of the helm phase and requires a successful DC 10 Piloting skill check; this check takes a -1 penalty for each hex the smaller ship has moved this round. A failed check means that the ship doesn't dock with the larger vessel."
  },
  'Life Boats': {
    pcuCost: 5,
    bpCost: 3,
    source: 'Starfinder Core Rulebook pg. 299',
    description: "A life boat is a more sophisticated version of an escape pod. It has room for one Large creature, or two Medium or smaller creatures, and enough supplies to last those passengers 15 days (or 30 days of supplies for one Medium or smaller creature). While it has the same kind of distress beacon as an escape pod, a life boat also has an on-board computer that automatically detects the nearest hospitable celestial body and minimal thrusters to get the craft there (though a life boat can't participate in starship combat). A single expansion bay can be converted into two life boats."
  },
  'Medical Bay': {
    pcuCost: 4,
    bpCost: 8,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'A medical bay functions as a medical lab (see page 220).'
  },
  Park: {
    pcuCost: 1,
    bpCost: 2,
    source: 'Near Space pg. 114',
    description: "Parks are common on starships designed to spend years between ports and include native plant life from one or more planets with compatible biomes. Parks are lighted, irrigated, and ventilated to replicate terrestrial conditions. Many crew members stationed on starships for long periods avoid cabin fever by spending time in a park expansion bay. Parks typically include a hydroponic system for plants as well as benches, walkways, and sometimes games or playgrounds if families are on board. Abilities that require a natural or wild environment (such as a trailblazer weapon's ability to ignore natural cover) function within a park."
  },
  'Passenger Seating': {
    pcuCost: 0,
    bpCost: 0,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'An expansion bay can be converted into rows of seating for passengers at no cost. A single expansion bay can hold seating for 16 Medium passengers (though seats can be built for larger creatures). This upgrade is appropriate only for taking many passengers on short trips; starships on journeys lasting multiple days should instead have guest quarters installed.'
  },
  'Power Core Housing': {
    pcuCost: 0,
    bpCost: 10,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'An expansion bay can be set aside for an additional power core (which must be purchased separately) and the associated wiring and safety apparatuses. A power core housing can be installed on only a Medium or larger starship.'
  },
  'Quantum Defender': {
    pcuCost: 'Special',
    bpCost: 'Special',
    source: 'Starship Operations Manual pg. 26 & Starfinder #7: The Reach of Empire pg. 47',
    description: "A quantum defender enables a starship to enter an unpredictable quantum state for a short time, enabling it to phase in and out of existence at just the right time to avoid harm. During the helm phase, as a crew action, a science officer can activate the quantum defender by succeeding at a Computers check (DC = 10 + 1-1/2 x the starship's tier). While the quantum defender is active, if an attack would normally hit the ship, the attacker must reroll the gunnery check and take the lower result. After that reroll, or at the end of a round during which no such reroll occurs, the ship returns to its normal state as the quantum defender deactivates. \n" +
    "A quantum defender's BP cost is equal to 4 x the starship's size category (for the purpose of this calculation, Tiny = 1, Small = 2, Medium = 3, etc.) or 10 BP, whichever is greater. A quantum defender's PCU requirement is either 20 or is equal to 5 x the starship's size category, whichever is greater."
  },
  'Quick-skip Module': {
    pcuCost: 10,
    bpCost: 5,
    source: 'Tech Revolution pg. 50',
    description: "Essentially a miniature onos drive, a quick-skip module can be activated at a moment's notice to skip a starship forward a short distance. During the helm phase, as a crew action, a science officer can activate the quick-skip module by succeeding at a Computers check (DC = 10 + 1-1/2 x the starship's tier). If successful, the ship moves 1d3+2 hexes in the direction of its facing, moving safely past any obstacles or ships in its way. If this movement would end in a hex occupied by an object, including another ship, the skipping ship and the object take damage equal to 5 x the skipping ship's tier, and the skip ends in the nearest unoccupied hex."
  },
  'Recreation Suite, Gym': {
    pcuCost: 0,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'A recreation suite includes entertainments that help the crew (or passengers) relax and blow off steam. These diversions can be wide-ranging, with some consuming more PCU than others (see the table on page 300). Example recreation suites include a gym, sparring arena, or other exercise area; a trivid den or other comfortable space in which to consume passive entertainment; or a holographic amusement chamber (or HAC), vidgame arcade, or other high-tech interactive entertainment center.'
  },
  'Recreation Suite, HAC': {
    pcuCost: 3,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'A recreation suite includes entertainments that help the crew (or passengers) relax and blow off steam. These diversions can be wide-ranging, with some consuming more PCU than others (see the table on page 300). Example recreation suites include a gym, sparring arena, or other exercise area; a trivid den or other comfortable space in which to consume passive entertainment; or a holographic amusement chamber (or HAC), vidgame arcade, or other high-tech interactive entertainment center.'
  },
  'Recreation Suite, Trivid Den': {
    pcuCost: 1,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'A recreation suite includes entertainments that help the crew (or passengers) relax and blow off steam. These diversions can be wide-ranging, with some consuming more PCU than others (see the table on page 300). Example recreation suites include a gym, sparring arena, or other exercise area; a trivid den or other comfortable space in which to consume passive entertainment; or a holographic amusement chamber (or HAC), vidgame arcade, or other high-tech interactive entertainment center.'
  },
  'Recycling System': {
    pcuCost: 2,
    bpCost: 1,
    source: 'Starship Operations Manual pg. 36',
    description: 'A recycling system enables a Supercolossal starship to be nearly self-sustaining, operating independently for decades or even centuries. A combination of smelters, biomass processors, manufacturing, and UPB converters allows the ship to convert almost all its waste into goods and materials.'
  },
  'Sample Acquisition Bay': {
    pcuCost: 7,
    bpCost: 10,
    source: "Starfinder #27: Deceivers' Moon pg. 47",
    description: "This bay is equipped with a hybrid tractor beam that quickly pulls a target into the vessel. This beam can target a Large or smaller creature (or object of similar size) that is within 500 feet and visible to the starship's sensors. However, the beam can't be activated if the vessel is in starship combat. While within the beam, the target's molecules are phased slightly, rendering the target incorporeal. The beam moves the target from its original position into the bay (or vice versa) over 2 rounds. If the target is conscious and unwilling, it can attempt a Fortitude saving throw (DC = 10 + 1-1/2 x the starship's tier) when it is first struck with the beam to negate its effect."
  },
  'Science Lab': {
    pcuCost: 2,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'A science lab contains scientific apparatuses and other laboratory equipment to aid in the research of certain topics. A general science lab provides a +1 circumstance bonus to Life Science and Physical Science checks (and is called a general science lab), a life science lab provides a +2 circumstance bonus to Life Science checks, and a physical science lab provides a +2 circumstance bonus to Physical Science checks. The lab type is chosen when the expansion bay is converted.'
  },
  'Sealed Environment Chamber': {
    pcuCost: 2,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'Occasionally, a starship will need to host an alien or other creature whose biology is radically different from that of the crew. The passenger might be able to breathe only methane gas or can survive in only below-freezing temperatures. In such a case, a sealed environment chamber is required for the passenger to remain comfortable (and alive).'
  },
  'Shuttle Bay': {
    pcuCost: 10,
    bpCost: 4,
    source: 'Starfinder Core Rulebook pg. 299',
    description: 'A shuttle bay can be installed only in a Huge or larger starship and takes up two expansion bays. A shuttle bay provides a place for a Small or smaller starship to dock.'
  },
  'Smuggler Compartment': {
    pcuCost: 4,
    bpCost: 2,
    source: 'Starfinder Core Rulebook pg. 299',
    description: "Smuggler compartments are cargo holds hidden behind false bulkheads and are shielded from most scanning, allowing a starship equipped with them to haul illegal goods without detection. A smuggler compartment can contain 10 tons of goods, with no item being larger than Medium. A creature on the starship must succeed at a DC 20 Perception check to detect a basic smuggler compartment on the starship. A creature scanning the starship must succeed at a DC 20 Computers check to detect one (this additional check is part of the science officer's scan action in starship combat; see page 325). For each Build Point spent over the base cost, these DCs increase by 5 (maximum DC 50), though the amount of power the compartment uses also increases by 1."
  },
  'Surveying Sensors': {
    pcuCost: 3,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 26',
    description: "This room of specialized analytical equipment and sensory technology augments a starship's sensors when scanning planetary bodies, spatial anomalies, debris, and similar phenomena. When scanning such targets, the science officer doubles the bonus to Computers checks granted by the starship's sensors (maximum +8). The surveying sensors also double the range of the starship's sensors to 500 feet while in atmosphere or on planets. The augmented sensors provide no special benefits during starship combat."
  },
  'Synthesis Bay': {
    pcuCost: 2,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 300',
    description: 'A synthesis bay contains all the space and tools required to craft drugs, medicine, or poison (see page 235), though the crafter must still provide the necessary raw materials. A synthesis bay reduces the crafting time by half.'
  },
  'Tactical Sensor Tank': {
    pcuCost: 2,
    bpCost: 1,
    source: 'Starfinder #6: Empire of Bones pg. 46',
    description: "A tactical sensor tank (TST) allows a Supercolossal ship to coordinate the sensor readings of multiple escort craft into a unified picture of surrounding space and then share this information with each starship. Science officers can use a TST to link the sensors of any number of allied vessels in range of the TST-equipped ship's sensors. The sensor range for all linked ships extends as far as the farthest-reaching range among them, since the TST system collects data from linked vessels, correlates possible sensor targets, and sends that information to all linked ships."
  },
  'Tech Workshop': {
    pcuCost: 3,
    bpCost: 1,
    source: 'Starfinder Core Rulebook pg. 1',
    description: 'A tech workshop contains all the space and tools necessary to craft technological items (see page 235), though the crafter must still provide the necessary raw materials. Such a workshop reduces the crafting time by half.'
  },
  'Telelith Matrix': {
    pcuCost: 10,
    bpCost: 8,
    source: 'Alien Archive 3 pg. 111',
    description: 'A telelith matrix contains bizarre fibers that flex when they build up enough energy. When they do, they can hurl the connected starship through a temporary wormhole. A telelith matrix takes 1 expansion bay, consumes 10 PCUs, and costs 8 Build Points. A telelith matrix works only in starships of Large or smaller size. \n' +
      'Allows for Telelith Gambit (Stunt)'
  },
  'Thrusters Primer': {
    pcuCost: 5,
    bpCost: 1,
    source: 'Starship Operations Manual pg. 27',
    description: "By dedicating additional space to the thrusters and related systems, a starship can vastly decrease the amount of time needed for its thrusters to warm up and engage. The thrusters primer reduces the time needed to start the thrusters from 1 minute per size category to 1 round per size category, allowing even immense starships to finish the ignition sequence in less than a minute. During the first engineering phase of starship combat, a thrusters primer grants a short boost to a starship's propulsion, automatically increasing the starship's speed by 2 as though the engineer had used the divert action to direct power to the engines."
  },
  Vault: {
    pcuCost: 3,
    bpCost: 2,
    source: 'Near Space pg. 114',
    description: "Some crews need a secure vault to store valuables. Breaking into a vault generally requires two skill checks (determined by the GM, though Computers and Engineering are common) with a DC equal to 10 + 1-1/2 x the ship's tier. Failing either check by 5 or more sets off alarms, alerting the whole ship."      
  }
}

//https://www.aonsrd.com/StarshipHulls.aspx
const fortifiedHulls = {
  'Steel composite': {
    ctBonus: 1,
    bpCost: 2,
    source: 'Starship Operations Manual pg. 21'
  },
  'Adamantine alloy': {
    ctBonus: 2,
    bpCost: 4,
    source: 'Starship Operations Manual pg. 21'
  },
  'Nanocarbon plate': {
    ctBonus: 3,
    bpCost: 6,
    source: 'Starship Operations Manual pg. 21'
  },
  'Polycarbon plate': {
    ctBonus: 4,
    bpCost: 9,
    source: 'Starship Operations Manual pg. 21'
  },
  'Pure adamantine': {
    ctBonus: 5,
    bpCost: 12,
    source: 'Starship Operations Manual pg. 21'
  }
}

//https://www.aonsrd.com/StarshipBulkheads.aspx
const reinforcedBulkheads = {
  'Mk 1': {
    fortification: 10,
    bpCost: 2,
    source: 'Starship Operations Manual pg. 21'
  },
  'Mk 2': {
    fortification: 20,
    bpCost: 3,
    source: 'Starship Operations Manual pg. 21'
  },
  'Mk 3': {
    fortification: 30,
    bpCost: 5,
    source: 'Starship Operations Manual pg. 21'
  },
  'Mk 4': {
    fortification: 40,
    bpCost: 7,
    source: 'Starship Operations Manual pg. 21'
  },
  'Mk 5': {
    fortification: 50,
    bpCost: 10,
    source: 'Starship Operations Manual pg. 21'
  }
}


// Security

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=All&Family=None
const antiHackingSystems = {
  "Mk 1":	{bpCost: 3, source: "Starship Operations Manual pg. 300"},
  "Mk 2":	{bpCost: 6, source: "Starship Operations Manual pg. 300"},
  "Mk 3":	{bpCost: 9, source: "Starship Operations Manual pg. 300"},
  "Mk 4":	{bpCost: 12, source: "Starship Operations Manual pg. 300"},
}

// https://www.aonsrd.com/ComputerMods.aspx?ItemName=All&Family=None
const computerModules = {
  "Spell Chip": {cost: '110% of component spell gem', sfsLegal: true},
  "Control, Complex": {cost: '10% of controlled device', sfsLegal: true},
  "Rakmodoi Computers, Skill": {cost: "10% of computer's base price", sfsLegal: true},
  "Secure Data, Average": {cost: '10 credits', sfsLegal: true},
  "Secure Data, Large": {cost: 'Varies', sfsLegal: true},
  "Secure Data, Specific": {cost: '1 credit', sfsLegal: true},
}

// https://www.aonsrd.com/ComputerMods.aspx?ItemName=All&Family=None
const computerUpgrades = {
  "Artificial Personality":	{cost: "10% of computer's base price", sfsLegal: true},
  "Hardened":	{cost: "50% of computer's base price", sfsLegal: true},
  "Miniaturization": {cost: "10% of computer's base price", sfsLegal: true},
  "Security":	{cost: "Varies", sfsLegal: true},
  "Self-Charging": {cost: "10% of computer's base price", sfsLegal: true},
  "Telepathic User Interface": {cost: "10% of computer's base price", sfsLegal: true},
  "Rakmodoi Computers, Arms":	{cost: 500, sfsLegal: true},
  "Rakmodoi Computers, Mobility Unit, Claws":	{cost: "100 x computer's bulk", sfsLegal: true},
  "Rakmodoi Computers, Mobility Unit, Legs": {cost: "100 x computer's bulk", sfsLegal: true},
  "Rakmodoi Computers, Mobility Unit, Tail": {cost: "100 x computer's bulk", sfsLegal: true},
  "Rakmodoi Computers, Mystic Comm": {cost: 4000, sfsLegal: true},
  "Range, I (100 feet)": {cost: "5 credits", sfsLegal: true},
  "Range, II (1 mile)":	{cost: "50 credits", sfsLegal: true},
  "Range, III (planet wide)": {cost: "100 credits", sfsLegal: true},
}

// https://www.aonsrd.com/ComputerMods.aspx?ItemName=All&Family=None
const computerCountermeasures = {
  Alarm: {
    cost: "Tier of computer",
    sfsLegal: true,
    description: <div>One of simplest countermeasures, this program sends an alert to a specific individual or station if someone attempts to breach the system. If the computer has a control module connected to an actual alarm, this countermeasure can trigger that alarm. If the computer controls a robot, trap, or weapon, an alarm can also activate them.</div>,
  },
  "Fake Shell": {
    cost: "Tier of computer",
    sfsLegal: true,
    description: <p>This particularly cunning countermeasure creates an entirely fake network and system directory for anyone accessing the system that fails to bypass this countermeasure. The phony network has cloned control modules and data modules to make it appear to be the actual system, but the control modules do not actually work and the data modules contain garbage files. A character can uncover this ruse with a successful Computers check with a DC equal to the system's DC + 5. See Detect Fake Shell on page 138 (CRB) for more information.</p>,
  },
  Feedback: {
    cost: "Tier of computer",
    sfsLegal: true,
    description: <p>This countermeasure unleashes insidious virus software into any system that tries to hack it, causing damage to that system and its programming. If you fail a check to hack the computer by 5 or more, any device used in the attempt to break into the system is infected and becomes unreliable, resulting in a -5 penalty to all skill checks involving the infected equipment. You can remove a virus from an infected system if you succeed at a Computers check with the same DC as hacking the computer that has the feedback countermeasure. At the GM's discretion, feedback viruses can have other effects instead, such as granting a +5 circumstance bonus to anyone attempting to hack the infected system.</p>,
  },
  Firewall: {
    cost: "Tier of computer",
    sfsLegal: true,
    description: <p>This countermeasure does nothing to the intruder but instead partitions off modules behind an additional layer of security. Accessing the hidden modules requires another successful Computers check, usually with a DC equal to the original DC + 2. A computer can have multiple firewalls to block off multiple modules, but no one module can be protected by more than a single firewall.</p>,
  },
  Lockout: {
    cost: "Tier of computer",
    sfsLegal: true,
    description: <><p>A lockout countermeasure freezes a system if a user repeatedly fails attempts to access it, causing it to become entirely inaccessible. Generally, this does not mean that the system is powered down, and other modules and countermeasures can still take automated actions. Lockouts last a specified period of time, typically 10 minutes, 1 hour, or 1 day, but any time frame can be specified. A lockout cannot be disabled, even by a user with the correct passwords and credentials. It is possible to bypass a lockout by accessing physical components of the computer, requiring a successful Engineering check with the same DC as the check to hack the computer.</p>
    <p>A standard lockout activates if there are three failed attempts to access or hack the computer within 24 hours. A lockout can be set to allow a different number of failed attempts before activating or to last a different amount of time. If the computer has an alarm, it can be set to inform a specific terminal or communication device when each failed attempt occurs and when the lockout is activated.</p></>,
  },
  "Shock Grid": {
    cost: "Varies",
    sfsLegal: true,
    description: <p>The computer and its surrounding environment are protected by a grid of conductive material that transmits a shock to anyone who fails to access the system. This has two settings: one meant to stun and one meant to kill. Normally, the stun setting happens first, with a warning about lethal force should the intruder make another attempt. The stun setting forces all creatures within 10 feet of the terminal to succeed at a Fortitude saving throw or be stunned for 1 round. The lethal setting affects nearby creatures like the stun setting but also deals electricity damage to all creatures within 10 feet of the computer, allowing a Reflex save for half damage. The save DC, damage dealt, and price all depend upon the rank of the shock grid, as indicated on the below table. Each rank added counts as one countermeasure when determining the total number of countermeasures a system can have. Only computers fixed permanently to a floor or similar surface can have shock grids.</p>,
  },
  Wipe: {
    cost: "Tier of computer",
    sfsLegal: true,
    description: <p>The system deletes specified data when an unauthorized breach is detected. This usually causes a number of data modules to be deleted from the system. Unless the owner is incredibly paranoid, this countermeasure is usually set to trigger only after two or more failed attempts to enter the system (so as to prevent accidental deletion due to a failed password attempt). Wipes don't definitively remove data, however, unless the physical module containing the data is destroyed. Information deleted through a wipe can be recovered with 8 hours of work and a successful Computers check (DC = 10 + the DC to hack the computer).</p>,
  },
};

// https://www.aonsrd.com/ComputerMods.aspx?ItemName=Shock%20Grid&Family=None
const computerShockGrid = {
  1:	{DC: 20,	damage: "8d6",	price: 500},
  2:	{DC: 22,	damage: "10d6",	price: 2000},
  3:	{DC: 24,	damage: "12d6",	price: 5000},
  4:	{DC: 27,	damage: "14d6",	price: 20000},
  5:	{DC: 30,	damage: "16d6",	price: 50000},
}

// https://www.aonsrd.com/Computers.aspx
const computerTiers = {
  1: {price: 50, hackDC: 17},
  2: {price: 250, hackDC: 21},
  3: {price: 1250, hackDC: 25},
  4: {price: 5000, hackDC: 29},
  5: {price: 10000, hackDC: 33},
  6: {price: 20000, hackDC: 37},
  7: {price: 40000, hackDC: 41},
  8: {price: 80000, hackDC: 45},
  9: {price: 160000, hackDC: 49},
  10: {price: 320000, hackDC: 53},
}

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=Advanced&Family=Cloaking
// https://www.aonsrd.com/Starship_Security.aspx?ItemName=Advanced&Family=Gray%20Cloaking%20Device
const cloakingTechnology = {
  "Cut-Rate": {bpCost: 10, pcuCost: 15, sfsLegal: false, source: "Near Space pg. 114", type: "Normal"},
  "Budget": {bpCost: 15, pcuCost: 25, sfsLegal: false, source: "Near Space pg. 114", type: "Normal"},
  "Basic": {bpCost: 25, pcuCost: 40, sfsLegal: false, source: "Near Space pg. 114", type: "Normal"},
  "Advanced": {bpCost: 40, pcuCost: 75, sfsLegal: false, source: "Near Space pg. 114", type: "Normal"},
  "Gray, Cut-Rate": {bpCost: 15, pcuCost: 15, sfsLegal: false, source: "Starfinder #27: Deceivers' Moon pg. 48", type: "Gray"},
  "Gray, Budget": {bpCost: 20, pcuCost: 25, sfsLegal: false, source: "Starfinder #27: Deceivers' Moon pg. 48", type: "Gray"},
  "Gray, Basic": {bpCost: 30, pcuCost: 40, sfsLegal: false, source: "Starfinder #27: Deceivers' Moon pg. 48", type: "Gray"},
  "Gray, Advanced": {bpCost: 45, pcuCost: 75, sfsLegal: false, source: "Starfinder #27: Deceivers' Moon pg. 48", type: "Gray"},
}

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=All&Family=None
const securityCheckboxes = {
  "Biometric Locks": {
    bpCost: 5,
    pcuCost: null,
    sfsLegal: true,
    source: "Starfinder Core Rulebook pg. 300",
    description:
      <p>The systems of a starship with biometric locks can only be used by certain creatures, designated when the locks are installed; this list can be updated by any creature who can gain access to the ship's computer systems. A successful Computers check (DC = 20 + 1-1/2 x the tier of the starship) can bypass these locks.</p>,
  },
  "Self-Destruct System": {
    bpCost: "5 * size category",
    pcuCost: null,
    sfsLegal: true,
    source: "Starfinder Core Rulebook pg. 300",
    description:
      <p>Used most often as a last resort, a self-destruct system completely destroys the starship on which it is installed (as if the ship had taken damage equal to twice its Hull Points), often killing everyone on board. A starship in a hex adjacent to a starship that self-destructs takes an amount of damage equal to half the destroyed starship's maximum Hull Points; this damage can be mitigated by shields. A self-destruct system can be activated only by creatures on the starship (by turning a set of keys, typing in a specific passcode, or other physical means known only to high-ranking members of the crew) and can't be activated remotely via hacking. The activating creatures set a time delay for the destruction (at least 1 round of starship combat).</p>,
  },
  "Emergency Accelerator": {
    bpCost: "4 * size category",
    pcuCost: 5,
    sfsLegal: false,
    source: "Starship Operations Manual pg. 27",
    description:
      <><p>This system allows a starship to rapidly accelerate to a speed that makes combat between starships no longer possible. A starship that successfully engages an emergency accelerator escapes any battle it is in. To accomplish this, the emergency accelerator draws on power from across the starship's many systems, making the starship highly vulnerable for a short period before the acceleration takes effect. An emergency accelerator cannot be activated if the power core or engines have any critical damage conditions; if these systems gain such a condition while the accelerator is active, the accelerator shuts off.</p>
      <p>The engineer can activate an emergency accelerator as a crew action during the engineering phase. For the rest of the round, the ship has no shields and cannot fire weapons. If the emergency accelerator is still active at the end of the gunnery phase, the ship immediately moves 100 hexes in a straight line in any direction, which ends the starship combat and allows the vessel to escape. After using an emergency accelerator, the ship's power core gains the glitching critical damage condition and must be repaired before the accelerator can be used again.</p></>,
  },
  "Holographic Mantle": {
    bpCost: 12,
    pcuCost: 10,
    sfsLegal: false,
    source: "Starship Operations Manual pg. 27",
    description:
      <p>A starship equipped with a holographic mantle can appear as another vessel of the same size or one size category larger. This appearance is entirely illusory, but unlike a reconfiguration system, the ship does not physically change its shape. The sophisticated hull-mounted projectors of a holographic mantle fool a purely visual inspection, unless the viewer succeeds at a Perception check (DC = 25 + 1-1/2 x the tier of the disguised starship). The system also transmits false transponder information that raises the DC of scan actions against the disguised ship by 5. If an opponent fails their Computers check to perform a scan by 5 or less, the science officer aboard the disguised ship can give false basic information to the scanning ship. A holographic mantle requires 10 minutes to properly calibrate and activate, and it shuts down and can't be used if the ship's sensors gain a critical damage condition.</p>,
  },
  "Reconfiguration System": {
    bpCost: 30,
    pcuCost: 50,
    sfsLegal: false,
    source: "Starship Operations Manual pg. 27",
    description:
      <p>Reptoids pioneered this hybrid technology and keep it secret, despite the efforts of many governments and other organizations. A reconfiguration system enables a starship to physically change shape; it can appear to be any other vessel of the same size without changing any of the ship's statistics. In addition, the reconfigured ship mimics the transponders and scan profile of the ship it is impersonating. When the reconfigured ship is scanned, the first piece of information the scanning science officer obtains is always false, conforming to the ship the reconfigured vessel is pretending to be rather than what the reconfigured ship actually is. It takes only a few moments for this system to reconfigure a starship that's out of combat, but it cannot function if the ship's sensors have a critical damage condition. However, if the ship's sensors gain a critical damage condition while the ship is reconfigured, the vessel remains in its reconfigured state.</p>,
  },
};

// https://aonsrd.com/Starship_Sensors.aspx
const sensors = {
  "Observation Sensors": {range: null, modifier: null, bpCost: 4, sfsLegal: false, source: "Starfinder #27: Deceivers' Moon pg. 49"},
  "System-Wide Sensors": {range: null, modifier: null, bpCost: 3, sfsLegal: false, source: "Galaxy Exploration Manual pg. 35"},
  "Sensor Drones": {range: null, modifier: null, bpCost: 1, sfsLegal: false, source: "Galaxy Exploration Manual pg. 35"},
  "Cut-Rate": {range: "Short", modifier: -2, bpCost: 1, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Budget Short-Range": {range: "Short", modifier: 0, bpCost: 2, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Basic Short-Range": {range: "Short", modifier: 2, bpCost: 3, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Advanced Short-Range": {range: "Short", modifier: 4, bpCost: 4, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Ultra Short-Range": {range: "Short", modifier: 6, bpCost: 6, sfsLegal: false, source: "Near Space pg. 114"},
  "Budget Medium-Range": {range: "Medium", modifier: 0, bpCost: 3, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Basic Medium-Range": {range: "Medium", modifier: 2, bpCost: 5, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Advanced Medium-Range": {range: "Medium", modifier: 4, bpCost: 8, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Ultra Medium-Range": {range: "Medium", modifier: 6, bpCost: 12, sfsLegal: false, source: "Near Space pg. 114"},
  "Budget Long-Range": {range: "Long", modifier: 0, bpCost: 6, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Basic Long-Range": {range: "Long", modifier: 2, bpCost: 10, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Advanced Long-Range": {range: "Long", modifier: 4, bpCost: 14, sfsLegal: true, source: "Starfinder Core Rulebook pg. 301"},
  "Ultra Long-Range": {range: "Long", modifier: 6, bpCost: 20, sfsLegal: false, source: "Near Space pg. 114"},
}

const specialMaterial = {
  "Abysium": {
    shipComponent: {
      "Power Core": {
        bpCost: 2, 
        description: "A properly functioning abysium reactor produces far less waste than reactors that use other radioactive materials and doesn't require extreme pressure to sustain nuclear reactions, but it's hazardous when ruptured. An abysium power core increases the PCU it provides by 25% (maximum +50 PCU). However, if the power core takes critical damage, the starship's occupants are subjected to radiation for 1 round of starship combat. This radiation is low if the power core gains the glitching condition, medium if it gains the malfunctioning condition, and high if it gains the wrecked condition.",
        summary: "+25% PCU output; radiation hazard if damaged"
      },
      "Weapon Mount": {
        bpCost: "special", 
        description: "Abysium is naturally radioactive. An abysium weapon mount grants any weapon installed onto it the irradiate special property, with a light weapon mount creating low radiation, a heavy mount creating moderate radiation, and a capital or spinal mount creating heavy radiation. If the weapon already has the irradiate special property, add 1 round to the duration of any radiation applied to struck starships.",
        summary: "adds irradiate special property to attacks"
      }
    },
    description: "A highly radioactive metal with a bluish-green glow, abysium provides exceptional conductivity and can store electric charges far more efficiently than more mundane metals such as copper.",
    source: "Starship Operations Manual pg. 22"
  },
  "Adamantine Alloy": {
    shipComponent: {
      "Armor": {
        bpCost: "special", 
        description: "Adamantine alloy armor protects a starship against all but the strongest attacks. This armor grants the starship a Damage Threshold equal to the armor's bonus to AC, stacking with the starship's existing Damage Threshold. Adamantine alloy increases a starship's size category by 1 for the purpose of calculating the cost of its armor; the value of a Supercolossal ship's size category increases from 8 to 9 for this purpose." 
        + "See Fortified Hull for denser adamantine armor.",
        summary: "bonus to DT based on AC bonus"
      },
      "Weapon Mount": {
        bpCost: "special", 
        description: "Adamantine alloy weapons are extraordinarily destructive, capable of tearing apart unprotected targets. When such a weapon strikes a target in a quadrant without functioning shields, it deals +1 damage per damage die to the target. Against a starship with functioning deflector shields (page 20), an adamantine alloy weapon reduces that quadrant's defense value by an additional 1 for each hit that reduces the target's Hull Points; this stacks with the effects of weapon special properties such as array, line, and ripper."
        + "Mounting an adamantine alloy weapon increases its BP cost by an amount equal to half the weapon's damage dice. If a weapon's damage is multiplied, multiply the cost increase by an equal amount."},
        summary: "bonus damage against unshielded targets or reduces target shield defense value"
    },
    description: "Famously strong, pure adamantine is too expensive to incorporate into something as large as a starship, but its alloys can impart some of the metal's infamous deadliness and impregnability.",
    source: "Starship Operations Manual pg. 22"
  },
  "Djezet": {
    shipComponent: {
      "Power Core": {
        bpCost: 1,
        description: "A djezet power core absorbs trace magical energies and directs those toward powering minor systems, seeming to produce energy from nowhere. A djezet power core increases the PCU it provides by 10% (maximum +20 PCU), but it can direct that power only to fulfill the PCU requirements for expansion bays.",
        summary: "+10% PCU output to expansion bays only"
      },
      "Sensors": {
        bpCost: 3,
        description: "Djezet-infused sensors can analyze supernatural auras and unseen magical currents, providing a more comprehensive view of a starship's surroundings. Djezet sensors increase their range by 50%: short-range, medium-range, and long-range djezet sensors have ranges of 7 hexes, 15 hexes, and 30 hexes, respectively. Additionally, djezet sensors typically have a range of 375 feet on most planets, instead of 250 feet, though obstructions such as terrain might limit this range.",
        summary: "+50% sensor range"
      }
    },
    description: "This rust-colored, liquid starmetal guides magical energies much as copper guides electricity in a circuit. While it offers little benefit to a starship's frame, its unique properties can enhance a starship's sensors and improve its power efficiency.",
    source: "Starship Operations Manual pg. 22"
  },
  "Horacalcum": {
    shipComponent: {
      "Defensive Countermeasures": {
        bpCost: 4,
        description: "A horacalcum lattice incorporated into a starship's defensive countermeasures creates a field of space-time fluctuation that slows larger incoming projectiles. The speed of any tracking weapon fired at the starship is reduced by 25% (round down the final speed).",
        summary: "decrease enemy tracking weapon speed by 25%"
      },
      "Thrusters": {
        bpCost: 2,
        description: "By bending space around a vessel in subtle ways, horacalcum thrusters propel a starship at incredible speeds and enable improbable maneuvers. Horacalcum increases the maximum speed of any thrusters by 1 and reduces a starship's Piloting check penalty based on its maximum speed by 1 (minimum +0). Active horacalcum thrusters glow with a telltale orange hue.",
        summary: "+1 max speed; -1 Piloting check penalty based on max speed"
      }
    },
    description: "The rarest of star metals, horacalcum is a dull, orange-brown metal with the potent ability to warp space-time around itself.",
    source: "Starship Operations Manual pg. 22"
  },
  "Inubrix": {
    shipComponent: {
      "Thrusters": {
        bpCost: 1,
        description: "Leaving ephemeral, smoky contrails, inubrix thrusters allow parts of a starship to phase through physical matter for crucial seconds, turning glancing blows into near misses. The starship's pilot gains a +1 circumstance bonus to Piloting checks to avoid hazards, and damage dealt to the starship by hazards is reduced by an amount equal to its tier.",
        summary: "+1 to Piloting checks to avoid hazards; reduce hazard damage"
      },
      "Weapon Mount": {
        bpCost: "special",
        description: "An inubrix alloy weapon's payload phases in and out of reality, potentially bypassing armor and interior bulwarks to inflict extraordinary damage to a target's inner systems. Whenever an inubrix alloy weapon scores critical damage against a starship, it has a 20% chance to critically damage the randomly determined system twice. For example, it might cause an undamaged system to gain the malfunctioning condition rather than the glitching condition."
        + "Inubrix weapons provide no additional benefit against biomechanical starships and starship-scale creatures.",
        summary: "20% chance to critically damage a system twice"
      },
    },
    description: "Nicknamed “ghost iron” due to its ability to phase through denser materials, inubrix is a soft metal typically alloyed with platinum before being incorporated into a starship's systems.",
    source: "Starship Operations Manual pg. 22"
  },
  "Noqual": {
    shipComponent: {
      "Armor": {
        bpCost: 4,
        description: "Noqual armor deflects magical attacks and absorbs ambient magic, complicating the actions of spellcasting officers on board. Treat the starship's tier as 2 higher when determining the Mysticism DC of magic officer actions that use the armored starship's tier to calculate the DC of Mysticism checks. Additionally, the starship's AC and TL increase by 2 against weapons with the mystical special property.",
        summary: "bonus to magic officer's Mysticism DC and to AC and TL against mystical weapons"
      },
      "Sensors": {
        bpCost: 2,
        description: "The scanning pulses emitted by a noqual-augmented sensor array can interfere with enemy diagnostics, particularly the functions of any magitech components. When a science officer uses the scan crew action and exceeds the check DC by 5 or more, they can choose to learn only one piece of information and instead scramble the other ship's sensors, giving the sensors the glitching condition for 1 round for every 5 by which the Computers check exceeded the scan action's DC.",
        summary: "chance to cause enemy glitch on scan crew action"
      },
    },
    description: "This green, lightweight crystalline starmetal is best known for its magic-dampening properties. Incorporating noqual into starships is a delicate process, as improperly installed noqual impairs that vessel's magitech operations as often as it stymies enemy ships.",
    source: "Starship Operations Manual pg. 22"
  },
  "Siccatite": {
    shipComponent: {
      "Armor": {
        bpCost: 2,
        description: "Siccatite armor has the unique ability to absorb massive amounts of heat, allowing the metal to withstand friction better than nearly any other material. When a starship with siccatite armor moves through an atmosphere (page 52), it treats the current friction level as if it were one level less severe when determining the amount of damage the starship sustains (severe becomes high, high becomes moderate, moderate becomes low, and low becomes none).",
        summary: "resist friction from atmosphere"
      },
      "Defensive Countermeasures": {
        bpCost: 2,
        description: "By wrapping key portions of a starship in an insulated mesh of siccatite, the extremely hot or frigid metal can obscure the vessel's systems against enemy sensors. Treat a starship with siccatite defensive countermeasures as 2 tiers higher when determining the Computers DC of science officer actions that use the protected starship's tier to calculate the DC of Computers checks.",
        summary: "increase science officer Computers DC against enemy sensors"
      },
    },
    description: "Siccatite is a silvery starmetal renowned for its extreme resiliency to thermal energy. Capable of acting either as “cold” siccatite or “hot” siccatite, trace quantities of this material commonly reinforce and absorb heat from starship power cores and thrusters.",
    source: "Starship Operations Manual pg. 22"
  }
}


// <--- Data extractions --->
const getSourceData = (source) => {
  const { link, abbrev, sfsLegal } = sources[source];

  return {link, abbrev, sfsLegal};
}

const getTierData = (tierId) => {
  // const array = shipTiers[tierId]
  const { buildPoints, hpIncrement } = shipTiers[tierId];

  return {buildPoints, hpIncrementMultiplier: hpIncrement}
}

const getFrameData = (frameId) => {
  let matchingFrame = '';
  
  frames.every(frame => {
    if (frame.type === frameId) {
      matchingFrame = frame;
      return false;
    }
    return true;
  })

  const { type, source, size, maneuverability, hp, dt, ct, mounts, expansions, minimumCrew, maximumCrew, cost, specialAbility } = matchingFrame;

  return { type, source, size, maneuverability, hp, dt, ct, mounts, expansions, minimumCrew, maximumCrew, cost, specialAbility }
}

const getManeuverabilityData = (type) => {
  const { turnDistance, pilotingModifier } = maneuverability[type]

  return {turnDistance, pilotingModifier}
}

const getSizeData = (size) => {
  const { length, weight, acMod, tlMod } = shipSize[size]

  return {length, weight, acMod, tlMod}
}

const getPowerCoreData = (powerCoreId) => {
  if(!powerCoreId) return {sizes: null, pcuProvided: 0, bpCost: 0, source: null};

  const { sizes, pcuProvided, bpCost, source } = powerCores[capitalizeEachWord(powerCoreId)]

  return {sizes, pcuProvided, bpCost, source}
}

const getThrusterData = (thrustersId) => {
  if(!thrustersId) return {size: null, speed: 0, pilotingModifier: 0, pcuCost: 0, bpCost: 0, source: null};

  const { size, speed, pilotingModifier, pcuCost, bpCost, source } = thrusters[thrustersId]

  return {size, speed, pilotingModifier, pcuCost, bpCost, source}
}

const getArmorData = (armorId, size) => {
  if(!size) throw new Error("getArmorData(armorId, size) must take in a size parameter")
  if(!armorId) return {acBonus: 0, tlPenalty: 0, turnDistance: 0, bpCost: 0, source: null}

  let { acBonus, tempHP, tlPenalty, turnDistance, bpCost, source } = armor[armorId]
  bpCost = (armorId.includes("Mk") || armorId.includes("Energy-Absorbent")) ? (bpCost * sizeCategory[size]) : bpCost

  return {acBonus, tempHP, tlPenalty, turnDistance, bpCost, source}
}

const getComputerData = (computerId) => {
  if(!computerId) return {bonus: 0, nodes: 0, pcuCost: 0, bpCost: 0, source: null}


  computerId = capitalizeEachWord(computerId)
  const { bonus, nodes, pcuCost, bpCost, source } = computers[computerId]

  return {bonus, nodes, pcuCost, bpCost, source}
}

const getComputerHackDC = (computerTier) => {
  if(!computerTier) return { hackDC: null }

  const { hackDC } = computerTiers[computerTier]

  return hackDC;
}

const getNetworkNodeData = (nodeId, size) => { 
  if(!size) throw new Error("getNetworkNodeData(nodeId, size) must take in a size parameter")
  if(!nodeId || nodeId === "Basic Computer" || size !== "Supercolossal") return {bonus: 0, nodeMax: 0, pcuCost: 0, bpCost: 0}

  const { bonus, nodeMax, pcuCost, bpCost } = networkNodes[nodeId]

  return {bonus, nodeMax, pcuCost, bpCost}
}

const getQuartersData = (quartersId) => {
  if (!quartersId) return {bpCost: 0, source: null, description: null}

  const { bpCost, source, description } = crewQuarters[quartersId]

  return {bpCost, source, description}
}

const getDefensiveCounterData = (defensiveCounterId) => {
  if(!defensiveCounterId) return {tlBonus: 0, pcuCost: 0, bpCost: 0, source: null}

  const { tlBonus, pcuCost, bpCost, source } = defensiveCounter[defensiveCounterId]

  return {tlBonus, pcuCost, bpCost, source}
}

const getDriftEngineData = (driftEngineId, size, frameId) => {
  // const size = Ship.getSize()

  if(!size || !frameId) throw new Error("getDriftEngineData(driftEngines, size, frameId) must take in a size and frameId parameter")
  if(!driftEngineId) return {rating: 0, minPCU: 0, maxSize: null, bpCost: 0, source: null, special: null}

  let { rating, minPCU, maxSize, bpCost, source, special } = driftEngines[driftEngineId]

  bpCost = bpCost * sizeCategory[size]
  if (frameId === "Oma") bpCost = (Math.ceil(bpCost*1.5))

  if (!maxSize) maxSize = "Supercolossal"

  return {rating, minPCU, maxSize, bpCost, source, special}
}

const getExpansionBayData = (expansionBayId, size, frameId) => {
  if(!size) throw new Error("getExpansionBayData(expansionBayId, size) must take in a size parameter")
  if(!expansionBayId) return {pcuCost: 0, bpCost: 0, source: null}

  let { pcuCost, bpCost, source } = expansionBays[expansionBayId]

  if(expansionBayId === "Quantum Defender") {
    return {pcuCost: Math.max(20, (5 * sizeCategory[size])), bpCost: Math.max(10, (4 * sizeCategory[size])), source}
  }
  if(expansionBayId === "Decoy Husk") {
    return {pcuCost: (pcuCost + sizeCategory[size]), bpCost: (bpCost * sizeCategory[size]), source}
  }

  if (size === "Supercolossal" && expansionBayId === "Cargo Hold") bpCost = 5; 

  return {pcuCost, bpCost, source}
}

const getFortifiedHullData = (fortifiedHullId, size) => {
  if(!size) throw new Error("getFortifiedHullData(fortifiedHullId, size) must take in a size parameter")
  if(!fortifiedHullId) return {ctBonus: 0, bpCost: 0, source: null}

  let { ctBonus, bpCost, source } = fortifiedHulls[fortifiedHullId]
  ctBonus = ctBonus * sizeCategory[size]
  bpCost = bpCost * sizeCategory[size]

  return {ctBonus, bpCost, source}
}

const getReinforcedBulkheadData = (reinforcedBulkheadId, size) => {
  if(!size) throw new Error("getReinforcedBulkeadData(reinforcedBulkheadId, size) must take in a size parameter")
  if(!reinforcedBulkheadId) return {fortPercent: 0, bpCost: 0, source: null}

  let { fortification: fortPercent, bpCost, source } = reinforcedBulkheads[reinforcedBulkheadId]
  bpCost = bpCost * sizeCategory[size]

  return {fortPercent, bpCost, source}
}

const getAntiHackingData = (antiHackingId) => {
  if(!antiHackingId) return {bpCost: 0, source: null}

  const { bpCost, source } = antiHackingSystems[antiHackingId]

  return {bpCost, source}
}

const getComputerModuleData = (computerModuleId) => {
  if (!computerModuleId) return {cost: 0, sfsLegal: null}

  const { cost, sfsLegal } = computerModules[computerModuleId]

  return {cost, sfsLegal}
}

const getComputerUpgradeData = (computerUpgradeId) => {
  if (!computerUpgradeId) return {cost: 0, sfsLegal: null}

  const { cost, sfsLegal } = computerUpgrades[computerUpgradeId]

  return {cost, sfsLegal}
}

const getComputerCountermeasureData = (computerCountermeasureId, compTier) => {
  if(compTier === undefined) throw new Error("getComputerCountermeasureData(computerCountermeasureId, compTier) must take in a computer tier parameter")

  if (!computerCountermeasureId) return {cost: 0, sfsLegal: null, description: null}

  const { sfsLegal, description } = computerCountermeasures[computerCountermeasureId]

  let cost = compTier;

  return {cost, sfsLegal, description}
}

const getComputerShockGridData = (computerShockGridId, compTier) => {
  if(compTier === undefined) throw new Error("getComputerShockGridData(computerShockGridId, compTier) must take in a computer tier parameter")

  if (!computerShockGridId) return {DC: null, damage: null, cost: 0}

  const { DC, damage } = computerShockGrid[computerShockGridId]
  const cost = compTier * computerShockGridId

  return {DC, damage, cost}
}

const getComputerTierData = (computerTierId) => {
  if (!computerTierId) return {price: null, hackDC: null}

  const { price, hackDC } = computerTiers[computerTierId]

  return {price, hackDC}
}

const getCloakingData = (cloakingId) => {
  if (!cloakingId) return {bpCost: 0, pcuCost: 0, sfsLegal: null, source: null, type: null}


  const { bpCost, pcuCost, sfsLegal, source, type } = cloakingTechnology[cloakingId]

  return {bpCost, pcuCost, sfsLegal, source, type}
}

const getSecurityCheckboxData = (securityCheckboxId, size) => {
  if(!size) throw new Error("getSecurityCheckboxData(securityCheckboxId, size) must take in a size parameter")
  if (!securityCheckboxId) return {bpCost: 0, pcuCost: 0, sfsLegal: null, source: null, description: null}

  let { bpCost, pcuCost, sfsLegal, source, description } = securityCheckboxes[securityCheckboxId]

  // Self-Destruct & Emergency Accelerator are table's bp cost * ship size mod
  if (securityCheckboxId === "Self-Destruct System") bpCost = Number(bpCost[0]) * sizeCategory[size]
  if (securityCheckboxId === "Emergency Accelerator") bpCost = Number(bpCost[0]) * sizeCategory[size]

  return {bpCost, pcuCost, sfsLegal, source, description}
}

const getSensorsData = (sensorId) => {
  if (!sensorId) return {range: null, modifier: null, bpCost: 0, sfsLegal: null, source: null}

  const { range, modifier, bpCost, sfsLegal, source } = sensors[sensorId]

  return {range, modifier, bpCost, sfsLegal, source}
}



// <--- ID extractions -->
const getSourceIdList = () => {
  return Object.keys(sources).sort((a, b) => a + b)
}

const getTierIdList = () => {
  return Object
    .keys(shipTiers)
    .map(key => key.includes("/") ? key.split("/").reduce((total, num) => total / num) : key)
    .sort((a, b) => a - b)
    .map(key => {
      if(key === .25) key = "1/4"
      if(key < .4 && key > .3) key = "1/3"
      if(key === .5) key = "1/2"
      return key
    })

  // return Object.keys(shipTiers).sort((a, b) => eval(a) - eval(b))
}

const getFrameIdList = () => {
  const frameList = frames.sort((a,b) => {
    return sizeCategory[a.size] - sizeCategory[b.size]
  }).map(frame => frame.type)

  // sort frames by size
    // search through frames object for each items and check size, then sort on those sizes?
    // sort the frames object by size first before making the frameList?
    // refactor frames object to contain their type as the key?


  // console.log(frameList);

  return frameList
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

const getAntiHackingIdList = () => {
  return Object.keys(antiHackingSystems).sort((a, b) => a + b)
}

// const getAntiPersonnelIdList = () => {
//   // TODO: need to change the sorting to divide longarm and heavy weapons
//   // return [...getLongarmIdList(), ...getHeavyIdList()]
// }

const getComputerModuleIdList = () => {
  return Object.keys(computerModules).sort((a, b) => a + b)
}

const getComputerUpgradeIdList = () => {
  return Object.keys(computerUpgrades).sort((a, b) => a + b)
}

const getComputerCountermeasureIdList = () => {
  return Object.keys(computerCountermeasures).sort((a, b) => a + b)
}

const getComputerShockGridIdList = () => {
  return Object.keys(computerShockGrid).sort((a, b) => a - b)
}

const getComputerTierIdList = () => {
  return Object.keys(computerTiers).sort((a, b) => a + b)
}

const getCloakingIdList = () => {
  // Need data in non-alphabetical order
  return Object.keys(cloakingTechnology)
}

const getSecurityCheckboxIdList = () => {
  return Object.keys(computerTiers).sort((a, b) => a + b)
}

const getSensorsIdList = () => {
  return Object.keys(sensors)
}

export {
  sources,
  // shipTiers,
  // shipSize,
  // maneuverability,
  sizeCategory,
  // powerCores,
  // thrusters,
  // armor,
  // computers,
  // networkNodes,
  // crewQuarters,
  // defensiveCounter,
  // driftEngines,
  // expansionBays,
  // fortifiedHulls,
  // reinforcedBulkheads,
  // antiHackingSystems,
  specialMaterial,

  getSourceData,
  getTierData, 
  getFrameData,
  getManeuverabilityData,
  getSizeData,
  getPowerCoreData, 
  getThrusterData,
  getArmorData,
  getComputerData,
  getComputerHackDC,
  getNetworkNodeData,
  getQuartersData,
  getDefensiveCounterData,
  getDriftEngineData,
  getExpansionBayData,
  getFortifiedHullData,
  getReinforcedBulkheadData,
  getAntiHackingData,
  // getAntiPersonnelData,
  getLongarmData,
  getHeavyData,
  getComputerModuleData,
  getComputerUpgradeData,
  getComputerCountermeasureData,
  getComputerShockGridData,
  getComputerTierData,
  getCloakingData,
  getSecurityCheckboxData,
  getSensorsData,

  getSourceIdList,
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
  getAntiHackingIdList,
  // getAntiPersonnelIdList,
  getLongarmIdList, 
  getHeavyIdList,
  getComputerModuleIdList,
  getComputerUpgradeIdList,
  getComputerCountermeasureIdList,
  getComputerShockGridIdList,
  getComputerTierIdList,
  getCloakingIdList,
  getSecurityCheckboxIdList,
  getSensorsIdList,
}