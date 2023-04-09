import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import AblativeArmor from "../Components/AblativeArmor";
import { CustomShipContext } from "../Context/shipContext";
import * as SF from "../References/shipFunctions";
import PartTitle from "../Components/PartTitle";

function SetArmor(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { armorId } = customShipParts;
  const { size, hp } = SF.getFramePackageFromShip(customShipParts);
  const { acBonus, tempHP, tlPenalty, turnDistance, bpCost } = Tables.getArmorData(armorId, size);
  const { currentPart } = props;

  const handleArmorChange = (ev) => {
    let armorOption = ev.target.value;
    if (armorOption === "None") armorOption = null;

    ship.setArmor(armorOption)
  };

  const renderArmorBonus = () => {
    if (!acBonus && !tempHP) return "AC/Temp HP: 0";
    if (acBonus) return `Bonus AC: ${acBonus}`;
    else return `Temp HP: ${tempHP}`;
  };

  const renderSpecial = () => {
    if (turnDistance) return <>{tlPenalty} TL; +{turnDistance} turn distance</>;

    if (tlPenalty) return <>{tlPenalty} TL</>;

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

  const createDropdownItem = (armor, idx) => {
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
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <select
          value={
            armorId ? armorId : "None"
          }
          onChange={handleArmorChange}
        >
          <option key="None">None</option>
          {Tables.getArmorIdList().map((armor, idx) => createDropdownItem(armor, idx))}
        </select>
      </div>

      {/* TODO: */}
      <div>Special Material:</div>
      {/* https://www.aonsrd.com/StarshipMaterials.aspx */}

      {armorId && 
        <div className="note">
          {renderArmorDescription()}
        </div>
      }

      {armorId && armorId.includes("ablative") 
      && <AblativeArmor size={size}></AblativeArmor>}

      <div className="row">
        <div>{renderArmorBonus()}</div>
        <div className="row special">Special: {renderSpecial()}</div>
      </div>

      <div className="row totals">
        <div>BP cost: {bpCost}</div>
      </div>
      
    </>
  );
}

export default SetArmor;
