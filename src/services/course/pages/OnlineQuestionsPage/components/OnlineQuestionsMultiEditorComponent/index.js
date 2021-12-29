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
loadSubscribedPushNotificationUserByUserId,  
sendPushNotificationMessage,  
retryPushNotificationMessage,
loadSubscribedPushNotificationUsers, 
subscribePushNotificationUser,
savePushNotificationUser } from 'services/course/actions/notifications';

import { 
addNewOnlineQuestion,
saveOnlineQuestion,
loadOnlineQuestions,
deleteOnlineQuestion,
toggleContentChanged } from 'services/course/actions/onlinequestions';

import {
onlineMarkDownEditorFieldCollection } from 'services/course/pages/QuestionsPage/helpers';

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
helpIconStyle } from './inlineStyles';

import { 
role } from 'services/course/helpers/PageHelpers';

import Basic from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper/formTypeSelector/Basic';  
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import EditorComponent from 'services/course/pages/components/EditorComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from '../../../components/SubscriptionComponent/MiniSideBarButton';
import useOnlineQuestionsHook from 'services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook';
import OnlineListItems from '../OnlineListItems';
import HelpIcon from '@material-ui/icons/Help';
import Roles from 'services/course/pages/components/Roles';
import './style.css';

const OnlineQuestionsMultiEditorComponent = ( {
  onlineQuestionProps,
  operator,
  currentUser,  
  inputFieldOptions,
  addNewOnlineQuestion,
  saveOnlineQuestion,
  failedOnlineQuestionNotifications,
  pushNotificationUsers,
  setMarkDown,
  toggleContentChanged,
  contentUpdated,
  formFields,
  savePushNotificationUser,
  loadOnlineQuestions,
  deleteOnlineQuestion,
  loadSubscribedPushNotificationUsers,
  subscribePushNotificationUser,
  loadSubscribedPushNotificationUserByUserId,
  sendPushNotificationMessage,
  retryPushNotificationMessage,
  onlineQuestion,
  onlineQuestions,
  latestQuestion,
  loginUser,
  children  } ) => {

  let { 
    courseId, 
    onlineQuestionId, 
    operatorBusinessName, 
    currentCourseQuestions, 
    displayVideoComponent, 
    formType, 
    formName,
    formId,
    formUuId } = onlineQuestionProps;

  let onlineQuestionsConfig = {
    onlineQuestionId, 
    currentCourseQuestions,
    operatorBusinessName,
    formType, 
    formName,
    formUuId,
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
    questions,
    saveRecording,
    deleteQuestion,
  } = useOnlineQuestionsHook( onlineQuestionsConfig );

const addNewQuestion = () => {

  let config = {  
    formId,
    formType,
    formName,
    courseId,
    formUuId, 
    onlineQuestionId,
    userId: currentUser?._id, 
    questionCreatedBy: ( currentUser?._id ) ? ( currentUser?.firstname ) : 'anonymous', 
    operator: operator?._id,
    inputFieldOptions, 
    placeHolder: null,
    explanationPlaceHolder: "Explain answer and any concepts.",
    pointsAssigned: 0,
    pointsReceived: 0, 
    videoUrl: null,
    xAxisformQuestionPosition: 100,
    yAxisformQuestionPosition: 100,
    xAxisColumnPosition: 100,
    yAxisColumnPosition: -4,
    columnMinWidth: 100,
    columnMinHeight: 10,
    columnAlign: 'left',
  };

  addNewOnlineQuestion( onlineMarkDownEditorFieldCollection( config ) );
  toggleContentChanged(); 
}; 

return(
    <div className="builder"> 
        <header>
        </header>
          <div className="content">  
                {
                  <div className="sidebar">
                      <div className="input-field-builder-selector"> </div>
                  </div>
                }
                <div> 
                {
                  <div className="onlinequestion-list-items"> 
                    <OnlineListItems currentCourseQuestions={questions}>
                      {
                        ( element ) => {
                          return <div className={"OnlineListItems"}
                          id={ element?._id }
                        >
                          <div> 
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
                          <Roles role={ currentUser?.role === role.Tutor } >
                          <span>
                            <DeleteIcon
                              style={ deleteQuestionIconStyle() }
                              className="comment-round-button-3"
                              onClick={() => deleteQuestion( element )}
                            />
                          </span> 
                          </Roles>  
                            <EditorComponent
                              id={element?._id}
                              name={element?.name}
                              handleChange={(editor) => handleChange(editor,  element, "onlineQuestions", SET_ONLINEQUESTION_MARKDOWN, saveOnlineQuestion, setMarkDown)}
                              content={ element?.markDownContent }
                              upload_url={upload_url}
                              upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveOnlineQuestion ) }
                              readOnly={( currentUser?._id && element?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
                            /> 
                            <EditorComponent
                              id={element?._id}
                              name={element?.name}
                              handleChange={(editor) => handleChange(editor,  element, "onlineQuestions", SET_EXPLANATION_ANSWER_MARKDOWN, saveOnlineQuestion, setMarkDown)}
                              content={ element?.answerExplanationMarkDownContent }
                              upload_url={upload_url}
                              upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveOnlineQuestion ) }
                              readOnly={( currentUser?._id && element?.userId === currentUser?._id && currentUser?.role === role.Tutor) ? false : true}
                            /> 
                            { ( displayVideoComponent ) && 
                                < MaterialUiVideoComponent 
                                  className={"onlineQuestionVideoComponent"} 
                                  element={ element } 
                                  videoMeta={videoMeta( element )}
                                  saveRecording={saveRecording}
                                  extendedMeetingSettings={false} 
                                />

                            }
                            {
                              children( element, courseId )
                            }
                          </div>
                        </div>

                        }
                        
                      }

                    </OnlineListItems > 
                  </div>
                }
                <div> <br></br> </div>
                {
                  <Roles role={ currentUser?.role === role.Tutor } >
                    <span>
                      <HelpIcon 
                        style={helpIconStyle()}
                        className="comment-round-button-4"
                        onClick={() => addNewQuestion()}
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
  sendPushNotificationMessage, 
  retryPushNotificationMessage, 
  subscribePushNotificationUser, 
  savePushNotificationUser, 
  loadSubscribedPushNotificationUsers, 
  loadSubscribedPushNotificationUserByUserId,
  setMarkDown
};

const mapState = ( state, ownProps ) => {
  return {
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    currentUser: state.users.user,
    onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
    latestQuestion: state.onlineQuestions.latestOnlineQuestions,
    pushNotificationUsers: getPushNotificationUsersByOperatorId(state, ownProps),
    failedOnlineQuestionNotifications: Object.values( state?.failedNotifications.failedPushNotifications ),
    courses: Object.values( state?.courses?.courses ),
    contentUpdated: state?.onlineQuestions?.contentUpdated,
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
    formFields: Object.values(state.formFields.formFields).filter( field => field?.formId === ownProps?.onlineQuestionProps?.courseId)
  };
};

export default connect( mapState, mapDispatch )(OnlineQuestionsMultiEditorComponent);