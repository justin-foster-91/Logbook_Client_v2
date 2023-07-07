import React, {useEffect, useState} from 'react';

function PartTitle(props: any) {
  const { currentPart } = props;
  const name = (typeof currentPart === "string") ? currentPart : currentPart.name;
  
  return (
    <h3>{name.toUpperCase()}</h3>
  );
}

export default PartTitle;