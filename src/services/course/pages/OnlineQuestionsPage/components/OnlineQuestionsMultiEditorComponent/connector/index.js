import { addNewOnlineQuestion, toggleContentChanged, setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import { saveFormBuilder, setIsMaxQuestionDialogOpen } from 'services/course/actions/formbuilders';
import { getOperatorFromOperatorBusinessName, 
  getPushNotificationUsersByOperatorId, getOnlineQuestions, getLessonOutcomesByLessonId, getQuestionExplainerAnswers } from 'services/course/selectors';

export const mapDispatch = { 
    addNewOnlineQuestion, saveFormBuilder,
    toggleContentChanged,setIsMaxQuestionDialogOpen,
    setSelectedOnlineQuestion
  };
  
export const mapState = ( state, ownProps ) => {
    return {
      operator: getOperatorFromOperatorBusinessName(state, ownProps),
      users: Object.values( state.users.users ),
      currentUser: state.users.user,
      currentCourseQuestions: getOnlineQuestions( state, ownProps ),
      onSaveError: state.onlineQuestions.onSaveError,
      pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
      failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications ),
      courses: Object.values( state?.courses?.courses ),
      contentUpdated: state?.onlineQuestions?.contentUpdated,
      hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
      formFields: Object.values(state.formFields.formFields).filter( field => field?.formId === ownProps?.onlineQuestionProps?.courseId),
      formBuilders: Object?.values( state?.formBuilders?.formBuilders ),
      isMaxQuestionDialogOpen: state.formBuilders?.isMaxQuestionDialogOpen,
      outcomes: getLessonOutcomesByLessonId(state, ownProps),
      onlineQuestionProperties: state?.onlineQuestions?.onlineQuestionProperties, 
      updateOnDelete: state.onlineQuestions.updateOnDelete,
      selectedOnlineQuestion: state.onlineQuestions.selectedOnlineQuestion,
      explainAnswers: state.onlineQuestionsExplainerAnswers.onlineQuestionsExplainerAnswers
      // explainAnswers: getQuestionExplainerAnswers( state, ownProps )
    };
  };