import React, { useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import PartTotals from "../Components/PartTotals";

function SecurityCheckboxes(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { hasBiometricLocks, hasSelfDestructSystem, hasEmergencyAccelerator, hasHolographicMantle, hasReconfigurationSystem } = customShipParts;

  const { currentPart } = props;
  const size = ship.getSize();

  const biometricBpCost = Tables.getSecurityCheckboxData("Biometric Locks", size).bpCost;
  const selfDestructBpCost = Tables.getSecurityCheckboxData("Self-Destruct System", size).bpCost;
  const emergencyBpCost = Tables.getSecurityCheckboxData("Emergency Accelerator", size).bpCost;
  const holographicBpCost = Tables.getSecurityCheckboxData("Holographic Mantle", size).bpCost;
  const reconfigurationBpCost = Tables.getSecurityCheckboxData("Reconfiguration System", size).bpCost;

  // PCU costs for accelerator, holographic mantle, and reconfiguration system
  const emergencyPcuCost = Tables.getSecurityCheckboxData("Emergency Accelerator", size).pcuCost;
  const holographicPcuCost = Tables.getSecurityCheckboxData("Holographic Mantle", size).pcuCost;
  const reconfigurationPcuCost = Tables.getSecurityCheckboxData("Reconfiguration System", size).pcuCost;

  const securityCheckboxList = [
    "Biometric Locks", 
    "Self-Destruct System", 
    "Emergency Accelerator", 
    "Holographic Mantle", 
    "Reconfiguration System"
  ]

  const securityCheckboxActive = {
    "Biometric Locks": hasBiometricLocks,
    "Self-Destruct System": hasSelfDestructSystem,
    "Emergency Accelerator": hasEmergencyAccelerator,
    "Holographic Mantle": hasHolographicMantle,
    "Reconfiguration System": hasReconfigurationSystem
  }

  const securityCheckboxBpCost = (box) => {
    if (box === "Biometric Locks") return biometricBpCost;
    if (box === "Self-Destruct System") return selfDestructBpCost;
    if (box === "Emergency Accelerator") return emergencyBpCost;
    if (box === "Holographic Mantle") return holographicBpCost;
    if (box === "Reconfiguration System") return reconfigurationBpCost;
  }

  const securityCheckboxPcuCost = (box) => {
    if (box === "Emergency Accelerator") return emergencyPcuCost;
    if (box === "Holographic Mantle") return holographicPcuCost;
    if (box === "Reconfiguration System") return reconfigurationPcuCost;
  }

  const handleCheckboxChange = (ev) => {
    const checkboxOption = ev.target.name
    const checkboxActive = ev.target.checked

    ship.setSecurity({ reference: checkboxOption, value: checkboxActive})
  }

  const partTotalsRender = (box) => {
    if (box === "Biometric Locks" || box === "Self-Destruct System") {
      return <PartTotals 
        part={currentPart} 
        bpCost={securityCheckboxActive[box] ? securityCheckboxBpCost(box) : 0} 
      />
    } else {
      return <PartTotals 
        part={currentPart} 
        bpCost={securityCheckboxActive[box] ? securityCheckboxBpCost(box) : 0} 
        pcuCost={securityCheckboxActive[box] ? securityCheckboxPcuCost(box) : 0}
      />
    }
  }

  return (
    <>
      <div>
        {securityCheckboxList.map((box, idx) => (
          <div className="row" key={box}>
            <input type="checkbox" id={box} name={box} 
              checked={securityCheckboxActive[box]}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={box}>{box}</label>
            
            {partTotalsRender(box)}

            <div></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SecurityCheckboxes;