import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onlineQuestionCourseId, deleteOnlineQuestion, setSelectedOnlineQuestion, 
    saveOnlineQuestions, loadOnlineQuestions, setQuestionProperties, updateContentOnDelete, 
    DELETE_ONLINE_QUESTION_ELEMENTS } from 'services/course/actions/onlinequestions';
import { loadExplainerOnlineQuestionAnswers } from 'services/course/actions/onlinequestionexplainanswer';
import { setIsMaxQuestionDialogOpen } from 'services/course/actions/formbuilders';
import { getSortedRecordsByPosition } from 'services/course/selectors';
import { onlineMarkDownEditorFieldCollection } from 'services/course/pages/QuestionsPage/helpers';
import { addQuestionConfig } from 'services/course/pages/OnlineQuestionsPage/helpers';
import { restrictTextLength } from 'services/course/pages/Courses/helpers';
import Swal from 'sweetalert2';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { forceReload } from 'services/course/helpers/ServerHelper';

function useOnlineQuestionsHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
    const [ inputValue, setInputValue ] = useState("");
    const [ savedMarkDown, setSavedMarkDown ] = useState("");
    const [ selectedOutcomes, setSelectedOutcomes ] = useState( undefined );
    const [ isDrawerOpen, setIsDrawerOpen ] = useState( false );

    let {
        courseId, failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, toggleContentChanged,
        addNewOnlineQuestion, formFields, formUuId, formId, formType, formName, onlineQuestionId,
        currentCourseQuestions, operator, outcomes, linkId, onlineQuestionProps,
        userId, eventId, onlineQuestionProperties, formBuilders, updateOnDelete
        // outcomeId, operatorBusinessName, 
    } = onlineQuestionsConfig;

   let { lessonId } = onlineQuestionProps;

    let { outcomeId } = Object( onlineQuestionProperties );

    useEffect(() => {
        if ( updateOnDelete ) {
            let formQuestionCount = currentCourseQuestions?.filter( question => question.formUuId === formUuId ).length;
            dispatch( loadOnlineQuestions() );
            dispatch( loadExplainerOnlineQuestionAnswers() );
            if ( formQuestionCount === 1 ) {
                forceReload();
            }
        }
    }, [ updateOnDelete ] );

    useEffect(() => {
        if ( outcomes?.length > 0 ) {
            setSelectedOutcomes( outcomes );
        }
    }, [ outcomes ] );

    useEffect(() => { 
        if ( courseId ) {
            dispatch(onlineQuestionCourseId( courseId ));
        }
    }, [ failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, courseId, dispatch ]);
                  
    const saveRecording = ( selectedQuestion ) => {
        dispatch(saveOnlineQuestions( selectedQuestion ));
    };

    const deleteQuestion = ( selectedQuestion ) => {
        Swal.fire({
            title: 'Confirm Delete',
            icon: 'warning',
            showCancelButton: true,
            showConfirmButton: ( true ),
            confirmButtonText: 'Ok',
            confirmButtonColor: '#673ab7',
            cancelButtonText: 'No'
            })
            .then( (response) => {
                if ( response?.value ) {
                    dispatch({type: DELETE_ONLINE_QUESTION_ELEMENTS, payload: selectedQuestion})
                    dispatch( deleteOnlineQuestion( selectedQuestion ) );
                    dispatch( updateContentOnDelete() );
                } else {
                    return;
            } }).catch(error =>{   
                throw Error(`Failed to delete question. ${error}`);
        });
    };

    function addNewQuestion( typeOfInput ){
        let formQuestions = null, sortedRecords = null, sortedRecordsLength = null, position = 1;
      
        try {
            formQuestions = formQuestions ?? currentCourseQuestions?.filter( question => question.formUuId === formUuId );
            sortedRecords = sortedRecords ?? getSortedRecordsByPosition( formQuestions, 'position' );
            sortedRecordsLength = sortedRecords?.length;
            position = ( !formQuestions || formQuestions?.length === 0  ) ? position : (sortedRecords[ sortedRecordsLength-1 ]?.position)+1;

            let config = {
                typeOfInput, formId, formType, formName, courseId, lessonId, formUuId, linkId,
                onlineQuestionId, currentUser, operator, position, outcomeId: onlineQuestionProperties?.outcomeId
            };

            handleAddingNewOnlineQuestion( config );

        } catch ( error ) {

            console.log( error ); 

            let config = {
                typeOfInput, formId, formType, formName, courseId, lessonId, formUuId, linkId,
                onlineQuestionId, currentUser, operator, position, outcomeId: onlineQuestionProperties?.outcomeId
            };

            handleAddingNewOnlineQuestion( config );
        }
    } 

    function handleAddingNewOnlineQuestion( config ) {
        if ( !verifyOutcome( config ) ) return; 
        addNewOnlineQuestion( onlineMarkDownEditorFieldCollection( addQuestionConfig( config ) ) );
        dispatch( setIsMaxQuestionDialogOpen( false ) );
        toggleContentChanged(); 
    }

    function updateQuestionOutcomeId( outcome ) {
        dispatch( setQuestionProperties({...onlineQuestionProperties, outcomeId: outcome?._id}) );
        dispatch( setIsMaxQuestionDialogOpen( true ) );
        setIsDrawerOpen( false );
        toggleContentChanged(); 
    }

    function verifyOutcome( config ){
        let { formType, outcomeId } = config; 

        if ( ( outcomeId === "undefined" ||  outcomeId === undefined ) && formType === formTypes.quizzwithpoints ) {
            Swal.fire({
                title: 'Please specify an outcome',
                icon: 'warning',
                showCancelButton: false,
                showConfirmButton: ( true ),
                confirmButtonText: 'OK',
                confirmButtonColor: '#673ab7',
                cancelButtonText: 'No'
                });
                setIsDrawerOpen( true );
            return false;
        };
        return true;
    }

    const onMatchListItem = ( match, listItem ) => {
        // delete ...?
    };

    const displayName = `${restrictTextLength( formBuilders?.find( form => (form?.formDisplayName !== null || form?.formDisplayName !== undefined || form?.formDisplayName !== '') &&  form?.formName === formName )?.formDisplayName, 15, 15 )}`;

return {
    inputValue,
    savedMarkDown, 
    selectedOutcomes,
    isDrawerOpen, 
    displayName,
    onMatchListItem,
    setIsDrawerOpen,
    updateQuestionOutcomeId,
    addNewQuestion,
    setSavedMarkDown, 
    setInputValue: (val) => setInputValue( val ),
    saveRecording:(val) => saveRecording( val ),
    deleteQuestion:(val) => deleteQuestion( val )
}; };

export default useOnlineQuestionsHook;

