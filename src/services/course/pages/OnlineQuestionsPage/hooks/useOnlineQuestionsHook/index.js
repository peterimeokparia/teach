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
saveOnlineQuestion,
loadOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
deleteFormField } from 'services/course/actions/formfields';

import {
getSortedRecords } from 'services/course/selectors';
    
import Swal from 'sweetalert2';

function useOnlineQuestionsHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
    const [ inputValue, setInputValue ] = useState("");
   
    let {
        courseId, 
        failedOnlineQuestionNotifications, 
        currentUser, 
        pushNotificationUsers,
        toggleContentChanged,
        formFields,
        formUuId,
        formBuilderStatus,
        onlineQuestions,
    } = onlineQuestionsConfig;

    useEffect(() => { 

        if ( courseId ) {
            dispatch(onlineQuestionCourseId( courseId ));
        }

    }, [ failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, 
            retryPushNotificationMessage, subscribePushNotificationUser, savePushNotificationUser, deleteOnlineQuestion,
            onlineQuestionCourseId, loadSubscribedPushNotificationUserByUserId, courseId ]);
                  
    const saveRecording = ( selectedQuestion ) => {
        dispatch(saveOnlineQuestion( selectedQuestion ));
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

        let temp = [];

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

                            dispatch( saveOnlineQuestion( repositionedItem ) );

                        });

                    loadOnlineQuestions();

                    toggleContentChanged();

                } else {
                    return;

            } }).catch(error =>{   
                    throw Error(`Failed to delete question. ${error}`);
            });
    };

return {
    inputValue,
    setInputValue: (val) => setInputValue( val ),
    saveRecording:(val) => saveRecording( val ),
    deleteQuestion:(val) => deleteQuestion( val )
}; };

export default useOnlineQuestionsHook;

