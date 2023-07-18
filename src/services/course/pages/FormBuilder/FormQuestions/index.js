import { connect } from 'react-redux';
import { getPushNotificationUsersByOperatorId, getOnlineQuestions} from 'services/course/selectors';
import { saveOnlineQuestions } from 'services/course/actions/onlinequestions';
import { addNewFormField } from 'services/course/actions/formfields';
import { loadFormFieldPoints } from 'services/course/actions/formquestionpoints';
import { loadFormFieldAnswers } from 'services/course/actions/formfieldanswers';
import { useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';
import { useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';
import { formTypes } from '../helpers';
import { setIsMaxFieldDialogOpen } from 'services/course/actions/formbuilders';
import { chartProps } from 'services/course/pages/FormBuilder/FormQuestions/helper';
import EditorMenuComponent from 'services/course/pages/FormBuilder/FormQuestions/components/EditorMenuComponent';
import MissedQuestionComponent from 'services/course/pages/FormBuilder/FormQuestions/components/MissedQuestionsComponent';
import useLoadQuestionsOnUpdatedQuestionContentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useLoadQuestionsOnUpdatedQuestionContentHook';
import useInputTypeSelectorMaxDialogHook from 'services/course/pages/FormBuilder/hooks/useInputTypeSelectorMaxDialogHook';
import useFormFieldQuestionsHook from '../hooks/useFormFieldQuestionsHook';
import FormFields from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields';
import QuestionInsightsComponent from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/QuestionInsightsComponent';
import OnlineQuestionsMultiEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent';
import DigitalClock from 'services/course/pages/components/DigitalClock';
import CountDownTimer from 'services/course/pages/components/CountDownTimer';
import FormBuilderDashBoard from 'services/course/pages/components/FormBuilderDashBoard';
import './style.css';

const FormQuestions = ({ 
  selectedOnlineQuestion,
  contentUpdated,
  operatorBusinessName, 
  formType,
  formName,
  formUuId,
  linkId,
  userId,
  tutorId,
  formBuilderState,
  formBuilderStatus,
  eventId,
  onlineQuestionId, 
  formId,
  courseId,   
  lessonId,
  lessons,
  outcomeId,
  courseOutcomes,
  studentQuestionInsights,
  onlineQuestions,
  onlineQuestionsLoading,
  onQuestionsLoadingError,
  saveOnlineQuestions,
  loadFormFieldPoints,
  loadFormFieldAnswers,
  addNewFormField,
  isMaxFieldDialogOpen,
  currentUser,
  timer,
  studentsTotalPointsReceived,
  studentsTotalPointsReceivedFromPersistence,
  formBuilders,
  orderedFormBuilderQuestions,
  setIsMaxFieldDialogOpen
}) => { 
  useUserVerificationHook( currentUser, operatorBusinessName );
  useOnLoadingHook( onlineQuestionsLoading, onQuestionsLoadingError );
   
  let { formFieldQuestionProps } = useFormFieldQuestionsHook( questionProps() );

  let {
    previewMode, studentsCummulativePointsReceived, editing, 
    missedQuestions, handleMissedQuestions, toggleSetPreviewMode, addNewFormInputField
  } = formFieldQuestionProps;

  let { 
    modalProps, toggleFormFieldSelector 
  } = useInputTypeSelectorMaxDialogHook({ addNewFormInputField, isMaxDialogOpen: isMaxFieldDialogOpen, setIsMaxDialogOpen: setIsMaxFieldDialogOpen  });

  useLoadQuestionsOnUpdatedQuestionContentHook( contentUpdated );

  let { 
    outComeBarChartProps 
  } = chartProps( lessons, lessonId, studentQuestionInsights, courseOutcomes, formName, formType, currentUser );
  
function questionProps() {
  return {
    onlineQuestions, courseId, lessonId, formType, formName, formUuId, formBuilderState, formBuilderStatus,
    eventId, onlineQuestionId, saveOnlineQuestions, loadFormFieldPoints, loadFormFieldAnswers, studentsTotalPointsReceived,
    studentsTotalPointsReceivedFromPersistence,timer, currentUser, formBuilders, orderedFormBuilderQuestions, operatorBusinessName, 
    displayVideoComponent: false, formId, userId, outcomeId, linkId, tutorId
  };
}

return (
      <div>
        <> 
        <FormBuilderDashBoard form={{ ...questionProps(), previewMode, handleMissedQuestions }} outComeBarChartProp={ outComeBarChartProps }>
          { formType !== formTypes.report &&
            <div className="points-label">
              <label className="points-label">{'Points'}</label>
              <DigitalClock digits={ studentsCummulativePointsReceived } /> 
            </div>
          }
          <div className="countdown-timer">
          { 
            //<CountDownTimer props={ { ...questionProps(), previewMode, editing, timer, studentsCummulativePointsReceived } } />
          }
          </div>  
        </FormBuilderDashBoard>
        </>
        <OnlineQuestionsMultiEditorComponent onlineQuestionProps={{ ...questionProps(), previewMode, selectedOnlineQuestion, addNewFormInputField }} lessonId={lessonId}>
        {( element, courseId ) => {
            return <> 
                <EditorMenuComponent 
                  element={ element }
                  formBuilderState={ formBuilderState }
                  toggleSetPreviewMode={ () => toggleSetPreviewMode( element ) }
                  formFieldQuestionProps={ formFieldQuestionProps }
                  selectedOnlineQuestion={ selectedOnlineQuestion }
                  toggleFormFieldSelector={ toggleFormFieldSelector }
                />
                <QuestionInsightsComponent 
                  form={ { formType, formName, formUuId, formId, question: element, formBuilderStatus, formBuilderState, userId, eventId } }
                  previewMode={ previewMode }
                  modalProps={ modalProps }
                  toggleSetPreviewMode={ () => toggleSetPreviewMode( element ) }
                />
                <FormFields 
                  form={ { formType, formName, formUuId, formId, question: element, formBuilderStatus, formBuilderState, userId, eventId } }
                  previewMode={ previewMode }
                  modalProps={ modalProps }
                  toggleSetPreviewMode={ () => toggleSetPreviewMode( element ) }
                />
              </>
            }
        } 
        </OnlineQuestionsMultiEditorComponent>
      </div>      
    );
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state?.users?.user,
    tutorId: Object.values( state?.courses?.courses )?.find( course => course?._id === ownProps?.courseId )?.createdBy,
    formBuilders: Object?.values( state?.formBuilders?.formBuilders ),
    onlineQuestions: getOnlineQuestions( state, ownProps ),
    onlineQuestionsLoading: state?.onlineQuestions?.onlineQuestionsLoading,
    onQuestionsLoadingError: state?.onlineQuestions?.onQuestionsLoadingError,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    studentsTotalPointsReceived: Object?.values( state?.formFieldAnswers?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.formName && field?.formUuId === ownProps?.formUuId && field?.userId === ownProps?.userId ),
    studentsTotalPointsReceivedFromPersistence: Object?.values( state?.formFieldPoints?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.formName && field?.formUuId === ownProps?.formUuId && field?.userId === ownProps?.userId ),
    timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.formName ),
    contentUpdated: state?.onlineQuestions?.contentUpdated,
    selectedOnlineQuestion: state?.onlineQuestions?.selectedOnlineQuestion,
    isMaxFieldDialogOpen: state?.formBuilders?.isMaxFieldDialogOpen,
    // courseOutcomes: Object.values( state?.outcomes?.outcomes)?.filter(outcome => outcome?.courseId === ownProps?.courseId ),
    courseOutcomes: Object.values( state?.outcomes?.outcomes ),
    lessons: Object.values( state?.lessons?.lessons)?.filter(outcome => outcome?.courseId === ownProps?.courseId ), 
    studentQuestionInsights: Object.values( state?.studentQuestionInsights?.studentQuestionInsights )
  };
};
export default connect(mapState, { saveOnlineQuestions, loadFormFieldAnswers, loadFormFieldPoints, addNewFormField, setIsMaxFieldDialogOpen } )( FormQuestions );