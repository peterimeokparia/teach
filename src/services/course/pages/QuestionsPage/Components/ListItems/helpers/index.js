export function updateMarkDownEditorContent( markDownEditors, editor, element, elementkey ){
    if ( ! editor || ! markDownEditors ) return;
    let updatedMarkDownContent = [];

    try {

      let markDownObject = markDownEditors?.find( obj => obj?.id === element?.id );
  
      if ( markDownObject?.id ) {

        updatedMarkDownContent = [ ...markDownEditors ];

        let newObject = { ...markDownObject }
        let updatedMarkDownObject = newObject[ elementkey ] = editor.getHTML();
  
        let test = updatedMarkDownContent.splice( markDownEditors.indexOf( markDownObject ), 1,  updatedMarkDownObject );
    
      } else {
        let newObject = { ...element }
        let updatedMarkDownObject = newObject[ elementkey ] = editor.getHTML();
  
        updatedMarkDownContent = [ ...markDownEditors, updatedMarkDownObject ]; 

      }

    } catch (error) {
      console.log( error );
    }
     return updatedMarkDownContent;
 };