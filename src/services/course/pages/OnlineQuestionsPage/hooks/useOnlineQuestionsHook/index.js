import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onlineQuestionCourseId, saveOnlineQuestions, loadOnlineQuestions } from 'services/course/actions/onlinequestions';
import { loadExplainerOnlineQuestionAnswers } from 'services/course/actions/onlinequestionexplainanswer';
import { restrictTextLength } from 'services/course/helpers/PageHelpers';
import { forceReload } from 'services/course/helpers/ServerHelper';
import { ADD_ONLINEQUESTION_MW, DELETE_ONLINEQUESTION_MW } from 'services/course/actions/onlinequestions';

function useOnlineQuestionsHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
    const [ inputValue, setInputValue ] = useState("");
    const [ savedMarkDown, setSavedMarkDown ] = useState("");
    const [ isDrawerOpen, setIsDrawerOpen ] = useState( false );
    const [ questionOutcome, setQuestionOutcome ] = useState( undefined );
    const [ matchedItem, setMatchedItem ] = useState( undefined );

    let {
        courseId, failedOnlineQuestionNotifications, currentUser, pushNotificationUsers,
        formUuId, formId, formType, formName, onlineQuestionId,
        currentCourseQuestions, operator, linkId, onlineQuestionProps, verifyOutcome,
        onlineQuestionProperties, formBuilders, updateOnDelete
    } = onlineQuestionsConfig;

   let { lessonId } = onlineQuestionProps;

    useEffect(() => {
        if ( updateOnDelete ) {
            let formQuestionCount = currentCourseQuestions?.filter( question => question.formUuId === formUuId ).length;

            dispatch( loadOnlineQuestions() );
            dispatch( loadExplainerOnlineQuestionAnswers() );

            if ( formQuestionCount === 1 ) forceReload();
        }
    }, [ updateOnDelete ] );

    useEffect(() => { 
        if ( courseId ) dispatch(onlineQuestionCourseId( courseId ));

    }, [ failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, courseId, dispatch ]);
                  
    const saveRecording = ( selectedQuestion ) => {
        dispatch(saveOnlineQuestions( selectedQuestion ));
    };

    const deleteQuestion = ( selectedQuestion ) => {
        dispatch({ type: DELETE_ONLINEQUESTION_MW, payload: selectedQuestion });
    };

    const addNewQuestion = ( typeOfInput ) => {
        let config = {
            typeOfInput, formId, formType, formName, courseId, lessonId, formUuId, linkId,
            onlineQuestionId, currentUser, operator,  outcomeId: onlineQuestionProperties?.outcomeId
        };

        let payload = { typeOfInput, currentCourseQuestions, config, questionOutcome, 
            onlineQuestionProperties, onlineQuestionsConfig, verifyOutcome
        };

        dispatch({ type: ADD_ONLINEQUESTION_MW, payload })
    }

    const onMatchListItem = ( match, listItem ) => {
        setMatchedItem( listItem );
    };

    const displayName = `${restrictTextLength( formBuilders?.find( form => (form?.formDisplayName !== null || form?.formDisplayName !== undefined || form?.formDisplayName !== '') &&  form?.formName === formName )?.formDisplayName, 15, 15 )}`;

    return {
        inputValue,
        savedMarkDown, 
        isDrawerOpen, 
        displayName,
        onMatchListItem,
        setQuestionOutcome,
        setIsDrawerOpen,
        addNewQuestion,
        setSavedMarkDown, 
        setInputValue: (val) => setInputValue( val ),
        saveRecording:(val) => saveRecording( val ),
        deleteQuestion:(val) => deleteQuestion( val )
    }; 
};

export default useOnlineQuestionsHook;

