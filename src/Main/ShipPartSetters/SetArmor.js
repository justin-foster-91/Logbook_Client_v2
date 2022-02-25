import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import AblativeArmor from "./AblativeArmor";
import { CustomShipContext } from "../Context/shipContext";
import * as SF from "../References/shipFunctions";

function SetArmor() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { armorId } = customShipParts;
  const { size, hp } = SF.getFramePackageFromShip(customShipParts);
  const { acBonus, tempHP, tlPenalty, turnDistance, bpCost } = Tables.getArmorData(armorId, size);

  const handleArmorChange = (ev) => {
    let armorOption = ev.target.value;
    if (armorOption === "None") armorOption = null;

    ship.setArmor(armorOption)
  };

  const renderArmorBonus = () => {
    if (!acBonus && !tempHP) return "AC/Temp HP: 0; ";
    if (acBonus) return `Bonus AC: ${acBonus}; `;
    else return `Temp HP: ${tempHP}; `;
  };

  const renderSpecial = () => {
    if (tlPenalty && turnDistance)
      return `${tlPenalty} TL; +${turnDistance} turn distance`;
    if (tlPenalty) return `${tlPenalty} TL`;

    return "n/a";
  };

  const renderArmorDescription = () => {
    if (armorId.includes("Mk"))
      return (
        'Standard armor with a bonus to AC'
      );
    if (armorId.includes("Energy"))
      return (
        'Energy-absorbent plating can store some of the energy that strikes the hull, redirecting that energy to power the ship’s systems with an Engineering check.'
      );
    if (armorId.includes("ablative")) {
      return (
        'Destructible armor that confers a temporary HP bonus to each arc.'
      )
    }
    return (
      "Interposed defenses grant temporary HP that doesn't need to be distributed into quadrants, instead providing a single pool to draw from regardless of which arc an attack strikes."
    );
  }

  return (
    <>
      <h3>Armor</h3>
      <p></p>
      <select
        value={
          armorId ? armorId : "None"
        }
        onChange={handleArmorChange}
      >
        <option key="None">None</option>
        {Tables.getArmorIdList().map((armor, idx) => {
          if (armor.includes("Mk"))
            return (
              <option key={idx} value={armor}>
                {armor} Armor (+{Tables.getArmorData(armor, size).acBonus} AC)
              </option>
            );
          if (armor.includes("Energy"))
            return (
              <option key={idx} value={armor}>
                {armor}
              </option>
            );
          if (armor.includes("ablative")) {
            if (Tables.getArmorData(armor, size).tempHP <= hp * 2)
              return (
                <option key={idx} value={armor}>
                  {armor} (+{Tables.getArmorData(armor, size).tempHP} THP)
                </option>
              );
          }
          return (
            <option key={idx} value={armor}>
              {armor} (+{Tables.getArmorData(armor, size).tempHP} THP)
            </option>
          );
        })}
      </select>
      <br />
      {/* TODO: */}
      Special Material:

      <p></p>
      <div>
        {armorId && renderArmorDescription()}
      </div>
      <p></p>
      {armorId 
      && armorId.includes("ablative") 
      && <AblativeArmor size={size}></AblativeArmor>}
      <p></p>
      <div>
        {renderArmorBonus()}
        Special: {renderSpecial()}
      </div>
      BP cost: {bpCost}
    </>
  );
}

export default SetArmor;
