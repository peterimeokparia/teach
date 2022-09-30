import { connect } from 'react-redux';
import {  getOperatorFromOperatorBusinessName } from 'services/course/selectors';
import { styleMap, getBlockStyle } from "services/course/editor/components/blockStyles/BlockStyleToolbar";
import { mediaBlockRenderer } from 'services/course/editor/components/Link/entities/mediaBlockRenderer';
import Editor from "@draft-js-plugins/editor";
import useEditorHook from 'services/course/editor/hooks/useEditorHook';
import useEditorPluginsHook from 'services/course/editor/hooks/useEditorPluginsHook';
//import "draft-js-focus-plugin/lib/plugin.css";
// import "draft-js-image-plugin/lib/plugin.css";
// import "draft-js-alignment-plugin/lib/plugin.css";

  const MyEditorTest3 = ({
    readOnly,
    setKeyBoardUpFlag, 
    keyBoardUpFlag,
    element,
    content,
    setElementContentFromEditorState 
}) => {
    let { editorState, enableEditor, showMenu, editor,
        handleMockUpload, setShowMenu, handleEditorState, handleKeyCommand, handleKeyUp 
    } = useEditorHook({ content, element, setElementContentFromEditorState, setKeyBoardUpFlag, keyBoardUpFlag });

    let {
     extendedBlockRenderMap,plugins,
    } = useEditorPluginsHook({ handleMockUpload });

    return (
        <div className="basic-editor" onDoubleClick={ () => setShowMenu( !showMenu ) } onKeyUp={handleKeyUp}>
            <div></div>
        { ( enableEditor ) && 
            <>
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
                blockRenderMap={ extendedBlockRenderMap }
                readOnly={ false }
            />
            </>
        }
    </div>
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

export default connect( mapState, null )( MyEditorTest3 );
