import React, { useState } from 'react';
import UpArrowIcon from '../../IconRefs/UpArrowIcon';
import DownArrowIcon from '../../IconRefs/DownArrowIcon';

function AccordionText(props) {
  const [expanded, setExpanded] = useState(false);

  let fullText = props.children

  const snipText = () => {
    let text = props.children.props.children;
    if (typeof text !== "string") text = text[0].props.children

    return <p>{text.slice(0, 100)}...</p>;
  }

  const handleAccordionClick = () => {
    setExpanded(!expanded);
  }

  return (
    <div 
      className={`accordion ${expanded ? 'full' : 'snipped'}`}
      onClick={handleAccordionClick}
    >
      {expanded ? fullText : snipText()}
      {/* {fullText} */}
      <div className='iconWrapper'>
        {expanded? <UpArrowIcon/> : <DownArrowIcon/>}
      </div>
    </div>

  );
}

export default AccordionText;