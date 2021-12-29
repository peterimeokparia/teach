import { useState } from 'react';

import MainMenuButton from '../MainMenuButton';
import NavLinks from '../NavLinks';
import './style.css';

const MainMenu = ({ navContent }) => {
const [ menuVisible, setMenuVisibility ] = useState(false);

const handleMouseDown = ( event ) => {
    setMenuVisibility( !menuVisible );
    event.stopPropagation();
};

let sortedNavContent = navContent?.sort((a, b) => {
    if( a.id < b.id ){
        return  -1;
    }
    else if( a.id > b.id ){
        return 1;
    }
    else{
        return 0;
    } 
} );

return (
    <div>
        <MainMenuButton
            mouseDown={handleMouseDown}
            navMenuVisible={menuVisible} 
        />
        <div
            id="flyoutMenu"
            className={menuVisible ? "show" : "hide"}
            onMouseUp={handleMouseDown}
        >
            {sortedNavContent?.map(element => (
                <li key={element?.id}
                    className="navlinkItem"
                >
                    <NavLinks to={element?.hrefValue} color={"black"}> { element?.item} </NavLinks>
                </li>
                
                ))
            } 
        </div>
    </div>
    );
};

export default MainMenu;