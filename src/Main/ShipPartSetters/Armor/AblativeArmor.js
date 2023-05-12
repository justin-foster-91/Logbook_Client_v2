import React, { useContext } from "react";
import * as Tables from "../CustomRefs/metaTables";
import { CustomShipContext } from "../../Context/shipContext";
import PartTitle from "../Components/PartTitle";

function SetAblativeArmor(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { armorId } = customShipParts;
  const size = ship.getSize();
  const { forward, port, starboard, aft } = customShipParts.ablativeArmorByPosition;
  const maxHP = Tables.getArmorData(armorId, size).tempHP;
  const balancedHP = Tables.getArmorData(armorId, size).tempHP / 4;
  const usedHP = forward + port + starboard + aft;

  
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

  const handleTempHPChange = (ev) => {
    const ablativeArc = ev.target.name;
    const ablativeArcValue = Number(ev.target.value);

    ship.setAblativeHPByPosition(ablativeArc, ablativeArcValue)
  };

  const setArcHPValues = (ev) => {
    ev.preventDefault();

    balanceAllHP(balancedHP);
  };

  const balanceAllHP = (balancedHP) => {  
    ship.setAblativeHPByPosition('forward', balancedHP)
    ship.setAblativeHPByPosition('port', balancedHP)
    ship.setAblativeHPByPosition('starboard', balancedHP)
    ship.setAblativeHPByPosition('aft', balancedHP)
  };

  const isCorrectTotalHP = () => {
    return usedHP === maxHP;
  };

  const isBalanced = () => {
    const arcs = [forward, port, starboard, aft];
    return arcs.every((arc) => arc === forward);
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
      </div>
    </>
  );
}

export default SetAblativeArmor;
