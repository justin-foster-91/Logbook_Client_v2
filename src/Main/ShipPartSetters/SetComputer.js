import React, { useContext, useState, useEffect } from 'react';
import { getComputerData, getComputerIdList } from "../References/metaTables";
import { CustomShipContext } from "../Context/shipContext";
import { getFramePackageFromShip } from '../References/shipFunctions'

function SetComputer() {
  const { customShipParts, setCustomShipParts, ship } = useContext(CustomShipContext);
  const [isSupercolossal, setIsSupercolossal] = useState(false)

  const { computerId, tierId, secondaryComputerId  } = customShipParts;
  const { bonus, nodes, pcuCost, bpCost } = getComputerData(computerId)
  const size = ship.getSize()

  const bonusList = bonus.toString().repeat(nodes || 1).split('').map(num => `+${num}`).join('/')
  const computerTier = Math.max(Math.floor(tierId/2), 1)

  useEffect(() => {
    if(size === 'Supercolossal') {
      setIsSupercolossal(true)

      customShipParts.computerId = 'Mk 4 Mononode';
      setCustomShipParts({ ...customShipParts });
    } else{
      setIsSupercolossal(false)

      customShipParts.secondaryComputerId = 'Basic Computer';
      setCustomShipParts({ ...customShipParts });
    }
  }, [size])

  const handleComputerChange = (ev) => {
    const computerOption = ev.target.value;

    customShipParts.computerId = computerOption;
    setCustomShipParts({ ...customShipParts });
  }

  const handleSecondaryComputerChange = (ev) => {
    const secondaryComputerOption = ev.target.value;

    customShipParts.secondaryComputerId = secondaryComputerOption;
    setCustomShipParts({ ...customShipParts });
  }

  const renderComputerOptions = (computer, idx) => {
    if(isSupercolossal){
      if(computer.split(' ')[1] >= 4) {
        return <option key={idx}>{computer}</option>
      }
    } else{
      return <option key={idx}>{computer}</option>
    }
  }

  const renderSecondaryComputer = () => {
    return (
      isSupercolossal &&
      <select defaultValue={secondaryComputerId} onChange={handleSecondaryComputerChange}>
        <option key={-1}>Basic Computer</option>
        {getComputerIdList().map((computer, idx) => (
          computer.split(' ')[1] < 4 &&
          <option key={idx}>{computer}</option>
        ))}
      </select>
    )
  }

  return (
    <>
      <h3>Computer</h3>

      <p></p>
      Computer
      <br/>
      <select defaultValue={computerId} onChange={handleComputerChange}>
        {
          getComputerIdList().map((computer, idx) => (
            renderComputerOptions(computer, idx)
          ))
        }
      </select>
      <br/>
      {isSupercolossal && 'Secondary Computer'}
      <br/>
      {renderSecondaryComputer()}

      <p></p>
      <div>
        Bonus: {bonusList}; Nodes: {nodes}; Tier: {computerTier}
      </div>
      <div>
        PCU Cost: {pcuCost}; BP Cost: {bpCost}
      </div>
    </>
  );
}

export default SetComputer;