import React from 'react';
import MaterialVideoPage  from 'services/course/pages/MaterialVideoPage';
import renderer from 'react-test-renderer';
import thunk from "redux-thunk"; 
import * as reactRedux from 'react-redux';
import { Provider, useSelector } from "react-redux";
import { applyMiddleware } from 'redux'; 
import configureStore from 'redux-mock-store';

export const videoCallIconMain = ( capturingVideo, id, selectedId ) => {
    return {
      fontSize: 60,
      "visibility": ( capturingVideo && id === selectedId ) ? "hidden" : "visible",
    };
  };

  export const videoCallIcon = ( capturingVideo, id, selectedId ) => {
    return {
      fontSize: 60,
      "visibility": ( capturingVideo && id === selectedId ) ? "hidden" : "visible",
    };
  };

  export const shareScreenIcon = ( capturingVideo, id, selectedId  ) => {
    return {
      fontSize: 55,
      position: "relative",
      visibility: ( capturingVideo && id === selectedId ) ? "visible" : "hidden"
    };
  };
  
  export const exitVideoCallIcon = (capturingVideo, id, selectedId  ) => {
    return {
      fontSize: 60,
      position: "relative",
      "visibility": ( capturingVideo && id === selectedId ) ? "visible" : "hidden",
    };
  };

  export const onlineQuestionVideoDeleteIconStyle = (capturingVideo, id, selectedId  ) => {
    return {
      fontSize: 60,
      position: "relative",
      "visibility": ( capturingVideo && id === selectedId ) ? "visible" : "hidden",
    };
  };

  let element = { _id: "10000004"}

 let videoMeta = element  => { 
    return {
      videoCallIconMain:videoCallIconMain,
      deleteIconStyle: onlineQuestionVideoDeleteIconStyle,
      videoCallIcon,
      shareScreenIcon,
      exitVideoCallIcon,
      videoNamePrefix: 'OnlineQuestionVideoMarkDownEditors', 
      recordButtonText: 'Record Question',
      displayMaterialButton: true,
      videoSectionClassNameRecording: "mainVideoSection-recording",
      videoSectionClassNameRecordingStopped: "mainVideoSection-recordingStopped",
      videoSectionClassNameNoRecording: "mainVideoSection-recordingStopped", 
      videoClassName: ( element?.videoUrl === ""  ) ? "videoPlayer" : "",
      exitVideoCallIconPageName: "OnlineListItems",
      videoSectionCallOut: "videoSectionCallOut",
      videoMetaData: { inputFieldId: element?._id, currentQuestion: element, name: element?._id?.toString() },
      videoName: `${element?._id}_${element?._id}_${element?._id}_${element?.type}`,
      videoMetaDataExternalId:'name',
      buttonClassName: `toggle-stage-btns${( true ) ? "-show" : "-hide"}`, 
      objectId: element?._id, 
      displaySavedRecording: true
    }};

jest.mock('../../../Api');

const mockStore = configureStore([]);
  
let operatorBusinessName= "boomingllc";
let selectedUserId= "PERSON010010100000047";

describe('MaterialVideoPage', () =>  {  

 let  store = mockStore({
      operators: { operators: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
      notifications: { pushNotificationSubscribers : {_id:"5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" } },
      users: { users: {_id: "PERSON5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
      courses: { courses: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
      grades: { grades: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
      classrooms: { classrooms: {displaySideBarDropDown: false }},
      sessions: { sessions: {_id: "SESSIONS5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true } },
      lessons: { lessons: { selectedLessonFromLessonPlanDropDown: "Test Lesson" } },
      courses: { courses: { selectedCourseFromLessonPlanCourseDropDown: "Test Course" }  },
      meetings: { meetings: {_id: "MEETING5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true }  },
      hasRecordingStarted: { hasRecordingStarted: true}
  }, applyMiddleware(thunk));

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const element = {}
 
  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('renders as expected', async () => {

    const dispatch = jest.fn();
    useDispatchMock.mockReturnValue(dispatch);
    
    const saveRecording = () => {}
    const resetAllStartSettings = () => {}
    const resetAllStopSettings = () => {}
    function setVideoModalMode( modal ) {
        console.log('test')
    };


    const tree = renderer.create(
      <Provider store={store}>
        <MaterialVideoPage 
                 videoMeta={videoMeta()} 
                 element={element}
                 saveRecording={saveRecording} 
                 resetAllStartSettings={resetAllStartSettings}
                 resetAllStopSettings={resetAllStopSettings}
                 setVideoModalMode={(modal) => setVideoModalMode(modal)}
                 videoModalMode={true}
                 extendedMeetingSettings={false}
        //   selectedUserId={selectedUserId}
        //   operatorBusinessName={operatorBusinessName } 
      /> 
    </Provider>
    );
      //console.log( happy - tree  - no sad trees );
      expect(tree.toJSON()).toMatchSnapshot();
  })
});




