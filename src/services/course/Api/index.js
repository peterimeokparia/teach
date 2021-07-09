import { 
postData, 
putData, 
deleteData,   
uploadFiles, 
paymentStatus } from 'Services/course/helpers/ServerHelper';

import { 
tokenGenerator, 
privateKey} from 'Services/course/Pages/LoginPage/Components/Authentication';

//dotenv.config // done: fix
const PREFIX = "/api/v1";
// const PREFIX = "http://localhost:9005/api/v1";

export let apiAuthToken = undefined;

export const setAuthToken = token => {
  apiAuthToken = token;
};

export const deleteLessonFileByFileName = ( fileName ) => {
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

export const uploadUserAvatar = ( selectedFiles, file, prefix, teachObjectName, typeOfUpload ) => {
  return uploadFiles( selectedFiles, file, prefix, teachObjectName,  typeOfUpload );
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

export const get = ( route, prefix=PREFIX ) => {
  return fetch(prefix + route)
   .then(handleErrors)
    .then(response => response?.json() )
    .catch(error => { console.log(error); });
};

export const getById = ( id, routePlusId, prefix=PREFIX ) => {
  return fetch(prefix + routePlusId + `${id}`) 
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

export const remove = (data, route, prefix=PREFIX) => {
  return deleteData(prefix + route +`${ data?._id }`);
};

export const login = (user) => {
  if ( ! user?.userIsVerified ) {
    Error(`${user?.email} has not been verified. Kindly check  your email address inbox or spam.`);
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
         currentUser.cart.forEach(course  => {
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

function handleErrors(response){
  if ( ! response.ok ){
     return response.json()
      .then( error =>  { 
      throw new Error(  error.message ); 
     });
  }
  return response;
};
