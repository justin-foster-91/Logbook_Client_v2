import React, { useEffect, useContext } from "react";
import { getArmorData } from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function AblativeArmor(props) {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  const { armorId, ablativeArmorByPosition } = customShipParts;
  const { size } = props;
  const { forward, port, starboard, aft } = customShipParts.ablativeArmorByPosition;

  const maxHP = getArmorData(armorId, size).tempHP;
  const balancedHP = getArmorData(armorId, size).tempHP / 4;
  const usedHP = forward + port + starboard + aft;

  useEffect(() => {
    balanceAllHP();
  }, [maxHP]);

  const handleTempHPChange = (ev) => {
    const ablativeArc = ev.target.name;
    const ablativeArcValue = Number(ev.target.value);

    ablativeArmorByPosition[ablativeArc] = ablativeArcValue;
    setCustomShipParts({ ...customShipParts });
  };

  const balanceAllHP = () => {
    ablativeArmorByPosition.forward = balancedHP;
    ablativeArmorByPosition.port = balancedHP;
    ablativeArmorByPosition.starboard = balancedHP;
    ablativeArmorByPosition.aft = balancedHP;
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
