import { 
postData, 
putData, 
deleteData, 
uploadAvatarFiles,  
uploadFiles, 
deleteFiles, 
uploadContent } from '../../helpers/serverHelper';

import { 
tokenGenerator, 
verifyToken, 
ensureToken, 
privateKey} from './pages/Login/authentication';

import axios from 'axios'


 //dotenv.config // to do
const PREFIX = "/api/v1";
export const NOTIFICATION_PREFIX = "http://localhost:9007/api/v1/notifications";
let apiAuthToken = null;


export const setAuthToken = token => {
  apiAuthToken = token;
}


//api/v1 
export const createCourse = ( name, price, description, createdBy, operatorId ) => {
  return postData(PREFIX+ '/courses', {
    name,
    price: parseFloat(price),
    description,
    createdBy,
    operatorId
  });
};



//api/v2 
export const createCourseNew = ( name, price, description, createdBy, operatorId ) => {
  return postData(PREFIX+ '/courses', {
    name,
    price: parseFloat(price),
    description,
    createdBy,
    operatorId
  });
};



//api/v1
export const getCourses = () => {
  return fetch(PREFIX + '/courses')
   .then(handleErrors)
     .then(response => response?.json() );
}



//api/v1
export const addLessons = ( title, courseId, lessonDate ) => {
  return postData(PREFIX + '/lessons', {
      title,
      courseId,
      lessonDate
  });
};



//api/v1
export const getLessons = ( courseId ) => {
  return fetch(PREFIX + `/lessons?courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${apiAuthToken}`
    }
  }) 
    .then(handleErrors)
     .then(response => response.json());
}


//api/v1
export const updateLessons = ( lesson ) => {
  return putData(PREFIX + `/lessons/${ lesson._id }`, lesson );
};


//api/v1
export const removeLessons = lesson => {
  return deleteData(PREFIX + `/lessons/${ lesson._id }`);
}


//api/v1
export const updateCourse = ( course ) => {
  return putData(PREFIX + `/courses/${ course._id }`, course );
};


//api/v1
export const removeCourse = course => {
  return deleteData(PREFIX + `/courses/${ course._id }`);
}



//api/v1
export const createClassRoom = ( name, description, users, createdBy, operatorId ) => {
  return postData(PREFIX+ '/classrooms', {
    name,
    description,
    users,
    createdBy,
    operatorId
  });
};



//api/v2
export const createClassRoomNew = ( name, description, users, createdBy, operatorId ) => {
  return postData(PREFIX+ '/classrooms', {
    name,
    description,
    users,
    createdBy,
    operatorId
  });
};



//api/v1
export const getClassRooms = () => {
  return fetch(PREFIX + '/classrooms')
   .then(handleErrors)
     .then(response => response?.json() );
}



export const updateClassRoom = ( classroom ) => {
  return putData(PREFIX + `/classrooms/${ classroom._id }`, classroom );
};



export const removeClassRoom = classroom => {
  return deleteData(PREFIX + `/classrooms/${ classroom._id }`);
}




export const addMeetings = ( invitees, 
                             userId,
                             sessions,
                             timeStarted,
                             courseId,
                             lessonId,
                             courseTitle,
                             lessonTitle,
                             meetingUrl,
                             user,
                             usersWhoJoinedTheMeeting ) => {
  return postData(PREFIX + '/meetings', {
        invitees, 
        userId,
        sessions,
        timeStarted,
        courseId,
        lessonId,
        courseTitle,
        lessonTitle,
        meetingUrl,
        user,
        usersWhoJoinedTheMeeting
  });
};




export const getMeetings = () => {
  return fetch(PREFIX + '/meetings')
   .then(handleErrors)
     .then(response => response?.json() );
}



export const getMeetingsByUserId = ( userId ) => {
  return fetch(PREFIX + `/meetings?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${apiAuthToken}`
    }
  }) 
    .then(handleErrors)
     .then(response => response.json());
}




export const updateMeetings = ( meetingId, meeting ) => {
  return putData(PREFIX + `/meetings/${ meetingId }`, meeting );
};




export const removeMeetings = meeting => {
  return deleteData(PREFIX + `/meetings/${ meeting?._id }`);
}




export const deleteLessonFileByFileName = ( fileName ) => {
  return fetch(PREFIX + `/fileUploads/delete?fileName=${fileName}`) 
    .then(handleErrors)
     .then(response => response.json());
}



