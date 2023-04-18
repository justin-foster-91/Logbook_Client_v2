import React from "react";
import * as Utils from "../References/utils";
import * as SF from "../References/shipFunctions";

// TODO: display as stat-block style instead of component list

const TemplateBreakdown = (props) => {
  const { frameId, shipName, tierId } = props
  const size = SF.findComponentByFrameId(frameId, "size");

  const showFrameComponents = () => {
    const pairedArray = [];
    const componentArray = [
      "tierId",
      "frameId",
      "powerCoreIds",
      "thrustersId",
      "armorId",
      "computerId",
      "driftEngineId",
      "expansionBayIds",
      "sensorsId",
      "shieldsId",
    ];
    
    componentArray.map(component => {
      pairedArray.push([
        Utils.readableIds(component),
        props[component],
      ]);
      return component
    })

    return pairedArray;
  };

  return (
    <div className="templateRender">
      <div className="shipKeyPoints">
        <b>
          {shipName} (Tier {tierId} [{size}] {frameId})
        </b>
      </div>
      <div>
        {showFrameComponents().map((pair, idx) => {
          let partKey = pair[0]
          let partValue = pair[1]
          return (
            <div key={idx}>
              <b>{partKey}:</b>{" "}
              {/* Check if the value in an array */}
              {typeof partValue === "object"
                ? partValue
                  .filter((element) => element !== null)
                  .join(", ")
                : partValue}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateBreakdown;