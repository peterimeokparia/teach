import React from 'react';

import { 
connect } from 'react-redux';

import { 
saveOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import {
elementMeta,  
editorContentType } from 'Services/course/Pages/QuestionsPage/helpers';

import {
homeWorkAnswerPlaceHolder } from 'Services/course/helpers/EditorHelpers';

import { 
videoCallIconMain,
videoCallIcon,
shareScreenIcon,
exitVideoCallIcon,  
deleteQuestionIconStyle,  
onlineQuestionVideoDeleteIconStyle, 
saveQuestionIconStyle,
saveIconStyle } from './inlineStyles';

import {
handleAddPushNotificationSubscriptionToEntity,
handleEmailNotificationSubscriptionToEntity,
handleSavingEntityAction } from 'Services/course/Pages/Components/SubscriptionComponent/MiniSideBarMenu/helper';

import EditorComponent from 'Services/course/Pages/Components/EditorComponent';
import AnswerComponent from 'Services/course/Pages/QuestionsPage/Components/AnswerComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import MiniSideBarMenu from 'Services/course/Pages/Components/SubscriptionComponent/MiniSideBarMenu';
import OnlineQuestionVideoComponent from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionVideoComponent';
import MiniSideBarButton from '../../../Components/SubscriptionComponent/MiniSideBarButton';
import './style.css';

const OnlineListItems = ({ 
  config, 
  courseId,
  saveOnlineQuestion,
  currentUser }) => {
  if ( config?.form === undefined ) {
    return  ( <> <div> </div> </>);
  } 

  let manageEditorConfig = ( element ) => { 
    return {
      ...config, 
      questionNumber: element?.id, 
      courseId: courseId, 
      onlineQuestionId: config?.onlineQuestionId,
      editorContentType: editorContentType.Explanation, 
      fieldName: elementMeta.explanationAnswerCollection, 
      placeHolder: null,
      // placeHolder: homeWorkAnswerPlaceHolder,
      currentQuestion: element
  }; };

  let deleteVideo = ( selectedQuestion ) => {
    saveOnlineQuestion( selectedQuestion );
  };
 
  let onlineVideoConfig = ( element ) => {
    return {
      videoUploaded: config?.videoUploaded,
      saveRecording: config?.saveRecording,
      handleSubmit: config?.handleSubmit,
      setRecordingCompletionStatus: config?.setRecordingCompletionStatus,
      deleteVideo: deleteVideo,
      videoCallIconMain,
      videoCallIcon,
      shareScreenIcon,
      exitVideoCallIcon,
      deleteIconStyle: onlineQuestionVideoDeleteIconStyle,
      saveIconStyle: saveIconStyle,
      videoNamePrefix: 'OnlineQuestionVideoMarkDownEditors', 
      recordButtonText: 'Record Question',
      displayMaterialButton: true,
      videoSectionClassNameRecording: "mainVideoSection-recording",
      videoSectionClassNameRecordingStopped: "mainVideoSection-recordingStopped",
      videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
      videoClassName: ( element?.videoUrl === ""  ) ? "videoPlayer" : "",
      exitVideoCallIconPageName: "OnlineListItems",
      videoSectionCallOut: "videoSectionCallOut"
    };
  };

  return config?.form?.map((element) => (
    <>
      <div className={"OnlineListItems"}
        id={ element?._id }
        key={ element?._id }
      >
        <div> 
        <span>
          <MiniSideBarMenu 
            element={ element }
            key={ element?._id }
            currentUser={ currentUser }
            question={ element }
            pushNotificationsEnabled={ element?.questionPushNotificationSubscribers?.includes( currentUser?._id ) || element?.userId === currentUser?._id }
            emailNotificationsEnabled={ element?.questionEmailNotificationSubscribers?.includes( currentUser?._id )  }  
            entitySavedEnabled={ element?.savedQuestions?.includes( currentUser?._id ) }
            handleAddPushNotificationSubscription={() => handleAddPushNotificationSubscriptionToEntity( element, element?.questionPushNotificationSubscribers, currentUser,  saveOnlineQuestion, 'questionPushNotificationSubscribers'  )}
            handleEmailNotificationSubscription={() => handleEmailNotificationSubscriptionToEntity( element, element?.questionEmailNotificationSubscribers, currentUser,  saveOnlineQuestion, 'questionEmailNotificationSubscribers' )}
            handleSaving={() => handleSavingEntityAction( element, element?.savedQuestions, currentUser,  saveOnlineQuestion, 'savedQuestions' ) }
          >
            {( key, handleMouseDown, menuVisible ) => (
              <MiniSideBarButton
                key={ key }
                mouseDown={ handleMouseDown }
                navMenuVisible={ menuVisible } 
              />
            )}
            </MiniSideBarMenu>
        </span>   
        <span>
        <SaveIcon
          style={saveQuestionIconStyle()} saveQuestionIconStyle
          className="comment-round-button-4"
          onClick={() => config.deleteQuestion( element )}
        />
         <DeleteIcon
            style={ deleteQuestionIconStyle() }
            className="comment-round-button-3"
            onClick={() => config.deleteQuestion( element )}
          />
        </span> 
          <EditorComponent
            className={"answerDisplay"}
            key={element?._id}
            id={element?._id}
            name={element?.name}
            //onChange={(editor) => config?.handleChange( editor, element )}
            //content={ JSON.parse( element?.markDownContent ) }
            upload_url={config.upload_url}
            upload_handler={( file, imageBlock ) => config?.uploadImageUrl( file, imageBlock, element?.id )}
            readOnly={config.previewMode? true : false }
          /> 
          < OnlineQuestionVideoComponent
              element={ element }
              config={ onlineVideoConfig( element ) } 
          />
          < AnswerComponent 
              config={ manageEditorConfig( element ) } 
              questionId={ element?._id }
              operatorId={ config?.operator?._id }
              courseId={ courseId }
              currentUser={ currentUser }
          />
        <div className="question-card-top-right">
        {/* <div>
          <DeleteIcon
              style={ deleteQuestionIconStyle() }
              className="comment-round-button-3"
              onClick={() => config.deleteQuestion( element )}
          />
          <DeleteIcon
            style={ saveQuestionIconStyle() }
            className="comment-round-button-3"
            onClick={() => config.deleteQuestion( element )}
          />
        </div>           */}
        </div>
        </div>
      </div>
      </>
  ));
};

const mapState = ( state, ownProps ) => {
  return {
    courses: Object.values( state?.courses?.courses ),
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted
  };
};

export default connect( mapState, { saveOnlineQuestion } )( OnlineListItems );