import 
React, { 
useState,
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewOnlineAnswer,
saveOnlineAnswer,
loadOnlineAnswers,
deleteOnlineAnswer,
setMarkDown } from 'Services/course/Actions/OnlineAnswers';

import { 
navigate } from '@reach/router';

import {
saveMarkDownContent } from 'Services/course/helpers/EditorHelpers'; 

import {
manageEditorsFieldCollection } from 'Services/course/Pages/QuestionsPage/helpers';

import { 
getSelectedOnlineAnswersByCourseId } from 'Services/course/Selectors';

import {  
homeWorkAnswerPlaceHolder } from 'Services/course/helpers/EditorHelpers';

import {
videoCallIcon,
exitVideoCallIcon,
shareScreenIcon,
plusOneIconStyle,
iconStyleMain,
iconStyle,
videoCallIconMain,
onlineAnswerVideoDeleteIconStyle,
saveIconStyle,
editorSaveIconStyle 
} from './inlineStyles';

// import parse from 'html-react-parser';
import { Markup } from 'interweave';
import OnlineQuestionVideoComponent from 'Services/course/Pages/OnlineQuestionsPage/Components/OnlineQuestionVideoComponent';
import SaveIcon from '@material-ui/icons/Save';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditorComponent from 'Services/course/Pages/Components/EditorComponent';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import DeleteIcon from '@material-ui/icons/Delete';
import NotesIcon from '@material-ui/icons/Notes';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
import Loading from 'Services/course/Pages/Components/Loading';
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
  answers,
  deleteOnlineAnswer,
  setMarkDown,
  children }) => {
  const [ elapsedTime, setElapsedTime ] = useState( false ); 
  const [ markDownEditorAnswer, setMarkDownEditorAnswer ] = useState( undefined );
  const [ markDownContent, setMarkDownContent ] = useState( undefined );
  // const [ answersExist, setAnswersExist ] = useState( ( answers?.length === 0 ? undefined : answers?.length ) );
  const [ contentChanged, setContentChanged ] = useState( undefined );
  let toggleSavingEditorContentHandle = undefined;

  useEffect(() => {
    // if ( answers?.length === 0 || answers?.length === undefined ) {
    //   return <Loading />;
    // } else {
    //   setAnswersExist( answers?.length === 0 ? undefined : answers?.length  );
    // }

    // if ( elapsedTime ) {
    //   if ( markDownEditorAnswer  ) {
    //     setElapsedTime( false );
    //     saveMarkDownContent( 
    //       saveOnlineAnswer,
    //       markDownEditorAnswer,
    //       markDownContent,
    //       `${markDownEditorAnswer?._id}`,
    //       2000
    //     ); 

    //     loadOnlineAnswers();
    //   }
    // }

    // if ( contentChanged ) {
    //    setContentChanged( false );
    // }

  // }, [ answers?.length, markDownContent, contentChanged, markDownEditorAnswer, elapsedTime, setElapsedTime, saveOnlineAnswer ] );   
}, [ answers?.length ] );   

  // if ( !answersExist ) {
  //   return <Loading />;
  // };
  
  const addNewEditor = () => {
    let config = {
      onlineQuestionId: questionId,
      type: "",
      //placeHolder: null,
      placeHolder: homeWorkAnswerPlaceHolder,
      courseId,    
      userId: currentUser?._id,
      files: [],
      answerBy: currentUser?.firstname,
      videoUrl: ""
    };

    addNewOnlineAnswer( manageEditorsFieldCollection( config ) );
    setContentChanged( true );
  }; 
  
  const onhandleSelected = ( selected ) => {
    deleteOnlineAnswer( selected );
    setContentChanged( true );
  };

  let timeOutDuration = 0;
  const handleChange = ( editor ) => {
      //if ( editor?.element ) {
      let cacheName = `${ editor?.element?._id }`, editorContent = JSON.stringify( editor?.editor.getHTML() );

      //sessionStorage.setItem( cacheName, editorContent );
      setMarkDownContent( editor?.editor.getHTML()  );
      setMarkDownEditorAnswer( editor?.element );
     //}; 

    //  toggleSavingEditorContentHandle = toggleSavingEditorContent( timeOutDuration );
  };

  function toggleSavingEditorContent( timeoutDuration ) {
    if ( toggleSavingEditorContentHandle ) {
      clearTimeout( toggleSavingEditorContentHandle );
    }
 
   return setTimeout(() => {
      setElapsedTime( true );
    }, timeoutDuration);
  };

  // function setRecordingCompletionStatus( videoUploaded, id ){
  //   if ( videoUploaded ) {
  //     setVideoUploaded( videoUploaded );
  //   }
  // }

// const handleSubmit = () => {
//   // if ( previewMode && videoUploaded ) { // change for video upload
//   //     togglePreviewMode();  
//   if ( videoUploaded ) {     
//       loadOnlineAnswers(); 
//   } else {
//     // if ( savedQuestionsExist( currentCourseQuestions ) ) {
//     //     saveOnlineQuestion( { ...currentCourseQuestions } ); // change
//     // } 
//   }   
// }
 
const deleteVideo = ( selectedAnswer ) => {
  saveOnlineAnswer( selectedAnswer );
  setContentChanged( true );
};

const goToBlackBoard = ( answer ) => {
  navigate(`/${operatorBusinessName}/homework/askquestion/board/course/${courseId}/answer/${answer?._id}`);
};

let onlineVideoConfig = ( element, recordingOn ) => {
  return {
    videoUploaded: config?.videoUploaded,
    saveRecording: config?.saveRecording,
    handleSubmit: config?.handleSubmit,
    setRecordingCompletionStatus: config?.setRecordingCompletionStatus,
    videoCallIcon,
    exitVideoCallIcon,
    shareScreenIcon,
    deleteIconStyle: onlineAnswerVideoDeleteIconStyle,
    videoCallIconMain,
    saveIconStyle: saveIconStyle,
    recordingOn: false,
    videoNamePrefix: 'OnlineAnswerVideoMarkDownEditors', 
    recordButtonText: 'Record Answer',
    videoSectionClassNameRecording: "answerVideoSection-recording",
    videoSectionClassNameRecordingStopped: "answerVideoSection-recordingStopped",
    videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
    videoClassName: ( element?.videoUrl === "" || element?.videoUrl === undefined ) ? "" : "",
    deleteVideo: () => deleteVideo( element ),
    exitVideoCallIconPageName: "ManageEditors",
    videoSectionCallOut: "answerVideoSectionCallOut"
  };
};

return (
  <div 
    className="" 
    id="EditorComponent"
    > 
      <div>
          { answers?.map( element => (
              <>               
              {
                <div 
                  id="answerCard"
                  className="answerCard"
                >
                  <div className="question-card-top-right">
                  {
                    <span key={element?._id}>
                        <SaveIcon 
                            style={editorSaveIconStyle()}
                            className="comment-round-button-4"
                            onClick={() => onhandleSelected( element )}
                        />

                        <DeleteIcon 
                            style={iconStyle()}
                            className="comment-round-button-3"
                            onClick={() => onhandleSelected( element )}
                        />
                    </span>
                   }

                  </div>
                  {/* <Markup content={ element?.markDownContent } /> */}
                   <EditorComponent
                    className={"answerDisplay"}
                    key={ element?._id }
                    id={ element?._id }
                    name={ element?.name } 
                    onChange={( editor ) => handleChange( { editor, element } )}
                    content={ element?.markDownContent }
                    upload_url={ config.upload_url }
                    upload_handler={( file, imageBlock ) => config?.uploadImageUrl( file, imageBlock )}
                    // upload_handler={( file, imageBlock ) => config?.uploadImageUrl( file, imageBlock, editors?.length )}  <- fix
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
                      <span className="cols">     
                      <span className="onlineQuestionVideoComponent"> 
                        <OnlineQuestionVideoComponent 
                          element={element} 
                          config={ onlineVideoConfig( element, false ) }
                        />
                      </span>
                      </span>
                      <span className="cols">
                         <NoteAddTwoToneIcon
                            style={ iconStyleMain() }
                            className="comment-round-button-1"
                            onClick={() => goToBlackBoard( element )} 
                         />
                        {( element?.boardVideoUrl  ) &&
                           <NotesIcon
                              style={ iconStyleMain() }
                              className="comment-round-button-2"
                              onClick={() => window.open(`${element.boardVideoUrl}`)}
                          />
                        }    
                      </span>
                      <span>
                      </span>
                      </div>
                      </div>
                      <div className="row">
                          <div className="userBioSub">
                            <div className="onlineQuestionVideoComponent">
                            <span className="col-1"> 
                                <img className="onlineQuestionImage" src={currentUsers?.find(_user => _user?._id === element?.userId)?.avatarUrl} width="80" height="70"  alt=''/>                                        
                            </span>
                                <div className="col-1"> 
                                  <div className="onlineQuestionCalendarIcon">
                                  <CalendarTodayIcon
                                      style={ iconStyleMain() }
                                      className="round-button-3"
                                      //onClick={() => gotToCalendar(singleUser)}
                                  />
                                  </div>                    
                                </div>
                            </div>
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
                {/* {
                  <span key={element?._id}>
                      <DeleteIcon 
                          style={iconStyle()}
                          className="comment-round-button-3"
                          onClick={() => onhandleSelected( element )}
                      />
                  </span>
                } */}
                
                  <span> 
                    {
                        children( element )
                    }
                  </span>
                  <span>
                    {
                      <PlusOneIcon 
                        style={plusOneIconStyle()}
                        className="comment-round-button-2"
                        onClick={() => addNewEditor()}
                       />
                    }
                      
                  </span>
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
};

  const mapState = ( state, ownProps ) => { 
    return {
      currentUser: state.users.user,
      currentUsers: Object.values( state.users.users ),
      answers: getSelectedOnlineAnswersByCourseId(state, ownProps)?.filter(answers => answers?.onlineQuestionId === ownProps?.questionId),
      onlineQuestions:  Object.values( state.onlineQuestions.onlineQuestions ),
    };
  };

 export default connect(mapState, { addNewOnlineAnswer, saveOnlineAnswer, loadOnlineAnswers, setMarkDown, deleteOnlineAnswer })(ManageEditors);
