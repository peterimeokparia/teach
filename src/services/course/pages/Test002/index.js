import { 
  useEffect } from 'react';
  
  import { 
  connect } from 'react-redux';

  import { 
  adjustRoomSize } from 'services/course/pages/Lessons/LessonPlan/helpers';
  
  import ResizePanel from "react-resize-panel";
  import style from './style.css';
  import classNames from 'classnames/bind';
  import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
  import LessonPlanIframeComponent  from 'services/course/pages/components/LessonPlanIframeComponent';
  import EditorComponent from 'services/course/pages/components/EditorComponent';
  import Meeting from 'services/course/pages/Meeting';
  import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
  

  let cx = classNames.bind(style);
  
  const Test002 = ({}) => {
     
  return <div className={cx('container')}>
  <ResizePanel direction="s">
    <div className={cx('header', 'panel')}>
      {/* <span>header</span> */}
      < MaterialUiVideoComponent 
            // name={PageObject?.LessonPlan_MaterialUiVideoComponent}
            // className={"MaterialUiVideoComponent"} 
            // element={ selectedLesson } 
            // hasRights={true}
            // videoMeta={videoMeta( selectedLesson )}
            // resetAllStartSettings={resetAllStartSettings}
            // resetAllStopSettings={resetAllStopSettings}
            // setVideoModalMode={(stage) => setVideoModalMode(stage)}
            // VideoModalMode={videoModalModeOn}
            // saveVideoRecording={saveVideoRecording}
            // toggleCurrentMeetingSession={toggleCurrentMeetingSession}
        />
    </div>
  </ResizePanel>
  
  <div className={cx('body')}>
  
      {/* <ResizePanel direction="e" style={{ flexGrow: '1' }} >
        <div className={cx('sidebar', 'withMargin', 'panel' )}>
          left panel<br /> with margin <br />default 50% of content area using flex-grow
          <div className={adjustRoomSize( 2 ).containerStyle}>   
            <div className={`meeting-stage-${(false) ? 'hidden' : 'visible'}`}>
            { 
                <Meeting
                  // userName={currentUser?.firstname}   
                  // roomName={`${classRoomId}`}
                  // resizedHeight={bottomHeight}
                  containerHeight={adjustRoomSize( 2 )?.meetingRoomHeight}
                  containerWidth={adjustRoomSize( 2 )?.meetingRoomWidth}  
                /> 
            }
            </div>
          </div> 
        </div>
      </ResizePanel> */}
{/* 
      < LessonPlanIframeComponent 
        name="embed_readwrite" 
        //source={editorUrl}
        width={"1536px"}
        height="900px"
        allow="camera;microphone"
        scrolling="yes"
        frameBorder="0" 
      />  */}

 
<div className={cx('content', 'panel', 'zcontent')}>
    <BoardEditorComponent 
      // meetingId={meetingId}
      // courseId={courseId}
      // lessonId={lessonId}
      // classRoomId={classRoomId}
      // operatorBusinessName={operatorBusinessName}
      // saveIconVisible={true}
    /> 
</div>
     
  
    <ResizePanel direction="w" style={{ width: '400px' }} handleClass={style.customHandle} borderClass={style.customResizeBorder}>
    <div className={cx('sidebar', 'panel' )}>
      {/* right panel<br /> with custom handle<br /> default 400px */}
      {/* <div className={cx('editor')} style={{ marginTop: '-900px', marginLeft: '-20px' }}>
        <EditorComponent  
            // upload_url={editor_upload_url} 
            // handleChange={(editor) => handleChange({ ...note, markDownContent: editor }, SET_NOTES_MARKDOWN, `/notes/`, saveEditorMarkDownObjectToMw )}
            // content={ note?.markDownContent }
          /> 
      </div> */}

    <div className={cx('editor')} style={{ marginTop: '-900px', marginLeft: '-20px' }}>
      < LessonPlanIframeComponent 
          name="embed_readwrite" 
          source={`http://localhost:9001/p/inspectorgadget?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`}
          width="900px" 
          height="1900px"
          allow="camera;microphone"
          scrolling="yes"
          frameBorder="0"
          allowFullScreen
        /> 
    </div>

    <Meeting
      // userName={currentUser?.firstname}   
      // roomName={`${classRoomId}`}
      // resizedHeight={bottomHeight}
      containerHeight={adjustRoomSize( 2 )?.meetingRoomHeight}
      containerWidth={adjustRoomSize( 2 )?.meetingRoomWidth}  
    /> 
    </div>


        {/* <div className={cx('sidebar', 'withMargin', 'panel' )}>
          <div className={adjustRoomSize( 2 ).containerStyle}>   
            <div className={`meeting-stage-${(false) ? 'hidden' : 'visible'}`}>
            { 
                <Meeting
                  // userName={currentUser?.firstname}   
                  // roomName={`${classRoomId}`}
                  // resizedHeight={bottomHeight}
                  containerHeight={adjustRoomSize( 2 )?.meetingRoomHeight}
                  containerWidth={adjustRoomSize( 2 )?.meetingRoomWidth}  
                /> 
            }
            </div>
          </div> 
        </div> */}
 
  </ResizePanel>
      
     


 
  
  </div>
  
 
  <ResizePanel direction="n" style={{height: '200px'}}>
    <div className={cx('footer', 'panel')}>
      <div className={cx('footerArea')}>
        <div className={cx('footerAreaContent')}>
          <span>footer area, min height: 100px</span>
        </div>
      </div>
      <div className={cx('footerBottomBar')}>
        bottom bar
      </div>
    </div>
  </ResizePanel>
 

  </div>
  };
  
  export default connect( null, null )(Test002);