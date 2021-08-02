import { 
useState, 
useEffect } from 'react';

import { 
useDispatch,
useSelector } from 'react-redux';

import {
loadSubscribedPushNotificationUserByUserId,
failedOnlineQuestionNotifications,  
retryPushNotificationMessage,
subscribePushNotificationUser,
savePushNotificationUser } from 'teach/src/services/course/actions/notifications';

import { 
onlineQuestionCourseId,
deleteOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions } from 'teach/src/services/course/actions/onlinequestions';

function useOnlineQuestionsHook(onlineQuestionsConfig ){

    const dispatch = useDispatch();

    let {
        currentCourseQuestions,
        onlineQuestionId, 
        courseId, 
        failedOnlineQuestionNotifications, 
        currentUser, 
        pushNotificationUsers,
    } = onlineQuestionsConfig;

    const [ contentChanged, setContentChanged ] = useState( false );
    
    useEffect(() => { 
        if ( courseId ) {
            dispatch(onlineQuestionCourseId( courseId ));
        }

        if ( contentChanged ) {
            dispatch( loadOnlineQuestions() );
        }
    }, [ contentChanged, loadOnlineQuestions, failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, 
            retryPushNotificationMessage, subscribePushNotificationUser, savePushNotificationUser, 
            onlineQuestionCourseId, loadSubscribedPushNotificationUserByUserId, courseId ]);
        
const saveRecording = ( selectedQuestion ) => {
    dispatch(saveOnlineQuestion( selectedQuestion ));
};

const deleteQuestion = ( selectedQuestion ) => {
    dispatch(deleteOnlineQuestion( selectedQuestion ));
};

return {
    setContentChanged:(val) => setContentChanged( val ),
    saveRecording:(val) => saveRecording( val ),
    deleteQuestion:(val) => deleteQuestion( val )
}};

export default useOnlineQuestionsHook;