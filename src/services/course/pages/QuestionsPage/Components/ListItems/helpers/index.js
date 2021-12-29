export function updateMarkDownEditorContent( markDownEditors, editor, element, elementkey ){
    if ( ! editor || ! markDownEditors ) return;
    let updatedMarkDownContent = [];

    try {

      let markDownObject = markDownEditors?.find( obj => obj?.id === element?.id );
  
      if ( markDownObject?.id ) {
        alert('mark down object')
        alert(JSON.stringify(markDownObject) )
        updatedMarkDownContent = [ ...markDownEditors ];

        let newObject = { ...markDownObject }
        let updatedMarkDownObject = newObject[ elementkey ] = editor.getHTML();
  
        let test = updatedMarkDownContent.splice( markDownEditors.indexOf( markDownObject ), 1,  updatedMarkDownObject );
        alert('updated markdown editors')
        alert(JSON.stringify(test))
      } else {
        let newObject = { ...element }
        let updatedMarkDownObject = newObject[ elementkey ] = editor.getHTML();
  
        updatedMarkDownContent = [ ...markDownEditors, updatedMarkDownObject ]; 

        alert('updated markdown editors 2')
        alert(JSON.stringify(updatedMarkDownContent))
      }

    } catch (error) {
      console.log( error );
    }
     return updatedMarkDownContent;
 };