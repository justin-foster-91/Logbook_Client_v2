import React from "react";
import * as Utils from "../References/utils";
import * as SF from "../References/shipFunctions";

// TODO: display as stat-block style instead of component list

const TemplateBreakdown = (props: any) => {
  const { frameId, shipName, tierId } = props
  const size = SF.findComponentByFrameId(frameId, "size");

  const showFrameComponents = () => {
    const pairedArray: any[] = [];
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
      <div className="shipKeyPoints row">
        <div><strong>{shipName} </strong></div>
        <div>(Tier {tierId} [{size}] {frameId})</div>
      </div>
      
      <div>
        {showFrameComponents().map((pair, idx) => {
          let partKey = pair[0]
          let partValue = pair[1]
          return (
            <div key={idx}>
              <strong>{partKey}:</strong>{" "}
              {/* Check if the value in an array */}
              {typeof partValue === "object"
                ? partValue
                  .filter((element: any) => element !== null)
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