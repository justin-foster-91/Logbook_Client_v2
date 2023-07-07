import React, { useContext } from "react";
import * as Tables from "../CustomRefs/metaTables";
import * as SF from "../../References/shipFunctions";
import { CustomShipContext } from "../../Context/shipContext";
import { isValidPowerCore } from "../CustomRefs/optionValidation";
import SpecialMaterials from "../Components/SpecialMaterials";

const PowerCoreSelections = () => {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { powerCoreIds } = customShipParts;
  const size = ship.getSize();
  const powerCoreQuantity = SF.getCoreQuantityFromSize(size);

  const handlePowerCoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const coreIndex = Number(event.target.name);
    let coreOption: string | null = event.target.value;
    if (coreOption === "None") coreOption = null;

    console.log({ coreOption, coreIndex });
    ship.setPowerCore(coreOption, coreIndex)
  };

  return Array(powerCoreQuantity)
    .fill(1)
    .map((dropdown, idx) => {
      return (
        <div key={"powerCore" + idx} className="dropdownBlock">
          <label htmlFor={`powerCore${idx + 1}`}><strong>Power Core {idx + 1}</strong></label>

          <select
            id={`powerCore${idx + 1}`}
            value={powerCoreIds[idx] || "None"}
            name={String(idx)}
            onChange={handlePowerCoreChange}
          >
            {(idx > 0) && <option key="None">None</option>}
            {Tables.getPowerCoreIdList().map((core, i) =>
                isValidPowerCore(ship, core, idx) && (
                  <option key={"option" + i} value={core}>
                    {`${core} (PCU ${
                      Tables.getPowerCoreData(core).pcuProvided
                    } | Size: ${Tables.getPowerCoreData(core).sizes.join(", ")})`}
                  </option>
                )
            )}
          </select>

          <SpecialMaterials part="Power Core" idx={idx}/>

        </div>
      );
    });
};

export default PowerCoreSelections;
