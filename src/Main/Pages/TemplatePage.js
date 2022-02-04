import { Link } from "react-router-dom";
import React, { useState } from "react";
import templates from '../References/shipTemplates';
import {capitalizeEachWord, readableIds} from '../References/utils';
import {findComponentByFrameId} from '../References/shipFunctions';


const TemplatePage = (props) => {
  const [selectedTemplate, setSelectedTemplate] = useState({});

  return (
    <div className="templateDisplay">
      <h2>Template Page</h2>
      
      <p></p>

      {/* Display template options */}
      {templates.map((template, idx) => {
          return <button onClick={() => setSelectedTemplate(template)} value={template.shipName} key={'template'+idx}>{template.shipName || 'Template'} </button>
        })}

      <p></p>

      {/* Display details of selected template */}
      {selectedTemplate.shipName 
        ? <TemplateBreakdown {...selectedTemplate}/>
        : <div></div>}

      <p></p>

      <Link to='/custom_ship'>
        <button>Custom Ship</button>
      </Link>

      <p></p>

      <Link to="/hangar">
        <button>Cancel</button>
        <button onClick={() => props.setUserShips((userShips) => userShips.concat([selectedTemplate]))}>Add Ship</button>
      </Link>
      
    </div>
  );
}

const TemplateBreakdown = (props) => {

  let foundSize = ''
  let readableFrameId = ''

  if(props.shipName) {
    foundSize = findComponentByFrameId(props.frameId.replace("-", " "), 'size')
    readableFrameId = capitalizeEachWord(props.frameId)
  }

  const showFrameComponents = () => {
    let componentArray = ["tierId", "frameId", "powerCoreIds", "thrustersId", "armorId", 
    "computerId", "driftEngineId", "expansionBayIds", "sensorsId", "shieldsId"]
    let pairedArray = []

    for(let i=0; i<componentArray.length; i++){
      if(componentArray[i] === 'weaponMounts') {
        console.log(props[componentArray[i]]);
      } else {
        pairedArray.push([readableIds(componentArray[i]), props[componentArray[i]]])
      }
    }

    return pairedArray
  }

  return (
    <div className="templateRender">
            <div className="shipKeyPoints">
              <b>{props.shipName} (Tier {props.tierId} [{foundSize}] {readableFrameId})</b>
            </div>
            <div>
              {showFrameComponents().map((pair, idx) => {
                return <div key={idx}>
                    <b>{pair[0]}:</b> {typeof pair[1] === 'object' 
                      ? pair[1].map(element => capitalizeEachWord(element)).join(', ')
                      : capitalizeEachWord(pair[1])}
                  </div>
              })}
            </div>
          </div>
  )
}


export default TemplatePage;