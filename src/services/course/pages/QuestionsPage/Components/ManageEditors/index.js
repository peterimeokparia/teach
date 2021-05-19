import 
React, { 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewOnlineAnswer,
saveOnlineAnswer,
loadOnlineAnswers,
deleteOnlineAnswer,
setMarkDown } from 'Services/course/Actions/OnlineAnswers';

import {
saveMarkDownContent } from 'Services/course/helpers/EditorHelpers'; 

import {
manageEditorsFieldCollection,
manageCommentsFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import { 
getSelectedOnlineAnswersByCourseId } from 'Services/course/Selectors';

import {
placeHolder,    
homeWorkAnswerPlaceHolder,    
commentsPlaceHolder } from 'Services/course/helpers/EditorHelpers';

import {
elementMeta,
editorContentType } from 'Services/course/Pages/QuestionsPage/helpers';

import {
plusOneIconStyle,
iconStyleMain,
iconStyle,
onlineAnswerVideoDeleteIconStyle,
saveIconStyle } from './inlineStyles';

import OnlineQuestionVideoComponent from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionVideoComponent';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import NavLinks from 'Services/course/Pages/Components/NavLinks';
import EditorComponent  from '../EditorComponent';
import Comments  from '../Comments';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";
import './style.css';

const ManageEditors = ({ 
    config,
    operatorBusinessName,
    courseId,
    currentUser,
    currentUsers,
    questionId,
    addNewOnlineAnswer,
    saveOnlineAnswer,
    loadOnlineAnswers,
    onlineAnswers,
    deleteOnlineAnswer,
    setMarkDown,
    children }) => {

  const [ videoUploaded, setVideoUploaded ] = useState( false );

  let answers = onlineAnswers?.filter(answers => answers?.onlineQuestionId === questionId);

  const addNewEditor = () => {
    let config = {
      onlineQuestionId: questionId,
      type: "",
      placeHolder: homeWorkAnswerPlaceHolder,
      courseId,    
      userId: currentUser?._id,
      files: [],
      answerBy: currentUser?.firstname,
      videoUrl: ""
    }
    addNewOnlineAnswer( manageEditorsFieldCollection( config ) );
  }; 
  
  const onhandleSelected = ( selected ) => {
    deleteOnlineAnswer( selected );
  };

 let answerHandleChangeTimerHandle = null, timeOutDuration = 5000;
  const handleChange = ( editor, answer ) => {
    saveMarkDownContent( 
      answerHandleChangeTimerHandle, 
      saveOnlineAnswer,
      answer,
      JSON.stringify( editor.emitSerializedOutput() ),
      `${answer?._id}`,
      timeOutDuration
    );     
  }

function setRecordingCompletionStatus( videoUploaded, id ){
  if ( videoUploaded ) {
     setVideoUploaded( videoUploaded );
  }
}

const handleSubmit = () => {
  // if ( previewMode && videoUploaded ) { // change for video upload
  //     togglePreviewMode();  
  if ( videoUploaded ) {     
      loadOnlineAnswers(); 
  } else {
    // if ( savedQuestionsExist( currentCourseQuestions ) ) {
    //     saveOnlineQuestion( { ...currentCourseQuestions } ); // change
    // } 
  }   
}

let deleteVideo = ( selectedAnswer ) => {
  saveOnlineAnswer( selectedAnswer )
}

let onlineVideoConfig = ( element, hasRecordingStarted ) => {
  return {
    videoUploaded: config?.videoUploaded,
    saveRecording: config?.saveRecording,
    handleSubmit: config?.handleSubmit,
    setRecordingCompletionStatus: config?.setRecordingCompletionStatus,
    deleteVideo: deleteVideo,
    deleteIconStyle: onlineAnswerVideoDeleteIconStyle,
    saveIconStyle: saveIconStyle,
    hasRecordingStarted: false,
    videoNamePrefix: 'OnlineAnswersVideoMarkDownEditors',
    recordButtonText: 'Record Answer',
    displayMaterialButton: true,
    videoSectionClassName: ( hasRecordingStarted ) ? "answerVideoSection-recording" : "answerVideoSection-recordingStopped",
    videoClassName: ( element?.videoUrl === "" || element?.videoUrl === undefined ) ? "" : "",
    deleteVideo: () => deleteVideo( element )
  }
}

return (
  <div className=""> 
      <div>
          { answers?.map( element => (
              <>
              {(answers?.length > 0) && 
                <div className="answerCard"> 
                  <EditorComponent
                    className={"answerDisplay"}
                    key={ element?._id }
                    id={ element?._id }
                    name={ element?.name } 
                    onChange={(editor) => handleChange(editor, element )}
                    content={JSON.parse( element?.markDownContent ) }
                    upload_url={config.upload_url}
                    upload_handler={( file, imageBlock ) => config?.uploadImageUrl( file, imageBlock )}
                    // upload_handler={( file, imageBlock ) => config?.uploadImageUrl( file, imageBlock, editors?.length )}
                    readOnly={ false }
                    // readOnly={config.previewMode? true : false }
                  /> 
                <div className={'userBio'}>
                {
                  <div className="moreInfo"> 
                    <div> 
                      <div className="row"> 
                      <div className="answerVideoSub"> 
                      <span className=""> </span>
                      <span className="col"> </span>
                      <span className="onlineQuestionVideoComponent"> 
                        <OnlineQuestionVideoComponent element={element} config={onlineVideoConfig( element, false )}/>
                          {/* <img className="" src={currentUsers?.find(_user => _user?._id === element?.userId)?.avatarUrl} width="80" height="70"  alt="profile picture"/>                                         */}
                      </span>
                      </div>

                      </div>
                      <div className="row">
                          <div className="userBioSub">
                            <span className="col-1"> 
                                <img className="" src={currentUsers?.find(_user => _user?._id === element?.userId)?.avatarUrl} width="80" height="70"  alt="profile picture"/>                                        
                            </span>
                                <span className="col-1"> 
                                  <CalendarTodayIcon
                                      style={iconStyleMain()}
                                      className="round-button-3"
                                      //onClick={() => gotToCalendar(singleUser)}
                                  />
                                </span>
                            </div>
                      </div>
                      <div className="comment"> 
                          { <span>{` Answered by ${currentUsers?.find(_user => _user?._id === element?.userId)?.firstname} on ${  moment( element?.answerDateTime ).local() }`} </span>}
                      </div>
                      </div> 
                    </div>
                }
                  </div>
                  </div>    
              }
                {
                  <span key={element?._id}>
                      <DeleteIcon 
                          style={iconStyle()}
                          className="comment-round-button-3"
                          onClick={() => onhandleSelected( element )}
                      />
                  </span>
                }
                {
                    children( element )
                }
              </>
              )) 
          }
        </div>
        <div>
            <PlusOneIcon 
                style={plusOneIconStyle()}
                className="comment-round-button-2"
                onClick={() => addNewEditor()}
            />
        </div>   
  </div>  
  );
  }

  const mapState = ( state, ownProps ) => { 
    return {
      currentUser: state.users.user,
      currentUsers: Object.values( state.users.users ),
      onlineAnswers: getSelectedOnlineAnswersByCourseId(state, ownProps),
      onlineQuestions:  Object.values( state.onlineQuestions.onlineQuestions ),
      latestQuestion: state.onlineQuestions.latestOnlineQuestions
    }
  }

 export default connect(mapState, { addNewOnlineAnswer, saveOnlineAnswer, loadOnlineAnswers, setMarkDown, deleteOnlineAnswer })(ManageEditors);
