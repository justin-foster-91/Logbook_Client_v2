
  // Tier	Starship Build Points	Special
let shipTiers = {
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

const getTierData = (tierId) => {
  let array = shipTiers[tierId]

  return {buildPoints: array[0], hpIncrementMultiplier: array[1]}
}

const getTierIdList = () => {
  return Object.keys(shipTiers).sort((a, b) => eval(a) - eval(b))
}


export {getTierData, getTierIdList }