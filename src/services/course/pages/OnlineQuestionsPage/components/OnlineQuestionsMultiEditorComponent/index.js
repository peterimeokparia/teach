import { 
connect } from 'react-redux';

import { 
loginUser } from 'services/course/actions/users';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 

import { 
SET_ONLINEQUESTION_MARKDOWN,
SET_EXPLANATION_ANSWER_MARKDOWN } from 'services/course/actions/onlinequestions';

import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion,
toggleContentChanged } from 'services/course/actions/onlinequestions';

import {
saveFormBuilder } from 'services/course/actions/formbuilders';

import {
getOperatorFromOperatorBusinessName,
getPushNotificationUsersByOperatorId } from 'services/course/selectors';

import {
upload_url,
uploadImageUrl,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import {
deleteQuestionIconStyle,
videoMeta } from 'services/course/pages/OnlineQuestionsPage/components/OnlineListItems/inlineStyles.js';

import {
onlineMarkDownEditorFieldCollection } from 'services/course/pages/QuestionsPage/helpers';

import {
addQuestionConfig } from 'services/course/pages/OnlineQuestionsPage/helpers';

import { 
helpIconStyle } from './inlineStyles';

import { 
role } from 'services/course/helpers/PageHelpers';

import { 
formTypes } from 'services/course/pages/FormBuilder/helpers';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
questionInputCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';

import {
getSortedRecords } from 'services/course/selectors';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import Basic from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Basic';  
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import EditorComponent from 'services/course/pages/components/EditorComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from '../../../components/SubscriptionComponent/MiniSideBarButton';
import useOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook';
import useSortOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useSortOnlineQuestionsHook';
import useInputTypeSelectorMaxDialogHook from 'services/course/pages/FormBuilder/hooks/useInputTypeSelectorMaxDialogHook';
import useloadQuestionsOnUpdatedQuestionContentHook from 'services/course/pages/OnlineQuestionsPage/hooks/useloadQuestionsOnUpdatedQuestionContentHook';
import OnlineListItems from '../OnlineListItems';
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
  addNewOnlineQuestion,
  saveOnlineQuestion,
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
    eventId } = onlineQuestionProps;

  let onlineQuestionsConfig = {
    onlineQuestionId, 
    operatorBusinessName,
    saveFormBuilder,
    formBuilders,
    formType, 
    formName,
    formUuId,
    formBuilderStatus,
    eventId,
    courseId, 
    failedOnlineQuestionNotifications, 
    currentUser, 
    pushNotificationUsers,
    toggleContentChanged,
    contentUpdated,
    onlineQuestions,
    formFields
  };

  let {
    inputValue,
    selectedQuestion,
    setSelectedQuestion,
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
  
  function addNewQuestion( typeOfInput ){

    let formQuestions = onlineQuestions?.filter( question => question?.formUuId === formUuId );

    let sortedRecords = getSortedRecords( formQuestions, 'position' );

    let sortedRecordsLength = sortedRecords?.length;

    let position = (formQuestions?.length === 0 || undefined ) ? 1 : (sortedRecords[ sortedRecordsLength-1 ]?.position)+1;
    
    let config = {
      typeOfInput,
      formId,
      formType,
      formName,
      courseId,
      formUuId, 
      onlineQuestionId,
      currentUser,
      operator,
      position
    };
  
    addNewOnlineQuestion( onlineMarkDownEditorFieldCollection( addQuestionConfig( config ) ) );

    toggleContentChanged(); 
  };
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
                      builderState={formBuilderStatus}>
                      {
                        ( element ) => {
                          return <div className={"OnlineListItems"}
                          id={ element?._id }
                        >
                          <div> 
                          <Roles role={ currentUser?.role === role.Tutor && formBuilderStatus === elementMeta.state.Manage }>
                          <div className={"sideburgerMenu"}>  
                          <span>
                          <MiniSideBarMenu question={ element } formType={formType}>
                            {( handleMouseDown, menuVisible ) => (
                              <>
                              <MiniSideBarButton
                                mouseDown={ handleMouseDown }
                                navMenuVisible={ menuVisible } 
                              />
                              <div id="sideFlyoutMenu" className={ menuVisible ? "show" : "hide" } >
                                { <Basic question={ element }/> }
                              </div>
                              </>
                            )}
                          </MiniSideBarMenu>
                          </span>  
                          </div> 
                          <span>
                            <DeleteIcon
                              style={ deleteQuestionIconStyle() }
                              className="comment-round-button-3"
                              onClick={() => deleteQuestion( element )}
                            />
                          </span> 
                          </Roles>  
                       <div className={ (formBuilderStatus === elementMeta.state.Taking ) ? 'editor-taking' : 'editor'  }>
                          {(element?.inputType === inputType.MainBodyTableColumnQuestion && 
                            previewMode?.isPreviewMode  ) &&
                           <div className="input"> 
                              <input
                                type={"text"}
                                value={ inputValue }
                                  //value={ element?.markDownContent ? element?.markDownContent : inputValue }
                                 onChange={e => handleChangedValue( e.target.value, setInputValue, { ...element, markDownContent: e.target.value }, saveOnlineQuestion ) }
                                placeholder={""}
                              />  
                           </div>
                          }
                          {(element?.inputType === inputType.MainBodyTableColumnQuestion && 
                            !previewMode?.isPreviewMode  ) &&
                              <div className=""> 
                               {element?.markDownContent }
                             </div>
                          }
                          { (element?.inputType === inputType.MainBodyQuestion) &&
                            <div>    
                              <EditorComponent
                                id={element?._id}
                                name={element?.name}
                                handleChange={(editor) => handleChange(editor,  element, "onlineQuestions", SET_ONLINEQUESTION_MARKDOWN, saveOnlineQuestion, setMarkDown)}
                                content={ element?.markDownContent }
                                upload_url={upload_url}
                                upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveOnlineQuestion ) }
                                readOnly={( currentUser?._id && element?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
                              /> 
                            { (formType !== formTypes?.report) &&
                              <div className="explanation-content"> 
                                  <EditorComponent
                                  id={element?._id}
                                  name={element?.name}
                                  handleChange={(editor) => handleChange(editor,  element, "onlineQuestions", SET_EXPLANATION_ANSWER_MARKDOWN, saveOnlineQuestion, setMarkDown)}
                                  content={ element?.answerExplanationMarkDownContent }
                                  upload_url={upload_url}
                                  upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveOnlineQuestion ) }
                                  readOnly={( currentUser?._id && element?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
                                /> 
                              </div>
                            }
                            { ( displayVideoComponent ) && 
                                < MaterialUiVideoComponent 
                                  className={"onlineQuestionVideoComponent"} 
                                  element={ element } 
                                  videoMeta={videoMeta( element )}
                                  saveRecording={saveRecording}
                                  extendedMeetingSettings={false} 
                                />
                            }
                            </div>
                            
                          }
                          {
                            children( element, courseId )
                          }
                      </div>
                          </div>
                          
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
  addNewOnlineQuestion, 
  saveOnlineQuestion, 
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