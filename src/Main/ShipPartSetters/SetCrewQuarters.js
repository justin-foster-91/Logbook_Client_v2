import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'

function SetCrewQuarters() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { crewQuartersId } = customShipParts
  const { bpCost, description } = Tables.getQuartersData(crewQuartersId)

  const handleQuartersChange = (ev) => {
    const quartersOption = ev.target.value;

    ship.setCrewQuarters(quartersOption)
  }

  return (
    <>
      <h3>Crew Quarters</h3>

      <p></p>

      <select value={crewQuartersId} onChange={handleQuartersChange}>
        {Tables.getQuartersIdList().map((quarters, idx) => (
          <option key={idx}>{quarters}</option>
        ))}
      </select>
      <br/>
      {description}

      <p></p>

      <div>
        BP Cost: {bpCost}
      </div>
    </>
  );
}

export default SetCrewQuarters;