import React from "react";
import * as Utils from "../References/utils";
import * as SF from "../References/shipFunctions";

const TemplateBreakdown = (props) => {
  let foundSize = "";
  let readableFrameId = "";

  if (props.shipName) {
    foundSize = SF.findComponentByFrameId(props.frameId.replace("-", " "), "size");
    readableFrameId = Utils.capitalizeEachWord(props.frameId);
  }

  const showFrameComponents = () => {
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
    const pairedArray = [];

    for (let i = 0; i < componentArray.length; i++) {
      if (componentArray[i] === "weaponMounts") {
        console.log(props[componentArray[i]]);
      } else {
        pairedArray.push([
          Utils.readableIds(componentArray[i]),
          props[componentArray[i]],
        ]);
      }
    }

    return pairedArray;
  };

  return (
    <div className="templateRender">
      <div className="shipKeyPoints">
        <b>
          {props.shipName} (Tier {props.tierId} [{foundSize}] {readableFrameId})
        </b>
      </div>
      <div>
        {showFrameComponents().map((pair, idx) => {
          return (
            <div key={idx}>
              <b>{pair[0]}:</b>{" "}
              {typeof pair[1] === "object"
                ? pair[1]
                    .map((element) => Utils.capitalizeEachWord(element))
                    .join(", ")
                : Utils.capitalizeEachWord(pair[1])}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateBreakdown;