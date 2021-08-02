import { 
  connect } from 'react-redux';
  
  import { 
  setMarkDown } from 'teach/src/services/course/helpers/EditorHelpers'; 
  
  import { 
  SET_ONLINEQUESTION_MARKDOWN } from 'teach/src/services/course/actions/onlinequestions';
  
  import {
  videoComponentMeta,
  toggleVideoModalMode,
  toggleResetOptions, 
  toggleRecordingStatus,
  toggleCameraStatus, 
  toggleScreenSharingStatus } from 'teach/src/services/course/actions/video';
  
  import {   
  deleteOnlineQuestion,
  saveOnlineQuestion } from 'teach/src/services/course/actions/onlinequestions';
  
  import {
  upload_url,
  uploadImageUrl } from 'teach/src/services/course/pages/OnlineQuestionsPage/helpers';
  
  import {
  deleteQuestionIconStyle,
  videoMeta } from './inlineStyles';
  
  import useOnlineQuestionsHook from 'teach/src/services/course/pages/OnlineQuestionsPage/hooks/useOnlineQuestionsHook';
  import MaterialUiVideoComponent from 'teach/src/services/course/pages/components/MaterialUiVideoComponent';
  import EditorComponent from 'teach/src/services/course/pages/components/EditorComponent';
  import AnswerComponent from 'teach/src/services/course/pages/OnlineQuestionsPage/components/AnswerComponent';
  import DeleteIcon from '@material-ui/icons/Delete';
  import MiniSideBarMenu from 'teach/src/services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
  import MiniSideBarButton from '../../../components/SubscriptionComponent/MiniSideBarButton';
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
  
  