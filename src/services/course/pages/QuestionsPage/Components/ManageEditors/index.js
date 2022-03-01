import { 
connect } from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/react-redux';

import { 
addNewOnlineAnswer,
saveOnlineAnswer,
loadOnlineAnswers,
deleteOnlineAnswer } from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/Actions/OnlineAnswers';

import { 
setMarkDown } from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/helpers/EditorHelpers'; 
  
import {
SET_ONLINEANSWERS_MARKDOWN } from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/Actions/OnlineAnswers';

import {
upload_url, 
uploadImageUrl } from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/Pages/OnlineQuestionsPage/helpers';

import { 
getSelectedOnlineAnswersByCourseId } from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/Selectors';

import {
videoMeta,
plusOneIconStyle,
iconStyleMain,
iconStyle } from './inlineStyles';

import useManageEditorsHook from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/Pages/QuestionsPage/hooks/useManageEditorsHook'
import MaterialUiVideoComponent from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/Pages/Components/MaterialUiVideoComponent';
import CalendarTodayIcon from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/@material-ui/icons/CalendarToday';
import EditorComponent from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/Services/course/Pages/Components/EditorComponent';
import PlusOneIcon from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/@material-ui/icons/PlusOne';
import DeleteIcon from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/@material-ui/icons/Delete';
import NotesIcon from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/@material-ui/icons/Notes';
import NoteAddTwoToneIcon from 'services/course/pages/QuestionsPage/components/ManageEditors/node_modules/@material-ui/icons/NoteAddTwoTone';
import moment from "services/course/pages/QuestionsPage/components/ManageEditors/node_modules/moment";
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
                      < MaterialUiVideoComponent 
                          className={ "onlineQuestionVideoComponent" } 
                          element={ element } 
                          videoMeta={videoMeta( element ) }
                          saveRecording={saveRecording}
                          extendedMeetingSettings={false} 
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
