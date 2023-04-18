import React, { useEffect, useState, useContext } from 'react';
import { CustomShipContext } from "../Context/shipContext";
import * as SF from "../References/shipFunctions";
import * as Tables from '../References/metaTables'
import { render } from '@testing-library/react';

function PointTotals(props) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const [validBP, setValidBP] = useState(true);
  const [validPCU, setValidPCU] = useState(true);
  const [validEssentialPCU, setValidEssentialPCU] = useState(true);
  const [renderBP, setRenderBP] = useState();
  const [renderPCU, setRenderPCU] = useState();

  const { tierId, powerCoreIds } = customShipParts
  const { layout } = props;


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

  useEffect(() => {
    if (essentialPCUCosts > totalPCUBudget) setValidEssentialPCU(false);
    else setValidEssentialPCU(true);
  }, [totalPCUBudget, essentialPCUCosts])

  useEffect(() => {
    if (layout === "full") {
      setRenderBP(
        <>
          <div className={validBP ? "" : "invalid"}><strong>BP used</strong>: {totalBPCosts}</div>
          <div><strong>BP Budget</strong>: {totalBPBudget}</div>
        </>
      )
    } else {
      setRenderBP(
        <>
          <div><strong>BP</strong>:</div>
          <div className={validBP ? "" : "invalid"}>{totalBPCosts}</div>
          <div>/</div>
          <div>{totalBPBudget}</div>
        </>
      )
    }
  }, [layout, validBP, totalBPCosts, totalBPBudget])

  useEffect(() => {
    if (layout === "full") {
      setRenderPCU(
        <>
          <div className={validPCU ? "" : "invalid"}><strong>PCU used</strong>: {totalPCUCosts}</div>
          <div><strong>PCU Essentials</strong>: {essentialPCUCosts}</div>
          <div><strong>PCU Budget</strong>: {totalPCUBudget}</div>
        </>
      )
    } else {
      setRenderPCU(
        <>
          <div><strong>PCU</strong>:</div>
          <div className={validPCU ? "" : "invalid"}>{totalPCUCosts}</div>
          <div>/</div>
          <div className={validEssentialPCU ? "" : "invalid"}>{essentialPCUCosts}</div>
          <div>/</div>
          <div>{totalPCUBudget}</div>
        </>
      )
    }
  }, [layout, validPCU, totalPCUCosts, totalPCUBudget, essentialPCUCosts, validEssentialPCU])

  return (
    <div className='finalTotals'>
      <div className="row totals">
        {renderBP}
      </div>

      <div className="row totals">
        {renderPCU}
      </div>
    </div>
  );
}

export default PointTotals;