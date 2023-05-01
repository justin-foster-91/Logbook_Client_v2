import React, { useContext } from "react";
import * as Tables from "../CustomRefs/metaTables";
import AblativeArmor from "./AblativeArmor";
import { CustomShipContext } from "../../Context/shipContext";
import * as SF from "../../References/shipFunctions";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";
import AccordionText from "../Components/AccordionText";
import SpecialMaterials from "../Components/SpecialMaterials";

function SetArmor(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { armorId } = customShipParts;
  const { size, hp } = SF.getFramePackage(customShipParts);
  const { acBonus, tempHP, tlPenalty, turnDistance, bpCost } = Tables.getArmorData(armorId, size);
  const { currentPart } = props;
  

  const handleArmorChange = (ev) => {
    let armorOption = ev.target.value;
    if (armorOption === "None") armorOption = null;

    ship.setArmor(armorOption)
  };

  const renderArmorBonus = () => {
    if (!acBonus && !tempHP) return <><strong>AC/Temp HP</strong>: n/a</>;
    if (acBonus) return <><strong>Bonus AC</strong>: {acBonus}</>;
    return <><strong>Temp HP</strong>: {tempHP}</>;
  };

  const renderSpecial = () => {
    if (turnDistance) return <>{tlPenalty} TL; +{turnDistance} turn distance</>;
    if (tlPenalty) return <>{tlPenalty} TL</>;
    return <>n/a</>;
  };

  const renderArmorDescription = () => {
    if (armorId.includes("Mk"))
      return "Standard armor with a bonus to AC";
    if (armorId.includes("Energy"))
      return "A ship equipped with energy-absorbent plating can store some of the energy that strikes the hull, redirecting that energy to power the ship's systems. Once per turn, when a ship with energy-absorbent plating is hit by an attack that penetrates its shields, the ship's engineer may immediately take a free divert action. The boost granted by this free divert action does not stack with the benefit of any other divert action already benefiting the ship.";
    if (armorId.includes("ablative")) {
      return "By layering inexpensive metal and composite plates over existing bulkheads, a ship can absorb initial damage to its hull before its essential components become vulnerable to attack or hostile environments. However, thicker plates are bulky and interfere with the maneuverability and handling of starships. Ablative armor grants a starship temporary Hull Points to each quadrant, usually distributed evenly. When a starship would take damage to its Hull Points, it first reduces its temporary Hull Points from ablative armor in that quadrant. Once a starship's temporary Hull Points in a quadrant are reduced to 0, any further damage to that quadrant not absorbed by shields is applied to the ship's Hull Points. The loss of temporary Hull Points does not count toward the starship's critical threshold, though for all other effects, any attack that reduces a starship's temporary Hull Points is treated as though it had dealt Hull Point damage to the target.";
    }
    return "Interposed defenses grant temporary HP that doesn't need to be distributed into quadrants, instead providing a single pool to draw from regardless of which arc an attack strikes.";
  }

  const createDropdownItem = (armor, idx) => {
    if (armor.includes("Mk")) return `${armor} Armor (+${Tables.getArmorData(armor, size).acBonus} AC)`;
    if (armor.includes("Energy")) return `${armor}`;
    if (armor.includes("ablative")) return `${armor} (+${Tables.getArmorData(armor, size).tempHP} THP)`;
    if (armor.includes("interposed")) return `${armor} (+${Tables.getArmorData(armor, size).tempHP} THP)`;
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <p>Armor protects a ship from direct-fire weapons (see Type on page 303, CRB), deflecting their energy and preventing damage to critical ship systems. It grants an armor bonus to a ship's AC. Armor's cost depends on the bonus it grants and the ship's size category. Armor is a passive system and does not require any PCU to remain functional. It provides protection primarily through mass, which can affect a ship's maneuverability (making it harder to turn) and make it easier for opponents using tracking weapons to lock on to the ship— these effects are listed in the Special section below.</p>
      </AccordionText>

      <div className="dropdownBlock">
        <label htmlFor="armor" className="hidden">Armor Type</label>
        <select 
          id="armor"
          value={armorId ? armorId : "None"}
          onChange={handleArmorChange}
        >
          <option key="None">None</option>
          {Tables.getArmorIdList().map((armor, idx) => 
            (Tables.getArmorData(armor, size).tempHP >= hp * 2)
            || <option key={idx} value={armor}>
              {createDropdownItem(armor, idx)}
            </option>
          )}
        </select>
      </div>

      {armorId && 
        <AccordionText>
          {renderArmorDescription()}
        </AccordionText>}

      {armorId?.includes("Mk") 
        && <SpecialMaterials part="Armor"/>}

      {armorId?.includes("ablative") 
        && <AblativeArmor size={size}></AblativeArmor>}

      <div className="row">
        <div>{renderArmorBonus()}</div>
        <div className="row special"><strong>Special</strong>: {renderSpecial()}</div>
      </div>

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetArmor;
