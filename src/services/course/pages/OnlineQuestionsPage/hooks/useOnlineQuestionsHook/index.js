import { 
useState, 
useEffect } from 'react';

import { 
useDispatch } from 'react-redux';

import {
loadSubscribedPushNotificationUserByUserId, 
retryPushNotificationMessage,
subscribePushNotificationUser,
savePushNotificationUser } from 'services/course/actions/notifications';

import { 
onlineQuestionCourseId,
deleteOnlineQuestion,
saveOnlineQuestions,
loadOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
deleteFormField } from 'services/course/actions/formfields';

import {
getSortedRecords } from 'services/course/selectors';

import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import {
onlineMarkDownEditorFieldCollection } from 'services/course/pages/QuestionsPage/helpers';

import {
addQuestionConfig } from 'services/course/pages/OnlineQuestionsPage/helpers';
    
import Swal from 'sweetalert2';

function useOnlineQuestionsHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
    const [ inputValue, setInputValue ] = useState("");
    const [ savedMarkDown, setSavedMarkDown ] = useState("");
    const [ selectedQuestion, setSelectedQuestion ] = useState(null);

    let {
        courseId, 
        failedOnlineQuestionNotifications, 
        currentUser, 
        pushNotificationUsers,
        toggleContentChanged,
        addNewOnlineQuestion,
        formFields,
        formUuId,
        formId,
        formType,
        formName,
        onlineQuestionId,
        formBuilderStatus,
        onlineQuestions,
        operator,
    } = onlineQuestionsConfig;

    useEffect(() => { 

        if ( courseId ) {
            dispatch(onlineQuestionCourseId( courseId ));
        }

    }, [ failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, 
            retryPushNotificationMessage, subscribePushNotificationUser, savePushNotificationUser, deleteOnlineQuestion,
            onlineQuestionCourseId, loadSubscribedPushNotificationUserByUserId, courseId ]);
                  
    const saveRecording = ( selectedQuestion ) => {
        dispatch(saveOnlineQuestions( selectedQuestion ));
    };

    const getFormFieldsToDelete = ( selectedQuestion ) => {
        
        let fieldsToDelete = formFields?.filter( field => field?.questionId === selectedQuestion?._id );

        if ( fieldsToDelete?.length === 0 || undefined ) return;

        try {

            fieldsToDelete?.forEach(element => {
                dispatch(deleteFormField( element ));
            });
            
        } catch ( error ) {
            throw Error(`There was problem deleting formfields for question: ${ selectedQuestion?._id, selectedQuestion }`)
        }
    }

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
                    getFormFieldsToDelete( selectedQuestion );
                    dispatch( deleteOnlineQuestion( selectedQuestion ) );

                    let currentQuestions = onlineQuestions?.filter( question => question?.formUuId === formUuId && question?._id !== selectedQuestion?._id );

                    let sortedItems = getSortedRecords( currentQuestions, 'position' );

                        sortedItems.forEach( ( element, index ) => {
                            let repositionedItem = { ...element, position: ( index + 1) };

                            dispatch( saveOnlineQuestions( repositionedItem ) );
                        });

                    loadOnlineQuestions();
                    toggleContentChanged();
                } else {
                    return;

            } }).catch(error =>{   
                    throw Error(`Failed to delete question. ${error}`);
            });
    };

    function addNewQuestion( typeOfInput ){
        let formQuestions = onlineQuestions?.filter( question => question?.formUuId === formUuId );
        let sortedRecords = getSortedRecords( formQuestions, 'position' );
        let sortedRecordsLength = sortedRecords?.length;
        let position = (formQuestions?.length === 0 || undefined ) ? 1 : (sortedRecords[ sortedRecordsLength-1 ]?.position)+1;
        
        let config = {
          typeOfInput,
          formId,
          formType,
          formName,
          courseId,
          formUuId, 
          onlineQuestionId,
          currentUser,
          operator,
          position
        };
      
        addNewOnlineQuestion( onlineMarkDownEditorFieldCollection( addQuestionConfig( config ) ) );
        toggleContentChanged(); 
      } 

return {
    inputValue,
    savedMarkDown, 
    selectedQuestion, 
    setSelectedQuestion,
    addNewQuestion,
    setSavedMarkDown, 
    setInputValue: (val) => setInputValue( val ),
    saveRecording:(val) => saveRecording( val ),
    deleteQuestion:(val) => deleteQuestion( val )
}; };

export default useOnlineQuestionsHook;