export const updateUser = ( user ) => {
  return putData(PREFIX + `/users/${ user._id }`, user );
};



export const updateInvitationUrl = ( userId,  user) => {
  return putData(PREFIX + `/users/${ userId }`, user)
};



export const uploadUserAvatar = ( selectedFiles, file, prefix, teachObjectName, typeOfUpload ) => {
  return uploadFiles( selectedFiles, file, prefix, teachObjectName,  typeOfUpload );
};




export const purchase = ( currentUser ) => {
  
  try {

    if ( approvePayment(currentUser) ){
            
         currentUser.cart.forEach(course  => {
         
          currentUser.courses.push( course?.course?._id );

         });

         return updateUser({ 
                ...currentUser,
                courses: currentUser.courses,
                sessions: currentUser.sessions,
                paymentStatus: "approved"                     
         });      
  }

  } catch (error) {

    // check payment status
    updateUser(
      {
          ...currentUser,
          cart: [], 
          cartTotal: 0,
          paymentStatus: ""
        })

    throw new Error( error );
    
      // throw new Error( "Payment processing failed!" );
  }
}




export const autoRenew = (currentUser, session) => {

  let autoRenewStatus = {};

  try { 

    if ( approvePayment( currentUser ) ) { 

       autoRenewStatus['Session'] =  updateSession( session?._id, {
                                      ...session,
                                      status: true,
                                      autoRenewDates: [ ...session?.autoRenewDates, Date.now() ], 
                                      numberOfSessions: 0
                                    }); 

       autoRenewStatus['User'] = {...currentUser, paymentStatus: "approved" };
       
       updateUser({ ...currentUser, paymentStatus: "" });
    }

    return autoRenewStatus;
 
  } catch ( error ) {
    
    throw new Error( error );  
    //  throw new Error( "Payment processing failed!" );  
  }
 
}



export const purchaseHistory = (currentUser) => {
  return postData(PREFIX +  '/purchaseHistory', {
       ...currentUser,
       purchaseHistoryTimeStamp:getDateTime()
  });
}




export const addSession = (session) => {
  return postData(PREFIX + `/sessions`, { 
    ...session 
  });
}




export const getSessions = () => {
  return fetch(PREFIX + '/sessions')
   .then(handleErrors)
     .then(response => response?.json() );
}



export const getSessionsById = ( sessionId ) => {
  return fetch(PREFIX + `/sessions?sessionId=${sessionId}`) 
    .then(handleErrors)
     .then(response => response.json());
}





export const getSessionByUserId = ( userid ) => {
  return fetch(PREFIX + `/sessions?userId=${userid}`) 
    .then(handleErrors)
     .then(response => response.json());
}



export const updateSession = (sessionId, session) => {
  return putData(PREFIX + `/sessions/${ sessionId }`, 
  {
    ...session
  });      
}




export const removeSessions = session => {
  return deleteData(PREFIX + `/sessions/${ session?._id }`);
}




export const incrementSession = (session) => {
  
  session.numberOfSessions += 1;

  return updateSession(session?._id, {
        ...session
        // numberOfSessions: session.numberOfSessions
  });
     
}




export const decrementSessionCount = (session) => {

  if ( session.numberOfSessions === 0 ) return;

  session.numberOfSessions  -= 1;

  return updateSession(session, {
        ...session,
        numberOfSessions: session.numberOfSessions
});
  
}



export const addGrade = (grade) => {
  return postData(PREFIX + `/grades`, { 
    ...grade 
  });
}



export const getGrades = (  ) => {
  return fetch(PREFIX + `/grades`)
   .then(handleErrors)
     .then(response => response?.json() );
}



export const getGradesByStudentId = ( studentId ) => {
  return fetch(PREFIX + `/grades?studentId=${studentId}`)
   .then(handleErrors)
     .then(response => response?.json() );
}



export const getGradesById = ( gradeId ) => {
  return fetch(PREFIX + `/grades?gradeId=${gradeId}`) 
    .then(handleErrors)
     .then(response => response.json());
}


export const updateGrade = (grade) => {
  return putData(PREFIX + `/grades/${ grade?._id }`, 
  {
    ...grade
  });      
}




export const removeGrade = grade => {
  return deleteData(PREFIX + `/grades/${ grade?._id }`);
  
}





