import React, { useState, useEffect } from 'react';
import * as Tables from '../CustomRefs/metaTables';
import AccordionText from './AccordionText';

// specialMaterial = {
//   type: {
//     shipComponent: {
//       name: {
//         bpCost: "",
//         description: "",
//       }
//     },
//     description: "",
//     source: "",
//   }
// }

function SpecialMaterials(props) {
  const { part: shipPart, idx: rowIdx = 0 } = props
  
  const [checkedRadio, setCheckedRadio] = useState("None");
  // const [description, setDescription] = useState(null);

  // const [radioData, setRadioData] = useState({[shipPart]: {[rowIdx]: {material: "None", description: null}}});
  const [radioData, setRadioData] = useState({[shipPart]: {[rowIdx]: {material: "None", description: null}}});

  const materials = Tables.specialMaterial
  // const description = radioData[shipPart][rowIdx].description || null;

  if (shipPart === "Power Core") {
    console.log({rowIdx})
    console.log(radioData[shipPart]);
  }

  // const partTranslate = {"Power Core": "powerCoreSpecialMaterials", "Thrusters": "thrustersMaterialId", }
  // armorMaterialId
  // defensiveCountermeasuresMaterialId
  // powerCoreSpecialMaterials []
  // sensorsMaterialId
  // thrustersMaterialId
  // weaponMounts per weapon, per arc

  // Abysium weapon mount: Mounting a light, heavy, capital, or spinal weapon with abysium increases its cost by 2 BP, 6 BP, 10 BP, or 10 BP, respectively
  // Inubrix weapon mount: Mounting a light, heavy, capital, or spinal weapon with inubrix increases its cost by 2 BP, 6 BP, 10 BP, or 10 BP, respectively.
  // Adamantine weapon mount: Mounting an adamantine alloy weapon increases its BP cost by an amount equal to half the weapon's damage dice. If a weapon's damage is multiplied, multiply the cost increase by an equal amount.
  // Adamantine Armor: Adamantine alloy increases a starship's size category by 1 for the purpose of calculating the cost of its armor; the value of a Supercolossal ship's size category increases from 8 to 9 for this purpose.

  // TODO: take in idx for components like power core with repeat options
  // idx for list location
  // idx for radio button ID
  useEffect(() => {
    const allowedPartProps = ["Power Core", "Thrusters", "Armor", "Defensive Countermeasure", "Sensors", "Weapon Mount"]

    if (allowedPartProps.indexOf(shipPart) < 0) {
      throw new Error("Part prop is not a valid ship part.")
    }
  }, [shipPart])

  const allSpecialsForShipPart = () => {
    const specialTypes = Object.keys(materials)
    const specialsForPart = []

    specialTypes.forEach(type => {
      const partsForSpecial = Object.keys(materials[type].shipComponent)
      partsForSpecial.forEach(part => {
        if (part === shipPart) specialsForPart.push(type)
      })
    })

    return specialsForPart;
  }
  // console.log(allSpecialsForShipPart());

  const handleRadioChange = (ev) => {
    const radioOption = ev.target.value;
    // const data = ev.target.id.split(":");

    // const part = data[0]
    // const material = data[1]
    // console.log(data);

    const description = materials[radioOption].description;
    // if (!description) description = ''
    // console.log(description);

    // const newMaterial = {...radioData[shipPart][rowIdx], material: radioOption}
    // const newDescription = {...radioData[shipPart][rowIdx], description: description}

    // console.log(radioData);
    console.log({radioOption, description});
    console.log("Original", radioData);
    const tempRadio = {...radioData}
    tempRadio[shipPart][rowIdx].material = radioOption 
    radioData[shipPart][rowIdx].description = description
    console.log("Replacement: ", tempRadio);
    // console.log("WTF: ", radioData);
    setRadioData(tempRadio);
  }

  // {"Power Core": {0: {material: 'None', description: null}}
  // {"Power Core": {0: {material: 'Abysium', description: 'blah'}}
  // {
  //   "Power Core": {
  //     0: {material: '', description: ''},
  //     1: {material: '', description: ''}
  //   }
  // }
    // {
  //   "Power Core": [
  //     {material: '', description: ''},
  //     {material: '', description: ''}
  //   ]
  // }

  // const handleRadioChange = (ev) => {
  //   const radioOption = ev.target.value;

  //   // ship.setX
  //   setCheckedRadio(radioOption);
  // }

  const renderAllRadios = () => {   
    return (
      <fieldset className='special'>
        <legend>Special Material</legend>
        <div className='row'>
          {renderRadioButton("None")}
          {allSpecialsForShipPart().map((material, idx) => {
            return renderRadioButton(material)
          })}
        </div>
        {radioData[shipPart][rowIdx].description 
          && <AccordionText>
            {radioData[shipPart][rowIdx].description}
          </AccordionText>}
      </fieldset>
    )
  }

  const renderRadioButton = (material) => {
    // if (material === "None") setRadioData({[shipPart]: {'-1': {material: "None", description: null}}})
    
    // console.log(rowIdx);
    // console.log(radioData[shipPart][rowIdx]);
    // console.log(material);
    return (
      <div key={`${shipPart}:${rowIdx}:${material}`}>
        <input 
          type="radio" 
          id={`${shipPart}:${rowIdx}:${material}`} 
          name={`${shipPart}:${rowIdx}:${material}`} 
          value={material} 
          onChange={handleRadioChange}
          checked={radioData[shipPart][rowIdx].material === material}
        />
        <label htmlFor={`${shipPart}:${rowIdx}:${material}`}>{material}</label>
      </div>
    )
  }

  // const renderRadioButton = (material) => {
  //   // console.log(shipPart);
  //   return (
  //     <div key={`${shipPart}:${material}:${idx}`}>
  //       <input 
  //         type="radio" 
  //         id={`${shipPart}:${material}:${idx}`} 
  //         name={shipPart} 
  //         value={material} 
  //         onChange={handleRadioChange}
  //         checked={checkedRadio === material}
  //       />
  //       <label htmlFor={`${shipPart}:${material}:${idx}`}>{material}</label>
  //     </div>
  //   )
  // }

  const renderAccordion = () => {
    let text = null
    if (checkedRadio !== "None") {
      text = <p>{radioData[shipPart][rowIdx].description}</p>;
    }

    return (
      text ? <AccordionText> {text}</AccordionText>: ''
    )
  }

  // useEffect(() => {
  //   if (checkedRadio !== "None") {
  //     setDescription(radioData[shipPart][rowIdx].description)
  //   } else {
  //     setDescription(null)
  //   }
  // }, [checkedRadio, materials, shipPart])

  return (
    <>
      {/* <div>Special Material:</div> */}
      {renderAllRadios()}
    </>
  );
}


export default SpecialMaterials;