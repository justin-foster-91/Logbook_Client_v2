import React, { useEffect, useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function AblativeArmor() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const { armorId } = customShipParts;
  const { size } = ship.getSize();
  const { forward, port, starboard, aft } = customShipParts.ablativeArmorByPosition;
  const maxHP = Tables.getArmorData(armorId, size).tempHP;
  const balancedHP = Tables.getArmorData(armorId, size).tempHP / 4;
  const usedHP = forward + port + starboard + aft;

  useEffect(() => {
    balanceAllHP();
  }, [armorId]);

  const handleTempHPChange = (ev) => {
    const ablativeArc = ev.target.name;
    const ablativeArcValue = Number(ev.target.value);

    ship.setAblativeHPByPosition(ablativeArc, ablativeArcValue)
    setCustomShipParts({ ...customShipParts });
  };

  const balanceAllHP = () => {
    ship.setAblativeHPByPosition('forward', balancedHP)
    ship.setAblativeHPByPosition('port', balancedHP)
    ship.setAblativeHPByPosition('starboard', balancedHP)
    ship.setAblativeHPByPosition('aft', balancedHP)
    setCustomShipParts({ ...customShipParts });
  };

  const setArcHPValues = (ev) => {
    ev.preventDefault();
    balanceAllHP();
  };

  const isCorrectTotalHP = () => {
    return usedHP === maxHP;
  };

  const isBalanced = () => {
    const arcs = [forward, port, starboard, aft];
    return arcs.every((arc) => arc === forward);
  };

  return (
    <div>
      <form>
        <label htmlFor="forward">Forward:</label>
        <input
          type="number"
          id="forward"
          name="forward"
          value={forward}
          required
          onChange={(ev) => handleTempHPChange(ev)}
        />

        <label htmlFor="port">Port:</label>
        <input
          type="number"
          id="port"
          name="port"
          value={port}
          required
          onChange={(ev) => handleTempHPChange(ev)}
        />

        <label htmlFor="starboard">Starboard:</label>
        <input
          type="number"
          id="starboard"
          name="starboard"
          value={starboard}
          required
          onChange={(ev) => handleTempHPChange(ev)}
        />

        <label htmlFor="aft">Aft:</label>
        <input
          type="number"
          id="aft"
          name="aft"
          value={aft}
          required
          onChange={(ev) => handleTempHPChange(ev)}
        />

        <br />
        <button onClick={(ev) => setArcHPValues(ev)}>Balance All HP</button>
      </form>
      Used: {usedHP} -- Allowed: {maxHP}
      <br />
      {isCorrectTotalHP() || `Your total HP must add up to ${maxHP}`}
      <br />
      {isBalanced() ||
        "NOTE: The ship has a -1 penalty to Piloting because temporary HP from ablative armor is not balanced."}
    </div>
  );
}

export default AblativeArmor;
