import React, { useContext } from "react";
import * as Tables from "./CustomRefs/metaTables";
import * as SF from "../References/shipFunctions";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "./Components/PartTitle";
import PartTotals from "./Components/PartTotals";
import SpecialMaterials from "./Components/SpecialMaterials";
import AccordionText from "./Components/AccordionText";
import { isValidShields } from "./CustomRefs/optionValidation";

interface WrapperProps {
  component: Function, 
  name: string
}

function SetShields(props: WrapperProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);

  const { shieldsId } = ship.getParts();

  const { currentPart } = props;

  const handleShieldsChange = (ev: object) => {
    let shieldsOption = ev.target.value;
    console.log(ev);
    if (shieldsOption === "None") shieldsOption = null;

    ship.setShields(shieldsOption)
  };

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <label htmlFor="shields" className="hidden">Shields Type</label>
        <select 
          id="shields"
          value={shieldsId || "None"} 
          onChange={handleShieldsChange}
        >
          <option key="None">None</option>
          {Tables.getShieldsIdList().map((shields, idx) =>
            isValidShields(ship, shields) 
            && <option key={idx} value={shields}>
              {shields}
            </option>
          )}
        </select>
      </div>
    </>
  );
}

export default SetShields;