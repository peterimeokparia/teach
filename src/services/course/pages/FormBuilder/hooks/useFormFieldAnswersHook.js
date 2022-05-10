import { 
useState, 
useEffect } from "react";

function useFormFieldAnswersHook( studentAnswerByQuestionId, formFieldElement ) {

    const [ studentsAnswers, setStudentsAnswers ] = useState( undefined );

    useEffect(() => {

        if ( studentAnswerByQuestionId ) {

          setStudentsAnswers( studentAnswerByQuestionId );
          
        }
  
      }, [ studentAnswerByQuestionId ])
   
return {
    studentsAnswers,
    setStudentsAnswers
}; };

export default useFormFieldAnswersHook;