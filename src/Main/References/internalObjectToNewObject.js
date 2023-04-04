import * as Tables from './metaTables'


// source: [link, abbrev., sfsLegal]

// const { shipTiers } = Tables;
const table = Tables.sources;

const dataKeys = Object.keys(table)

const newObj = {}

dataKeys.map(oneKey => {
  // console.log(table[oneKey]);

  newObj[oneKey] = {
    // This will vary by table
    link: table[oneKey][0],
    abbrev: table[oneKey][1],
    sfsLegal: table[oneKey][2],
  }
})

console.log(newObj);


