

const fs = require("fs");
const { parse } = require("csv-parse");

const weapons = {}


fs.createReadStream("D:\\Projects\\Logbook_Client_v2\\src\\Main\\References\\object.txt")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);

    // let weaponKey = row[0]
    // row.shift()

    // row = {
    //   category: row[0],
    //   level: row[1],
    //   price: row[2],
    //   damage: row[3],
    //   range: row[4],
    //   critical: row[5],
    //   capacity: row[6],
    //   usage: row[7],
    //   bulk: row[8],
    //   special: row[9],
    //   sfsLegal: row[10],
    // }

    // weapons[weaponKey] = row;
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("finished");
    

    // var writeStream = fs.createWriteStream("src\\Main\\References\\heavy.txt");
    // writeStream.write(JSON.stringify(weapons));
    // writeStream.end();
  });