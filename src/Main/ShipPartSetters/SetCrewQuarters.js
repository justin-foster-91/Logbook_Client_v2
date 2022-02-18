import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";

function SetCrewQuarters(props) {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);

  const handleQuartersChange = () => {

  }

  return (
    <>
      <h3>Crew Quarters</h3>

      <p></p>

      {/* <select defaultValue={tierId} onChange={handleTierChange}>
        {Tables.getTierIdList().map((tier, idx) => (
          <option key={idx}>{tier}</option>
        ))}
      </select> */}

      <p></p>

      <div>
        {/* BP Budget: {buildPoints}; */}
      </div>
    </>
  );
}

export default SetCrewQuarters;