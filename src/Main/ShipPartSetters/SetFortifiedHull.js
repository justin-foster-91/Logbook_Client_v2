import React, {useContext} from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as Tables from '../References/metaTables'

//TODO: track the CT bonus

function SetFortifiedHull() {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { fortifiedHullId } = customShipParts
  const size = ship.getSize()
  const { ctBonus, bpCost } = Tables.getFortifiedHullData(fortifiedHullId, size)

  const handleFortifiedHullChange = (ev) => {
    let hullsOption = ev.target.value;
    if (hullsOption === "None") hullsOption = null;

    ship.setFortifiedHull(hullsOption)
  }

  return (
    <>
      <h3>Fortified Hull</h3>

      <p></p>

      <select value={fortifiedHullId ? fortifiedHullId : "None"} onChange={handleFortifiedHullChange}>
        <option key={"None"}>None</option>
        {Tables.getFortifiedHullIdList().map((hull, idx) => (
          <option key={idx}>{hull}</option>
        ))}
      </select>
      <br/>
      

      <p></p>
        CT Bonus: {ctBonus}
      <div>
        BP Cost: {bpCost}
      </div>
    </>
  );
}

export default SetFortifiedHull;