export const add = (data, route, prefix=PREFIX) => {
  return postData(prefix + route, { 
    ...data 
  });
}



export const get = ( route, prefix=PREFIX ) => {
  return fetch(prefix + route)
   .then(handleErrors)
     .then(response => response?.json() );
}




export const getById = ( id, routePlusId, prefix=PREFIX ) => {
  return fetch(prefix + routePlusId + `${id}`) 
    .then(handleErrors)
     .then(response => response.json());
}



export const update = (data, route, prefix=PREFIX) => {
  return putData(prefix + route + `${ data?._id }`, 
  {
    ...data
  });      
}




export const remove = (data, route, prefix=PREFIX) => {
  return deleteData(prefix + route +`${ data?._id }`);
}





export const login = (user) => {

  let token = tokenGenerator({usename: user.username, password: user.password}, privateKey, { expiresIn: '1h' })

  let loginCount = user?.loginCount; 

  let userIsValidated = true;

  let operatorId = user?.operatorId;


  if ( loginCount === undefined || loginCount === 0 ) {
    
       loginCount = 1;

  } else {

       loginCount += 1;
        
  }

  return putData(PREFIX + `/users/${ user._id }`, {
    //...user,
    token,
    userIsValidated,
    operatorId,
    loginCount
 })
}



export const signUp = (user) => {

  let token = tokenGenerator({usename: user.username, password: user.password}, privateKey, { expiresIn: '1h' })

  return postData(PREFIX + '/users', {
    ...user,
    token
 });
}



export const operatorSignUp = (operator) => {

  let token = tokenGenerator({usename: operator.email, password: operator.password}, privateKey, { expiresIn: '1h' })

  return postData(PREFIX + '/operators', {
    ...operator,
    token
 });
}




export const getUsers = () => {
  return fetch(PREFIX + '/users')
   .then(handleErrors)
     .then(response => response?.json() );
}




export const getOperators = () => {
  return fetch(PREFIX + '/operators')
   .then(handleErrors)
     .then(response => response?.json() );
}




export const getLoggedInUsers = () => {
  return fetch(PREFIX + '/login')
   .then(handleErrors)
     .then(response => response?.json() );
}





export const getLastUsersState = ( newUser ) => {

  let lastUsersSessionState =  JSON.parse(sessionStorage.getItem('lastState'));

     if ( newUser && newUser?.username !== lastUsersSessionState?.username ) {

         lastUsersSessionState = null;

         return lastUsersSessionState;
     } 
       
     return lastUsersSessionState;   
}




export const getCurrentUserByEmail = ( email ) => {
  return fetch(PREFIX + `/users/user/byEmail?email=${email}`) //IT-Guy 
    .then(handleErrors)
     .then(response => response.json());
}





export const getCurrentUserById = ( id ) => {
  return fetch(PREFIX + `/users/user?id=${id}`) 
    .then(handleErrors)
     .then(response => response.json());
}





export const approvePayment = (curentUser) => {
     
    if (! curentUser) { throw new Error ("please set the curentUser")};

    try {

           if ( handlePayment(curentUser) === "approved" ){

                 return true;
           }


    } catch(error) {
       
         console.log(error.message);
    }
     
    return false;
}





let paymentGatewayProvider = {provider: "xyz", approvalStatus: "approved"}

// paymentgateway integration and logic - this is a stub
 const handlePayment = (curentUser, gatewayProvider = paymentGatewayProvider) => {

    let approvalCode;
     
    if ( curentUser && gatewayProvider){
        
         approvalCode = gatewayProvider.approvalStatus;
    }

    return approvalCode;
}




export const getDateTime = () =>  {

  var currentdate = new Date(); 
  
   return "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
}




export const sendEmail = ( fromEmail, toEmail, subject, messageBody, userId ) => {
  return postData(PREFIX + '/emails', {
    fromEmail,
    toEmail,
    subject,
    messageBody,
    userId
  });
};



export const getCalendarEvents = () => {
  return fetch(PREFIX + '/calendar')
  .then(handleErrors)
    .then(response => response?.json() );
}



export const addNewCalendarEvent = ( calendarEvent ) => {
  return postData(PREFIX + '/calendar', {
   
    ...calendarEvent

  });
}



function handleErrors(response){
   
   if ( ! response.ok ){
      
      return response.json()
       .then( error =>  { 
         throw new Error(  error.message ) 
      });
   }
   
   return response;
}
