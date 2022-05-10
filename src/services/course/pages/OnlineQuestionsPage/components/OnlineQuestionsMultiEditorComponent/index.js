import 
React, { 
useState }  from 'react';

import { 
connect } from 'react-redux';

import { 
loginUser } from 'services/course/actions/users';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 

import { 
addNewOnlineQuestion,
saveOnlineQuestions,
fileUploadMeta,
loadOnlineQuestions,
deleteOnlineQuestion,
toggleContentChanged } from 'services/course/actions/onlinequestions';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';

import {
saveFormBuilder } from 'services/course/actions/formbuilders';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import { 
helpIconStyle } from './inlineStyles';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
questionInputCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import OnlineQuestionEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionEditorComponent';
import useOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook';
import useSortOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useSortOnlineQuestionsHook';
import useInputTypeSelectorMaxDialogHook from 'services/course/pages/FormBuilder/hooks/useInputTypeSelectorMaxDialogHook';
import useloadQuestionsOnUpdatedQuestionContentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useloadQuestionsOnUpdatedQuestionContentHook';
import OnlineListItems from 'services/course/pages/OnlineQuestionsPage/components/OnlineListItems';
import HelpIcon from '@material-ui/icons/Help';
import Roles from 'services/course/pages/components/Roles';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import MenuItem from '@mui/material/MenuItem';
import './style.css';

const OnlineQuestionsMultiEditorComponent = ( {
  onlineQuestionProps,
  operator,
  currentUser,  
  users,
  inputFieldOptions,
  fileUploadMeta,
  addNewOnlineQuestion,
  saveOnlineQuestions,
  saveEditorMarkDownObjectToMw,
  onSaveError,
  failedOnlineQuestionNotifications,
  pushNotificationUsers,
  setMarkDown,
  toggleContentChanged,
  contentUpdated,
  formFields,
  formBuilders,
  loadOnlineQuestions,
  deleteOnlineQuestion,
  onlineQuestion,
  saveFormBuilder,
  onlineQuestions,
  latestQuestion,
  loginUser,
  children  } ) => {

  let { 
    courseId, 
    previewMode,
    onlineQuestionId, 
    operatorBusinessName, 
    displayVideoComponent, 
    formType, 
    formName,
    formId,
    formUuId,
    userId,
    formBuilderStatus,
    eventId,
    missedQuestions,
    addNewFormInputField } = onlineQuestionProps;

  let onlineQuestionsConfig = {
    onlineQuestionId,
    operator, 
    operatorBusinessName,
    saveFormBuilder,
    formBuilders,
    formType, 
    formId,
    formName,
    formUuId,
    formBuilderStatus,
    eventId,
    courseId, 
    failedOnlineQuestionNotifications, 
    currentUser, 
    pushNotificationUsers,
    toggleContentChanged,
    addNewOnlineQuestion,
    contentUpdated,
    onlineQuestions,
    formFields,
    previewMode,
    displayVideoComponent
  };

  if ( onSaveError ) { 
    console.warn(`problem saving onlinequestion ${onSaveError?.messsage}`);
  }

  let {
    inputValue,
    selectedQuestion, 
    setSelectedQuestion,
    addNewQuestion,
    saveRecording,
    deleteQuestion,
    setInputValue,
  } = useOnlineQuestionsHook( onlineQuestionsConfig );

  let { 
    questions, 
    formBuilder
  } = useSortOnlineQuestionsHook( onlineQuestionsConfig );

  let { 
    modalProps,
    setIsMaxDialogOpen, 
  } = useInputTypeSelectorMaxDialogHook({ addNewQuestion, selectedQuestion, setSelectedQuestion, collection: questionInputCollection  });

  useloadQuestionsOnUpdatedQuestionContentHook( contentUpdated );
  
  return(
    <div className="builder"> 
        <header>
        </header>
          <div className="content">  
          {
            <div className="sidebar">
              <div className="input-field-builder-selector"> 
              <div className="input-field-builder-selector-content"> 
              <div className="top">
              <h3> { formBuilders?.find( form => form?.formName === formName )?.formDisplayName } </h3>
              </div>
              <h3>  { users?.find( user => user?._id === userId )?.firstname } </h3>
              </div>
              </div>
            </div>
          }
          <div> 
          {
            <div className={ `onlinequestion-list-items-taking`  }> 
              <MaxWidthDialog modalProps={modalProps}>
              {
                ( item ) => {
                  return <MenuItem value={item}>{ item }</MenuItem>
                }
              }
              </MaxWidthDialog>   
                <OnlineListItems 
                  currentCourseQuestions={questions} 
                  formBuilder={formBuilder} 
                  formName={formName} 
                  builderState={formBuilderStatus}
                >
                { ( element ) => {
                  return <div> 
                  {
                    <OnlineQuestionEditorComponent 
                      props={onlineQuestionsConfig}
                      element={element}
                      saveRecording={saveRecording}
                      deleteQuestion={deleteQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                    />
                  }
                  {
                    children( element, courseId )
                  }
                  </div>
                  }
                }
              </OnlineListItems > 
            </div>
          }
          <div> <br></br> </div>
          {
            <Roles role={ currentUser?.role === role.Tutor && formBuilderStatus === elementMeta.state.Manage }>
              <span>
              <HelpIcon 
                style={helpIconStyle()}
                className="comment-round-button-4"
                onClick={() => setIsMaxDialogOpen( true )}
              />
              </span>
            </Roles>
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
  fileUploadMeta,
  addNewOnlineQuestion, 
  saveOnlineQuestions, 
  saveEditorMarkDownObjectToMw,
  loadOnlineQuestions, 
  deleteOnlineQuestion, 
  setMarkDown,
  saveFormBuilder,
  toggleContentChanged
};

const mapState = ( state, ownProps ) => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: Object.values( state.users.users ),
    currentUser: state.users.user,
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
    onSaveError: state.onlineQuestions.onSaveError,
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications ),
    courses: Object.values( state?.courses?.courses ),
    contentUpdated: state?.onlineQuestions?.contentUpdated,
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
    formFields: Object.values(state.formFields.formFields).filter( field => field?.formId === ownProps?.onlineQuestionProps?.courseId),
    formBuilders: Object?.values( state?.formBuilders?.formBuilders )
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsMultiEditorComponent);