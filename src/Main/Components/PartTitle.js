import React from 'react';

function PartTitle(props) {
  const { currentPart } = props;
  
  return (
    <h3>{currentPart.name.toUpperCase()}</h3>
  );
}

export default PartTitle;