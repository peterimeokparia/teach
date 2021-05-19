import 
React, {
useState } from 'react';

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
deleteQuestionIconStyle,  
onlineQuestionVideoDeleteIconStyle, 
saveIconStyle } from './inlineStyles';

import EditorComponent from 'Services/course/Pages/QuestionsPage/Components/EditorComponent';
import VideoComponent from 'Services/course/Pages/QuestionsPage/Components/VideoComponent';
import AnswerComponent from 'Services/course/Pages/QuestionsPage/Components/AnswerComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import MiniSideBarMenu from 'Services/course/Pages/OnlineQuestionsPage/Components/MiniSideBarMenu';
import OnlineQuestionVideoComponent from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionVideoComponent';
import './style.css';

const OnlineListItems = ({ 
  config, 
  courseId,
  saveOnlineQuestion,
  hasRecordingStarted, 
  currentUser }) => {

  if ( config?.form === undefined ) {
    return  ( <> <div> </div> </>)
  } 

  let manageEditorConfig = ( element ) => { 
    return {
      ...config, 
      questionNumber: element?.id, 
      courseId: courseId, 
      onlineQuestionId: config?.onlineQuestionId,
      editorContentType: editorContentType.Explanation, 
      fieldName: elementMeta.explanationAnswerCollection, 
      placeHolder: homeWorkAnswerPlaceHolder,
      currentQuestion: element
  }}

  let deleteVideo = ( selectedQuestion ) => {
    saveOnlineQuestion( selectedQuestion )
  }
  
  let onlineVideoConfig = ( element, hasRecordingStarted ) => {
    return {
      videoUploaded: config?.videoUploaded,
      saveRecording: config?.saveRecording,
      handleSubmit: config?.handleSubmit,
      setRecordingCompletionStatus: config?.setRecordingCompletionStatus,
      deleteVideo: deleteVideo,
      deleteIconStyle: onlineQuestionVideoDeleteIconStyle,
      saveIconStyle: saveIconStyle,
      hasRecordingStarted: hasRecordingStarted,
      videoNamePrefix: 'OnlineQuestionVideoMarkDownEditors',
      recordButtonText: 'Record Question',
      displayMaterialButton: true,
      videoSectionClassName: ( hasRecordingStarted ) ? "videoSection-recording" : "videoSection-recordingStopped",
      videoClassName: ( element?.videoUrl === ""  ) ? "videoPlayer" : "",
      deleteVideo: () => deleteVideo( element )
    }
  }
  return config?.form?.map((element) => (
    <> 
    {/* https://www.google.com/search?client=firefox-b-1-d&q=receive+push+notification+material+ui+icon */}
        <div className={"onlineListItemMultipleChoiceQuestion"}
          id={ element?._id }
          key={ element?._id }
        >
          <label className={"labelQuestion"}>
            <br></br>               
          </label>
        <div> 
        <span>
          <MiniSideBarMenu 
            element={ element }
            key={ element?._id }
            currentUser={ currentUser }
            question={ element }
          />
        </span>   
        <span >
        <DeleteIcon
          style={deleteQuestionIconStyle()}
          className="comment-round-button-3"
          onClick={() => config.deleteQuestion( element )}
        />
        </span>
          <EditorComponent
            className={"answerDisplay"}
            key={element?._id}
            id={element?._id}
            name={element?.name}
            onChange={(editor) => config?.handleChange( editor, element )}
            content= { JSON.parse( element?.markDownContent ) }
            upload_url={config.upload_url}
            upload_handler={( file, imageBlock ) => config?.uploadImageUrl( file, imageBlock, element?.id )}
            readOnly={config.previewMode? true : false }
          /> 
        {/* <div 
          onClick={() => setSelectedQuestion(  element )} 
        >
          <div className={ ( element?.videoUrl === ""  ) ? "videoPlayer" : ""}>
            <video
              className={ ( element?.videoUrl === "" ) ? "videoPlayer" : ""}
              src={element?.videoUrl}
              autoPlay={false}
              controls
            >
            </video>
          </div>
          <div> 
          <span>
            <VideoComponent
                key={ element?._id }
                id={ element?._id }
                name={element?._id}
                displayMaterialButton={true}
                videoSectionClassName={ ( hasRecordingStarted ) ? "videoSection-recording" : "videoSection-recordingStopped" }
                recordButtonText={'Record Question'}
                objectId={ element?._id }
                videoMetaData={{inputFieldId: element?._id, currentQuestion: element} }
                videoMetaDataExternalId={'name'}
                videoNamePrefix={"OnlineQuestionVideoMarkDownEditors"}
                videoName={`${element?._id}_${element?._id}_${element?._id}_${element?.type}`}
                setRecordingCompletionStatus={status => config?.setRecordingCompletionStatus( status, element?._id )}
                handleSubmit={config?.handleSubmit}
            />
          </span>
          <span>
          { ( element?.videoUrl !== "") &&     
            <span 
                key={element?._id}
                id={ element?._id }
                name={element?._id}
            >
              <DeleteIcon 
                style={deleteIconStyle(  hasRecordingStarted, element?._id, markDownContent?._id  )}
                className="comment-round-button-3"
                onClick={() => deleteVideo( { ...element, videoUrl: "" } )}
              />
            </span>
          }
          </span>
          { config?.videoUploaded  && 
            <span
              key={element?._id}
              id={ element?._id }
              name={element?._id}
            >
              <SaveIcon
                style={saveIconStyle( element?._id, markDownContent?._id )} 
                onClick={ config?.saveRecording }
              />
            </span>
          }
          </div>
        </div> */}
          < OnlineQuestionVideoComponent
              element={ element }
              config={ onlineVideoConfig( element, hasRecordingStarted ) } 
          />
          < AnswerComponent 
              config={ manageEditorConfig( element ) } 
              questionId={ element?._id }
              operatorId={ config?.operator?._id }
              courseId={ courseId }
              currentUser={ currentUser }
          />
        </div>
      </div>
      </>
  ))
}

const mapState = ( state, ownProps ) => {
  return {
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted
  }
}

export default connect( mapState, { saveOnlineQuestion } )( OnlineListItems );