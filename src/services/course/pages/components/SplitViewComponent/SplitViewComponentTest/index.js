import { 
connect } from 'react-redux';

import {
SPLIT_VIEW_ORIENTATION } from '../helpers';

import { 
adjustRoomSize } from 'services/course/pages/Lessons/LessonPlan/helpers';

import {
saveMeetingNote } from 'services/course/actions/meetingNotes';
  
import { 
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId} from 'services/course/selectors';
  
import SplitViewComponent from 'services/course/pages/components/SplitViewComponent';
import ResizePanel from 'services/course/pages/components/SplitViewComponent/components/ResizePanel';
import EditorComponent from 'services/course/pages/components/EditorComponent';
import LessonPlanIframeComponent  from 'services/course/pages/components/LessonPlanIframeComponent';
import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
import Meeting from 'services/course/pages/Meeting';

const SplitViewComponentTest = ({ 
    session, 
    meetingNotes,
    meetingId,
    currentUser, 
    classRoomId, 
    courseId,
    lessonId,
    roomSize,
    operatorBusinessName,
    hideMeetingStage }) => {

    const meetingNote = Object.values( meetingNotes )?.find( note => note?.meetingId === meetingId && note?.userId === currentUser?._id );

return (
    <div className="">
      <SplitViewComponent 
        orientation={ SPLIT_VIEW_ORIENTATION?.WIDTH }
        left_top={ ( stopDragging, leftWidth, setLeftWidth ) => 
        <div onClick={stopDragging}>
          <ResizePanel
            panelDimension={ leftWidth }
            setpanelDimension={ setLeftWidth }
            orientation={ SPLIT_VIEW_ORIENTATION?.WIDTH }
          > 
            <BoardEditorComponent 
                meetingId={meetingId}
                courseId={courseId}
                lessonId={lessonId}
                classRoomId={classRoomId}
                operatorBusinessName={operatorBusinessName}
            />
            </ResizePanel>
          </div>
         }
         right_bottom={ ( stopDragging, rightWidth, setRightWidth ) => 
          <div onClick={stopDragging}>
              <SplitViewComponent
                orientation={ SPLIT_VIEW_ORIENTATION?.HEIGHT }
                left_top={ ( stopDragging, topHeight, setTopHeight ) => 
                  <div onClick={stopDragging}>
                      <ResizePanel
                        panelDimension={ rightWidth }
                        setpanelDimension={ setRightWidth }
                        orientation={ SPLIT_VIEW_ORIENTATION?.WIDTH }
                      > 
                      < LessonPlanIframeComponent 
                            name="embed_readwrite" 
                            source={`http://localhost:9001/p/${meetingId}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`}
                            width={ rightWidth }
                            height={topHeight}
                            allow="camera;microphone"
                            scrolling="yes"
                            frameBorder="0"
                            allowFullScreen
                      /> 
                       </ResizePanel>
                    </div>
                   }
                   right_bottom={ ( stopDragging, bottomHeight, setBottomHeight ) => 
                    <div onClick={stopDragging}>
                          <ResizePanel
                            panelDimension={ rightWidth }
                            setpanelDimension={ setRightWidth }
                            orientation={ SPLIT_VIEW_ORIENTATION?.WIDTH }
                          > 
                          <div>
                            <div className={adjustRoomSize( roomSize ).containerStyle}>   
                              <div className={`meeting-stage-${(hideMeetingStage) ? 'hidden' : 'visible'}`}>
                              { ( session  ) &&
                                  <Meeting
                                    userName={currentUser?.firstname}   
                                    roomName={`${classRoomId}`}
                                    resizedHeight={bottomHeight}
                                    containerHeight={adjustRoomSize( roomSize )?.meetingRoomHeight}
                                    containerWidth={adjustRoomSize( roomSize )?.meetingRoomWidth}  
                                  /> 
                              }
                              </div>
                            </div> 
                          </div> 
                        </ ResizePanel >
                      </div>
                   }                
              />                
            </div>
         }
      />
    </div>
  );
};

const mapDispatch = {
  saveMeetingNote,
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
    meetingNotes: state?.meetingNotes?.meetingNotes 
  };
};

export default connect(mapState, mapDispatch )(SplitViewComponentTest);

