import { 
connect } from 'react-redux';

import { 
setMarkDown } from 'Services/course/helpers/EditorHelpers'; 

import { 
SET_ONLINEQUESTION_MARKDOWN } from 'Services/course/Actions/OnlineQuestions';

import {
videoComponentMeta,
toggleVideoModalMode,
toggleResetOptions, 
toggleRecordingStatus,
toggleCameraStatus, 
toggleScreenSharingStatus } from 'Services/course/Actions/Video';

import {   
deleteOnlineQuestion,
saveOnlineQuestion } from 'Services/course/Actions/OnlineQuestions';

import {
upload_url,
uploadImageUrl } from 'Services/course/Pages/OnlineQuestionsPage/helpers';

import {
deleteQuestionIconStyle,
videoMeta } from './inlineStyles';

import useOnlineQuestionsHook from 'Services/course/Pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook';
import MaterialUiVideoComponent from 'Services/course/Pages/Components/MaterialUiVideoComponent';
import EditorComponent from 'Services/course/Pages/Components/EditorComponent';
import AnswerComponent from 'Services/course/Pages/OnlineQuestionsPage/Components/AnswerComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import MiniSideBarMenu from 'Services/course/Pages/Components/SubscriptionComponent/MiniSideBarMenu';
import MiniSideBarButton from '../../../Components/SubscriptionComponent/MiniSideBarButton';
import './style.css';

const OnlineListItems = ({ 
  setMarkDown,
  operator, 
  currentCourseQuestions,
  onlineQuestionId,
  videoComponentMeta,
  courseId,
  saveOnlineQuestion,
  currentUser }) => {

  let {
    saveRecording,
    deleteQuestion
  } = useOnlineQuestionsHook({ courseId, currentCourseQuestions });

function handleChange( editor, element ){
  let duration = 2000;  

  setMarkDown(
    element, 
    editor.getHTML(), 
    { propNameOne: "onlineQuestions",  propNameTwo: "onlineQuestions" }, 
    SET_ONLINEQUESTION_MARKDOWN, 
    saveOnlineQuestion, 
    duration
  );
};

return currentCourseQuestions?.map((element) => (
    <>
      <div className={"OnlineListItems"}
        id={ element?._id }
      >
        <div> 
        <span>
        <MiniSideBarMenu question={ element } >
          {( handleMouseDown, menuVisible ) => (
            <MiniSideBarButton
              mouseDown={ handleMouseDown }
              navMenuVisible={ menuVisible } 
            />
          )}
        </MiniSideBarMenu>
        </span>   
        <span>
         <DeleteIcon
            style={ deleteQuestionIconStyle() }
            className="comment-round-button-3"
            onClick={() => deleteQuestion( element )}
          />
        </span>   
          <EditorComponent
            id={element?._id}
            name={element?.name}
            handleChange={(editor) => handleChange(editor,  element)}
            content={ element?.markDownContent }
            upload_url={upload_url}
            upload_handler={( file, imageBlock ) => uploadImageUrl( file, imageBlock, element, saveOnlineQuestion ) }
            readOnly={(element?.questionCreatedBy === currentUser?._id) ? false : true}
          /> 
          < MaterialUiVideoComponent 
              className={"onlineQuestionVideoComponent"} 
              element={ element } 
              videoMeta={videoMeta( element )}
              saveRecording={saveRecording}
              extendedMeetingSettings={false} 
          />
          < AnswerComponent 
              question={ element }
              courseId={courseId}
          />
        </div>
      </div>
      </>
  ));
};

const mapDispatch = {
  saveOnlineQuestion,
  deleteOnlineQuestion,
  videoComponentMeta,
  toggleVideoModalMode,
  toggleResetOptions, 
  toggleRecordingStatus,
  toggleCameraStatus, 
  toggleScreenSharingStatus,
  setMarkDown 
};

const mapState = ( state, ownProps ) => {
  return {
    currentUser: state.users.user,
    courses: Object.values( state?.courses?.courses ),
    hasRecordingStarted: state.hasRecordingStarted.hasRecordingStarted,
  };
};

export default connect( mapState, mapDispatch )( OnlineListItems );

