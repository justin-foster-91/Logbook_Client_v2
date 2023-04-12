import React, { useContext } from "react";
import * as Tables from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import PartTitle from "../Components/PartTitle";
import powerIcon from '../Assets/Icons/noun-power-5648181.png';


function SetTier(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  
  const { tierId } = customShipParts;
  const { buildPoints, hpIncrementMultiplier } = Tables.getTierData(tierId);
  const { currentPart } = props;
  
  const handleTierChange = (ev) => {
    const tierOption = ev.target.value;

    ship.setTier({ reference: 'tierId', value: tierOption})
  };

  return (
    <>
      <PartTitle currentPart={currentPart} />

      <div className="dropdownBlock">
        <select value={tierId} onChange={handleTierChange}>
          {Tables.getTierIdList().map((tier, idx) => (
            <option key={idx}>{tier}</option>
          ))}
        </select>
      </div>

      <div className="row totals">
        {/* <i class="fa-solid fa-user"></i> */}
        <div>Build Points: {buildPoints}</div> 
        {/* <img src={powerIcon} alt='power' className='icon'/> */}
        <div>HP Increments: {hpIncrementMultiplier}</div>
      </div>
    </>
  );
}

export default SetTier;
