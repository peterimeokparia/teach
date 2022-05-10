import {
getHostName } from 'services/course/helpers/PageHelpers';

export const getUrls = (meetingId, currentUser) => {
  const page = `${meetingId}`;
  const editorPage =`${meetingId}`;

  return {
      meeting: `https://joinmeet.today/${page}`, 
      editor: getHostName()   ? `http://localhost:9001/p/${editorPage}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`
                              : `https://ravingfanstudents.com/editor/p/${editorPage}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`,
      canvas:  getHostName()  ? `http://localhost:9090/?whiteboardid=${page}&username=${currentUser?.firstname}`
                              : `https://ravingfanstudents.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.firstname}`,
      recorder: getHostName() ? `http://localhost:3000/LessonPlan/VideoModal/${page}/${page}`
                              : `https://ravingfanstudents.com/LessonPlan/VideoModal/${page}/${page}`,
      privateEditor: getHostName()  ? `http://localhost:9001/p/${editorPage}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`
                                    : `https://ravingfanstudents.com/editor/p/${editorPage}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`,
      privateCanvas: getHostName()  ? `http://localhost:9090/?whiteboardid=${page}&username=${currentUser?.firstname}`
                                    : `https://ravingfanstudents.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.firstname}`,
   };
};

export const meetingConfigSettings = (course, lessonTitle) => { 
    return { 
      roomName: `${course} ${lessonTitle}`,
      popOutScreen: 
      { 
        meetingContainerStyle: {
          containerWidth:  "100%",
          containerHeight: "100%"
        },     
        draggableDiv: {
          x: 1280,
          y: 10,
          width: 500,
          height: 190,
          minWidth: 500,
          minHeight: 190
        } 
      },
      fullScreen: 
      { 
        meetingContainerStyle: {
          containerWidth:  "720px",
          containerHeight: "720px"
        },
        draggableDiv: {
          x: 370,
          y: 0,
          width: 500,
          height: 190,
          minWidth: 500,
          minHeight: 190
        } 
     }
    };
};

export function getStudentsSubscribedToCurrentCourse(students, meeting){
  return students?.filter(student => meeting?.invitees?.includes(student?._id));
}

export function getCurrentStudentsPaidSessions(usersPaidSessions, student, tutor, selectedCourseId ){
  return usersPaidSessions?.find( currentSession => currentSession?.userId === student?._id && 
                     currentSession?.tutorId === tutor?._id &&  
                         currentSession?.courseId === selectedCourseId );  
};

export function adjustRoomSize( roomsize ) {
  let settings = {}, roomSizeSettings = { 
    settings: ( containerStyle, meetingRoomHeight, meetingRoomWidth ) => { return {
      containerStyle, 
      meetingRoomHeight, 
      meetingRoomWidth
    }; } 
  };

  let size = {
    videoCall:'video-call',
    videoCallFull:'video-call-full',
    videoCallHide:'video-call-hide',
    videoCallPercentageOne:'100%',
    videoCallPixelPoints:'920px'   // optimal is between 720 & 920
  };

  switch (roomsize) { 

    case 1:
      settings = roomSizeSettings.settings(size.videoCall, size.videoCallPercentageOne, size.videoCallPercentageOne);
      break;
    case 2:
      settings = roomSizeSettings.settings(size.videoCallFull, size.videoCallPixelPoints, size.videoCallPixelPoints);
      break;
    default:
      settings = roomSizeSettings.settings(size.videoCall, size.videoCallPercentageOne, size.videoCallPercentageOne);
      break;
      
  }
  return settings;
};

export function getBoardEditorId(lessonId, meetingId, classRoomId, eventId){
  if ( (meetingId === undefined || meetingId === "") && lessonId !== undefined && eventId !== undefined ){
    return eventId;
  }else  if ( (meetingId === undefined || meetingId === "") && lessonId !== undefined && ( eventId === undefined || eventId === "") ){
    return eventId;
  } else if ( meetingId !== undefined && lessonId === undefined ){
    return meetingId;
  } else {
    return classRoomId;
  }
};