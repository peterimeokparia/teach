import { 
getRequest,
postData, 
putData, 
deleteData,   
paymentStatus } from 'services/course/helpers/ServerHelper';

import { 
tokenGenerator, 
privateKey} from 'services/course/pages/LoginPage/components/Authentication';

import {
getHostName } from 'services/course/helpers/PageHelpers';

export const PREFIX = `${getHostName() ? '' : '/backend'}/api/v1`;

export let apiAuthToken = undefined;

export const setAuthToken = token => {
  apiAuthToken = token;
};

export const deleteFileByFileName = ( fileName ) => {

  return fetch(PREFIX + `/fileUploads/delete?fileName=${fileName}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log(error); } );
};

export const updateUser = ( user ) => {
  return putData(PREFIX + `/users/${ user._id }`, user );
};

export const updateInvitationUrl = ( userId,  user) => {
  return putData(PREFIX + `/users/${ userId }`, user);
};

export const autoRenew = (currentUser, session) => {
  let autoRenewStatus = {};

  try { 
    if ( approvePayment( currentUser ) ) { 
        autoRenewStatus['Session'] = updateSession( 
        session?._id, 
        updatedSession(session)
        ); 
       autoRenewStatus['User'] = {...currentUser, paymentStatus: "approved" };
       updateUser({ ...currentUser, paymentStatus: "" });
    };
      return autoRenewStatus;
  } catch ( error ) {
      throw new Error( error );
  };
};

function updatedSession (session) {
  return {
    ...session,
    status: true,
    autoRenewDates: [ ...session?.autoRenewDates, Date.now() ], 
    numberOfSessions: 0
  };
};

export const addEncrypted = (config) => {
  return postData(PREFIX + '/configs/encrypt',{
    ...config
  });
};

export const getDecrypted = (config) => {
  return fetch(PREFIX + `/configs/decrypt?id=${config?._id}`) 
  .then(handleErrors)
  .then(response => response.json())
  .catch(error => { console.log(error); });
};

export const purchaseHistory = (currentUser) => {
  return postData(PREFIX +  '/purchaseHistory', {
    ...currentUser,
    purchaseHistoryTimeStamp:getDateTime()
  });
};

export const addSession = (session) => {
  return postData(PREFIX + `/sessions`, { 
    ...session 
  });
};

export const getSessionsById = ( sessionId ) => {
  return fetch(PREFIX + `/sessions?sessionId=${sessionId}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log(error); });
};

export const getSessionByUserId = ( userid ) => {
  return fetch(PREFIX + `/sessions?userId=${userid}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log(error); });
};

export const updateSession = (sessionId, session) => {
  return putData(PREFIX + `/sessions/${ sessionId }`, 
  {
    ...session
  });      
};

export const incrementSession = (session) => {
  let numberOfSessions = session?.numberOfSessions;
  
  numberOfSessions += 1;
  return updateSession(session?._id, {
    ...session,
    numberOfSessions 
  });    
};

export const decrementSessionCount = (session) => {
  if ( session.numberOfSessions === 0 ) return;
  session.numberOfSessions  -= 1;
  return updateSession(session, {
    ...session,
    numberOfSessions: session.numberOfSessions
  });
};

export const getGradesById = ( gradeId ) => {
  return fetch(PREFIX + `/grades?gradeId=${gradeId}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log(error); } );
};

export const add = (data, route, prefix=PREFIX) => {
  return postData(prefix + route, { 
    ...data 
  });
};


// change
export const get = ( route, prefix=PREFIX ) => {
  return getRequest(prefix + route)
   .then(handleErrors)
    .then(response =>  response?.json() )
    .catch(error => { console.log(error); });
};

