import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
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
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { part: shipPart, idx: rowIdx = 0 } = props

  const partTranslate = {
    "Power Core": "powerCoreSpecialMaterials", 
    "Thrusters": "thrustersMaterialId", 
    "Armor": "armorMaterialId",
    "Defensive Countermeasures": "defensiveCountermeasuresMaterialId",
    "Sensors": "sensorsMaterialId",
  }

  let currentMaterial = ship.getParts()[partTranslate[shipPart]];
  
  if (shipPart === "Power Core") {
    if (typeof currentMaterial !== 'string') currentMaterial = currentMaterial[rowIdx];
    if (currentMaterial === null) currentMaterial = "None";
  } else {
    if (currentMaterial === null) currentMaterial = "None";
  }

  const materials = Tables.specialMaterial
  const description = materials[currentMaterial]?.shipComponent[shipPart].description || null;

  // Abysium weapon mount: Mounting a light, heavy, capital, or spinal weapon with abysium increases its cost by 2 BP, 6 BP, 10 BP, or 10 BP, respectively
  // Inubrix weapon mount: Mounting a light, heavy, capital, or spinal weapon with inubrix increases its cost by 2 BP, 6 BP, 10 BP, or 10 BP, respectively.
  // Adamantine weapon mount: Mounting an adamantine alloy weapon increases its BP cost by an amount equal to half the weapon's damage dice. If a weapon's damage is multiplied, multiply the cost increase by an equal amount.
  // Adamantine Armor: Adamantine alloy increases a starship's size category by 1 for the purpose of calculating the cost of its armor; the value of a Supercolossal ship's size category increases from 8 to 9 for this purpose.

  useEffect(() => {
    const allowedPartProps = ["Power Core", "Thrusters", "Armor", "Defensive Countermeasures", "Sensors", "Weapon Mount"]

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

  const handleRadioChange = (ev) => {
    let radioOption = ev.target.value;
    if (radioOption === "None") radioOption = null;

    ship.setMaterial(shipPart, radioOption, rowIdx)
  }

  const renderAllRadios = () => {   
    return (
      <>
        {renderRadioButton("None")}
        {allSpecialsForShipPart().map((material, idx) => {
          return renderRadioButton(material)
        })}
      </>
    )
  }

  const renderRadioButton = (material) => {
    return (
      <div key={`${shipPart}:${rowIdx}:${material}`}>
        <input 
          type="radio" 
          id={`${shipPart}:${rowIdx}:${material}`} 
          name={`${shipPart}:${rowIdx}:${material}`} 
          value={material} 
          onChange={handleRadioChange}
          checked={currentMaterial === material}
        />
        <label htmlFor={`${shipPart}:${rowIdx}:${material}`}>{material}</label>
      </div>
    )
  }

  return (
    <>
      <fieldset className='special'>
        <legend>Special Material</legend>
        <div className='row'>
          {renderAllRadios()}
        </div>
        {description 
          && <AccordionText>
            {description}
          </AccordionText>}
      </fieldset>
    </>
  );
}


export default SpecialMaterials;