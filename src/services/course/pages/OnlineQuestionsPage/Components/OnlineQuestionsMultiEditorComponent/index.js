import { 
useState, 
useEffect } from 'react';

import { 
connect,
useDispatch } from 'react-redux';

import { 
loginUser } from 'Services/course/Actions/Users';

import {
loadSubscribedPushNotificationUserByUserId,  
sendPushNotificationMessage,  
retryPushNotificationMessage,
loadSubscribedPushNotificationUsers, 
subscribePushNotificationUser,
savePushNotificationUser } from 'Services/course/Actions/Notifications';

import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import {
onlineMarkDownEditorFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'Services/course/Selectors';

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
  addNewOnlineQuestion,
  saveOnlineQuestion,
  loadOnlineQuestions,
  deleteOnlineQuestion,
  failedOnlineQuestionNotifications,
  pushNotificationUsers,
  loadSubscribedPushNotificationUsers,
  subscribePushNotificationUser,
  savePushNotificationUser  } ) => {
  let currentCourseQuestionCollection = onlineQuestions?.filter( question => question?.courseId === courseId );
  let currentCourseQuestions = ( onlineQuestionId === undefined || !onlineQuestionId ) 
          ? currentCourseQuestionCollection
          : currentCourseQuestionCollection?.filter(question => question?._id === onlineQuestionId);
            
  const [ contentChanged, setContentChanged ] = useState( false );
  const dispatch = useDispatch();

  useEffect(() => {
    if ( contentChanged ) {
      loadOnlineQuestions();
    }
    
    }, [ dispatch, contentChanged, loadOnlineQuestions, failedOnlineQuestionNotifications, currentUser, pushNotificationUsers, 
      retryPushNotificationMessage, subscribePushNotificationUser, savePushNotificationUser, loadSubscribedPushNotificationUserByUserId]);

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

let form = currentCourseQuestions?.length > 0 ? currentCourseQuestions : undefined;
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
                        form={form}
                        operator={operator}
                        onlineQuestionId={ onlineQuestionId } 
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
    courseId: state.onlineQuestions.onlineQuestionCourseId,
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications )
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsMultiEditorComponent);