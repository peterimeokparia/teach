import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loadOnlineQuestions, toggleContentChanged } from 'services/course/actions/onlinequestions';
import { loadFormBuilders } from 'services/course/actions/formbuilders';
import { loadExplainerOnlineQuestionAnswers } from 'services/course/actions/onlinequestionexplainanswer';
import { getNewlyAddedQuestions, compareObjectsBeforeReload, handleSingleQuestionForms } from 'services/course/pages/OnlineQuestionsPage/hooks/useSortOnlineQuestionsHook/helpers';

function useSortOnlineQuestionsHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
    const [ currentFormBuilders, setCurrentFormBuilders ] = useState(undefined);
   
    let { 
        currentCourseQuestions, saveFormBuilder, formName, formType, formUuId, formBuilderState, formBuilderStatus, formBuilders, contentUpdated, onlineQuestionId,
    } = onlineQuestionsConfig;

    const [ currentQuestions, setCurrentQuestions ] = useState(currentCourseQuestions);
    
    let currentFormBuilder = formBuilders?.find( builder => builder?.formName === formName && builder?.state === formBuilderStatus && builder?.formUuId === formUuId &&
        builder?.formType === formType );

    const getExistingSortedOrderQuestions = useCallback(( currentCourseQuestions, currentFormBuilderOrderedFormQuestions ) => {
        let tempQuestions = [];

        if ( !currentFormBuilderOrderedFormQuestions || currentFormBuilderOrderedFormQuestions?.length === 0 || currentFormBuilderOrderedFormQuestions[0] === null ) return currentCourseQuestions;
            currentFormBuilderOrderedFormQuestions.forEach(element => {
            if ( currentCourseQuestions.map( question => question._id).includes( element?._id )){
                let currentQuestion = currentCourseQuestions?.find( question => question?._id === element?._id );

                tempQuestions.push( currentQuestion );
            }
        });
        let formQuestions =  currentCourseQuestions?.filter( question => getNewlyAddedQuestions(question, tempQuestions));

        return tempQuestions?.concat( formQuestions );
    }, []);

    useEffect(() => {
        if ( currentCourseQuestions?.length > 0 ) {
            setCurrentQuestions( currentCourseQuestions );
        }
        if ( handleSingleQuestionForms( onlineQuestionId, currentCourseQuestions, setCurrentQuestions ) ) {
            return;
        }

       let orderedFormQuestions = getExistingSortedOrderQuestions( currentCourseQuestions, currentFormBuilder?.orderedFormQuestions );

       let comparisonResultIsEqual = compareObjectsBeforeReload( orderedFormQuestions, currentQuestions );

       if ( !comparisonResultIsEqual ){
            if ( currentFormBuilder ) {
                setCurrentQuestions( orderedFormQuestions );
                saveFormBuilder( { ...currentFormBuilder, state: formBuilderState, status:formBuilderStatus,  orderedFormQuestions } );
                setCurrentFormBuilders( { ...currentFormBuilder, state: formBuilderState, status:formBuilderStatus, orderedFormQuestions } );
            } 
       }
    }, [ currentCourseQuestions, onlineQuestionId, getExistingSortedOrderQuestions, currentFormBuilder, currentQuestions, saveFormBuilder, formBuilderState, formBuilderStatus ]);

    useEffect(() => {
        if ( contentUpdated ) {
            dispatch( loadFormBuilders() );
            dispatch( loadOnlineQuestions() );
            dispatch( loadExplainerOnlineQuestionAnswers() );
            dispatch( toggleContentChanged() );
            let orderedFormQuestions =  getExistingSortedOrderQuestions( currentCourseQuestions, currentFormBuilder?.orderedFormQuestions );

            setCurrentQuestions( orderedFormQuestions );
            setCurrentFormBuilders( currentFormBuilder );
        }
    }, [ contentUpdated, currentCourseQuestions, currentFormBuilder,  getExistingSortedOrderQuestions, dispatch ]);

return {
    questions: currentQuestions,
    formBuilder: currentFormBuilders
}; };

export default useSortOnlineQuestionsHook;

