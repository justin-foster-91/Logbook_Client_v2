import React, {useState, useEffect} from 'react';
import {getArmorData, getArmorIdList} from '../References/metaTables';

function AblativeArmor(props) {
  let { armorId, ablativeArmorByPosition } = props.customShipParts
  let { size, setCustomShipParts, customShipParts } = props
  let {forward, port, starboard, aft} = props.customShipParts.ablativeArmorByPosition

  let maxHP = getArmorData(armorId, size).tempHP
  let balancedHP = (getArmorData(armorId, size).tempHP)/4
  let usedHP = forward + port + starboard + aft

  useEffect(() => {
    ablativeArmorByPosition.forward = balancedHP;
    ablativeArmorByPosition.port = balancedHP;
    ablativeArmorByPosition.starboard = balancedHP;
    ablativeArmorByPosition.aft = balancedHP;
    setCustomShipParts({...customShipParts})
  }, [])

  const handleTempHPChange = (ev) => {
    let ablativeArc = ev.target.name;
    // FIXME: why do I need to convert this to a number? It's supposed to be a number input type
    let ablativeArcValue = Number(ev.target.value);

    ablativeArmorByPosition[ablativeArc] = ablativeArcValue;
    setCustomShipParts({...customShipParts})
  }

  const isWithinTotalHP = () => {
    return usedHP <= maxHP
  }

  const isBalanced = () => {
    let arcs = [forward, port, starboard, aft]
    return arcs.every(arc => arc === balancedHP)
  }

  return (
    <div>
      <form onChange={(ev) => handleTempHPChange(ev)}>
        <label htmlFor="forward">Forward:</label>
        <input type="number" id="forward" name="forward" defaultValue={balancedHP} required/> 

        <label htmlFor="port">Port:</label>
        <input type="number" id="port" name="port" defaultValue={balancedHP} required/> 

        <label htmlFor="starboard">Starboard:</label>
        <input type="number" id="starboard" name="starboard" defaultValue={balancedHP} required/> 

        <label htmlFor="aft">Aft:</label>
        <input type="number" id="aft" name="aft" defaultValue={balancedHP} required/> 
      </form>

      Used: {usedHP} -- Total allowed: {maxHP}
      <br/>
      {!isWithinTotalHP() && `**Ablative armor total may not exceed ${maxHP}**`}
      <br/>
      {!isBalanced() && 'NOTE: The ship has a -1 penalty to Piloting because temporary HP from ablative armor is not balanced.'}

    </div>
  );
}

export default AblativeArmor;