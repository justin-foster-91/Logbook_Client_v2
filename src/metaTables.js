
  // Tier	Starship Build Points	Special
let shipTiers = {
'1/4':	[25,	null],
'1/3':	[30,	null],
'1/2':	[40,	null],
'1':	[55,	null],
'2':	[75,	null],
'3':	[95,	null],
'4':	[115,	'HP increase'],
'5':	[135,	null],
'6':	[155,	null],
'7':	[180,	null],
'8':	[205,	'HP increase'],
'9':	[230,	null],
'10':	[270,	null],
'11':	[310,	null],
'12':	[350,	'HP increase'],
'13':	[400,	null],
'14':	[450,	null],
'15':	[500,	null],
'16':	[600,	'HP increase'],
'17':	[700,	null],
'18':	[800,	null],
'19':	[900,	null],
'20':	[1000,	'HP increase'],
}

const getTierData = (tierId) => {
  let array = shipTiers[tierId]

  return {buildPoints: array[0], hpIncrease: array[1]}
}

const getTierIds = () => {
  return Object.keys(shipTiers).sort((a, b) => eval(a) - eval(b))
}


export {getTierData, getTierIds}