
import { 
connect } from 'react-redux';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import { 
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
addNewFormField } from 'services/course/actions/formfields';

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

import {
formFieldInputCollection,
manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

import {
addFormFieldConfig } from 'services/course/pages/FormBuilder/FormFields/helpers';

import { 
formTypes } from '../helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import MissedQuestionComponent from 'services/course/pages/FormBuilder/FormQuestions/components/MissedQuestionsComponent';
import useloadQuestionsOnUpdatedQuestionContentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useloadQuestionsOnUpdatedQuestionContentHook';
import useInputTypeSelectorMaxDialogHook from 'services/course/pages/FormBuilder/hooks/useInputTypeSelectorMaxDialogHook';
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

const FormQuestions = ({ 
  contentUpdated,
  operatorBusinessName, 
  formType,
  formName,
  formUuId,
  userId,
  formBuilderStatus,
  eventId,
  onlineQuestionId, 
  formId,
  courseId,   
  onlineQuestions,
  onlineQuestionsLoading,
  onQuestionsLoadingError,
  saveOnlineQuestions,
  loadFormFieldAnswers,
  addNewFormField,
  currentUser,
  timer,
  studentsTotalPointsReceived,
  studentsTotalPointsReceivedFromPersistence,
  formBuilders,
  orderedFormBuilderQuestions }) => {
 
  let questionProps = {
      onlineQuestions, 
      courseId,
      formType,
      formName,
      formUuId,
      formBuilderStatus,
      eventId,
      onlineQuestionId,
      saveOnlineQuestions, 
      loadFormFieldAnswers,
      studentsTotalPointsReceived,
      studentsTotalPointsReceivedFromPersistence,
      timer,
      currentUser,
      formBuilders,
      orderedFormBuilderQuestions,
      operatorBusinessName,
      displayVideoComponent: false,
      formId,
      userId,
  };

  useUserVerificationHook( currentUser, operatorBusinessName );

  useOnLoadingHook( onlineQuestionsLoading , onQuestionsLoadingError );

  let {
    previewMode,
    enableAddPointsToQuestionInputField,
    selectedQuestion,
    studentsCummulativePointsReceived,
    editing,
    setSelectedQuestion,
    toggleSetPreviewMode,
    addPoints,
    toggleQuestionPointField
  } = useFormFieldQuestionsHook( questionProps ); 

  let { 
    modalProps,
    toggleFormFieldSelector,
  } = useInputTypeSelectorMaxDialogHook({ setSelectedQuestion, addNewFormInputField, collection: formFieldInputCollection });

  useloadQuestionsOnUpdatedQuestionContentHook( contentUpdated );

  function addNewFormInputField( typeOfInput, uuid ){
    let props = { typeOfInput, question: previewMode?.question, uuid, currentUser, formId };
    addNewFormField( manageFormFieldCollection( addFormFieldConfig( props ) ) )
  }

  const setMissedQuestions = () => {
    console.log( '##############' )
  }

return (
    <div className="stage" id="stage">
        <div className="" id=""> 
        <div>
        {
          <> 
           <MissedQuestionComponent 
              display={ true }
              formType = { formType }
              formName = { formName }
              formId = { formId }
              setMissedQuestions={ setMissedQuestions }
            />
          <FormBuilderDashBoard 
            formUuId = { formUuId }
            previewMode = { previewMode?.isPreviewMode }
          >
            { formType !== formTypes.report &&
                <div className="points-label">
                  <label className="points-label">{'Points'}</label>
                  <DigitalClock digits={ studentsCummulativePointsReceived } /> 
                </div>
            }
            <div className="countdown-timer">
              { 
                // <CountDownTimer props={ { ...questionProps, previewMode, editing, timer, studentsCummulativePointsReceived } } />
              }
            </div>  
          </FormBuilderDashBoard>
          </>
        }
        <OnlineQuestionsMultiEditorComponent onlineQuestionProps={{ ...questionProps, previewMode, selectedQuestion, addNewFormInputField }}>
        {( element, courseId ) => {
              return <> 
              { 
               <Roles role={ currentUser?.role ===  role.Tutor && formBuilderStatus === elementMeta.state.Manage }>
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
                    form={ { formType, formName, formUuId, formId, question: element, formBuilderStatus, userId, eventId } }
                    previewMode={ previewMode }
                    modalProps={ modalProps }
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
    formBuilders: Object?.values( state?.formBuilders?.formBuilders ),
    onlineQuestions: Object.values(state?.onlineQuestions?.onlineQuestions),
    onlineQuestionsLoading: state?.onlineQuestions?.onlineQuestionsLoading,
    onQuestionsLoadingError: state?.onlineQuestions?.onQuestionsLoadingError,
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications ),
    studentsTotalPointsReceived: Object?.values( state?.formFieldAnswers?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.formName && field?.formUuId === ownProps?.formUuId && field?.userId === ownProps?.userId ),
    studentsTotalPointsReceivedFromPersistence: Object?.values( state?.formFieldPoints?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.formName && field?.formUuId === ownProps?.formUuId && field?.userId === ownProps?.userId ),
    timer: Object?.values( state?.timers?.timers )?.find( timer => timer?.formName === ownProps?.formName ),
    contentUpdated: state?.onlineQuestions?.contentUpdated
  };
};

export default connect(mapState, { saveOnlineQuestions, loadFormFieldAnswers, addNewFormField } )( FormQuestions );