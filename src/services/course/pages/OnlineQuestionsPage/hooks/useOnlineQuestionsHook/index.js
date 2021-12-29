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
getOnlineQuestion } from 'services/course/pages/OnlineQuestionsPage/helpers';

import Swal from 'sweetalert2';

function useOnlineQuestionsHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
   
    let {
        formType, 
        formName,
        formUuId,
        courseId, 
        failedOnlineQuestionNotifications, 
        currentUser, 
        pushNotificationUsers,
        toggleContentChanged,
        contentUpdated,
        formFields,
        operatorBusinessName,
        onlineQuestionId,
        onlineQuestions,
    } = onlineQuestionsConfig;

    let currentCourseQuestionss = getOnlineQuestion( onlineQuestionsConfig );

    useEffect(() => { 
 
        if ( courseId ) {
            dispatch(onlineQuestionCourseId( courseId ));
        }

        if ( contentUpdated ) {
            dispatch(loadOnlineQuestions());
            toggleContentChanged();
        }

    }, [ contentUpdated, toggleContentChanged, loadOnlineQuestions, failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, 
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
                dispatch(deleteOnlineQuestion( selectedQuestion ));
                loadOnlineQuestions();
                toggleContentChanged();
            } else {
                return;
            } })
            .catch(error =>{   
                throw Error(`Failed to delete question. ${error}`);
            });
    };

return {
    questions: currentCourseQuestionss,
    saveRecording:(val) => saveRecording( val ),
    deleteQuestion:(val) => deleteQuestion( val )
}; };

export default useOnlineQuestionsHook;