import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import * as SF from "../References/shipFunctions";
import { CustomShipContext } from "../Context/shipContext";

const PowerCoreSelections = () => {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const { powerCoreIds } = customShipParts;
  const { size } = SF.getFramePackageFromShip(customShipParts);
  const powerCoreQuantity = SF.getCoreQuantityFromSize(size);

  const handlePowerCoreChange = (event) => {
    const coreIndex = event.target.name;
    let coreOption = event.target.value;
    if (coreOption === "None") coreOption = null;

    ship.setPowerCore(coreOption, coreIndex)
    setCustomShipParts({ ...customShipParts });
  };

  return Array(powerCoreQuantity)
    .fill(1)
    .map((dropdown, idx) => {
      return (
        <div key={"powerCore" + idx}>
          Power Core {idx + 1}
          <br />
          <select
            value={
              powerCoreIds[idx] === null ? "None" : powerCoreIds[idx]
            }
            name={idx}
            onChange={handlePowerCoreChange}
          >
            <option key="None" value={null}>None</option>
            {Tables.getPowerCoreIdList().map(
              (core, idx) =>
                SF.doesFrameSizeAllowCore(core, size) && (
                  <option key={"option" + idx} value={core}>
                    {`${core} (PCU ${
                      Tables.getPowerCoreData(core).pcuProvided
                    } | Size: ${Tables.getPowerCoreData(core).sizes.join(", ")})`}
                  </option>
                )
            )}
          </select>
          <br />
          {/* TODO: */}
          Special Material:
          <p></p>
        </div>
      );
    });
};

export default PowerCoreSelections;
