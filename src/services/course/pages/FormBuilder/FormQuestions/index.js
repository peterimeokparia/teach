import { 
connect } from 'react-redux';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import { 
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import {
loadFormFieldAnswers } from 'services/course/actions/formfieldanswers';

import {
toggleIconStyleHeader,
plusOneIconStyleHeader } from '../FormFields/inlineStyles';

import { 
useUserVerificationHook } from 'services/course/helpers/Hooks/useUserVerificationHook';
  
import { 
useOnLoadingHook } from 'services/course/helpers/Hooks/useOnLoadingHook';

import { 
role } from 'services/course/helpers/PageHelpers';

import useFormFieldQuestionsHook from '../hooks/useFormFieldQuestionsHook';
import Tooltip from '@mui/material/Tooltip';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FormFields from 'services/course/pages/FormBuilder/FormFields';
import OnlineQuestionsMultiEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent';
import DigitalClock from 'services/course/pages/components/DigitalClock';
import Roles from '../../components/Roles';
import CountDownTimer from 'services/course/pages/components/CountDownTimer';
import FormBuilderDashBoard from 'services/course/pages/components/FormBuilderDashBoard';
import './style.css';

// use case - find a way to build new exams / quizz from existing question banks/
const FormQuestions = ({ 
  operatorBusinessName, 
  onlineQuestionId, 
  formId,
  courseId,   
  onlineQuestions,
  onlineQuestionsLoading,
  onQuestionsLoadingError,
  saveOnlineQuestion,
  loadFormFieldAnswers,
  formFieldAnswers,
  currentUser,
  userId,
  timer,
  formType,
  formName,
  formUuId,
  studentsTotalPointsReceived,
  studentsTotalPointsReceivedFromPersistence,
  formBuilderStatus }) => {

  useUserVerificationHook( currentUser, operatorBusinessName );
  useOnLoadingHook( onlineQuestionsLoading , onQuestionsLoadingError );
 
  let questionProps = {
      onlineQuestions, 
      courseId, 
      formType,
      formName,
      formUuId,
      onlineQuestionId, 
      saveOnlineQuestion, 
      loadFormFieldAnswers,
      studentsTotalPointsReceived,
      studentsTotalPointsReceivedFromPersistence,
      timer,
      currentUser,
      formBuilderStatus,
      operatorBusinessName,
      currentCourseQuestions: currentQuestions,
      displayVideoComponent: false,
      formId,
      userId,
  };

  let {
    handleMaxDialog,
    previewMode,
    currentQuestions,
    enableAddPointsToQuestionInputField,
    selectedQuestion,
    studentsCummulativePointsReceived,
    editing,
    toggleFormFieldSelector,
    toggleSetPreviewMode,
    addPoints,
    toggleQuestionPointField
  } = useFormFieldQuestionsHook( questionProps ); 
    
return (
    <div className="stage" id="stage">
        <div className="" id=""> 
        <div>
        {
          <> 
            <FormBuilderDashBoard 
              formUuId = { formUuId }
              previewMode = { previewMode?.isPreviewMode }
            >
              <div className="points-label">
              <label className="points-label">{'Points'}</label>
              </div>
                <DigitalClock digits={ studentsCummulativePointsReceived } />
              <div>
                { 
                  <CountDownTimer props={ { ...questionProps, previewMode, editing, timer, studentsCummulativePointsReceived } } />
                }
              </div>  
            </FormBuilderDashBoard>
          </>
        }
        <OnlineQuestionsMultiEditorComponent onlineQuestionProps={{...questionProps, previewMode, handleMaxDialog, toggleFormFieldSelector }}>
        {( element, courseId ) => {
              return <> 
              { 
                <Roles role={ currentUser?.role ===  role.Tutor } >
                  <Tooltip title="Toggle Preview Mode" arrow>
                    <SwapHorizIcon
                      style={ toggleIconStyleHeader() }
                      className="lesson-plan-round-button-1"
                      onClick={ () => toggleSetPreviewMode( element ) } 
                    />
                  </Tooltip>
                  { previewMode?.isPreviewMode && selectedQuestion === element?._id &&
                    <Tooltip title="Add Form Field" arrow>
                      <AddCircleIcon 
                        style={plusOneIconStyleHeader()}
                        className="comment-round-button-2"
                        onClick={() => toggleFormFieldSelector( element )}
                      /> 
                    </Tooltip>
                  }
                  { previewMode?.isPreviewMode && selectedQuestion === element?._id &&
                    <Tooltip title="Display Points" arrow>
                      <PlusOneIcon 
                        style={plusOneIconStyleHeader()}
                        className="comment-round-button-2"
                        onClick={() => toggleQuestionPointField( element )}
                      /> 
                    </Tooltip>
                  }
                  { previewMode?.isPreviewMode && enableAddPointsToQuestionInputField && selectedQuestion === element?._id &&
                    <div
                      className="form-question"
                    >
                      <input
                        className="form-question-input"
                        type="number" 
                        value={  element?.pointsAssigned }
                        onChange={ e => addPoints( e?.target?.value, element ) }
                        placeholder={'+'}
                        style={plusOneIconStyleHeader()}    
                      /> 
                    </div>
                  }
                  </Roles> 
                }
                  <FormFields 
                    form={ { formType, formName, formUuId, formId, question: element, formBuilderStatus, userId } }
                    previewMode={ previewMode }
                    handleMaxDialog={ handleMaxDialog }
                    toggleFormFieldSelector={ toggleFormFieldSelector }
                  />
              </>
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
    currentUser: state?.users?.user,
    onlineQuestions: Object.values(state?.onlineQuestions?.onlineQuestions),
    onlineQuestionsLoading: state?.onlineQuestions?.onlineQuestionsLoading,
    onQuestionsLoadingError: state?.onlineQuestions?.onQuestionsLoadingError,
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications ),
    studentsTotalPointsReceived: Object?.values( state?.formFieldAnswers?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.formName && field?.formUuId === ownProps?.formUuId && field?.userId === ownProps?.userId ),
    studentsTotalPointsReceivedFromPersistence: Object?.values( state?.formFieldPoints?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.formName && field?.formUuId === ownProps?.formUuId && field?.userId === ownProps?.userId ),
    timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.formName )
  };
};

export default connect(mapState, { saveOnlineQuestion, loadFormFieldAnswers } )( FormQuestions );