export const getById = ( id, routePlusId, prefix=PREFIX ) => {
  return getRequest(prefix + routePlusId + `${id}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log(error); });
};

export const getPagedData = ( routePlusPageLimit, prefix=PREFIX ) => {
  return getRequest(prefix + routePlusPageLimit ) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log(error); });
};


export const update = (data, route, prefix=PREFIX) => {
  return putData(prefix + route + `${ data?._id }`, 
  {
    ...data
  });      
};

export const updateWithId = (data, route, id, prefix=PREFIX) => {
  return putData(prefix + route + `${ data[id] }`, 
  {
    ...data
  });      
}

export const remove = (data, route, prefix=PREFIX) => {
  return deleteData(prefix + route +`${ data?._id }`);
};

export const login = (user) => {
  if ( ! user?.userIsVerified ) {
    return Error(`Please verify your account. Kindly, check your email.`);
  }
  let token = tokenGenerator({username: user?.email, password: user.password}, privateKey, { expiresIn: '1h' });
  let loginCount = user?.loginCount; 
  let userIsValidated = true;
  let userIsVerified = user?.userIsVerified;
  let operatorId = user?.operatorId;
  let unHarshedPassword = user?.unHarshedPassword;

  if ( loginCount === undefined || loginCount === 0 ) {
      loginCount = 1;
  } else {
      loginCount += 1;
  }
  return putData(PREFIX + `/users/login/${user?._id}`, { 
    unHarshedPassword,
    token,
    userIsValidated,
    userIsVerified,
    operatorId,
    loginCount
 });
};

export const resetPassword = (user) => {
  let newUserPassword = user?.newUserPassword;
  let token = tokenGenerator({ username: user?.email, password: user.password}, privateKey, { expiresIn: '1h' });

  return putData(PREFIX + `/users/reset/${user?._id}`, {
    token,
    newUserPassword
 });
};

export const signUp = (user, route='/users/register') => {
  let token = tokenGenerator({usename: user.username, password: user.password}, privateKey, { expiresIn: '1h' });

  return postData(PREFIX + route, {  
    ...user,
    token
 });
};

export const operatorSignUp = (operator) => {
  let token = tokenGenerator({usename: operator.email, password: operator.password}, privateKey, { expiresIn: '1h' });

  return postData(PREFIX + '/operators', {
    ...operator,
    token
 });
};

export const getLoggedInUsers = () => {
  return fetch(PREFIX + '/login')
  .then(handleErrors)
  .then(response => response?.json() )
  .catch(error => { console.log( error ); });
};

export const getLastUsersState = ( newUser ) => {
  let lastUsersSessionState =  JSON.parse(sessionStorage.getItem('lastState'));

     if ( newUser && newUser?.username !== lastUsersSessionState?.username ) {
         lastUsersSessionState = null;
         return lastUsersSessionState;
     }; 
  return lastUsersSessionState;   
};

export const getCurrentUserByEmail = ( credentials ) => {
  return fetch(PREFIX + `/users/user/byEmail?email=${credentials}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log( error ); });
};

