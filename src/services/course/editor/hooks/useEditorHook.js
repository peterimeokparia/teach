import { useEffect, useState, useRef } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { insertMath } from 'services/course/editor/components/MenuButtons/helper';

const useEditorHook = ( props ) => {
    let { content, element, setElementContentFromEditorState } = props;

    const [ editorState, setEditorState ] = useState( EditorState.createEmpty() );
    const [ mathLatexEditor, setMathLatexEditor ] = useState( false );
    const [ mathLatexExpression, setLatexExpression ] = useState( null );
    const [ toolBarClassName, setToolBarClassName ] = useState( 'toolbar-visible' ); 
    const [ enableEditor, setEnableEditor ] = useState( false );  
    const [ showMenu, setShowMenu ] = useState( false );
    const [ openDrawer, setOpenDrawer ] = useState( false );
    const [ tabValue, setTabValue ] = useState( 'one' );
    let [ mediaTypeDisplayIndex, setMediaTypeDisplayIndex ] = useState( 0 );
    const intervalDuration = 2500;
    const editor = useRef();
    const editorContextMenuRef = useRef();

    useEffect(() => {
        if ( editor ) { editor?.current?.focus(); };

        try {
            if ( content ) {
                const contentState = convertFromRaw( JSON.parse( content ) ); 

                setEditorState( EditorState.createWithContent( contentState ) );
            }
        } catch (error) {
            alert('not JSON.string');
            alert( content );            
        }
        setEnableEditor( true );
    }, [ content ] );

    useEffect(() => {
    }, [ mathLatexEditor  ]);

    useEffect(() => {      
    }, [  mediaTypeDisplayIndex ]);

    useEffect(() => {
    }, [ enableEditor ]);

    function handleMockUpload(e){
        alert(JSON.stringify(e));
        alert('test mock upload');
    }
    
    function handleEditorState(_editorState){  
        setEditorState( _editorState );    
        if ( element ) {  
            const editorContent = JSON.stringify( convertToRaw( _editorState.getCurrentContent() ) );

            if ( setElementContentFromEditorState ) {
                setElementContentFromEditorState( editorContent );
            }
        }
    }

    const handleKeyCommand = ( command ) => {
        const newState = RichUtils.handleKeyCommand( editorState, command );

        if ( newState ) {
            handleEditorState( newState );
            return 'handled';
        }
        return 'not-handled';
    };

    function getToolBarClassName(){
        if ( toolBarClassName === 'toolbar-visible'  ) {
            setToolBarClassName('toolbar-hidden');
        } 
        if ( toolBarClassName === 'toolbar-hidden'  ) {
            setToolBarClassName('toolbar-visible');
        }
    }

    const mathScienceProps = {
        editor,
        editorState, 
        mathLatexExpression, 
        mathLatexEditor, 
        openDrawer,
        setOpenDrawer,
        setLatexExpression, 
        setMathLatexEditor,
        setEditorState,
        handleEditorState 
    };

    function insertChemicalEquation( latexCode ) {
       insertMath( mathScienceProps, latexCode );
    //    setShowMenu( false );
    }

    function handleTabChange(e, tab){
        setTabValue( tab );
    }

    function a11yProps( index ) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function handleMediaTypeDisplayIndex() {
        if ( mediaTypeDisplayIndex === 3 ){
            setMediaTypeDisplayIndex( 1 );
            return;
        }
        setMediaTypeDisplayIndex( mediaTypeDisplayIndex + 1 );
    }

    return {
        editorState, enableEditor, showMenu, editor, editorContextMenuRef, mathScienceProps, 
        openDrawer,  tabValue, mathLatexEditor, mathLatexExpression, setMathLatexEditor, a11yProps, 
        setShowMenu, setLatexExpression, handleMockUpload, handleEditorState, handleKeyCommand,
        getToolBarClassName, insertChemicalEquation, handleTabChange, setOpenDrawer, setMediaTypeDisplayIndex, 
        mediaTypeDisplayIndex, handleMediaTypeDisplayIndex
    };
};

export default useEditorHook;