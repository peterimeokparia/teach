import { 
connect } from 'react-redux';

import { 
loginUser } from 'services/course/actions/users';

import {
loadSubscribedPushNotificationUserByUserId,  
sendPushNotificationMessage,  
retryPushNotificationMessage,
loadSubscribedPushNotificationUsers, 
subscribePushNotificationUser,
savePushNotificationUser } from 'services/course/actions/notifications';

import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion } from 'services/course/actions/onlinequestions';

import {
onlineMarkDownEditorFieldCollection } from 'services/course/pages/QuestionsPage/helpers';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import useOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook';
import OnlineListItems from '../OnlineListItems';
import HelpIcon from '@material-ui/icons/Help';
import { helpIconStyle } from './inlineStyles';
import './style.css';

const OnlineQuestionsMultiEditorComponent = ( {
  operatorBusinessName,
  loadSubscribedPushNotificationUserByUserId,
  sendPushNotificationMessage,
  retryPushNotificationMessage,
  loginUser,
  courseId,
  operator,
  currentUser,
  onlineQuestionId,   
  inputFieldOptions,
  onlineQuestion,
  onlineQuestions,
  latestQuestion,
  currentCourseQuestions,
  addNewOnlineQuestion,
  saveOnlineQuestion,
  loadOnlineQuestions,
  deleteOnlineQuestion,
  failedOnlineQuestionNotifications,
  pushNotificationUsers,
  loadSubscribedPushNotificationUsers,
  subscribePushNotificationUser,
  savePushNotificationUser  } ) => {
  let onlineQuestionsConfig = {
      onlineQuestionId, 
      currentCourseQuestions,
      courseId, 
      failedOnlineQuestionNotifications, 
      currentUser, 
      pushNotificationUsers,
  };

  let {
    setContentChanged
  } = useOnlineQuestionsHook( onlineQuestionsConfig );

const addNewQuestion = () => {
  let config = {  
    courseId, 
    onlineQuestionId,
    userId: currentUser?._id, 
    questionCreatedBy: ( currentUser?._id ) ? ( currentUser?.firstname ) : 'anonymous', 
    operator: operator?._id,
    inputFieldOptions, 
    placeHolder: null, 
    videoUrl: null
  };

  addNewOnlineQuestion( onlineMarkDownEditorFieldCollection( config ) );
  setContentChanged( true );  
}; 

return(
    <div className="builder"> 
        <header>
        </header>
          <div className="content">  
                {
                  <div className="sidebar">
                      <div className="input-field-builder-selector"> </div>
                  </div>
                }
                <div> 
                {
                  <div className="onlinequestion-list-items"> 
                    <OnlineListItems 
                        operator={operator}
                        courseId={courseId}
                        onlineQuestionId={ onlineQuestionId } 
                        currentCourseQuestions={currentCourseQuestions}
                    />
                  </div>
                }
                <div> <br></br> </div>
                {
                  <span>
                    <HelpIcon 
                      style={helpIconStyle()}
                      className="comment-round-button-4"
                      onClick={() => addNewQuestion()}
                    />
                  </span>
                }
                <div>
              </div>
          </div>
        </div>
      </div> 
  );
};

const mapDispatch = { 
  loginUser,
  addNewOnlineQuestion, 
  saveOnlineQuestion, 
  loadOnlineQuestions, 
  deleteOnlineQuestion, 
  sendPushNotificationMessage, 
  retryPushNotificationMessage, 
  subscribePushNotificationUser, 
  savePushNotificationUser, 
  loadSubscribedPushNotificationUsers, 
  loadSubscribedPushNotificationUserByUserId 
};

const mapState = ( state, ownProps ) => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    currentUser: state.users.user,
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications )
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsMultiEditorComponent);