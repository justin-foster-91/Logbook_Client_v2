import React, { useEffect, useState, useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import * as SF from "../../References/shipFunctions";
import * as Tables from '../CustomRefs/metaTables'

// TODO: tooltip explaining what the numbers mean in sidebar

function PointTotals(props: any) {
  const { customShipParts, ship } = useContext(CustomShipContext);
  const { tierId, powerCoreIds } = customShipParts

  const totalBPCosts = ship.getTotalBPCosts()
  const totalBPBudget = Tables.getTierData(tierId).buildPoints

  const totalPCUCosts = ship.getTotalPCUCosts()
  const essentialPCUCosts = SF.getEssentialPCUCosts(customShipParts)
  const totalPCUBudget = ship.getTotalPCUBudget()

  const validBP = totalBPCosts > totalBPBudget ? false : true;
  const validPCU = totalPCUCosts > totalPCUBudget ? false : true;
  const validEssentialPCU = essentialPCUCosts > totalPCUBudget ? false : true;

  const { layout } = props;


  const bpFull = <>
    <span className={validBP ? "" : "invalid"}><strong>BP used</strong>: {totalBPCosts}</span>
    <span><strong>BP Budget</strong>: {totalBPBudget}</span>
  </>
  const bpCompact = <>
    <span><strong>BP</strong>:</span>
    <span className={validBP ? "" : "invalid"}>{totalBPCosts}</span>
    <span>/</span>
    <span>{totalBPBudget}</span>
  </>

  const pcuFull = <>
    <span className={validPCU ? "" : "warning"}><strong>PCU used</strong>: {totalPCUCosts}</span>
    <span className={validEssentialPCU ? "" : "invalid"}><strong>PCU Essentials</strong>: {essentialPCUCosts}</span>
    <span><strong>PCU Budget</strong>: {totalPCUBudget}</span>
  </>
  const pcuCompact = <>
    <span><strong>PCU</strong>:</span>
    <span className={validPCU ? "" : "warning"}>{totalPCUCosts}</span>
    <span>/</span>
    <span className={validEssentialPCU ? "" : "invalid"}>{essentialPCUCosts}</span>
    <span>/</span>
    <span>{totalPCUBudget}</span>
  </>

  return (
    <div className='finalTotals'>
      <div className="row totals">
        {layout === "full" ? bpFull : bpCompact}
      </div>

      <div className="row totals">
        {layout === "full" ? pcuFull : pcuCompact}
      </div>
    </div>
  );
}

export default PointTotals;