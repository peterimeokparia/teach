import { useDispatch } from 'react-redux';

function useFormFieldEditorComponentHook( editorMarkDownContentType ){
  const saveContentInterVal = 1000;
  const dispatch = useDispatch();

  function handleEditor( formField, markDownContent ){
      dispatch({ type: editorMarkDownContentType, payload: { formField, markDownContent, saveContentInterVal }});
    // if ( formField?._id && Object.keys(markDownContent)?.length !== 0 ) {
    //   dispatch({ type: editorMarkDownContentType, payload: { formField, markDownContent, saveContentInterVal }});
    // }
  }   
return {
    handleEditor
  };
};

export default useFormFieldEditorComponentHook;