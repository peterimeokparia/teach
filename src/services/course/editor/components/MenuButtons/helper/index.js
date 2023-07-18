import { RichUtils, EditorState, Modifier, AtomicBlockUtils, SelectionState  } from "draft-js";

export const onItalicClick = ( editorState, setEditorState ) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
};

export const onBoldClick = ( editorState, setEditorState ) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
};

export const onUnderLineClick = ( editorState, setEditorState ) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
};

export const onStrikeThroughClick = ( editorState, setEditorState ) => {
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH'));
};

export const onHighLight = ( editorState, setEditorState ) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
};

export const onAddLink = ( editorState, setEditorState ) => {
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -');

    if (!link) {
      setEditorState( RichUtils.toggleLink(editorState, selection, null) );
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();

    setEditorState( RichUtils.toggleLink(newEditorState, selection, entityKey) );
};

export const toggleBlockType = ( blockType, editorState, setEditorState ) => {
    setEditorState( RichUtils.toggleBlockType( editorState, blockType ) );
};

export const onAddImage = ( e, focus, editorState, setEditorState ) => {
    e.preventDefault();
    const imageSrc = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
     "image",
     "IMMUTABLE",
     { src: imageSrc }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
         "create-entity"
    );

    handleOnAddImageAtomicBlockUtilsInsertAtomicBlock( setEditorState, newEditorState, entityKey );
};

export const onAddVideo = ( e, focus, editorState, setEditorState ) => {
    e.preventDefault();
    const srcValue = window.prompt("Insert Video Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
     'video',
     "IMMUTABLE",
     { src: srcValue }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
         "create-entity"
    );

    handleOnAddImageAtomicBlockUtilsInsertAtomicBlock( setEditorState, newEditorState, entityKey );
};

function handleUploadedContentEntityKey( contentStateWithEntity, editorState, setEditorState ){
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
         "create-entity"
    );
    handleOnAddImageAtomicBlockUtilsInsertAtomicBlock( setEditorState, newEditorState, entityKey );
}

function handleOnAddImageAtomicBlockUtilsInsertAtomicBlock( setEditorState, newEditorState, entityKey ) {
    try {
        setEditorState(AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            " "
         )
     );
    } catch (error) {
        console.warn(`there was a problem setting editorState for atomic block utils insert atomic image block ${error}`); 
        alert(`there was a problem setting editorState for atomic block utils insert atomic image block ${error}`); 
      return false;
    }
    return true;
}

export const insertMath = ( props, latexCodeFromMenu ) => {
    let {
        editorState, 
        setEditorState, 
        mathLatexExpression, 
        mathLatexEditor, 
        setLatexExpression, 
        setMathLatexEditor
    } = props;

    let selection = editorState.getSelection();

    let latexCode = ( latexCodeFromMenu ) ? latexCodeFromMenu :  handleMathCreator( mathLatexExpression, setLatexExpression, setMathLatexEditor, mathLatexEditor ); 
   
    handleLatexCode( selection, latexCode, editorState, setEditorState );
 
};

export function handleLatexCode( selection, latexCode, editorState, setEditorState ) {

    if ( !latexCode ) return;

    let contentState = editorState.getCurrentContent();

    contentState = contentState.createEntity(
        'INLINETEX',
        'IMMUTABLE',
        {
            teX: latexCode,
            displaystyle: true
        }
    );

    const entityKey = contentState.getLastCreatedEntityKey();

    console.log(`logging entity keys ${entityKey}`);
    console.log(entityKey);
    contentState = Modifier.insertText(
        contentState,
        selection,
        "\t\t",
        undefined,
        entityKey
    );

    const latexEditorState = EditorState.push(editorState, contentState, 'apply-entity'); 

    setEditorState( latexEditorState );

    if ( latexEditorState ) {
        const currentContent = latexEditorState.getCurrentContent();
        const blockMap = currentContent.getBlockMap();
        const key = blockMap.last().getKey();
        const length = blockMap.last().getLength();
        const newSelection = new SelectionState({
            anchorKey: key,
            anchorOffset: length,
            focusKey: key,
            focusOffset: length,
        });
        //insert space after the selection created above 
        const textWithInsert = Modifier.insertText(currentContent, newSelection, ' ', null);
        const editorWithInsert = EditorState.push(latexEditorState, textWithInsert, 'insert-characters');

        //also focuses cursor at the end of the editor 
        const newEditorState = EditorState.moveFocusToEnd(editorWithInsert, textWithInsert.getSelectionAfter());
        // const test = EditorState.forceSelection(newEditorState, newEditorState.getSelection());
        setEditorState( newEditorState );
    }

    // return latexEditorState;
}

function handleMathCreator( mathLatexExpression, setLatexExpression, setMathLatexEditor, mathLatexEditor ) {
    setMathLatexEditor( !mathLatexEditor );
    return mathLatexExpression;
}

function insertCaption( latexEditorState, setEditorState ){
    // caption stuff
    if ( latexEditorState ) {
        const currentContent = latexEditorState.getCurrentContent();
        const blockMap = currentContent.getBlockMap();
        const key = blockMap.last().getKey();
        const length = blockMap.last().getLength();
        const newSelection = new SelectionState({
            anchorKey: key,
            anchorOffset: length,
            focusKey: key,
            focusOffset: length,
        });
        //insert space after the selection created above 
        const textWithInsert = Modifier.insertText(currentContent, newSelection, ' ', null);
        const editorWithInsert = EditorState.push(latexEditorState, textWithInsert, 'insert-characters');

        //also focuses cursor at the end of the editor 
        const newEditorState = EditorState.moveFocusToEnd(editorWithInsert, textWithInsert.getSelectionAfter());
        setEditorState( newEditorState );
    }
}

export const buttonStyle = () => {
    return {
        fontSize: 35,
    };
};

export const highLightButtonStyle = () => {
    return {
        fontSize: 35,
        background: 'yellow'
    };
};