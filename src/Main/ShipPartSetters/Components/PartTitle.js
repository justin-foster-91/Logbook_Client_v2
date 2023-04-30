import React, {useEffect, useState} from 'react';

function PartTitle(props) {
  const [name, setName] = useState('');
  const { currentPart } = props;


  useEffect(() => {
    if (typeof currentPart === "string") {
      setName(currentPart)
    } else {
      setName(currentPart.name)
    }
  }, [currentPart])
  
  return (
    <h3>{name.toUpperCase()}</h3>
  );
}

export default PartTitle;