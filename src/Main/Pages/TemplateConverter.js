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
    ship = sortObject(ship)
    hyphensToSpaces(ship)
    noneToNull(ship)

    return ship
  }

  const hyphensToSpaces = (ship) => {
    return Utils.treeTransform(ship, (node, key)=>{
      if(key.match(/Id/)) {
        if(typeof node === 'object') return node.map(item => Utils.capitalizeEachWord(item))
        else return Utils.capitalizeEachWord(node)
      }
      return node
    })
  }
  

  const noneToNull = (ship) => {
    Utils.treeTransform(ship, (node)=>{
      if(node === 'None' || node === 'none') return null
      return node
    })
  }

  function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
  }


  return (
    <div>
      <h2>Converter Page</h2>
      <p></p>
      Paste Here:
      <br/>
      <input type="text" onChange={handleInputChange}></input>
      <br/>
      <pre style={{
        textAlign: 'left', 
        width: '300px', 
        height: '300px',
        margin: '0 auto'
      }}>
        {/* {jsonPackage && JSON.stringify(convert(jsonPackage), null, 2)} */}
        {JSON.stringify(convert(temp), null, 2)}
      </pre>
    </div>
  );
}

export default TemplateConverter;