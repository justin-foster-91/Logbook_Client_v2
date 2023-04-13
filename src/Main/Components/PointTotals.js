import React, { useEffect, useState, useContext } from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as SF from "../References/shipFunctions";
import * as Tables from '../References/metaTables'

function PointTotals(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [validBP, setValidBP] = useState(true);
  const [validPCU, setValidPCU] = useState(true);

  const { tierId, powerCoreIds } = customShipParts


  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = ship.getTotalPCUBudget()

  useEffect(() => {
    if (totalBPCosts > totalBPBudget) setValidBP(false);
    else setValidBP(true);
  }, [totalBPCosts, totalBPBudget])

  useEffect(() => {
    if (totalPCUCosts > totalPCUBudget) setValidPCU(false);
    else setValidPCU(true);
  }, [totalPCUCosts, totalPCUBudget])

  return (
    <>
      <div className="row totals">
        <div className={validBP ? "" : "invalid"}>BP used: {totalBPCosts}</div>
        <div>BP Budget: {totalBPBudget}</div>
      </div>

      <div className="row totals">
        <div className={validPCU ? "" : "invalid"}>PCU used: {totalPCUCosts}</div>
        <div>PCU Essentials: {essentialPCUCosts}</div>
        <div>PCU Budget: {totalPCUBudget}</div>
      </div>
    </>
  );
}

export default PointTotals;