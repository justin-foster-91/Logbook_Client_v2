import React, { useState, useRef, useEffect } from 'react';
import UpArrowIcon from '../../IconRefs/UpArrowIcon';
import DownArrowIcon from '../../IconRefs/DownArrowIcon';

// TODO: add a check to see if the full text will fit without needing to be snipped

function AccordionText(props) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);

  useWindowSize();

  // let fullText = props.children
  const fullText = (typeof props.children === "string") ? <p>{props.children}</p> : props.children

  const sliceByWindowSize = (str) => {
    return str.slice(0, ref.current?.offsetWidth/8)
  }

  const snipText = () => {
    let stringInput = props?.children;
    if (!stringInput) return;

    if (typeof stringInput === "string") {
      return <p>{sliceByWindowSize(stringInput)}...</p>;
    }

    let stringInTag = stringInput.props.children;
    if (typeof stringInTag === "string") {
      return <p>{sliceByWindowSize(stringInTag)}...</p>;
    }

    let stringInSiblingTags = stringInTag[0].props.children
    return <p>{sliceByWindowSize(stringInSiblingTags)}...</p>;
  }

  const handleAccordionClick = () => {
    setExpanded(!expanded);
  }

  return (
    <div ref={ref} className='accordionWrapper'>
      <div 
        className={`accordion ${expanded ? 'full' : 'snipped'}`}
        onClick={handleAccordionClick}
      >
        {expanded ? fullText : snipText()}
        {/* {fullText} */}

      </div>
      <span className='iconWrapper' onClick={handleAccordionClick}>
        {expanded? <UpArrowIcon/> : <DownArrowIcon/>}
      </span>
      <div style={{clear: 'both'}}></div>
    </div>
  );
}

export default AccordionText;

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}