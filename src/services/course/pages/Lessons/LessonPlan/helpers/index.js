export const getUrls = (currentUser, courseId, lessonId, lessonTitle) => {
  const page = `${courseId}_${lessonId}_${lessonTitle}`; 

  return {
      meeting:{ prod: `https://joinmeet.today/${page}`, dev:`https://joinmeet.today/${page}`},
      editor:{ prod:`https://ravingfanstudents.com/editor/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`, dev:`http://localhost:9001/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false` },
      canvas:{ prod:`https://ravingfanstudents.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.firstname}`, dev:`http://localhost:8080/?whiteboardid=${page}&username=${currentUser?.firstname}`},
      recorder:{ prod:`https://ravingfanstudents.com/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`, dev:`http://localhost:3000/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`}
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

export function urls() {
  return { 
    // fix
  };
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