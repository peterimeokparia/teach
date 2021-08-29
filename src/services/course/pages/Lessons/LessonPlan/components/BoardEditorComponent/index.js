import { 
connect } from 'react-redux';

import{
toggleTeachBoardOrEditor,   
setLessonInProgressStatus } from 'services/course/actions/lessons';

import{
inviteStudentsToLearningSession } from 'services/course/actions/users';

import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId} from 'services/course/selectors';

import { 
getUrls } from 'services/course/pages/Lessons/LessonPlan/helpers';

import { 
Validations } from 'services/course/helpers/Validations';

import {
iconStyleMain,
saveIconStyle,
savedBoardIcon } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';

import {
selectSavedWhiteBoard,
addWhiteBoardData } from 'services/course/actions/whiteBoards';

import {
getItemColor } from 'services/course/helpers/PageHelpers';

import { 
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import useTeachMeetingSettingsHook  from 'services/course/pages/Lessons/hooks/useTeachMeetingSettingsHook';
import LessonPlanIframeComponent  from 'services/course/pages/components/LessonPlanIframeComponent';
import NotesIcon from '@material-ui/icons/Notes';
import SaveIcon from '@material-ui/icons/Save';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import './style.css';

const BoardEditorComponent = ({ 
  operatorBusinessName,
  saveIconVisible,
  courseId,
  lessonId,
  classRoomId, 
  users,
  operators,
  currentUser,
  lessons,
  boardOrEditor,
  toggleTeachBoardOrEditor,
  addWhiteBoardData,
  selectSavedWhiteBoard,
  whiteBoardData }) => {
  let {
    hideMeetingStage,
    fullMeetingStage,
  } = useTeachMeetingSettingsHook( users, currentUser, classRoomId, undefined, undefined  );

  const urls = getUrls(currentUser, courseId, lessonId, classRoomId); 
  const fullScreenSize = "1536px";
  const editorUrl = urls?.editor;
  const canvasUrl = urls.canvas; 
  const whiteBoardId = `${courseId}${lessonId}${classRoomId}`;
  const whiteBoard = Object.values( whiteBoardData ).filter( board => board?.wid === whiteBoardId );
  const businessName = (operatorBusinessName === "") ? getItemFromSessionStorage('operatorBusinessName') :  operatorBusinessName;
  const lesson = lessons.find( lesson => lesson?._id === lessonId);
  const operator = Object.values( operators )?.find( operator => operator?.businessName === businessName) 
                  ? Object.values( operators )?.find( operator => operator?.businessName === businessName )
                  : getItemFromSessionStorage('operator');

function saveWhiteBoardData(){
  addWhiteBoardData({ 
    wid: whiteBoardId,
    operatorId: operator?._id,
    color: getItemColor(whiteBoard)
  }) 
  .then( response => {
    toggleTeachBoardOrEditor();
    toggleTeachBoardOrEditor();
 })
 .catch( error => { 
   console.log( error );
  });
};

function selectWhiteBoardData( item, index ){
  if( whiteBoardData ){
    selectSavedWhiteBoard( { wid: whiteBoardId,  jsonData: item?.whiteBoardJasonData} )
    .then( response => {
      toggleTeachBoardOrEditor();
      toggleTeachBoardOrEditor();
     })
    .catch( error => { 
       console.log( error );
    });
  }
};

return (
      <div>
          <div className="content">    
            <div> 
          <div className={ fullMeetingStage ? `tools-hide` : `tools` }> 
            {boardOrEditor 
            ? <div className={`editor${hideMeetingStage}-show`}> 
                < LessonPlanIframeComponent 
                  name="embed_readwrite" 
                  source={editorUrl}
                  width={fullScreenSize}
                  height="900px"
                  allow="camera;microphone"
                  scrolling="yes"
                  frameBorder="0" 
                /> 
             </div>
            : <div className={`canvas${hideMeetingStage}-show`}> 
                  < LessonPlanIframeComponent 
                    name="embed_readwrite" 
                    source={canvasUrl}
                    width={fullScreenSize}
                    height="900px"
                    allow="camera;microphone"
                    scrolling="yes"
                    frameBorder="0"
                    allowFullScreen
                  />
              </div>                          
            } 
            </div>
            </div>   
            <div className='whiteBoardSideBar'> 
            <div>
              {
                <SwapHorizIcon
                  style={ iconStyleMain() }
                  className="lesson-plan-round-button-1"
                  onClick={() => toggleTeachBoardOrEditor( lesson )} 
                />
              }
              <div className={`save-icon-${(saveIconVisible) ? 'visible' : 'hidden' }`}>
              {
                <SaveIcon 
                  style={saveIconStyle()}
                  className="lesson-plan-round-button-2"
                  onClick={() => saveWhiteBoardData()}
                />
              }  
              </div>
            </div>
            <div className='savedBoards'>
              { whiteBoard.map(( item, index) => (
                    <div className='savedBoards-items'> 
                      <NotesIcon 
                          style={savedBoardIcon(item?.color)}
                          className="lesson-plan-round-button-2"
                          onClick={() => selectWhiteBoardData( item, index)}
                      />
                    </div>
                ))
              }
            </div> 
          </div>    
          </div> 
        { Validations.setErrorMessageContainer() }
      </div>
    );
};

const mapDispatch = {
  toggleTeachBoardOrEditor, 
  setLessonInProgressStatus,  
  inviteStudentsToLearningSession, 
  addWhiteBoardData,
  selectSavedWhiteBoard,
};

const mapState = ( state, ownProps )   => {
  return {
    operators: state.operators.operators,
    operatorBusinessName: state.operators.operatorBusinessName,
    whiteBoardData: state.whiteBoardData.whiteBoardData,
    whiteBoardDataLoading: state.whiteBoardData.whiteBoardDataLoading,
    saveInProgress: state.whiteBoardData.saveInProgress,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    currentUser: state.users.user,
    lessons: Object.values(state.lessons.lessons),
    lessonStarted: state.lessons.lessonStarted,
    boardOrEditor: state.lessons.toggleTeachBoardOrEditor,
    setVideoCapture: state.streams.setVideoCapture,
    invitees: state.users.invitees,
    onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
    allSessions: Object.values(state?.sessions?.sessions),
    selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown
  };
};

export default connect(mapState, mapDispatch )(BoardEditorComponent);

