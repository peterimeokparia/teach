import { EditorState, Modifier, SelectionState } from "draft-js";

export const alignmentPosition = {
    Left: 'left',
    Right: 'right',
    Center: 'center'
};

const alignmentStyles = [ alignmentPosition.Left, alignmentPosition.Right, alignmentPosition.Center ];

//https://stackoverflow.com/questions/53378819/cant-get-draft-js-modifiers-applyinlinestyle-function-to-apply-inline-style
//https://medium.com/@ibraheems.ali95/text-alignment-in-draftjs-and-using-with-statetohtml-caecd0138251
//https://github.com/facebook/draft-js/blob/main/examples/draft-0-10-0/color/color.html
export const applyAlignment = ( newStyle, editorState, setEditorState ) => {
    let stylesNotSelected = alignmentStyles.filter( style => style !== newStyle );
    let currentEditorContent = editorState?.getCurrentContent();
    let selection = editorState?.getSelection();
    let focusBlock = currentEditorContent.getBlockForKey( selection.getFocusKey() );
    let anchorBlock = currentEditorContent.getBlockForKey( selection.getAnchorKey() );
    let isBackward = selection.getIsBackward();

    let selectionMerge = {
      anchorOffset: 0,
      focusOffset: focusBlock.getLength(),  
    };

    if ( isBackward ) {
        selectionMerge.anchorOffset = anchorBlock.getLength();
    }

    let finalSelection = selection.merge( selectionMerge );
    let finalContent = stylesNotSelected.reduce(( content, style ) => Modifier.removeInlineStyle( content, finalSelection, style ), currentEditorContent );
    let modifiedContent = Modifier.applyInlineStyle( finalContent, finalSelection, newStyle );
    const nextEditorState = EditorState.push( editorState, modifiedContent, 'change-inline-style' );

 //keep   
 //setEditorState( nextEditorState );


    // delete
    const currentContent = nextEditorState.getCurrentContent();
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
    const editorWithInsert = EditorState.push(nextEditorState, textWithInsert, 'insert-characters');

    //also focuses cursor at the end of the editor 
    const newEditorState = EditorState.moveFocusToEnd(editorWithInsert, textWithInsert.getSelectionAfter());
    setEditorState( newEditorState );
};