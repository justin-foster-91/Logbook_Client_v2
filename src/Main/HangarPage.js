import { Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import templates from '../shipTemplates';
import frames from '../frames.json';
import {findComponentByFrameId, capitalizeEachWord} from '../utils';


const HangarPage = (props) => {

  return (
    <div className="hangarDisplay">
      Hangar Page
      {/* {console.log(props.userShips)} */}
      <p></p>

      {props.userShips.map((ship, idx) => {
        return <div className="hangarShips" key={ship.shipName + idx}>
          {ship.shipName} (Tier {ship.tierId} {findComponentByFrameId(frames, ship.frameId.replace("-", " "), 'size')} {capitalizeEachWord(ship.frameId)})
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