import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldAnswersByQuestionId } from 'services/course/actions/formfieldanswers';

function useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement, formBuilderState ) {
    const [ studentsAnswers, setStudentsAnswers ] = useState( undefined );
    const dispatch = useDispatch();

    useEffect(()=>{ 
      dispatch( loadFormFieldAnswersByQuestionId( formFieldElement?.questionId ) );
    }, [ formFieldElement?.selected, studentAnswerByQuestionId?.selected ])
 
  function getStudentAnswer( element ){
    if ( formBuilderState === elementMeta?.state.Manage ) {
      return formFieldElement?.selected
    } else {
      return studentAnswerByQuestionId?.selected;
    }
  }

return {
    studentsAnswers,
    setStudentsAnswers,
    getStudentAnswer
}; };

export default useFormFieldAnswersHook;