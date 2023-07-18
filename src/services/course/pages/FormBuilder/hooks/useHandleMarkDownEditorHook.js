import { useEffect } from "react";

function useAssignPointsHook( props ) {
    let { loadFormFields, loadFormFieldsByFormFieldId, saveFormField, previewMode, formFieldElement } = props;

    // useEffect( () => {
    //     loadFormFields();
    //     loadFormFieldsByFormFieldId( formFieldElement?._id );
    // }, [ previewMode, loadFormFields, formFieldElement?._id, loadFormFieldsByFormFieldId ]);

function setElementContentFromEditorState ( markDownContent, field ){
    saveFormField( { ...field, markDownContent } );
    // loadFormFields();
    // loadFormFieldsByFormFieldId( field?._id );  
}
    
return {
    setElementContentFromEditorState,
}; };

export default useAssignPointsHook;