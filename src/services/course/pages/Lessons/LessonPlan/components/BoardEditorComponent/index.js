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
getBoardEditorId,
getUrls } from 'services/course/pages/Lessons/LessonPlan/helpers';

import { 
Validations } from 'services/course/helpers/Validations';

import {
iconStyleMain,
saveIconStyle,
savedBoardIcon } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';

import {
loadWhiteBoardData,
loadWhiteBoardDataByWid,
selectSavedWhiteBoard,
addWhiteBoardData } from 'services/course/actions/whiteBoards';

import {
getItemColor } from 'services/course/helpers/PageHelpers';

import { 
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
getSortedRecordsByDate } from 'services/course/selectors';

import useWhiteBoardHook  from 'services/course/pages/Lessons/hooks/useWhiteBoardHook';
import MenuItem from '@mui/material/MenuItem';
import MaxWidthDialog from 'services/course/pages/components/MaxWidthDialog';
import LessonPlanIframeComponent  from 'services/course/pages/components/LessonPlanIframeComponent';
import NotesIcon from '@material-ui/icons/Notes';
import SaveIcon from '@material-ui/icons/Save';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HistoryIcon from '@mui/icons-material/History';
import moment from "moment";
import './style.css';

//https://www.uuidgenerator.net/dev-corner/javascript
const BoardEditorComponent = ({ 
  setMarkDown,
  meetingNotes,
  saveMeetingNote,
  operatorBusinessName,
  saveIconVisible,
  meetingId,
  courseId,
  lessonId,
  classRoomId, 
  users,
  operators,
  currentUser,
  lessons,
  boardOrEditor,
  toggleTeachBoardOrEditor,
  loadWhiteBoardData,
  loadWhiteBoardDataByWid,
  addWhiteBoardData,
  selectSavedWhiteBoard,
  whiteBoardData,
  isModalOpen }) => {

  let hideMeetingStage = false, fullMeetingStage = false;
  let Id = getBoardEditorId(lessonId, meetingId, classRoomId);
  const urls = getUrls(Id, currentUser);
  const fullScreenSize = "1536px";
  const editorUrl = urls?.editor;
  const canvasUrl = urls.canvas; 
  const whiteBoardId = Id;
  const whiteBoard = getSortedRecordsByDate(Object.values( whiteBoardData ).filter( board => board?.wid === whiteBoardId ), 'timeSaved');
  const businessName = (operatorBusinessName === "") ? getItemFromSessionStorage('operatorBusinessName') :  operatorBusinessName;
  const lesson = lessons.find( lesson => lesson?._id === lessonId);
  const operator = Object.values( operators )?.find( operator => operator?.businessName === businessName) 
                  ? Object.values( operators )?.find( operator => operator?.businessName === businessName )
                  : getItemFromSessionStorage('operator');

  let {
    isOpen,
    setIsOpen,
    handleClose,
    getSavedBoards,
  } = useWhiteBoardHook( { whiteBoardId, toggleTeachBoardOrEditor, loadWhiteBoardDataByWid });
 
function saveWhiteBoardData(){
  if ( whiteBoardId ) {
      addWhiteBoardData({ 
        wid: whiteBoardId,
        meetingId,
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
  }
};

function selectWhiteBoardData( item ){
  if( whiteBoardData ){
    loadWhiteBoardDataByWid(whiteBoardId);
    selectSavedWhiteBoard( { wid: whiteBoardId, meetingId, jsonData: item?.whiteBoardJasonData } )
    .then( response => {
      toggleTeachBoardOrEditor();
      toggleTeachBoardOrEditor();
      setIsOpen( false );
     })
    .catch( error => { 
      console.log( error );
    });
  }
};

let modalProps =  {
  isOpen, 
  handleClose,
  collection: whiteBoard,
  dialogTitle:'Saved Boards',
  InputLabel: 'versioned',
  selectEventChangeHandler: selectWhiteBoardData           
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
                  <MaxWidthDialog modalProps={modalProps}>
                    {
                      ( item ) => {
                         return <MenuItem value={item}>{`version: ${ moment(item?.timeSaved)?.local().format('YYYY-MM-DD hh:mm:ss') }`}</MenuItem>
                      }
                    }
                    </MaxWidthDialog>
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
                  onClick={ () => toggleTeachBoardOrEditor() } 
                />
              }
              <div className={`save-icon-${(saveIconVisible) ? 'visible' : 'hidden' }`}>
              {
                <SaveIcon 
                  style={ saveIconStyle() }
                  className="lesson-plan-round-button-2"
                  onClick={ () => saveWhiteBoardData() }
                />
              }  
              {
                <HistoryIcon 
                  style={ saveIconStyle() }
                  className="lesson-plan-round-button-4"
                  onClick={ () => getSavedBoards() }
                />
              }  
              </div>
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
  loadWhiteBoardData,
  loadWhiteBoardDataByWid
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
    selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown,
    meetingNotes: state?.meetingNotes?.meetingNotes,
    isModalOpen: state?.courses?.isModalOpen
  };
};

export default connect(mapState, mapDispatch )(BoardEditorComponent);

