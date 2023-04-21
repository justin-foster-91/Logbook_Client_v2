import React from "react";
import PartTitle from "../Components/PartTitle";
import PartTotals from "../Components/PartTotals";
import AntiPersonnel from "./AntiPersonnel";
import CompCounter from "./CompCounter";
import HackAndCloak from "./HackAndCloak";
import SecurityCheckboxes from "./SecurityCheckboxes";

// https://www.aonsrd.com/Starship_Security.aspx?ItemName=All&Family=None

function SetSecurity(props) {
  const { currentPart } = props;

  const totalSecurityBP = null
  const totalSecurityPCU = null

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AntiPersonnel currentPart={currentPart}/>
      <CompCounter currentPart={currentPart}/>
      <HackAndCloak currentPart={currentPart}/>
      <SecurityCheckboxes currentPart={currentPart}/>

      <PartTotals totalBP={totalSecurityBP} totalPCU={totalSecurityPCU} />
    </>
  );
}

export default SetSecurity;
