import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function AblativeArmor() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { armorId } = customShipParts;
  const size = ship.getSize();
  const { forward, port, starboard, aft } = customShipParts.ablativeArmorByPosition;
  const maxHP = Tables.getArmorData(armorId, size).tempHP;
  const balancedHP = Tables.getArmorData(armorId, size).tempHP / 4;
  const usedHP = forward + port + starboard + aft;

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

  return (
    <div className="ablativeArcs">
      <form>
        <label htmlFor="forward">Forward:</label>
        <input
          type="number"
          id="forward"
          name="forward"
          value={forward}
          required
          onChange={handleTempHPChange}
        />

        <label htmlFor="port">Port:</label>
        <input
          type="number"
          id="port"
          name="port"
          value={port}
          required
          onChange={handleTempHPChange}
        />

        <label htmlFor="starboard">Starboard:</label>
        <input
          type="number"
          id="starboard"
          name="starboard"
          value={starboard}
          required
          onChange={handleTempHPChange}
        />

        <label htmlFor="aft">Aft:</label>
        <input
          type="number"
          id="aft"
          name="aft"
          value={aft}
          required
          onChange={handleTempHPChange}
        />

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
  );
}

export default AblativeArmor;
