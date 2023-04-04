import * as Tables from './metaTables'


  // Maneuverability:	[Distance Between Turns,	Piloting Check Modifier]

// const { shipTiers } = Tables;
const table = Tables.maneuverability;

const dataKeys = Object.keys(table)
const newObj = {}

dataKeys.map(oneKey => {
  // console.log(table[oneKey]);

  newObj[oneKey] = {
    // This will vary by table
    turnDistance: table[oneKey][0],
    pilotingModifier: table[oneKey][1],

  }
})

console.log(newObj);


