import { 
connect } from 'react-redux';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'teach/src/services/course/selectors';

import {
getOnlineQuestion } from 'teach/src/services/course/pages/OnlineQuestionsPage/helpers';

import OnlineQuestionsMultiEditorComponent from 'teach/src/services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent';

const OnlineQuestionsPage = ({ 
  operatorBusinessName, 
  onlineQuestionId, 
  courseId,
  onlineQuestions }) => {
 
let currentCourseQuestions = getOnlineQuestion( onlineQuestions, courseId, onlineQuestionId )
return (
    <div className="stage" id="stage">
      <div className="" id=""> 
        <div>
          <OnlineQuestionsMultiEditorComponent 
            onlineQuestionId={onlineQuestionId} 
            courseId={courseId}
            operatorBusinessName={operatorBusinessName}
            currentCourseQuestions={currentCourseQuestions}
          />
        </div>    
    </div>      
  </div>  
 );
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

export default connect(mapState, null )( OnlineQuestionsPage );