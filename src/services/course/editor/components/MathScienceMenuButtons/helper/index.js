import {
RichUtils,
EditorState,
SelectionState,
Modifier,
AtomicBlockUtils  } from "draft-js";

import LatexEditor from 'services/course/pages/LatexEditor';

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
    const link = window.prompt('Paste the link -')
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
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
     "image",
     "IMMUTABLE",
     { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity },
         "create-entity"
    );

    handleOnAddImageAtomicBlockUtilsInsertAtomicBlock( setEditorState, newEditorState, entityKey );

};

function handleOnAddImageAtomicBlockUtilsInsertAtomicBlock( setEditorState, newEditorState, entityKey ) {
    try {
        setEditorState(AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            entityKey,
            " "
         )
     )
    } catch (error) {
        console.warn(`there was a problem setting editorState for atomic block utils insert atomic image block ${error}`); 
        alert(`there was a problem setting editorState for atomic block utils insert atomic image block ${error}`); 
      return false;
    }
    return true;
}

export const insertMath = ( editorState, setEditorState ) => {

    let selection = editorState.getSelection();

    let latexCode = window.prompt("Enter math-latex");
    
    if ( !latexCode ) return;

    let contentState = editorState.getCurrentContent();
    let contentStateWithEntity = contentState.createEntity(
     "INLINETEX",
     "IMMUTABLE",
     {
        teX: latexCode,
        displaystyle: true
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    console.log(`logging entity keys ${entityKey}`);
    console.log(entityKey);
    contentState = Modifier.insertText(
        contentState,
        selection,
        "\t\t",
        undefined,
        entityKey
    );

    const latexEditorState = EditorState.push(editorState, contentState, "apply-entity");
    setEditorState( latexEditorState );
    // let newEditorState = EditorState.moveFocusToEnd(latexEditorState);
    // setEditorState(newEditorState);

    // const currentContent = latexEditorState.getCurrentContent();
    // const textWithEntity = Modifier.splitBlock(currentContent, latexEditorState.getSelection());
    // setEditorState( EditorState.push(latexEditorState, textWithEntity, "split-block") );
                   
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


            // const currentContent = latexEditorState.getCurrentContent();
            // const textWithEntity = Modifier.splitBlock(currentContent, latexEditorState.getSelection());
            // setEditorState( EditorState.push(latexEditorState, textWithEntity, "split-block") );

            

              //insert text at the selection created above 
            const textWithInsert = Modifier.insertText(currentContent, newSelection, '\n enter caption', null);
            const editorWithInsert = EditorState.push(editorState, textWithInsert, 'insert-characters');

            //also focuses cursor at the end of the editor 
            const newEditorState = EditorState.moveSelectionToEnd(editorWithInsert, textWithInsert.getSelectionAfter());
            setEditorState(newEditorState);
    
        }

    ////

//     const blockMap = contentState.getBlockMap();
//     const key = blockMap.last().getKey();
//     const length = blockMap.last().getLength();
//     // const selection = new SelectionState({
//     const latexSelection = new editorState.SelectionState({
//         anchorKey: key,
//         anchorOffset: length,
//         focusKey: key,
//         focusOffset: length,
//       });

//    //insert text at the selection created above 
//     const textWithInsert = Modifier.insertText(contentStateWithEntity, latexSelection, 'text to be inserted', null);
//     const editorWithInsert = EditorState.push(editorState, textWithInsert, 'insert-characters');

//     //also focuses cursor at the end of the editor 
//     const newEditorState = EditorState.moveSelectionToEnd(editorWithInsert, textWithInsert.getSelectionAfter());
//     setEditorState(newEditorState);

};

export const displayLatexEditor = ( setMathLatexEditor ) => {
    setMathLatexEditor( true );
};