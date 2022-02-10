import React, {useEffect, useState, useContext} from 'react';
import SetTier from '../ShipPartSetters/SetTier';
import SetFrame from '../ShipPartSetters/SetFrame';
import SetPowerCore from '../ShipPartSetters/SetPowerCore';
import {validateShip} from '../References/shipFunctions';
import SetThrusters from '../ShipPartSetters/SetThrusters';
import SetArmor from '../ShipPartSetters/SetArmor';
import { CustomShipContext } from "../Context/shipContext";

function CustomShipPage() {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  useEffect(() => {
    console.log(validateShip(customShipParts))
  })

  // FIXME: make all changes to customShipParts a setter function
  // TODO: explain TL and turn penalties when they happen

  // TODO: ship validation for temp hp
  // TODO: empty ablativeArmorByPosition values when no longer ablative armor
  // TODO: add note explaining armor differences

  // TODO: implement prop types
  // TODO: context: track TL and other penalties

  const [showJSON, setShowJSON] = useState()

  const printJSON = () => {
    setShowJSON(!showJSON)
  }

  return (
    <div className='customShipDisplay'>
      <h2>Custom Ship Page</h2>

      <div className='partSetterBlock' >
        <SetTier></SetTier>
        <SetFrame></SetFrame>
        <SetPowerCore></SetPowerCore>
        <SetThrusters></SetThrusters>
        <SetArmor></SetArmor>
      </div>

      <p></p>
      <button onClick={() => printJSON()}>JSON ME</button>
      <br/>
      {showJSON && JSON.stringify(customShipParts, null, 1)}
    </div>
  );
}

export default CustomShipPage;