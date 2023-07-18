import React from "react";
import { buttonStyle } from 'services/course/editor/components/MenuButtons/helper';
import MuiCustomIcon from 'services/course/editor/components/MuiCustomIcon';
import './headerStyles.css';

const HeaderStyleDropdown = ({
    onToggle,
    active,
    headerOptions 
  }) => {
    function handleToggle( header ){
        onToggle( header );
    }

    return (
       <span>
{ headerOptions.map(heading => {
          return (
            <MuiCustomIcon 
              className={'mui-headerStyleDropdownButtons'} 
              style={ buttonStyle() } 
              onClick={() => handleToggle( heading.style )} 
            > 
                 <text x="4" y="19" font-size="0.3em" font-weight="normal">{ heading.label[0] }<tspan baseline-shift="super" font-size="0.777em" font-weight="normal">{ heading.label[1] }</tspan></text> } 
            </MuiCustomIcon>
          );
        })}
       </span>
    );
};

export default HeaderStyleDropdown;