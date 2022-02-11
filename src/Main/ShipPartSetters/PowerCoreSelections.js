import React, { useContext } from "react";
import { getPowerCoreData, getPowerCoreIdList } from "../References/metaTables";
import { doesFrameSizeAllowCore, getCoreQuantityFromSize, getFramePackageFromShip } from "../References/shipFunctions";
import { CustomShipContext } from "../Context/shipContext";

const PowerCoreSelections = () => {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  const { powerCoreIds } = customShipParts;

  const { size } = getFramePackageFromShip(customShipParts);
  const powerCoreQuantity = getCoreQuantityFromSize(size);

  const handlePowerCoreChange = (event) => {
    const coreIndex = event.target.name;
    let coreOption = event.target.value;

    if (coreOption === "None") coreOption = null;

    customShipParts.powerCoreIds[coreIndex] = coreOption;
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
            defaultValue={
              powerCoreIds[idx] === null ? "None" : powerCoreIds[idx]
            }
            name={idx}
            onChange={handlePowerCoreChange}
          >
            <option key="null">None</option>
            {getPowerCoreIdList().map(
              (core, idx) =>
                doesFrameSizeAllowCore(core, size) && (
                  <option key={"option" + idx} value={core}>
                    {`${core} (PCU ${
                      getPowerCoreData(core).pcuProvided
                    } | Size: ${getPowerCoreData(core).sizes.join(", ")})`}
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
