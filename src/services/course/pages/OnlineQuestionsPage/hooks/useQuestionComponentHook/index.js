import { useDispatch } from 'react-redux';

function useQuestionComponentHook( props ){
    let { editorMarkDownContentType } = props;

    const saveContentInterVal = 1000;
    const dispatch = useDispatch();

    function handleEditor( question, markDownContent ){
      if ( question?._id && Object.keys(markDownContent)?.length !== 0 ) {
        dispatch({ type: editorMarkDownContentType, payload: { question, markDownContent, saveContentInterVal }});
      }
    }
   
return {
    handleEditor
  };
};

export default useQuestionComponentHook;