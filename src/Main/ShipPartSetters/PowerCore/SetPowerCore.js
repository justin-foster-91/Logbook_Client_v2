import React, { useContext } from "react";
import * as Tables from "../CustomRefs/metaTables";
import PowerCoreSelections from "./PowerCoreSelections";
import { CustomShipContext } from "../../Context/shipContext";
import PartTitle from "../Components/PartTitle";
import PowerIcon from "../../IconRefs/PowerIcon";
import PartTotals from "../Components/PartTotals";
import AccordionText from "../Components/AccordionText";

function SetPowerCore(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { powerCoreIds } = customShipParts;
  const size = ship.getSize();
  const { currentPart } = props;

  const pcuProvided = powerCoreIds
    .map((core) => Tables.getPowerCoreData(core).pcuProvided)
    .reduce((total, pcu) => total + pcu);

  const bpCost = powerCoreIds
    .map((core) => Tables.getPowerCoreData(core).bpCost)
    .reduce((total, bp) => total + bp);

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <p>The power core is the most important system on a ship, as it provides power to every other system. The table below lists the ship size each core is designed for, as well as the PCU it provides and its cost. Each Large and smaller ship has room for only a single power core by default, but Medium and Large starships can be fitted with an extra power core housing (see Expansion Bays). Huge starships can have up to two power cores, Gargantuan starships can have up to three, and Colossal starships can have up to four. Though some ships are exceptions to this standard, they are rare in design. A power core typically has a backup battery system for use in emergencies that can provide limited power—enough for life support, gravity, and comms (see page 430, CRB), but no other systems—for 2d6 days.</p>
      </AccordionText>

      {size === "Supercolossal" &&
        <div className="note">
          A Supercolossal ship may have only a single Supercolossal power core. 
          <ul>
            <li>Up to 5 Colossal sized cores</li>
            <li>1 Supercolossal core with up to 4 smaller backup cores</li>
          </ul>
        </div>
      }

      <PowerCoreSelections></PowerCoreSelections>

      <div className="row">
        <PowerIcon />
        <div><strong>PCU Budget</strong>: {pcuProvided}</div>
      </div>

      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetPowerCore;
