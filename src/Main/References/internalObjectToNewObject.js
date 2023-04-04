import * as Tables from './metaTables'


  // Thruster: [size, speed, pilotingModifier, pcuCost, bpCost, source]

// const { shipTiers } = Tables;
const table = Tables.thrusters;

const dataKeys = Object.keys(table)
const newObj = {}

dataKeys.map(oneKey => {
  // console.log(table[oneKey]);

  newObj[oneKey] = {
    // This will vary by table
    size: table[oneKey][0],
    speed: table[oneKey][1],
    pilotingModifier: table[oneKey][2],
    pcuCost: table[oneKey][3],
    bpCost: table[oneKey][4],
    source: table[oneKey][5],

  }
})


console.log(newObj);


