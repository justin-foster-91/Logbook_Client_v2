import React, { useContext, useEffect } from "react";
import { CustomShipContext } from "../../Context/shipContext";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";
import AntiPersonnel from "./AntiPersonnel";
import CompCounter from "./CompCounter";
import HackAndCloak from "./HackAndCloak";
import SecurityCheckboxes from "./SecurityCheckboxes";
import * as SF from "../../References/shipFunctions";
import AccordionText from "../Components/AccordionText";

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=All&Family=None

// TODO: change layouts of the different costs to look more organized
// possibly list all cost right aligned or at least in a column with other costs of same type

function SetSecurity(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { currentPart } = props;

  const totalSecurityBP = SF.getTotalSecurityCosts(customShipParts).totalBpCosts;
  const totalSecurityPCU = SF.getTotalSecurityCosts(customShipParts).totalPcuCosts;

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <p>The additions below help to prevent unwanted scoundrels from absconding with a starship. Security systems require an operational power core to function, but they consume a negligible amount of PCU.</p>
      </AccordionText>

      <AntiPersonnel currentPart={currentPart}/>
      <CompCounter currentPart={currentPart}/>
      <HackAndCloak currentPart={currentPart}/>
      <SecurityCheckboxes currentPart={currentPart}/>

      <PartTotals part={currentPart} bpCost={totalSecurityBP} pcuCost={totalSecurityPCU} />
    </>
  );
}

export default SetSecurity;
