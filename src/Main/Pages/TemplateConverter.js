import React, {useState} from 'react';
import * as Utils from '../References/utils'
import temp from './tempShip.json'

function TemplateConverter(props) {
  const [jsonPackage, setJsonPackage] = useState()

  const handleInputChange = (ev) => {
    const input = ev.target.value

    setJsonPackage(JSON.parse(input))
  }

  const convert = (ship) => {
    hyphensToSpaces(ship)
    noneToNull(ship)

    return ship
  }

  const hyphensToSpaces = (ship) => {
    const keysWithID = Object.keys(ship).filter(key => key.match(/Id/))

    keysWithID.map(key => {
      if(typeof ship[key] === 'string'){
        ship[key] = Utils.capitalizeEachWord(ship[key])
      } else{
        ship[key].map((item, idx) => ship[key][idx] = Utils.capitalizeEachWord(ship[key][idx]))
      } 
      return key
    })

    return ship
  }

  const noneToNull = (ship) => {
    // recursively enter the lowest nested object to replace strings
    // const allKeys = Object.keys(ship)

    console.log(JSON.parse(JSON.stringify(ship).replaceAll("None", null)));
    ship = JSON.parse(JSON.stringify(ship).replaceAll("None", null))
    // console.log(JSON.stringify(ship));

    return ship
  }


  return (
    <div>
      <h2>Converter Page</h2>
      <p></p>
      Paste Here:
      <br/>
      <input type="text" onChange={handleInputChange}></input>
      <br/>
      {/* {jsonPackage && JSON.stringify(convert(jsonPackage))} */}
      <pre style={{
        textAlign: 'left', 
        width: '300px', 
        height: '300px',
        margin: '0 auto'
      }}>{JSON.stringify(convert(temp), null, 2)}
      </pre>
    </div>
  );
}

export default TemplateConverter;