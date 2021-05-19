import React from 'react';
import './style.css';

const MoreInfo = ({ children } ) => {
  return (
      <div className="moreInfo"> 
          <div className="popup">
            <span className="popuptext">
              test
             {/* { children } */}
            </span>
        </div>    
    </div>  
  );
}

export default MoreInfo;