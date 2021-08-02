import { 
  connect } from 'react-redux';
  
  import { 
  addNewOnlineAnswer,
  saveOnlineAnswer,
  loadOnlineAnswers,
  deleteOnlineAnswer } from 'teach/src/services/course/actions/onlineanswers';
  
  import { 
  setMarkDown } from 'teach/src/services/course/helpers/EditorHelpers'; 
    
  import {
  SET_ONLINEANSWERS_MARKDOWN } from 'teach/src/services/course/actions/onlineanswers';
  
  import {
  upload_url, 
  uploadImageUrl } from 'teach/src/services/course/pages/OnlineQuestionsPage/helpers';
  
  import { 
  getSelectedOnlineAnswersByCourseId } from 'teach/src/services/course/selectors';
  
  import {
  videoMeta,
  plusOneIconStyle,
  iconStyleMain,
  iconStyle } from './inlineStyles';
  
  import useManageEditorsHook from 'teach/src/services/course/pages/OnlineQuestionsPage/hooks/useManageEditorsHook'
  import MaterialUiVideoComponent from 'teach/src/services/course/pages/components/MaterialUiVideoComponent';
  import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
  import EditorComponent from 'teach/src/services/course/pages/components/EditorComponent';
  import PlusOneIcon from '@material-ui/icons/PlusOne';
  import DeleteIcon from '@material-ui/icons/Delete';
  import NotesIcon from '@material-ui/icons/Notes';
  import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';
  import moment from "moment";
  import './style.css';
  
  const ManageEditors = ({ 
    operatorBusinessName,
    courseId,
    currentUser,
    currentUsers,
    question,
    addNewOnlineAnswer,
    saveOnlineAnswer,
    loadOnlineAnswers,
    answers,
    deleteOnlineAnswer,
    videoComponentMeta,
    setMarkDown,
    children }) => {
  
    let {
      addNewEditor,
      onhandleSelected,
      goToBlackBoard,
      saveRecording,
    } = useManageEditorsHook( answers, question, currentUser, operatorBusinessName, courseId );
  
    if ( answers?.length === 0 || answers?.length === undefined ) {
      return  <span className="">
                {
                  <PlusOneIcon 
                    style={plusOneIconStyle()}
                    className="comment-round-button-2"
                    onClick={() => addNewEditor()}
                    />
                }
              </span>;  
    }; 
  
  function handleChange( editor, element ){
    let duration = 2000;  
  
    setMarkDown(
      element, 
      editor.getHTML(), 
      { propNameOne: "onlineAnswers",  propNameTwo: "onlineAnswers" }, 
      SET_ONLINEANSWERS_MARKDOWN, 
      saveOnlineAnswer, 
      duration
    );
  };
  
  return (
    <div 
      className="" 
    > 
        <div>
            { answers?.map( element => (
                <>               
                {
                  <div 
                    className="answerEditor"
                  >
                    <div className="question-card-top-right">
                    {
                      <span>
                        <DeleteIcon 
                          style={iconStyle()}
                          className="comment-round-button-3"
                          onClick={() => onhandleSelected( element )}
                        />
                      </span>
                     }
  
                    </div>
                     <EditorComponent
                      className={"answerEditor"}
                      id={ element?._id }
                      name={ element?.name } 
                      handleChange={(editor) => handleChange(editor, element)}
                      content={ element?.markDownContent }
                      upload_url={ upload_url }
                      upload_handler={ ( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveOnlineAnswer ) }
                      readOnly={(element?.answerBy === currentUser?._id)? false : true }
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
                        < MaterialUiVideoComponent 
                            className={ "onlineQuestionVideoComponent" } 
                            element={ element } 
                            videoMeta={videoMeta( element ) }
                            saveRecording={saveRecording}
                            extendedMeetingSettings={false} 
                        />
                        </span>
                        </span>
                        {/* <span className="cols">
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
                        </span> */}
                        <span>
                        </span>
                        </div>
                        </div>
                        <div className="answerCard">
                        <div className="row">
                            <div className="userBioSub-support">
                              <div className="onlineQuestionVideoComponent">
                              <span className="col-1"> 
                                  <img className="onlineQuestionImage" src={currentUsers?.find(_user => _user?._id === element?.userId)?.avatarUrl} width="70" height="70"  alt=''/>                                        
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
                          { <span> {` Answered by ${currentUsers?.find(_user => _user?._id === element?.userId)?.firstname} on ${  moment( element?.answerDateTime ).local() }`} </span>}
                        </div> 
                     </div>
                        </div> 
                      </div>
                  }
                    </div>
                    </div>    
                  }                
                    <span> 
                    {
                      children( element )
                    }
                    </span>
                    <span className="">
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
    </div>  
    );
  };
  
  const mapState = ( state, ownProps ) => { 
    return {
      currentUser: state.users.user,
      currentUsers: Object.values( state.users.users ),
      answers: getSelectedOnlineAnswersByCourseId(state, ownProps)?.filter(answers => answers?.onlineQuestionId === ownProps?.question?._id),
      onlineQuestions:  Object.values( state.onlineQuestions.onlineQuestions ),
    };
  };
  
  export default connect(mapState, { addNewOnlineAnswer, saveOnlineAnswer, loadOnlineAnswers, setMarkDown, deleteOnlineAnswer })(ManageEditors);
  