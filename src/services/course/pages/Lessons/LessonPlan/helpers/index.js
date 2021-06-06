export const getUrls = (currentUser, courseId, lessonId, lessonTitle) => {
  const page = `${courseId}_${lessonId}_${lessonTitle}`; 

  return {
      meeting:{ prod: `https://joinmeet.today/${page}`, dev:`https://joinmeet.today/${page}`},
      editor:{ prod:`https://padsconnect247.com/editor/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false`, dev:`http://localhost:9002/p/${lessonTitle}?showControls=true&showChat=true&showLineNumbers=true&useMonospaceFont=false` },
      canvas:{ prod:`https://padsconnect247.com/whiteboard/?whiteboardid=${page}&username=${currentUser?.firstname}`, dev:`http://localhost:8080/?whiteboardid=${page}&username=${currentUser?.firstname}`},
      recorder:{ prod:`https://padsconnect247.com/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`, dev:`http://localhost:3000/LessonPlan/VideoModal/${courseId}/${lessonId}/${lessonTitle}`}
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
}

export function urls() {
  return { 
    // fix
  };
}

// export function handleRedirectionsOnPageLoad(){

//   if ( ! currentUser?.userIsValidated ) {  
//       navigate(`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`); 
//       return <Redirect to={`/${operatorBusinessName}/courses/${courseId}/buy`} noThrow/>
//       return <Redirect to={`/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${classRoomId}`} noThrow />
//   } 

//   if ( paidSession?.numberOfSessions === session?.totalNumberOfSessions  && session?.typeOfSession === "Package" && currentUser?.role === "Student" ) { 
//     return <Redirect to={`/${operatorBusinessName}/mycourses`} noThrow />
//   }
// }