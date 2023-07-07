import React, { useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as Tables from "../CustomRefs/metaTables";
import PartTotals from "../Components/PartTotals";
import AccordionText from '../Components/AccordionText';
import { isValidSecurity } from '../CustomRefs/optionValidation';

function SecurityCheckboxes(props: any) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { hasBiometricLocks, hasSelfDestructSystem, hasEmergencyAccelerator, hasHolographicMantle, hasReconfigurationSystem } = customShipParts;

  const { currentPart } = props;
  const size = ship.getSize();

  interface SecurityCheckbox {
    [key: string]: {
      active: boolean,
      data: Checkboxes
    }
  }
  interface Checkboxes {
    bpCost: number | string,
    pcuCost: number | null,
    sfsLegal: boolean | null,
    source: string | null,
    description: JSX.Element | null
  }
  const securityCheckbox: SecurityCheckbox = {
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

  const handleCheckboxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxOption = ev.target.name
    const checkboxActive = ev.target.checked

    ship.setSecurity({ reference: checkboxOption, value: checkboxActive})
  }

  const partTotalsRender = (box: any) => {
    if (box === "Biometric Locks" || box === "Self-Destruct System") {
      return <PartTotals 
        part={currentPart} 
        bpCost={securityCheckbox[box].active ? securityCheckbox[box].data.bpCost : 0} 
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
          isValidSecurity(ship, box, "securityCheckbox") 
          && <div key={box}>
            <div className="row">
              <input type="checkbox" id={box} name={box} 
                checked={securityCheckbox[box].active}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={box}>{box}</label>
              
              {partTotalsRender(box)}
            </div>
            <AccordionText key={box+idx}>
              {securityCheckbox[box].data.description}
            </AccordionText>
          </div>
        ))}
      </div>
    </>
  );
}

export default SecurityCheckboxes;