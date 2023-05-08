import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import PartTotals from "../Components/PartTotals";
import AccordionText from '../Components/AccordionText';
import { isValidSecurity } from '../CustomRefs/optionValidation';

function HackAndCloak(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { antiHackingSystemsId, cloakingId } = customShipParts;
  const { currentPart } = props;
  const { bpCost: hackingBpCost } = Tables.getAntiHackingData(antiHackingSystemsId);
  const { bpCost: cloakingBpCost, type } = Tables.getCloakingData(cloakingId);

  const normalCloak = "Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor's first range increment. Engaging a Drift engine or thrusters or beginning starship combat immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally."
  const grayCloak = "Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor's first range increment. Engaging a Drift engine or firing a starship weapon immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally. However, a starship hidden with a gray cloaking device can move, though at a maximum speed of 10 hexes for Tiny and Small starships, 8 hexes for Medium and Large starships, and 6 hexes for Huge and larger starships."

  const handleDropdownChange = (ev) => {
    let option = ev.target.value;
    if (option === "None") option = null;

    ship.setSecurity({ reference: ev.target.id, value: option})
  }

  const renderCloakDescription = () => {
    if (!type) return;

    if (type === "Normal") return normalCloak;
    if (type === "Gray") return grayCloak;
  }

  return (
    <>
      <div className="dropdownBlock full">
        <label htmlFor="Anti-Hacking Systems">Anti-Hacking Systems</label>
        {/*  increase the DC to hack into it by 1 * mark */}
        <select 
          id="Anti-Hacking Systems" 
          value={antiHackingSystemsId || "None"} 
          onChange={handleDropdownChange}
        >
          <option key={"None"}>None</option>
          {Tables.getAntiHackingIdList().map((weapon, idx) => (
            <option key={idx}>{weapon}</option>
          ))}
        </select>
        <PartTotals part={currentPart} bpCost={hackingBpCost} />

        <AccordionText>
          <p>By increasing the security of the starship's computer, these systems increase the DC to hack into it by 1 (see page 139 CRB)</p>
        </AccordionText>
      </div>

      <div className="dropdownBlock full">
        <label htmlFor="Cloaking Device">Cloaking</label>
        <select 
          id="Cloaking Device" 
          value={cloakingId || "None"} 
          onChange={handleDropdownChange}
        >
          <option key={"None"}>None</option>
          {Tables.getCloakingIdList().map((cloak, idx) => (
            isValidSecurity(ship, cloak, "cloaking") 
            && <option key={idx}>{cloak}</option>
          ))}
        </select>

        <PartTotals part={currentPart} bpCost={cloakingBpCost} />

        <AccordionText>{renderCloakDescription()}</AccordionText>
      </div>
    </>
  );
}

export default HackAndCloak;