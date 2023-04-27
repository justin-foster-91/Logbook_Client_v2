import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';

function SetSensors(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { sensorsId } = customShipParts
  const { range, modifier, bpCost, sfsLegal, source } = Tables.getSensorsData()
  const { currentPart } = props

  const handleSensorChange = (ev) => {

  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className='dropdownBlock'>
        <label htmlFor="sensors" className='hidden'>Sensors</label>
        <select 
          id="sensors" 
          value={sensorsId || "None"} 
          onChange={handleSensorChange}
        >
          <option key={"None"}>None</option>
          {Tables.getSensorsIdList().map((sensor, idx) => (
            <option key={idx} value={sensor}>{sensor}</option>
          ))}
        </select>
      </div>
      
      <div className='row'>
        <div><strong>Range</strong>: {range || "n/a"}</div>
        <div><strong>Modifier</strong>: {modifier || "n/a"}</div>
      </div>
        
      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetSensors;