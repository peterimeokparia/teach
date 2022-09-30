import React from 'react';
import { connect } from 'react-redux';
import { addNewOnlineQuestion, toggleContentChanged, setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import { saveFormBuilder, setIsMaxQuestionDialogOpen } from 'services/course/actions/formbuilders';
import { getOperatorFromOperatorBusinessName, 
  getPushNotificationUsersByOperatorId, getOnlineQuestions, getLessonOutcomesByLessonId, getQuestionExplainerAnswers } from 'services/course/selectors';
import { helpIconStyle } from './inlineStyles';
import { role } from 'services/course/helpers/PageHelpers';
import { questionInputCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { navContent } from 'services/course/pages/components/NavigationHelper';
import MeasurableOutcome from 'services/course/pages/components/MeasurableOutcome';
import OnlineQuestionEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionEditorComponent';
import OnlineQuestionReportComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionReportComponent';
import useOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook';
import useSortOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useSortOnlineQuestionsHook';
import useExplainAnswerHook from 'services/course/pages/OnlineQuestionsPage/hooks/useExplainAnswerHook';
import useInputTypeSelectorMaxDialogHook from 'services/course/pages/FormBuilder/hooks/useInputTypeSelectorMaxDialogHook';
import useLoadQuestionsOnUpdatedQuestionContentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useLoadQuestionsOnUpdatedQuestionContentHook';
import OnlineListItems from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionDetailPage/OnlineListItems';
import HelpIcon from '@material-ui/icons/Help';
import Roles from 'services/course/pages/components/Roles';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import TemporaryDrawer from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/TemporaryDrawer';
import QuestionOutcomeComponent from 'services/course/pages/FormBuilder/FormQuestions/components/QuestionOutcomeComponent';
import ListItem from 'services/course/pages/components/ListItem';
import MenuItem from '@mui/material/MenuItem';
import MainMenu from 'services/course/pages/components/MainMenu';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Typography from '@mui/material/Typography';
import './style.css';

const OnlineQuestionsMultiEditorComponent = ( {
  onlineQuestionProps,
  updateOnDelete,
  operator,
  currentUser,  
  users,
  selectedOnlineQuestion,
  addNewOnlineQuestion,
  onSaveError,
  failedOnlineQuestionNotifications,
  pushNotificationUsers,
  toggleContentChanged,
  contentUpdated,
  formFields,
  formBuilders,
  saveFormBuilder,
  setIsMaxQuestionDialogOpen,
  onlineQuestions,
  lessonId,
  outcomes,
  currentCourseQuestions,
  isMaxQuestionDialogOpen,
  onlineQuestionProperties,
  setSelectedOnlineQuestion,
  explainAnswers,
  children  } ) => {
  let { 
    previewMode, onlineQuestionId, displayVideoComponent, formBuilderState, formBuilderStatus,
    operatorBusinessName, formType, formName, formId, formUuId, userId, eventId, outcomeId, courseId,
    linkId
    // missedQuestions 
  } = onlineQuestionProps; // fix
  
  let onlineQuestionsConfig = {
    onlineQuestionProps, onlineQuestionId, operator, operatorBusinessName, saveFormBuilder, formBuilders, formType, updateOnDelete, 
    formId, formName, formUuId, formBuilderState, formBuilderStatus, eventId, courseId, lessonId, failedOnlineQuestionNotifications, 
    currentUser, pushNotificationUsers, toggleContentChanged, addNewOnlineQuestion, contentUpdated, onlineQuestions, formFields,
    previewMode, displayVideoComponent, outcomes,  currentCourseQuestions, outcomeId, linkId, onlineQuestionProperties
  };

  if ( onSaveError ) { 
    console.warn(`problem saving onlinequestion ${onSaveError?.messsage}`);
  }
  let {
    selectedOutcomes,
    selectedQuestion, 
    isDrawerOpen, 
    displayName,
    inputValue,
    onMatchListItem,
    setIsDrawerOpen,
    updateQuestionOutcomeId,
    addNewQuestion,
    saveRecording,
    deleteQuestion,
    setInputValue,
  } = useOnlineQuestionsHook( onlineQuestionsConfig );

  let { 
    questions, 
    formBuilder
  } = useSortOnlineQuestionsHook( onlineQuestionsConfig );

  useExplainAnswerHook();

  let { 
    modalProps,
  } = useInputTypeSelectorMaxDialogHook({ addNewQuestion, isMaxDialogOpen: isMaxQuestionDialogOpen, setIsMaxDialogOpen: setIsMaxQuestionDialogOpen  });

  useLoadQuestionsOnUpdatedQuestionContentHook( contentUpdated );

  function toggleConcepts(){}

  return(
    <div className="builder"> 
        <header>
          <div className='row'>          
            <div className='col align-self-start'> 
              <MainMenu navContent={navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users} />
            </div>
            <div className='col align-self-center col-md-5 offset-md-5'> 
            <div className="form-display-name"> 
             {
               <h3>{`${ displayName }`}</h3>
             }
            </div>
            </div>
            <div className='col align-self-end'> 
                <LoginLogout
                  operatorBusinessName={operatorBusinessName}
                  user={currentUser} 
                  operator={operator}
                />
            </div>
          </div>
        </header>
          <div className="content">  
          { <TemporaryDrawer  
              anchor='right'
              setToggleDrawer={isDrawerOpen} 
            >
              <div>
              { 
              <ListItem
                collection={ outcomes.filter(outcome => outcome?.lessonId === lessonId ) }
                onMatchListItem={() => onMatchListItem}
                ul={'sidebar_list'}
                li={'sidebar_list_body'}
                path={"lessons"}
              >
              {( outcome, index ) => (
                  <QuestionOutcomeComponent 
                    outcome={outcome}
                    index={index}
                    handleOnBlur={() => toggleConcepts}
                  >
                  {( outcome ) => 
                    <HelpIcon 
                      onClick={() => { updateQuestionOutcomeId(outcome) }}
                      color="action"
                      className="comment-round-button-4"
                    /> 
                  }
                  </QuestionOutcomeComponent>  
              )}
              </ListItem>  
              }
              </div>
            </TemporaryDrawer>
          }
          <div> 
          {
            <div> 
              <MaxWidthDialog modalProps={modalProps} collection={questionInputCollection}>
              {
                ( item, index ) => {
                  return <MenuItem key={`${index}`} value={item}>{ item }</MenuItem>;
                }
              }
              </MaxWidthDialog> 
                <OnlineListItems 
                  currentCourseQuestions={questions} 
                  formBuilder={formBuilder} 
                  formName={formName} 
                  builderStatus={formBuilderStatus}
                  builderState={formBuilderState}
                >
                { ( element ) => {
                  return <div> 
                  { ( formType !== formTypes?.report ) && 
                    <OnlineQuestionEditorComponent 
                      props={{...onlineQuestionsConfig }}
                      outcomes={ outcomes.filter(outcome => outcome?.lessonId === lessonId ) }
                      element={element}
                      explainAnswer={Object.values(explainAnswers)?.find( explainer => explainer?.parentId === element?._id )}
                      selectedOnlineQuestion={selectedOnlineQuestion}
                      saveRecording={saveRecording}
                      deleteQuestion={deleteQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                    />
                  }
                  { ( formType === formTypes?.report ) &&
                    <OnlineQuestionReportComponent 
                      props={{...onlineQuestionsConfig }}
                      element={element}
                      selectedOnlineQuestion={selectedOnlineQuestion}
                      saveRecording={saveRecording}
                      deleteQuestion={deleteQuestion}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                    />
                  }
                  {
                    children( element, courseId )
                  }
                  </div>;
                  }
                }
              </OnlineListItems > 
            </div>
          }
          <div> <br></br> </div>
          {
            <Roles role={ currentUser?.role === role.Tutor && formBuilderState === elementMeta.state.Manage }>
              <span>
              <HelpIcon 
                style={helpIconStyle()}
                className="comment-round-button-11"
                onClick={() => setIsDrawerOpen( !isDrawerOpen )}
              />
              {/* { ( previewMode?.isPreviewMode &&  formType !== formTypes?.report ) &&
                  <MeasurableOutcome 
                    lessonId={ lessonId }
                    selectedQuestion={ selectedQuestion }
                  />
              } */}
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
  addNewOnlineQuestion, saveFormBuilder,
  toggleContentChanged,setIsMaxQuestionDialogOpen,
  setSelectedOnlineQuestion
};

const mapState = ( state, ownProps ) => {
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
    onlineQuestionProperties: state.onlineQuestions.onlineQuestionProperties, 
    updateOnDelete: state.onlineQuestions.updateOnDelete,
    selectedOnlineQuestion: state.onlineQuestions.selectedOnlineQuestion,
    explainAnswers: state.onlineQuestionsExplainerAnswers.onlineQuestionsExplainerAnswers
    // explainAnswers: getQuestionExplainerAnswers( state, ownProps )
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsMultiEditorComponent);