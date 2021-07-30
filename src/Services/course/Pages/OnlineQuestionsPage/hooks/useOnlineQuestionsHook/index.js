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
savePushNotificationUser } from 'Services/course/Actions/Notifications';

import { 
onlineQuestionCourseId,
deleteOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions } from 'Services/course/Actions/OnlineQuestions';

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
        

        // if ( currentCourseQuestions === undefined || currentCourseQuestions?.length === 0 ) {
        //     return  ( <> <div>  </div> </>);
        // } 

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