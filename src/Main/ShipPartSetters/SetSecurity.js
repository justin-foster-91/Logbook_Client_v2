import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function SetTier() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  
  // const {  } = customShipParts;
  const totalSecurityBP = null
  const totalSecurityPCU = null

  const handleComputerCounterChange = (ev) => {
    const clicked = ev.target.name

    console.log(clicked);
  }


  return (
    <>
      <h3>Security</h3>

      <p></p>

      Computer Countermeasures
      <div>
        <form onChange={handleComputerCounterChange}>
          <input type="checkbox" id="alarm" name="alarm" value="Alarm"/>
          <label htmlFor="alarm">Alarm</label>
        </form>
      </div>


      <p></p>

      <div>
        Total BP Cost: {totalSecurityBP}; Total PCU Cost: {totalSecurityPCU}
      </div>
    </>
  );
}

export default SetTier;
