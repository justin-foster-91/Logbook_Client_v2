import * as Tables from './metaTables'

  // Anti-Hacking System:	[BP cost, source]

const table = Tables.antiHackingSystems;

const dataKeys = Object.keys(table)
const newObj = {}

dataKeys.forEach(oneKey => {
  // console.log(table[oneKey]);

  newObj[oneKey] = {
    // This will vary by table
    bpCost: table[oneKey][0],
    source: table[oneKey][1]

  }
})

console.log(newObj);


