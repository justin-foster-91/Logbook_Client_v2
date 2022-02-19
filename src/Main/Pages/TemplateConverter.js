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
    sortKeys(ship)
    hyphensToSpaces(ship)
    noneToNull(ship)

    return ship
  }

  // const hyphensToSpaces = (ship) => {
  //   Utils.treeTransform(ship, (leaf)=>{
  //     if(ship[key] === null) return key
  //     if(typeof ship[key] === 'string'){
  //       ship[key] = Utils.capitalizeEachWord(ship[key])
  //     } else{
  //       ship[key].map((item, idx) => ship[key][idx] = Utils.capitalizeEachWord(ship[key][idx]))
  //     } 
  //     return key
  //   })
  // }

  const hyphensToSpaces = (ship) => {
    const keysWithID = Object.keys(ship).filter(key => key.match(/Id/))

    keysWithID.map(key => {
      if(ship[key] === null) return key
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
    Utils.treeTransform(ship, (leaf)=>{
      if(leaf === 'None' || leaf === 'none') return null
      return leaf
    })
  }

  // function sortObject(obj) {
  //   return Object.keys(obj).sort().reduce(function (result, key) {
  //       result[key] = obj[key];
  //       return result;
  //   }, {});
  // }

  function sortKeys(obj_1) {
    var key = Object.keys(obj_1)
      .sort(function order(key1, key2) {
        if (key1 < key2) return -1;
        else if (key1 > key2) return +1;
        else return 0;
    }); 
      
    // Taking the object in 'temp' object
    // and deleting the original object.
    var temp = {};
      
    for (var i = 0; i < key.length; i++) {
      temp[key[i]] = obj_1[key[i]];
      delete obj_1[key[i]];
    } 

    // Copying the object from 'temp' to 
    // 'original object'.
    for (var i = 0; i < key.length; i++) {
      obj_1[key[i]] = temp[key[i]];
    } 
    return obj_1;
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