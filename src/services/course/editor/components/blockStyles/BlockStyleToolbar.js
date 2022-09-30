import { alignmentPosition } from 'services/course/editor/components/MenuButtons/helper/alignmentHelper';
import HeaderStyleDropDown from 'services/course/editor/components/blockStyles/HeaderStyleDropdown';
import BlockStyleButton from 'services/course/editor/components/blockStyles/BlockStyleButton';

export const blockTypes = {
 blockquote: { style: "blockquote", label: " “ ” " },
 unorderedListItem: { style: "unordered-list-item", label: "UL" },  
 orderedListItem: { style: "ordered-list-item", label: "OL" },
 codeBlock: { style: "code-block", label: "{ }" },
};

export const BLOCK_TYPES = [
    { label: blockTypes.blockquote.label, style: blockTypes.blockquote.style },
    { label: blockTypes.unorderedListItem.label, style: blockTypes.unorderedListItem.style },
    { label: blockTypes.orderedListItem.label, style: blockTypes.orderedListItem.style  },
    { label: blockTypes.codeBlock.label, style: blockTypes.codeBlock.style }
];

export const HEADER_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" }
];

// const styleMapCollection = [
//    {
//         'right': {
//             'text-align': 'right',
//             'display': 'block',
//             'width': '-webkit-fill-available'
//         },
//         'center': {
//             'text-align': 'center',
//             'display': 'block',
//             'width': '-webkit-fill-available'
//         },
//         'left': {
//             'text-align': 'left',
//             'display': 'block',
//             'width': '-webkit-fill-available'
//         }
//    } 
// ];
const styleMapCollection = [
    {
        'right': {
            'text-align': 'right',
            'display': 'block',
            'width': '-webkit-fill-available'
        }
    },
    {
        'center': {
            'text-align': 'center',
            'display': 'block',
            'width': '-webkit-fill-available'
        }
    },
    {
        'left': {
             'text-align': 'left',
             'display': 'block',
             'width': '-webkit-fill-available'
        }
    } 
 ];

export const styleMap = () => {
   return styleMapCollection.map(style => {
       return style;
   })
};

export function getBlockStyle(block) {
    let alignment = alignmentPosition.Left;

    switch (block.getType()) {
     case "blockquote":
      return "RichEditor-blockquote";
    default:
    block.findStyleRanges(( e ) => {
        if ( e.hasStyle( alignmentPosition.Center )) {
            alignment = alignmentPosition.Center;
        }

        if ( e.hasStyle( alignmentPosition.Right )) {
            alignment = alignmentPosition.Right;
        }
    });
    return `editor-alignment-${alignment}`;
    }
};

const BlockStyleToolbar =  ({ 
    editorState,
    onToggle
}) => {
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return(
        <span className="RichEditor-controls">
            <HeaderStyleDropDown
                headerOptions={ HEADER_TYPES }  
                active={ blockType }
                onToggle={ onToggle } 
            />
            { BLOCK_TYPES.map(type => {
                return (
                    <BlockStyleButton 
                        active={ type.style === blockType }
                        label={ type.label }
                        onToggle={ onToggle }
                        style={ type.style }
                        key={ type.label }
                        type={ type }
                    />
                );
                })
            }
        </span>
    );
};

export default BlockStyleToolbar;