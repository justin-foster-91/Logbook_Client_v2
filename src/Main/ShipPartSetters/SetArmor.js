import React, { useContext } from "react";
import { getArmorData, getArmorIdList } from "../References/metaTables";
import AblativeArmor from "./AblativeArmor";
import { CustomShipContext } from "../Context/shipContext";
import { getFramePackageFromShip } from "../References/shipFunctions";

function SetArmor() {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  const { armorId } = customShipParts;
  const { size, hp } = getFramePackageFromShip(customShipParts);
  const { acBonus, tempHP, tlPenalty, turnDistance, bpCost } = getArmorData(armorId, size);

  const handleArmorChange = (ev) => {
    let armorOption = ev.target.value;

    if (armorOption === "None") armorOption = null;

    // if armor is not ablative, empty ablative hp values
    if(!armorOption.includes('ablative')){
      customShipParts.ablativeArmorByPosition.forward = 0;
      customShipParts.ablativeArmorByPosition.port = 0;
      customShipParts.ablativeArmorByPosition.starboard = 0;
      customShipParts.ablativeArmorByPosition.aft = 0;
    }

    customShipParts.armorId = armorOption;
    setCustomShipParts({ ...customShipParts });
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
      {/* TODO: default value needs to accommodate all possible armor options */}
      <select
        defaultValue={
          armorId === null ? "None" : armorId
        }
        onChange={handleArmorChange}
      >
        <option key="null">None</option>
        {getArmorIdList().map((armor, idx) => {
          if (armor.includes("Mk"))
            return (
              <option key={idx} value={armor}>
                {armor} Armor (+{getArmorData(armor, size).acBonus} AC)
              </option>
            );
          if (armor.includes("Energy"))
            return (
              <option key={idx} value={armor}>
                {armor}
              </option>
            );
          if (armor.includes("ablative")) {
            if (getArmorData(armor, size).tempHP <= hp * 2)
              return (
                <option key={idx} value={armor}>
                  {armor} (+{getArmorData(armor, size).tempHP} THP)
                </option>
              );
          }
          return (
            <option key={idx} value={armor}>
              {armor} (+{getArmorData(armor, size).tempHP} THP)
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
      {armorId && armorId.includes("ablative") && (
        <AblativeArmor size={size}></AblativeArmor>
      )}
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
