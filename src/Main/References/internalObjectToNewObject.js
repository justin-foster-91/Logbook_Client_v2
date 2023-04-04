import * as Tables from './metaTables'


  // Name: [Bonus, Nodes, PCU cost, BP cost, source]

// const { shipTiers } = Tables;
const table = Tables.computers;

const dataKeys = Object.keys(table)
const newObj = {}

dataKeys.map(oneKey => {
  // console.log(table[oneKey]);

  newObj[oneKey] = {
    // This will vary by table
    bonus: table[oneKey][0],
    nodes: table[oneKey][1],
    pcuCost: table[oneKey][2],
    bpCost: table[oneKey][3],
    source: table[oneKey][4],

  }
})


console.log(newObj);


