import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'
import PartTitle from '../Components/PartTitle';

function SetCrewQuarters(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { crewQuartersId } = customShipParts
  const { bpCost, description } = Tables.getQuartersData(crewQuartersId)
  const { currentPart } = props;

  const handleQuartersChange = (ev) => {
    const quartersOption = ev.target.value;

    ship.setCrewQuarters(quartersOption)
  }

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <select value={crewQuartersId} onChange={handleQuartersChange}>
          {Tables.getQuartersIdList().map((quarters, idx) => (
            <option key={idx}>{quarters}</option>
          ))}
        </select>
      </div>

      <div className="note">{description}</div>

      <div className="row totals">
        <div>BP Cost: {bpCost}</div>
      </div>
    </>
  );
}

export default SetCrewQuarters;