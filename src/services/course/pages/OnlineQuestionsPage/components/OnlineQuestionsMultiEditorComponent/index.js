import React from 'react';
import { connect } from 'react-redux';
import { helpIconStyle } from './inlineStyles';
import { role } from 'services/course/helpers/PageHelpers';
import { questionInputCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { mapState, mapDispatch } from './connector';
import Header from 'services/course/pages/components/Header';
import MeasurableOutcome from 'services/course/pages/components/MeasurableOutcome';
import OnlineQuestionEditorComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionEditorComponent';
import OnlineQuestionReportComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionReportComponent';
import useOnlineQuestionOutcomeHook from 'services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionOutcomeHook';
import useOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook'; 
import useSortOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useSortOnlineQuestionsHook';
import useExplainAnswerHook from 'services/course/pages/OnlineQuestionsPage/hooks/useExplainAnswerHook';
import useInputTypeSelectorMaxDialogHook from 'services/course/pages/FormBuilder/hooks/useInputTypeSelectorMaxDialogHook';
import useLoadQuestionsOnUpdatedQuestionContentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useLoadQuestionsOnUpdatedQuestionContentHook';
import OnlineListItems from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionDetailPage/OnlineListItems';
import HelpIcon from '@material-ui/icons/Help';
import Roles from 'services/course/pages/components/Roles';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import OnlineQuestionsOutcomeComponent from 'services/course/pages/OnlineQuestionsPage/components/OnlineQuestionsMultiEditorComponent/OnlineQuestionEditorComponent/components/OnlineQuestionsOutcomeComponent';
import MenuItem from '@mui/material/MenuItem';
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
  children  }) => {
  let { 
    previewMode, onlineQuestionId, displayVideoComponent, formBuilderState, formBuilderStatus,
    operatorBusinessName, formType, formName, formId, formUuId, eventId, outcomeId, courseId,
    linkId, missedQuestions } = onlineQuestionProps;
  
  let onlineQuestionsConfig = {
    onlineQuestionProps, onlineQuestionId, operator, operatorBusinessName, saveFormBuilder, formBuilders, formType, updateOnDelete, 
    formId, formName, formUuId, formBuilderState, formBuilderStatus, eventId, courseId, lessonId, failedOnlineQuestionNotifications, 
    currentUser, pushNotificationUsers, toggleContentChanged, addNewOnlineQuestion, contentUpdated, onlineQuestions, formFields,
    previewMode, displayVideoComponent, outcomes, currentCourseQuestions, outcomeId, linkId, onlineQuestionProperties
  };

  let {
    verifyOutcome, updateQuestionOutcomeId, toggleConcepts
  } = useOnlineQuestionOutcomeHook( onlineQuestionsConfig );

  let {
    selectedQuestion, isDrawerOpen, displayName, inputValue, setQuestionOutcome,
    addNewQuestion, saveRecording, deleteQuestion, setInputValue, onMatchListItem, setIsDrawerOpen
  } = useOnlineQuestionsHook( { ...onlineQuestionsConfig, verifyOutcome } );

  let { 
    questions, formBuilder
  } = useSortOnlineQuestionsHook( onlineQuestionsConfig );

  useExplainAnswerHook();

  let { 
    modalProps
  } = useInputTypeSelectorMaxDialogHook({ addNewQuestion, isMaxDialogOpen: isMaxQuestionDialogOpen, setIsMaxDialogOpen: setIsMaxQuestionDialogOpen  });

  useLoadQuestionsOnUpdatedQuestionContentHook( contentUpdated );

  if ( onSaveError ) console.warn(`problem saving onlinequestion ${onSaveError?.messsage}`);
  
  return(
    <div className="builder"> 
      <Header operatorBusinessName={ operatorBusinessName }> 
        {( displayName ) &&
          <div className='col align-self-center col-md-5 offset-md-5'> 
            <div className="form-display-name"> <h3>{`${ displayName }`}</h3> </div>
          </div>
        }   
      </Header>
      <div className="content">  
        { 
          <OnlineQuestionsOutcomeComponent 
            onlineQuestionsConfig={onlineQuestionsConfig}
            isDrawerOpen={isDrawerOpen}
            onMatchListItem={onMatchListItem}
            setIsDrawerOpen={setIsDrawerOpen}
            setQuestionOutcome={setQuestionOutcome}
            toggleConcepts={toggleConcepts}
            updateQuestionOutcomeId={updateQuestionOutcomeId}
          />
        }
        <div> 
        {
          <div> 
          <MaxWidthDialog modalProps={modalProps} collection={questionInputCollection}>
            {( item, index ) => {
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
        {
          <Roles role={ currentUser?.role === role.Tutor && formBuilderState === elementMeta.state.Manage }>
          <span>
          import HelpIcon from '@material-ui/icons/Help';
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
  </div>
  </div>
  </div> 
  );
};

export default connect( mapState, mapDispatch )(OnlineQuestionsMultiEditorComponent);