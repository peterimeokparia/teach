import { connect } from 'react-redux';
import {  getOperatorFromOperatorBusinessName } from 'services/course/selectors';
import { styleMap, getBlockStyle } from "services/course/editor/components/blockStyles/BlockStyleToolbar";
import { mediaBlockRenderer } from 'services/course/editor/components/Link/entities/mediaBlockRenderer';
import { displayLatexEditorModal, mediaSection } from 'services/course/editor/MyEditorTest2/helpers';
import EquationDrawer from 'services/course/pages/components/EquationDrawer';
import LinearProgressBar from 'services/course/pages/components/LinearProgressBar';
import Editor from "@draft-js-plugins/editor";
import useEditorHook from 'services/course/editor/hooks/useEditorHook';
import useEditorPluginsHook from 'services/course/editor/hooks/useEditorPluginsHook';
import ImageAdd from 'services/course/editor/components/ImageAdd';
import VideoAdd from 'services/course/editor/components/VideoAdd';
import MenuButtons from 'services/course/editor/components/MenuButtons';
import ContextMenu from 'services/course/pages/components/ContextMenu'; 
import AddIcon from '@mui/icons-material/Add';
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import './editorStyles.css'
import '@draft-js-plugins/focus/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import { placeHolder } from 'services/course/helpers/EditorHelpers';

const MyEditorTest2 = ({
    operator,
    user,
    users,
    readOnly,
    chemicalEquations,
    showMenuButtons,
    handleSavingContentProgressBar,
    placeHolder,
    element,
    content,
    setElementContentFromEditorState,
}) => {
    let { editorState, enableEditor, showMenu, editor, editorContextMenuRef, mathScienceProps, mathLatexEditor,
         handleMockUpload, setShowMenu, handleEditorState, handleKeyCommand, insertChemicalEquation,
         handleMediaTypeDisplayIndex, mediaTypeDisplayIndex
    } = useEditorHook({ content, element, setElementContentFromEditorState });

    let { imagePlugin, videoPlugin, extendedBlockRenderMap, plugins, AlignmentTool , InsertButton, Toolbar
    } = useEditorPluginsHook({ handleMockUpload });

    let { openDrawer } = Object( mathScienceProps );

    return (
        <>
        <div className={  !showMenu? "editorTest" : "editorTest-preview" } onDoubleClick={ () => setShowMenu( !showMenu ) } ref={editorContextMenuRef}>
            <div></div>
            {/* {
                <LinearProgressBar showBar={ handleSavingContentProgressBar }/> 
            } */}
            { ( showMenuButtons && showMenu ) && <div className={'header-menu-buttons'}> 
                <MenuButtons props={ {...mathScienceProps, videoPlugin} } />
                </div>
            }
            { ( mathLatexEditor ) && 
                displayLatexEditorModal( mathScienceProps, insertChemicalEquation, setShowMenu )
            }
            { ( enableEditor ) && 
                <>           
                <AlignmentTool /> 
                <Editor 
                    ref={(element) => {
                        editor.current = element;
                    }}
                    blockRendererFn={ mediaBlockRenderer }
                    blockStyleFn={ getBlockStyle }
                    customStyleMap={ styleMap }
                    editorState={ editorState } 
                    handleKeyCommand={ handleKeyCommand }
                    onChange={ editorState => handleEditorState( editorState ) } 
                    plugins={ plugins }
                    placeholder={placeHolder}
                    spellCheck={ ( showMenuButtons && showMenu ) ? false : true }
                    readOnly={ ( showMenuButtons && showMenu ) ? false : true }
                    //blockRenderMap={ extendedBlockRenderMap }
                    // handlePastedText
                    // handlePastedFiles
                    // handleDroppedFiles
                    // handleDrop
                />
                </>
            }
            {
                <AlignmentTool />
            }
            {openDrawer && 
                <EquationDrawer 
                    toggleDrawer={openDrawer}
                    anchorPosition={'right'}
                    insertIntoFunc={insertChemicalEquation}
                    equationSet={chemicalEquations}
                />
            }

            { ( showMenuButtons && showMenu ) && 
                <div className={'row align-items-end media-row'}> 
                <AddIcon className="mui-headerStyleMediaDropdownButtons" onClick={() => handleMediaTypeDisplayIndex()}/>
                    {
                        mediaSection( editorState, imagePlugin, videoPlugin, handleEditorState, mediaTypeDisplayIndex )
                    }
                </div>
            }
        </div>
        </>
    );
};

const mapState = (state, ownProps)   => {
    return {
      operator: getOperatorFromOperatorBusinessName(state, ownProps),
      previewMode: state.app.previewMode,
      users: state.users.users,
      user: state.users.user,
      chemicalEquations: state?.equations?.equations
    };
};

export default connect( mapState, null )( MyEditorTest2 );
