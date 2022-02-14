import React, { useContext } from 'react';
import { getComputerData, getComputerIdList } from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";

function SetComputer(props) {
  const { customShipParts, setCustomShipParts } = useContext(CustomShipContext);

  const { computerId  } = customShipParts;
  const { bonus, nodes, pcuCost, bpCost } = getComputerData(computerId)

  const bonusList = bonus.toString().repeat(nodes || 1).split('').map(num => `+${num}`).join('/')

  const handleComputerChange = (ev) => {
    const ComputerOption = ev.target.value;

    customShipParts.computerId = ComputerOption;
    setCustomShipParts({ ...customShipParts });
  }

  return (
    <>
      <h3>Computer</h3>

      <p></p>

      <select defaultValue={computerId} onChange={handleComputerChange}>
        {getComputerIdList().map((computer, idx) => (
          <option key={idx}>{computer}</option>
        ))}
      </select>

      <p>
        Bonus: {bonusList}; Nodes: {nodes}
      </p>

      <div>
        PUC Cost: {pcuCost}; BP Cost: {bpCost}
      </div>
    </>
  );
}

export default SetComputer;