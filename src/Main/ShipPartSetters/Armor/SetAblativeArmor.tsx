import React, { useContext } from "react";
import * as Tables from "../CustomRefs/metaTables";
import * as SF from "../../References/shipFunctions";
import { CustomShipContext } from "../../Context/shipContext";
import PartTitle from "../Components/PartTitle";
import { isValidAblativeArmor } from "../CustomRefs/optionValidation";
import AccordionText from "../Components/AccordionText";
import { SetterProps } from "../CustomRefs/customInterface";

function SetAblativeArmor(props: SetterProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { ablativeArmorId } = customShipParts;
  const size = ship.getSize();
  const { forward, port, starboard, aft } = customShipParts.ablativeArmorByPosition;
  // const { maxHP, tempHP } = Tables.getAblativeArmorData(armorId, size).tempHP;
  const { acBonus, tempHP, tlPenalty, turnDistance, bpCost, maxHP } = Tables.getAblativeArmorData(ablativeArmorId);
  const balancedHP: number = tempHP / 4;
  const usedHP = forward + port + starboard + aft;

  const { hp } = SF.getFramePackage(customShipParts);
  const { currentPart } = props;

  const handleArmorChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    let armorOption: string | null = ev.target.value;
    if (armorOption === "None") armorOption = null;

    ship.setAblativeArmor(armorOption)
  };

  const renderArmorBonus = (): JSX.Element => {
    if (!acBonus && !tempHP) return <><strong>AC/Temp HP</strong>: n/a</>;
    if (acBonus) return <><strong>Bonus AC</strong>: {acBonus}</>;
    return <><strong>Temp HP</strong>: {tempHP}</>;
  };

  const renderSpecial = (): JSX.Element => {
    if (turnDistance) return <>{tlPenalty} TL; +{turnDistance} turn distance</>;
    if (tlPenalty) return <>{tlPenalty} TL</>;
    return <>n/a</>;
  };

  const handleTempHPChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const ablativeArc = ev.target.name;
    const ablativeArcValue = Number(ev.target.value);

    ship.setAblativeHPByPosition(ablativeArc, ablativeArcValue)
  };

  const setArcHPValues = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    ev.preventDefault();

    balanceAllHP(balancedHP);
  };

  const balanceAllHP = (balancedHP: number) => {  
    ship.setAblativeHPByPosition('forward', balancedHP)
    ship.setAblativeHPByPosition('port', balancedHP)
    ship.setAblativeHPByPosition('starboard', balancedHP)
    ship.setAblativeHPByPosition('aft', balancedHP)
  };

  const isCorrectTotalHP = (): boolean => {
    return usedHP === maxHP;
  };

  const isBalanced = (): boolean => {
    const arcs = [forward, port, starboard, aft];
    return arcs.every((arc) => arc === forward);
  };

  const renderArmorDescription = (): string => {
    if (ablativeArmorId.includes("ablative")) {
      return "By layering inexpensive metal and composite plates over existing bulkheads, a ship can absorb initial damage to its hull before its essential components become vulnerable to attack or hostile environments. However, thicker plates are bulky and interfere with the maneuverability and handling of starships. Ablative armor grants a starship temporary Hull Points to each quadrant, usually distributed evenly. When a starship would take damage to its Hull Points, it first reduces its temporary Hull Points from ablative armor in that quadrant. Once a starship's temporary Hull Points in a quadrant are reduced to 0, any further damage to that quadrant not absorbed by shields is applied to the ship's Hull Points. The loss of temporary Hull Points does not count toward the starship's critical threshold, though for all other effects, any attack that reduces a starship's temporary Hull Points is treated as though it had dealt Hull Point damage to the target.";
    }
    return "Interposed defenses grant temporary HP that doesn't need to be distributed into quadrants, instead providing a single pool to draw from regardless of which arc an attack strikes.";
  }

  const createDropdownItem = (armor: string, idx: number): string | undefined => {
    if (armor.includes("ablative")) return `${armor} (+${Tables.getAblativeArmorData(armor).tempHP} THP)`;
    if (armor.includes("interposed")) return `${armor} (+${Tables.getAblativeArmorData(armor).tempHP} THP)`;
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <label htmlFor="armor" className="hidden">Armor Type</label>
        <select 
          id="armor"
          value={ablativeArmorId || "None"}
          onChange={handleArmorChange}
        >
          <option key="None">None</option>
          {Tables.getAblativeArmorIdList().map((armor, idx) => 
            isValidAblativeArmor(ship, armor)
            && <option key={idx} value={armor}>
              {createDropdownItem(armor, idx)}
            </option>
          )}
        </select>
      </div>

      <div className="ablativeArmor">
        <form>
          <div className="dropdownBlock">
            <label htmlFor="forward">Forward:</label>
            <input
              type="number"
              id="forward"
              name="forward"
              value={forward}
              required
              onChange={handleTempHPChange}
            />
          </div>
          <div className="dropdownBlock">
            <label htmlFor="port">Port:</label>
            <input
              type="number"
              id="port"
              name="port"
              value={port}
              required
              onChange={handleTempHPChange}
            />
          </div>
          <div className="dropdownBlock">
            <label htmlFor="starboard">Starboard:</label>
            <input
              type="number"
              id="starboard"
              name="starboard"
              value={starboard}
              required
              onChange={handleTempHPChange}
            />
          </div>
          <div className="dropdownBlock">
            <label htmlFor="aft">Aft:</label>
            <input
              type="number"
              id="aft"
              name="aft"
              value={aft}
              required
              onChange={handleTempHPChange}
            />
          </div>

          <button onClick={setArcHPValues}>Balance All HP</button>
        </form>

        <div className="row">
          <div>Used: {usedHP}</div>
          <div>Allowed: {maxHP}</div>
        </div>

        {isCorrectTotalHP() || 
          <div className="note">Your total HP must add up to {maxHP}</div>}

        {isBalanced() ||
          <div className="note">NOTE: The ship has a -1 penalty to Piloting because temporary HP from ablative armor is not balanced.</div>}

        {ablativeArmorId && 
          <AccordionText>
            {renderArmorDescription()}
          </AccordionText>}

        <div className="row">
          <div className="row special"><strong>Penalty</strong>: {renderSpecial()}</div>
        </div>
      </div>
    </>
  );
}

export default SetAblativeArmor;
