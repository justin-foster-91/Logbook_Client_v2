import React, { useContext } from "react";
import * as Tables from "../CustomRefs/metaTables";
import { CustomShipContext } from "../../Context/shipContext";
import * as SF from "../../References/shipFunctions";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";
import AccordionText from "../Components/AccordionText";
import SpecialMaterials from "../Components/SpecialMaterials";
import { isValidArmor } from "../CustomRefs/optionValidation";
import { SetterProps } from "../CustomRefs/customInterface";

function SetArmor(props: SetterProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { armorId } = ship.getParts();
  const { size, hp } = SF.getFramePackage(customShipParts);
  const { acBonus, tlPenalty, turnDistance, bpCost } = Tables.getArmorData(armorId, size);
  const { currentPart } = props;
  

  const handleArmorChange = (ev) => {
    let armorOption = ev.target.value;
    if (armorOption === "None") armorOption = null;

    ship.setArmor(armorOption)
  };

  const renderArmorBonus = () => {
    if (!acBonus) return <><strong>AC</strong>: n/a</>;
    if (acBonus) return <><strong>Bonus AC</strong>: {acBonus}</>;
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
  }

  const createDropdownItem = (armor, idx) => {
    if (armor.includes("Mk")) return `${armor} Armor (+${Tables.getArmorData(armor, size).acBonus} AC)`;
    if (armor.includes("Energy")) return `${armor}`;  }

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
          value={armorId || "None"}
          onChange={handleArmorChange}
        >
          <option key="None">None</option>
          {Tables.getArmorIdList().map((armor, idx) => 
            isValidArmor(ship, armor)
            && <option key={idx} value={armor}>
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

      <div className="row">
        <div>{renderArmorBonus()}</div>
        <div className="row special"><strong>Penalty</strong>: {renderSpecial()}</div>
      </div>

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetArmor;