export const getCalendarsByUserId = ( userId ) => {
  return fetch(PREFIX + `/calendar/calendars/byUserId?userId=${userId}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log( error ); });
};

export const getEventsByUserId = ( userId ) => {
  return fetch(PREFIX + `/event/events/byUserId?userId=${userId}`) 
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => { console.log( error ); });
};

export const approvePayment = (curentUser) => {
  if (! curentUser) { throw new Error ("please set the curentUser"); };
    try {
      if ( handlePayment(curentUser) === paymentStatus.Approved ){
          return true;
      }
    } catch(error) { console.log(error.message);
  }; 
  return false;
};

let paymentGatewayProvider = {provider: "xyz", approvalStatus: "approved"};
 const handlePayment = (curentUser, gatewayProvider = paymentGatewayProvider) => {
  let approvalCode;

  if ( curentUser && gatewayProvider){ 
        approvalCode = gatewayProvider.approvalStatus;
  };
  return approvalCode;
};

export const getDateTime = () =>  {
  let currentdate = new Date(); 

   return "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
};

export const sendEmail = ( fromEmail, toEmail, subject, messageBody, userId ) => {
  return postData(PREFIX + '/emails', 
  {
    fromEmail,
    toEmail,
    subject,
    messageBody,
    userId
  });
};

export const purchase = ( currentUser ) => {
  try {
    if( approvePayment(currentUser) ) {   
         currentUser.cart?.forEach(course  => {
          if ( ! currentUser.courses?.includes( course?.course?._id ) ) {
            currentUser = { ...currentUser, courses: [ ...currentUser.courses, course?.course?._id ] };
          }
          // currentUser.courses.push( course?.course?._id );
      });
      return updateUser({ 
          ...currentUser,
          courses: currentUser.courses,
          sessions: currentUser.sessions,
          paymentStatus: paymentStatus.Approved                  
      });      
     }
  } catch (error) {
    updateUser(
      {
        ...currentUser,
        cart: [], 
        cartTotal: 0,
        paymentStatus: ""
      });
    throw new Error( error );    // throw new Error( "Payment processing failed!" ); 4 later
  };
};

export function addEditorFullTextSearchContent( element, route, duration = 2000) {
  const saveEditorContentHandle = setTimeout(() => {
    add( element, route ) 
      .then( response => {
          clearTimeout( saveEditorContentHandle );
      })
      .catch( error => { 
        console.warn( JSON.stringify( error ));
      });
  }, duration );
}

export function saveEditorContent( element, route, duration = 2000) {
  const saveEditorContentHandle = setTimeout(() => {
      update( element, route )
      .then( response => {
          clearTimeout( saveEditorContentHandle );
          return response;
      })
      .catch( error => { console.warn( JSON.stringify( error )) 
          return error;
      });
  }, duration );
}

let operatorBusinessName= "boomingllc";

export const mockStoreObject = {
  operators: { operators: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
  operator: { operators: {_id: "5fcb0e19fd5e0117dc09dcfa", operatorBusinessName} },
  notifications: { pushNotificationSubscribers : {_id:"5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" } },
  users: { users: {_id: "PERSON5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
  user: { users: {_id: "PERSON5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
  currentUser: { user: {_id: "PERSON5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
  courses: { courses: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
  grades: { grades: {_id: "COURSE5fcb0e19fd5e0117dc09dcfa", operatorBusinessName, operatorId: "5fcb0e19fd5e0117dc09dcfa" }},
  classrooms: { classrooms: {displaySideBarDropDown: false }},
  sessions: { sessions: {_id: "SESSIONS5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true } },
  lessons: { lessons: { selectedLessonFromLessonPlanDropDown: "Test Lesson" } },
  // courses: { courses: { selectedCourseFromLessonPlanCourseDropDown: "Test Course" }  },
  meetings: { meetings: {_id: "MEETING5fcb0e19fd5e0117dc09dcfa", numberOfSessions: 9, totalNumberOfSessions: 1, status: true }  },
  timeLines: { timeLines: { _id: "MEETING5fcb0e19fd5e0117dc09dcfa",  timeLines: "Test timeLines" }  },
  calendar: { calendars: { calendar: "Test calendar" }  },
  calendars: { calendars: { calendars: "Test calendars" }  },
  events: { events: {}},
  questions: { questions: {}},
  calendarEventType: { calendar: {}},
  // onlineQuestions: { onlineQuestionCourseId: { onlineQuestionCourseId: "Test Course" }  },
  onlineQuestions: {onlineQuestions: { onlineQuestionCourseId: { onlineQuestionCourseId: "Test Course" } }  },
  hasRecordingStarted: { hasRecordingStarted: false  },
  onlineAnswers: { onlineAnswers: []  },
  // onlineQuestions: { onlineQuestions: []  },
  app: { preview: false },
  onlineComments: { onlineComments: []}
};

function handleErrors(response){
  if ( ! response.ok ){
     return response.json()
      .then( error =>  { 
      throw new Error(  error.message ); 
     });
  }
  return response;
};
