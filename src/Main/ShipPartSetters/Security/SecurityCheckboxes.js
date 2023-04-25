import React, { useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import PartTotals from "../Components/PartTotals";

function SecurityCheckboxes(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { hasBiometricLocks, hasSelfDestructSystem, hasEmergencyAccelerator, hasHolographicMantle, hasReconfigurationSystem } = customShipParts;

  const { currentPart } = props;
  const size = ship.getSize();

  const securityCheckbox = {
    "Biometric Locks": {
      active: hasBiometricLocks,
      data: Tables.getSecurityCheckboxData("Biometric Locks", size),
    },
    "Self-Destruct System": {
      active: hasSelfDestructSystem,
      data: Tables.getSecurityCheckboxData("Self-Destruct System", size),
    },
    "Emergency Accelerator": {
      active: hasEmergencyAccelerator,
      data: Tables.getSecurityCheckboxData("Emergency Accelerator", size),
    },
    "Holographic Mantle": {
      active: hasHolographicMantle,
      data: Tables.getSecurityCheckboxData("Holographic Mantle", size),
    },
    "Reconfiguration System": {
      active: hasReconfigurationSystem,
      data: Tables.getSecurityCheckboxData("Reconfiguration System", size),
    },
  };

  const handleCheckboxChange = (ev) => {
    const checkboxOption = ev.target.name
    const checkboxActive = ev.target.checked

    ship.setSecurity({ reference: checkboxOption, value: checkboxActive})
  }

  const partTotalsRender = (box) => {
    if (box === "Biometric Locks" || box === "Self-Destruct System") {
      return <PartTotals 
        part={currentPart} 
        bpCost={securityCheckbox[box].active ? securityCheckbox[box].data.bpCost : 0} 
        pcuCost={securityCheckbox[box].active ? securityCheckbox[box].data.pcuCost : 0}
      />
    } else {
      return <PartTotals 
        part={currentPart} 
        bpCost={securityCheckbox[box].active ? securityCheckbox[box].data.bpCost : 0} 
        pcuCost={securityCheckbox[box].active ? securityCheckbox[box].data.pcuCost : 0}
      />
    }
  }

  return (
    <>
      <div>
        {Object.keys(securityCheckbox).map((box, idx) => (
          <div className="row" key={box}>
            <input type="checkbox" id={box} name={box} 
              checked={securityCheckbox[box].active}
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