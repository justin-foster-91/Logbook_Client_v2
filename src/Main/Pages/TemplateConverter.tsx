import React, {useState} from 'react';
import * as Utils from '../References/utils'
import temp from './tempShip.json'

function TemplateConverter(props: any) {
  const [jsonPackage, setJsonPackage] = useState()

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const input = ev.target.value

    setJsonPackage(JSON.parse(input))
  }

  const convert = (ship: any) => {
    ship = sortObject(ship)
    hyphensToSpaces(ship)
    noneToNull(ship)

    return ship
  }

  const hyphensToSpaces = (ship: any) => {
    return Utils.treeTransform(ship, (node: any, key: string)=>{
      if(key.match(/Id/)) {
        if(typeof node === 'object') return node.map((item: string) => Utils.capitalizeEachWord(item))
        else return Utils.capitalizeEachWord(node)
      }
      return node
    })
  }
  

  const noneToNull = (ship: any) => {
    Utils.treeTransform(ship, (node: any)=>{
      if(node === 'None' || node === 'none') return null
      return node
    })
  }

  function sortObject(obj: any) {
    return Object.keys(obj).sort().reduce(function (result: any, key) {
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