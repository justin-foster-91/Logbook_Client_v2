import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from './CustomRefs/metaTables'
import PartTitle from './Components/PartTitle';
import PartTotals from './Components/PartTotals';
import AccordionText from './Components/AccordionText';
import SpecialMaterials from './Components/SpecialMaterials';
import { isValidSensors } from './CustomRefs/optionValidation';
import { SetterProps } from "./CustomRefs/customInterface";

function SetSensors(props: SetterProps) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { sensorsId } = ship.getParts()
  const { range, modifier, bpCost, sfsLegal, source } = Tables.getSensorsData(sensorsId)
  const { currentPart } = props

  const handleSensorChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    let sensorOption: string | null = ev.target.value;
    if(sensorOption === "None") sensorOption = null

    ship.setSensors(sensorOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <AccordionText>
        <>
          <p>Sensors function as a starship's eyes and ears, allowing a crew to see what's in the space around the ship, whether planetary bodies, other ships, a dangerous asteroid field, or some monstrosity from the depths of space. Sensors are a combination of video cameras, multispectrum scanners, radar arrays, signal interceptors, and optical telescopes. In starship combat, short-range sensors have a range of 5 hexes, medium-range sensors have a range of 10 hexes, and long-range sensors have a range of 20 hexes. All sensors have a skill modifier that applies to any skill used in conjunction with them. Sensors require an operational power core to function, but they consume a negligible amount of PCU.</p>
          <p>Sensors operate in two modes: passive or active. In passive mode, sensors automatically scan the ship's surroundings. Passive sensors detect visible or unhidden objects in a 360-degree field around the ship at a range of up to twice the sensors' range category while in space or in the Drift (no skill check required), though local conditions may affect their range. However, gravitational forces and atmospheric conditions limit starship sensors to a range of 250 feet on most planets, and their range might be further limited by terrain, at the GM's discretion.</p>
          <p>Active sensors are far more discerning, and they are required if the science officer wishes to scan enemy vessels and learn details about them during starship combat (see page 325). The modifier listed in the table below applies to some checks attempted by the science officer in starship combat as specified in the science officer's actions (see page 324). Active sensors can discern information about a target up to five times the sensors' range away from the ship, but such checks take a penalty of -2 for each range increment beyond the first to the target. For example, if short-range sensors (range = 5 hexes) were used against a target 12 hexes away, the check would take a -4 penalty.</p>
          <p>Outside of starship combat, a crew member can use sensors to scan a planet the starship is orbiting, attempting a Computers check (applying the sensors' modifier) to learn basic information about the planet's composition and atmosphere. The DC for this check is usually 15, but it can be altered at the GM's discretion to account for mitigating factors or complications. A crew member can also use the starship's active sensors to attempt Perception checks to examine the surrounding area as if she were standing outside the starship, using her own senses (such as darkvision), but adding the sensors' modifier as a circumstance bonus to the check.</p>
        </>
      </AccordionText>

      <div className='dropdownBlock'>
        <label htmlFor="sensors" className='hidden'>Sensors</label>
        <select 
          id="sensors" 
          value={sensorsId || "None"} 
          onChange={handleSensorChange}
        >
          <option key={"None"}>None</option>
          {Tables.getSensorsIdList().map((sensor, idx) => (
            isValidSensors(ship, sensor)
            && <option key={idx} value={sensor}>{sensor}</option>
          ))}
        </select>
      </div>

      {sensorsId && <SpecialMaterials part={"Sensors"}/>}
      
      <div className='row'>
        <div><strong>Range</strong>: {range || "n/a"}</div>
        <div><strong>Modifier</strong>: {modifier || "n/a"}</div>
      </div>
        
      <PartTotals part={currentPart} bpCost={bpCost} />
    </>
  );
}

export default SetSensors;