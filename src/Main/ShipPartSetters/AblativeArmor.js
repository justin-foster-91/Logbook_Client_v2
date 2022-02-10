import React, {useState, useEffect, useContext} from 'react';
import {getArmorData, getArmorIdList} from '../References/metaTables';
import { CustomShipContext } from "../Context/shipContext";

function AblativeArmor(props) {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  let { armorId, ablativeArmorByPosition } = customShipParts
  let { size } = props
  let {forward, port, starboard, aft} = customShipParts.ablativeArmorByPosition

  let maxHP = getArmorData(armorId, size).tempHP
  let balancedHP = (getArmorData(armorId, size).tempHP)/4
  let usedHP = forward + port + starboard + aft

  useEffect(() => {
    balanceAllHP()
  }, [])

  const handleTempHPChange = (ev) => {
    let ablativeArc = ev.target.name;
    let ablativeArcValue = Number(ev.target.value);

    ablativeArmorByPosition[ablativeArc] = ablativeArcValue;
    setCustomShipParts({...customShipParts})
  }

  const balanceAllHP = () => {
    ablativeArmorByPosition.forward = balancedHP;
    ablativeArmorByPosition.port = balancedHP;
    ablativeArmorByPosition.starboard = balancedHP;
    ablativeArmorByPosition.aft = balancedHP;
    setCustomShipParts({...customShipParts})
  }

  const setArcHPValues = (ev) => {
    ev.preventDefault()
    balanceAllHP()
    console.log(ev);
  }

  const isCorrectTotalHP = () => {
    return usedHP === maxHP
  }

  const isBalanced = () => {
    let arcs = [forward, port, starboard, aft]
    return arcs.every(arc => arc === forward)
  }

  return (
    <div>
      <form onChange={(ev) => handleTempHPChange(ev)}>
        <label htmlFor="forward">Forward:</label>
        <input type="number" id="forward" name="forward" defaultValue={balancedHP} value={forward} required/> 

        <label htmlFor="port">Port:</label>
        <input type="number" id="port" name="port" defaultValue={balancedHP} value={port} required/> 

        <label htmlFor="starboard">Starboard:</label>
        <input type="number" id="starboard" name="starboard" defaultValue={balancedHP} value={starboard} required/> 

        <label htmlFor="aft">Aft:</label>
        <input type="number" id="aft" name="aft" defaultValue={balancedHP} value={aft} required/> 
      
        <br/>
        <button onClick={(ev) => setArcHPValues(ev)}>Balance All HP</button>
      </form>

      Used: {usedHP} -- Allowed: {maxHP}
      
      <br/>
      {isCorrectTotalHP() || `Your total HP must add up to ${maxHP}`}
      <br/>
      {isBalanced() || 'NOTE: The ship has a -1 penalty to Piloting because temporary HP from ablative armor is not balanced.'}

    </div>
  );
}

export default AblativeArmor;