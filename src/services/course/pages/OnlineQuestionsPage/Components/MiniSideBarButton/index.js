import React from 'react';
import './style.css';

const MiniSideBarButton = ({ mouseDown, navMenuVisible, key }) => {
    return (
            <div className="sideburgerMenuDiv"
                onMouseDown={mouseDown}
                key={ key } 
            >
                <div className={navMenuVisible ? 'sideDivOneClose' : 'sideDivOne'}></div>
                <div className={navMenuVisible ? 'sideDivTwoClose' : 'sideDivTwo'}></div>
                <div className={navMenuVisible ? 'sideDivThreeClose' : 'sideDivThree'}> </div>
           </div>
    )
}

export default MiniSideBarButton;