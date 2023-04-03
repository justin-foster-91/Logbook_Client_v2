

const fs = require("fs");
const { parse } = require("csv-parse");

const weapons = {}


fs.createReadStream("C:\\Users\\jfost\\OneDrive\\Documents\\LongarmWeapons.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {

    let weaponKey = row[0]
    row.shift()

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

    weapons[weaponKey] = row;
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    console.log("finished");
    console.log(weapons);

    var writeStream = fs.createWriteStream("D:\\Projects\\Logbook_Client_v2\\src\\Main\\References\\LongarmWeapons2.txt");
    writeStream.write(JSON.stringify(weapons));
    writeStream.end();
  });

  // console.log(weapons);

  // var writeStream = fs.createWriteStream("src\\Main\\References\\longarm.txt");
  // writeStream.write(weapons);
  // writeStream.end();