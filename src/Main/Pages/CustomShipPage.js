import React, { useEffect, useState, useContext } from "react";
import SetTier from "../ShipPartSetters/SetTier";
import SetFrame from "../ShipPartSetters/SetFrame";
import SetPowerCore from "../ShipPartSetters/SetPowerCore";
import { validateShip } from "../References/shipFunctions";
import SetThrusters from "../ShipPartSetters/SetThrusters";
import SetArmor from "../ShipPartSetters/SetArmor";
import { CustomShipContext } from "../Context/shipContext";

function CustomShipPage() {
  const { customShipParts } = useContext(CustomShipContext);

  useEffect(() => {
    console.log(validateShip(customShipParts));
  });

  // code smells and file structure

  // FIXME: make all changes to customShipParts a setter function

  // TODO: explain TL and turn penalties when they happen
  // TODO: add note explaining armor differences

  // TODO: too much short circuit logic?
  // TODO: clean .includes logic on SetArmor to something cleaner

  // TODO: create more Ship class methods
  

  const [showJSON, setShowJSON] = useState();

  const printJSON = () => {
    setShowJSON(!showJSON);
  };

  return (
    <div className="customShipDisplay">
      <h2>Custom Ship Page</h2>

      <div className="partSetterBlock">
        <SetTier></SetTier>
        <SetFrame></SetFrame>
        <SetPowerCore></SetPowerCore>
        <SetThrusters></SetThrusters>
        <SetArmor></SetArmor>
      </div>

      <p></p>
      <button onClick={() => printJSON()}>JSON ME</button>
      <br />
      {showJSON && JSON.stringify(customShipParts, null, 1)}
    </div>
  );
}

export default CustomShipPage;
