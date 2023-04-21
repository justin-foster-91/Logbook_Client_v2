import React, { useEffect, useState, useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as SF from "../../References/shipFunctions";
import * as Tables from '../../References/metaTables'
import { render } from '@testing-library/react';

// TODO: tooltip explaining what the numbers mean in sidebar

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
          <span className={validBP ? "" : "invalid"}><strong>BP used</strong>: {totalBPCosts}</span>
          <span><strong>BP Budget</strong>: {totalBPBudget}</span>
        </>
      )
    } else {
      setRenderBP(
        <>
          <span><strong>BP</strong>:</span>
          <span className={validBP ? "" : "invalid"}>{totalBPCosts}</span>
          <span>/</span>
          <span>{totalBPBudget}</span>
        </>
      )
    }
  }, [layout, validBP, totalBPCosts, totalBPBudget])

  useEffect(() => {
    if (layout === "full") {
      setRenderPCU(
        <>
          <span className={validPCU ? "" : "warning"}><strong>PCU used</strong>: {totalPCUCosts}</span>
          <span className={validEssentialPCU ? "" : "invalid"}><strong>PCU Essentials</strong>: {essentialPCUCosts}</span>
          <span><strong>PCU Budget</strong>: {totalPCUBudget}</span>
        </>
      )
    } else {
      setRenderPCU(
        <>
          <span><strong>PCU</strong>:</span>
          <span className={validPCU ? "" : "warning"}>{totalPCUCosts}</span>
          <span>/</span>
          <span className={validEssentialPCU ? "" : "invalid"}>{essentialPCUCosts}</span>
          <span>/</span>
          <span>{totalPCUBudget}</span>
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