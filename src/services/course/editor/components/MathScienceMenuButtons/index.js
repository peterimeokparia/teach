import {
insertMath } from 'services/course/editor/components/MenuButtons/helper';

import BlockStyleToolbar from "services/course/editor/components/blockStyles/BlockStyleToolbar";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import AddLinkIcon from '@mui/icons-material/AddLink';

const MathScienceMenuButtons = ({
    props }) => {
    return (
        <div className={"menu-buttons"}>
            <span>
                <button className="strikethrough" onClick={() => insertMath( props )}>
                    math
                </button> 
                {/* <button className="strikethrough" onClick={() => displayLatexEditor( setMathLatexEditor, mathLatexEditor )}>
                    math creator
                </button>  */}
            </span>
        </div>
    )
}


export default MathScienceMenuButtons;