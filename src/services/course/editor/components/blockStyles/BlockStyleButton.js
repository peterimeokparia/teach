import React from "react";
import { blockTypes } from 'services/course/editor/components/blockStyles/BlockStyleToolbar';
import { buttonStyle } from 'services/course/editor/components/MenuButtons/helper';
import ListIcon from '@mui/icons-material/List';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';

const BlockStyleButton = ({
    style,
    active,
    label,
    onToggle,
    type
}) => {
    function handleToggle(e){
        e.preventDefault();
        onToggle( style );
    }

    function getBlockType(){
        switch ( type.style ) {

            case blockTypes.orderedListItem.style:
                return ( <FormatListNumberedIcon className="mui-headerStyleDropdownButtons" style={ buttonStyle() }  onClick={e => handleToggle(e)}>
                                {label}
                        </FormatListNumberedIcon>
                        );
            case blockTypes.unorderedListItem.style:
                return ( <ListIcon className="mui-headerStyleDropdownButtons" style={ buttonStyle() }  onClick={e => handleToggle(e)}>
                                {label}
                        </ListIcon>
                    );
            case blockTypes.blockquote.style:
                return ( <FormatQuoteIcon className="mui-headerStyleDropdownButtons" style={ buttonStyle() }  onClick={e => handleToggle(e)}>
                                {label}
                        </FormatQuoteIcon>
                    );
            case blockTypes.codeBlock.style:
                return ( <CodeIcon className="mui-headerStyleDropdownButtons" style={ buttonStyle() } onClick={e => handleToggle(e)}>
                                {label}
                        </CodeIcon>
                    );
            default:
                break;

        }
    }

return ( <span> {
            getBlockType()
        }</span>    
    );
};

export default BlockStyleButton;
