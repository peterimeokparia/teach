import { 
connect } from 'react-redux';

import { 
useState,
useRef } from 'react';

import {
EditorState,
RichUtils,
AtomicBlockUtils } from 'draft-js';

import { 
getUsersByOperatorId,    
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

// import {
// Editor,
// convertToRaw } from 'draft-js';

import {
getBlockStyle } from "services/course/editor/components/blockStyles/BlockStyleToolbar";

import {
mediaBlockRenderer } from 'services/course/editor/components/Link/entities/mediaBlockRenderer';

import Editor, {
    composeDecorators,
    createEditorStateWithText
  } from "draft-js-plugins-editor";

// import { 
// Editor,
// composeDecorators,
// createEditorStateWithText } from "draft-js-plugins-editor";


// import MenuButtons from 'services/course/editor/components/MenuButtons';
// import createHighlightPlugin from 'services/course/editor/components/plugins/highlightPlugin';
// import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
// import createAlignmentPlugin from "draft-js-alignment-plugin";
// import createFocusPlugin from "draft-js-focus-plugin";
// import createResizeablePlugin from "draft-js-resizeable-plugin";
// import addLinkPlugin from 'services/course/editor/components/plugins/addLinkPlugin';
// import createImagePlugin from 'draft-js-image-plugin';

// import ImageAdd from 'services/course/editor/components/ImageAdd';
// import editorStyles from './editorStyles.module.css';
// import ImageAdd from './ImageAdd'; create this component
// import 'draft-js/dist/Draft.css';
// import 'draft-js-plugins/image/lib/plugin.css';
// import './style.css';

//https://stackoverflow.com/questions/51665544/how-retrieve-text-from-draftjs
//https://npmmirror.com/package/draft-js-highlight-plugin
//https://gist.github.com/paulinep/ac5a9bc63862835fe95c353f81138557
//https://codesandbox.io/s/uezo3?file=/src/index.js:4040-4053
//https://javascript.hotexamples.com/site/file?hash=0xf13c7789d2df18c901ac3e0faf3ee217dd4b62a0221817916d947d274dc92485&fullName=draft-js-plugins-master/stories/align-drag-focus-and-resize-images/App.js&project=draft-js-plugins/draft-js-plugins

//https://daveteu.medium.com/draftjs-insert-paste-images-into-your-content-820159025258
//https://stackoverflow.com/questions/63747816/adding-image-draft-js-image-plugin
//https://www.freecodecamp.org/news/how-to-paste-images-directly-into-an-article-in-draft-js-e23ed3e0c834/

//https://gist.github.com/sisodiaa/d2c5e31e52d486887d5e42a73e7cc50d 

//https://codesandbox.io/s/pcjpk
//https://jpuri.github.io/react-draft-wysiwyg/#/docs
//https://stackoverflow.com/questions/46320355/upload-and-render-image-in-draft-js-based-editor
//https://github.com/facebook/draft-js
//https://codesandbox.io/embed/oq8zxjp7zq?codemirror=1

// const highlightPlugin = createHighlightPlugin();
// const toolbarPlugin = createToolbarPlugin();
// const focusPlugin = createFocusPlugin();
// const resizeablePlugin = createResizeablePlugin();
// const alignmentPlugin = createAlignmentPlugin();
// const staticToolbarPlugin = createToolbarPlugin();

// const decorator = composeDecorators(
//     resizeablePlugin.decorator,
//     alignmentPlugin.decorator,
//     focusPlugin.decorator
// );

// const { 
// Toolbar } = staticToolbarPlugin;
    
// const { 
// AlignmentTool } = alignmentPlugin;

// const imagePlugin = createImagePlugin({ decorator });

const MyEditor = ({
    operator,
    user,
    users
}) => {
    const [ editorState, setEditorState ] = useState( () => EditorState.createEmpty() );
    const editorRef = useRef();
    const focus = () => editorRef.focus();

    // const plugins = [ 
    //     highlightPlugin,
    //     addLinkPlugin,
    //     imagePlugin,
    //     toolbarPlugin,
    //     staticToolbarPlugin,
    //     focusPlugin, 
    //     alignmentPlugin, 
    //     resizeablePlugin  
    // ];

    let saveInterval = 10000, timerHandle = undefined;
    const handleEditorState = (editorState) => {  

        setEditorState( editorState );

        if ( timerHandle ) {

            clearTimeout( timerHandle );
        }
        timerHandle = setTimeout(() => {
            // alert('saving test...');
            //  alert( JSON.stringify(editorState.getCurrentContent().getPlainText('\u0001')) );
            console.log( JSON.stringify(editorState.getCurrentContent().getPlainText('\u0001')) );
            // setEditorState( editorState );
        }, saveInterval);      
    };

    const handleKeyCommand = ( command ) => {
        const newState = RichUtils.handleKeyCommand( editorState, command );

        if ( newState ) {
            handleEditorState( newState );
            return 'handled';
        }
        return 'not-handled';
    }



    return (
        <div className="editorContainer">
            <div className="toolbar">
            {/* <MenuButtons 
                editorState={ editorState }
                setEditorState={ handleEditorState }
                // focusEditorRef={ focus }
            /> */}
            </div>
            <div className="editors">
             <Editor 
                 ref={editorRef}
                // blockRendererFn={mediaBlockRenderer}
                // blockStyleFn={ getBlockStyle }
                // editorState={ editorState } 
                // handleKeyCommand={ handleKeyCommand }
                // plugins={ plugins }
                // onChange={ handleEditorState } 
            //     toolbar={{
            //         options: ['image'],             
            //         image: {
            //         uploadEnabled: true,
            //         // uploadCallback: uploadCallback,
            //         previewImage: true,
            //         inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
            //         alt: { present: false, mandatory: false },
            //         defaultSize: {
            //              height: 'auto',
            //              width: 'auto',
            //         },
            //      }
            //    }}
            />
            {/* <Toolbar /> */}
            {/* <AlignmentTool /> */}
            </div>
            {/* < ImageAdd 
                editorState={ editorState }
                setEditorState={ setEditorState }
                modifier={imagePlugin.addImage }
            /> */}
            
        </div>
    )
};

const mapState = (state, ownProps)   => {
    return {
      operator: getOperatorFromOperatorBusinessName(state, ownProps),
      previewMode: state.app.previewMode,
      users: state.users.users,
      user: state.users.user
    };
};
  
export default connect( mapState, null )(MyEditor);
