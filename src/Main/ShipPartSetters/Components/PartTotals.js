import React, { useContext } from 'react';
import { CustomShipContext } from "../../Context/shipContext";
import PowerIcon from "../../IconRefs/PowerIcon";
import BuildIcon from "../../IconRefs/BuildIcon";

function PartTotals(props) {
  const { ship } = useContext(CustomShipContext);

  const { part, pcuCost, bpCost, modifiedBPCost } = props;

  const renderBP = () => {
    if (bpCost === undefined && modifiedBPCost === undefined) return;

    if (part?.name === "Drift Engine") return renderOmaBP()

    return (
      <div className='iconPair'>
        <BuildIcon />
        <div>{bpCost}</div>
      </div>
    );
  }

  const renderOmaBP = () => {
    return (
      <>
        <div><em>(Oma 50% increase)</em></div>
        <div className='iconPair'>
          <BuildIcon />
          <div>{modifiedBPCost}</div>
        </div>
        
      </>
    )
  }

  const renderPCU = () => {
    if (pcuCost === undefined) return;

    return (
      <div className='iconPair'>
        <PowerIcon />
        <div>{pcuCost}</div>
      </div>
    );
  }


  return (
    <div className="row totals">
      {renderPCU()}
      {renderBP()}
    </div>
  );
}

export default PartTotals;