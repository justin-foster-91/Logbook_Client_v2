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
  const [checkedRadio, setCheckedRadio] = useState("None");
  const [description, setDescription] = useState(null);

  const { part: shipPart } = props
  const materials = Tables.specialMaterial

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

    // ship.setX
    setCheckedRadio(radioOption);
  }

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
        {description 
          && <AccordionText>
            {description}
          </AccordionText>}
      </fieldset>
    )
  }

  const renderRadioButton = (material) => {
    // console.log(shipPart);
    return (
      <div key={`${shipPart}:${material}`}>
        <input 
          type="radio" 
          id={`${shipPart}:${material}`} 
          name={shipPart} 
          value={material} 
          onChange={handleRadioChange}
          checked={checkedRadio === material}
        />
        <label htmlFor={`${shipPart}:${material}`}>{material}</label>
      </div>
    )
  }

  const renderAccordion = () => {
    let text = null
    if (checkedRadio !== "None") {
      text = <p>{materials[checkedRadio].shipComponent[shipPart].description}</p>;
    }

    return (
      text ? <AccordionText> {text}</AccordionText>: ''
    )
  }

  useEffect(() => {
    if (checkedRadio !== "None") {
      setDescription(materials[checkedRadio].shipComponent[shipPart].description)
    } else {
      setDescription(null)
    }
  }, [checkedRadio, materials, shipPart])

  return (
    <>
      {/* <div>Special Material:</div> */}
      {renderAllRadios()}
    </>
  );

  // <div className="row">
  //   <input 
  //     type="radio" 
  //     id="longarm" 
  //     name="weaponRadio" 
  //     value="longarm" 
  //     onChange={handleRadioChange}
  //   />
  //   <label htmlFor="longarm">Longarm</label>

  //   <input 
  //     type="radio" 
  //     id="heavy" 
  //     name="weaponRadio" 
  //     value="heavy" 
  //     onChange={handleRadioChange}
  //   />
  //   <label htmlFor="heavy">Heavy</label>
  // </div>
}




export default SpecialMaterials;