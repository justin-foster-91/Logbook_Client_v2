import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import frames from '../frames.json';
import {capitalizeEachWord} from '../utils';
import {findComponentByFrameId} from '../shipFunctions';


const HangarPage = (props) => {

  return (
    <div className="hangarDisplay">
      <h2>Hangar Page</h2>
      
      <p></p>

      {/* Display ships that have been selected */}
      {props.userShips.map((ship, idx) => {
        return <div className="hangarShips" key={ship.shipName + idx}>
          {ship.shipName} (Tier {ship.tierId} [{findComponentByFrameId(frames, ship.frameId.replace("-", " "), 'size')}] {capitalizeEachWord(ship.frameId)})
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