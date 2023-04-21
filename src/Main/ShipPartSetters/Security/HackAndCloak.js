import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../../References/metaTables";
import PartTotals from "../../Components/PartTotals";


// Normal Cloaking: Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor’s first range increment. Engaging a Drift engine or thrusters or beginning starship combat immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally.

// Gray Cloaking: Sensors capable of detecting a cloaked starship can do so only when the cloaked starship has entered the sensor’s first range increment. Engaging a Drift engine or firing a starship weapon immediately negates the cloaking ability, whereupon the ship reappears and can be detected normally. However, a starship hidden with a gray cloaking device can move, though at a maximum speed of 10 hexes for Tiny and Small starships, 8 hexes for Medium and Large starships, and 6 hexes for Huge and larger starships.

function HackAndCloak(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [cloakingBpCost, setCloakingBpCost] = useState(0);


  const { antiHackingSystemsId, cloakingId } = customShipParts;
  const { currentPart } = props;
  const { bpCost } = Tables.getAntiHackingData(antiHackingSystemsId);

  useEffect(() => {
    if (!cloakingId) return;
    if (!Tables.getCloakingData(cloakingId)) return;

    const { bpCost, pcuCost, sfsLegal, source } = Tables.getCloakingData(cloakingId);

    setCloakingBpCost(bpCost)

  }, [cloakingId])

  const handleAntiHackingChange = (ev) => {
    const antiHackingOption = ev.target.value;

    ship.setSecurity({ reference: "Anti-Hacking Systems", value: antiHackingOption})
  }

  const handleCloakingIdChange = (ev) => {
    const cloakingOption = ev.target.value;

    ship.setSecurity({ reference: "Cloaking Device", value: cloakingOption})
  }

  return (
    <>
      <div className="dropdownBlock">
        <label htmlFor="antiHackingSystems">Anti-Hacking Systems</label>
        {/*  increase the DC to hack into it by 1 * mark */}
        <select 
          id="antiHackingSystems" 
          value={antiHackingSystemsId || "None"} 
          onChange={handleAntiHackingChange}
        >
          <option key={"None"}>None</option>
          {Tables.getAntiHackingIdList().map((weapon, idx) => (
            <option key={idx}>{weapon}</option>
          ))}
        </select>
        <PartTotals part={currentPart} bpCost={bpCost} />
      </div>

      {/* TODO: radio buttons for normal and gray cloaking that change dropdown data? */}
      <div className="dropdownBlock">
        <label htmlFor="cloaking">Cloaking</label>
        <select id="cloaking" value={cloakingId || "None"} onChange={handleCloakingIdChange}>
          <option key={"None"}>None</option>
          {Tables.getCloakingIdList().map((cloak, idx) => (
            <option key={idx}>{cloak}</option>
          ))}
        </select>
        <PartTotals part={currentPart} bpCost={cloakingBpCost} />
      </div>
    </>
  );
}

export default HackAndCloak;