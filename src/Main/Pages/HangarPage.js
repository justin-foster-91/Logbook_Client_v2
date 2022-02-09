import { Link } from "react-router-dom";
import React, {useContext} from "react";
import {capitalizeEachWord} from '../References/utils';
import {findComponentByFrameId} from '../References/shipFunctions';
import { ShipsContext } from "../Context/shipContext";

const HangarPage = () => {
  const { userShips } = useContext(ShipsContext);
  
  return (
    <div className="hangarDisplay">
      <h2>Hangar Page</h2>
      
      <p></p>

      {/* Display ships that have been selected */}
      {userShips.map((ship, idx) => {
        return <div className="hangarShips" key={ship.shipName + idx}>
          {/* TODO: double check this replace usage */}
          {ship.shipName} (Tier {ship.tierId} [{findComponentByFrameId(ship.frameId.replace("-", " "), 'size')}] {capitalizeEachWord(ship.frameId)})
        </div>
      })}

      <p></p>

      <Link to='/templates' >
        <button>Ship Templates</button>
      </Link>
    </div>
  );
}

export default HangarPage;