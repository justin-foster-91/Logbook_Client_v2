import React from 'react';
import powerIcon from '../Assets/Icons/icons8-lightning-bolt-24.png';

function PowerIcon(props) {
  return (
    // <img src={powerIcon} alt='PCU' className='icon'/>
    <svg viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-lightning-charge-fill" className='icon'>
      <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
    </svg>
  );
}

export default PowerIcon;