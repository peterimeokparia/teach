import { connect } from 'react-redux';
import { getPushNotificationUsersByOperatorId, getOnlineQuestions} from 'services/course/selectors';
import { saveOnlineQuestions } from 'services/course/actions/onlinequestions';
import { addNewFormField } from 'services/course/actions/formfields';
import { loadFormFieldPoints } from 'services/course/actions/formquestionpoints';
import { loadFormFieldAnswers } from 'services/course/actions/formfieldanswers';
import { toggleIconStyleHeader, plusOneIconStyleHeader } from '../FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/inlineStyles';
import { useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';
import { useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';
import { role } from 'services/course/helpers/PageHelpers';
import { formTypes } from '../helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { setIsMaxFieldDialogOpen } from 'services/course/actions/formbuilders';
import MissedQuestionComponent from 'services/course/pages/FormBuilder/FormQuestions/components/MissedQuestionsComponent';
import useLoadQuestionsOnUpdatedQuestionContentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useLoadQuestionsOnUpdatedQuestionContentHook';
import useInputTypeSelectorMaxDialogHook from 'services/course/pages/FormBuilder/hooks/useInputTypeSelectorMaxDialogHook';
import useFormFieldQuestionsHook from '../hooks/useFormFieldQuestionsHook';
import Tooltip from '@mui/material/Tooltip';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormFields from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields';
import OnlineQuestionsMultiEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent';
import DigitalClock from 'services/course/pages/components/DigitalClock';
import Roles from '../../components/Roles';
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
  formBuilderState,
  formBuilderStatus,
  eventId,
  onlineQuestionId, 
  formId,
  courseId,   
  lessonId,
  outcomeId,
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

  let {
    previewMode, enableAddPointsToQuestionInputField, studentsCummulativePointsReceived,
    editing, missedQuestions, handleMissedQuestions, toggleSetPreviewMode,
    addPoints,toggleQuestionPointField, addNewFormInputField
  } = useFormFieldQuestionsHook( questionProps() ); 

  let { 
    modalProps, toggleFormFieldSelector 
  } = useInputTypeSelectorMaxDialogHook({ addNewFormInputField, isMaxDialogOpen: isMaxFieldDialogOpen, setIsMaxDialogOpen: setIsMaxFieldDialogOpen  });

  useLoadQuestionsOnUpdatedQuestionContentHook( contentUpdated );

function questionProps(){
  return {
    onlineQuestions, courseId, lessonId, formType, formName, formUuId, formBuilderState, formBuilderStatus,
    eventId, onlineQuestionId, saveOnlineQuestions, loadFormFieldPoints, loadFormFieldAnswers, studentsTotalPointsReceived,
    studentsTotalPointsReceivedFromPersistence,timer, currentUser, formBuilders, orderedFormBuilderQuestions, operatorBusinessName, 
    displayVideoComponent: false, formId, userId, outcomeId, linkId
  };
}

return (
        <div>
          <> 
          {/* Persist QuestionOutcomeComponent & MissedQuestionComponent properties ...session storage or store ??? */}
          {/* {( formBuilderStatus === elementMeta.status.Reviewed || formBuilderStatus === elementMeta.status.Review) && 
            <MissedQuestionComponent display={ true } questionProps={ questionProps() } setMissedQuestions={ handleMissedQuestions } />
          } */}
          {/* { 
            <MissedQuestionComponent display={ true } questionProps={ questionProps() } setMissedQuestions={ handleMissedQuestions } />
          } */}
          {/* <FormBuilderDashBoard form={questionProps()} formUuId = { formUuId } previewMode = { previewMode?.isPreviewMode }> */}
          <FormBuilderDashBoard form={{...questionProps(), previewMode }}>
            { formType !== formTypes.report &&
                <div className="points-label">
                  <label className="points-label">{'Points'}</label>
                  <DigitalClock digits={ studentsCummulativePointsReceived } /> 
                </div>
            }
            <div className="countdown-timer">
            { 
              // <CountDownTimer props={ { ...questionProps(), previewMode, editing, timer, studentsCummulativePointsReceived } } />
            }
            </div>  
          </FormBuilderDashBoard>
          </>
        <OnlineQuestionsMultiEditorComponent onlineQuestionProps={{ ...questionProps(), previewMode, selectedOnlineQuestion, addNewFormInputField }} lessonId={lessonId}>
        {( element, courseId ) => {
              return <> 
              { 
               <Roles role={ currentUser?.role ===  role.Tutor && formBuilderState === elementMeta.state.Manage }>
                  <Tooltip title="Toggle Preview Mode" arrow>
                    <SwapHorizIcon
                      style={ toggleIconStyleHeader() }
                      className="lesson-plan-round-button-1"
                      onClick={ () => toggleSetPreviewMode( element ) } 
                    />
                  </Tooltip>
                  { previewMode?.isPreviewMode && selectedOnlineQuestion?._id === element?._id &&
                    <Tooltip title="Add Form Field" arrow>
                      <AddCircleIcon 
                        style={plusOneIconStyleHeader()}
                        className="comment-round-button-2"
                        onClick={() => toggleFormFieldSelector( element )}
                      /> 
                    </Tooltip>
                  }
                  { previewMode?.isPreviewMode && selectedOnlineQuestion?._id === element?._id &&
                    <Tooltip title="Display Points" arrow>
                      <PlusOneIcon 
                        style={plusOneIconStyleHeader()}
                        className="comment-round-button-2"
                        onClick={() => toggleQuestionPointField( element )}
                      /> 
                    </Tooltip>
                  }
                  { previewMode?.isPreviewMode && enableAddPointsToQuestionInputField && selectedOnlineQuestion?._id === element?._id &&
                    <div className="form-question" >
                      <input
                        className="form-question-input"
                        type="number" 
                        value={  element?.pointsAssigned }
                        onChange={ e => addPoints( e?.target?.value, element ) }
                        placeholder={'+'}
                        style={ plusOneIconStyleHeader() }    
                      /> 
                    </div>
                  }
                  </Roles> 
                }
                <FormFields 
                  form={ { formType, formName, formUuId, formId, question: element, formBuilderStatus, formBuilderState, userId, eventId } }
                  previewMode={ previewMode }
                  modalProps={ modalProps }
                  toggleSetPreviewMode={ () => toggleSetPreviewMode( element ) }
                />
              </>;
            }
        } 
        </OnlineQuestionsMultiEditorComponent>
      </div>      
    );
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state?.users?.user,
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
    isMaxFieldDialogOpen: state?.formBuilders?.isMaxFieldDialogOpen
  };
};
export default connect(mapState, { saveOnlineQuestions, loadFormFieldAnswers, loadFormFieldPoints, addNewFormField, setIsMaxFieldDialogOpen } )( FormQuestions );