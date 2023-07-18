import { connect } from 'react-redux';
import { getOperatorFromOperatorBusinessName, getPushNotificationUsersByOperatorId } from 'services/course/selectors';
import AnswerComponent from 'services/course/pages/OnlineQuestionsPage/components/AnswerComponent';
import OnlineQuestionsMultiEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent';

const OnlineQuestionsPage = ({ 
  operatorBusinessName, 
  onlineQuestionId, 
  courseId,
  lessonId,
  formType,
  formName,
  formUuId }) => {
let onlineQuestionProps = {
  onlineQuestionId, 
  courseId,
  operatorBusinessName,
  displayVideoComponent: false,
  formType,
  formName,
  formUuId,
};

return (
    <div>
      <div> 
        <div>
          <OnlineQuestionsMultiEditorComponent onlineQuestionProps={ onlineQuestionProps } lessonId={lessonId}>
            {( element, courseId ) => {
                return < AnswerComponent 
                    question={ element }
                    courseId={ courseId }
                />;            
              }
            } 
          </OnlineQuestionsMultiEditorComponent>
        </div>    
    </div>      
  </div>  
 );
};

const mapState = ( state, ownProps ) => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    currentUser: state.users.user,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications )
  };
};

export default connect(mapState, null )( OnlineQuestionsPage );