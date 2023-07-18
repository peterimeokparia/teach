import { onItalicClick, onBoldClick, onUnderLineClick, onStrikeThroughClick, onHighLight, onAddLink,
    onAddImage, onAddVideo, toggleBlockType } from 'services/course/editor/components/MenuButtons/helper';
import { alignmentPosition, applyAlignment } from 'services/course/editor/components/MenuButtons/helper/alignmentHelper';
import { buttonStyle, highLightButtonStyle } from 'services/course/editor/components/MenuButtons/helper';
import BlockStyleToolbar from "services/course/editor/components/blockStyles/BlockStyleToolbar";
import ScienceIcon from '@mui/icons-material/Science';
import FunctionsIcon from '@mui/icons-material/Functions';
import ImageIcon from '@mui/icons-material/Image';
import AddLinkIcon from '@mui/icons-material/AddLink';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatStrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import HighlightIcon from '@mui/icons-material/Highlight';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

const MenuButtons = ( { props  } ) => {
    let { setOpenDrawer, openDrawer, editorState,  setEditorState, 
        mathLatexEditor, setMathLatexEditor, editor
    } = props;
        
    return (
        <div className={"menu-buttons"}>
            <BlockStyleToolbar
                editorState={ editorState }
                onToggle={ blocktype => toggleBlockType( blocktype, editorState, setEditorState ) }
            />   
            <span>
                <HighlightIcon onClick={() => onHighLight( editorState, setEditorState )} className="mui-headerStyleDropdownButtons" style={highLightButtonStyle()} />
                <FormatItalicIcon onClick={() => onItalicClick( editorState, setEditorState )} className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <FormatBoldIcon onClick={() => onBoldClick( editorState, setEditorState )} className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <FormatUnderlinedIcon onClick={() => onUnderLineClick( editorState, setEditorState )} className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <FormatStrikethroughIcon onClick={() => onStrikeThroughClick( editorState, setEditorState )} className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <FormatAlignLeftIcon  onClick={() => applyAlignment( alignmentPosition.Left, editorState, setEditorState )}  className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <FormatAlignJustifyIcon  onClick={() => applyAlignment( alignmentPosition.Center, editorState, setEditorState )}  className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <FormatAlignRightIcon  onClick={() => applyAlignment( alignmentPosition.Right, editorState, setEditorState )}  className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <AddLinkIcon id="link_url" onClick={() => onAddLink( editorState, setEditorState )}  className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <ImageIcon  onClick={e => onAddImage( e, editor, editorState, setEditorState )}  className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <VideoFileIcon  onClick={e => onAddVideo( e, editor, editorState, setEditorState )}  className="mui-headerStyleDropdownButtons" style={buttonStyle()} />
                <FunctionsIcon className="mui-headerStyleDropdownButtons" style={buttonStyle()} onClick={() => setMathLatexEditor( !mathLatexEditor )}/>
                <ScienceIcon className="mui-headerStyleDropdownButtons" style={buttonStyle()} onClick={() => setOpenDrawer( !openDrawer )}/>
            </span>
        </div>
    );
};

export default MenuButtons;