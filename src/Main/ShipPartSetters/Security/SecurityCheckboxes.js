import React, { useContext, useState, useEffect } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import PartTotals from "../Components/PartTotals";

function SecurityCheckboxes(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const [biometricBpCost, setBiometricBpCost] = useState(0);
  const [selfDestructBpCost, setSelfDestructBpCost] = useState(0);
  const [emergencyBpCost, setEmergencyBpCost] = useState(0);
  const [holographicBpCost, setHolographicBpCost] = useState(0);
  const [reconfigurationBpCost, setReconfigurationBpCost] = useState(0);

  const { hasBiometricLocks, hasSelfDestructSystem, hasEmergencyAccelerator, hasHolographicMantle, hasReconfigurationSystem } = customShipParts;

  const { currentPart } = props;
  const size = ship.getSize();

  const securityCheckboxList = ["Biometric Locks", "Self-Destruct System", "Emergency Accelerator", "Holographic Mantle", "Reconfiguration System"]
  const securityCheckboxActive = {
    "Biometric Locks": hasBiometricLocks,
    "Self-Destruct System": hasSelfDestructSystem,
    "Emergency Accelerator": hasEmergencyAccelerator,
    "Holographic Mantle": hasHolographicMantle,
    "Reconfiguration System": hasReconfigurationSystem
  }

  useEffect(() => {
    if (hasBiometricLocks) {
      setBiometricBpCost(Tables.getSecurityCheckboxData("Biometric Locks", size).bpCost);
    }
    
    setSelfDestructBpCost(Tables.getSecurityCheckboxData("Self-Destruct System", size).bpCost);
    setEmergencyBpCost(Tables.getSecurityCheckboxData("Emergency Accelerator", size).bpCost);
    setHolographicBpCost(Tables.getSecurityCheckboxData("Holographic Mantle", size).bpCost);
    setReconfigurationBpCost(Tables.getSecurityCheckboxData("Reconfiguration System", size).bpCost);
  }, [hasBiometricLocks, size])



  const handleCheckboxChange = (ev) => {
    const checkboxOption = ev.target.name
    const checkboxActive = document.getElementById(`${checkboxOption}`).checked

    ship.setSecurity({ reference: checkboxOption, value: checkboxActive})

    // ship.setSecurity({ reference: biometricOption, value: biometricActive, parent})  
  }

  const securityCheckboxBpCost = (box) => {
    if (box === "Biometric Locks") return biometricBpCost;
    if (box === "Self-Destruct System") return selfDestructBpCost;
    if (box === "Emergency Accelerator") return emergencyBpCost;
    if (box === "Holographic Mantle") return holographicBpCost;
    if (box === "Reconfiguration System") return reconfigurationBpCost;
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
            <PartTotals part={currentPart} bpCost={securityCheckboxBpCost(box)} />
          </div>
        ))}
      </div>
    </>
  );
}

export default SecurityCheckboxes;