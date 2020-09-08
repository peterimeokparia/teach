import { postData, putData, deleteData,  deleteFiles, uploadContent} from '../../helpers/serverHelper';
import { tokenGenerator, verifyToken, ensureToken, privateKey} from './authentication';
import axios from 'axios'



const PREFIX = "/api";
const Url = "http://localhost:9005"; //dotenv.config


let apiAuthToken = null;


export const setAuthToken = token => {
  apiAuthToken = token;
}



export const createCourse = ( name, price, createdBy ) => {
  return postData(Url+ '/courses', {
    name,
    price: parseFloat(price),
    createdBy
  });
};




export const getCourses = () => {
  return fetch(Url + '/courses')
   .then(handleErrors)
     .then(response => response?.json() );
}




export const addLessons = ( title, courseId ) => {
  return postData(Url + '/lessons', {
      title,
      courseId
  });
};




export const getLessons = ( courseId ) => {
  return fetch(Url + `/lessons?courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${apiAuthToken}`
    }
  }) 
    .then(handleErrors)
     .then(response => response.json());
}



export const updateLessons = ( lesson ) => {
  return putData(Url + `/lessons/${ lesson._id }`, lesson );
};



export const removeLessons = lesson => {
  return deleteData(Url + `/lessons/${ lesson._id }`);
}



export const updateCourse = ( course ) => {
  return putData(Url + `/courses/${ course._id }`, course );
};



export const removeCourse = course => {
  return deleteData(Url + `/courses/${ course._id }`);
}





export const addMeetings = ( invitees, 
                             userId,
                             timeStarted,
                             courseId,
                             lessonId,
                             courseTitle,
                             lessonTitle,
                             meetingUrl ) => {
  return postData(Url + '/meetings', {
        invitees, 
        userId,
        timeStarted,
        courseId,
        lessonId,
        courseTitle,
        lessonTitle,
        meetingUrl
  });
};




export const getMeetings = ( userId ) => {
  return fetch(Url + `/meetings?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${apiAuthToken}`
    }
  }) 
    .then(handleErrors)
     .then(response => response.json());
}




export const updateMeetings = ( meetingId, meeting ) => {
  return putData(Url + `/meetings/${ meetingId }`, meeting );
};




export const removeMeetings = meeting => {
  return deleteData(Url + `/meetings/${ meeting?._id }`);
}



export const deleteLessonFile = file => {
   return deleteFiles( file );
}





export const updateUser = ( currentUser ) => {

  localStorage.setItem('currentuser', JSON.stringify(currentUser));

  return updateCurrentUser(currentUser?._id, currentUser);
}




export const updateCurrentUser = ( userId,  user ) => {
  return putData(Url + `/users/${ userId }`, 
  {
    ...user,
    cart: [], 
    cartTotal: 0,
    paymentStatus: ""
  } 
)};



export const updateInvitationUrl = ( userId,  user) => {
  return putData(Url + `/users/${ userId }`, user)
};




export const purchase = ( currentUser ) => {
  
  try {

    if ( approvePayment(currentUser)){
            
      currentUser.cart.forEach( course => {
  
          currentUser.courses.push( course._id );
      });


    return putData(Url + `/users/buy/${currentUser._id}`, {
            ...currentUser,
            courses: currentUser.courses,
            paymentStatus: "approved"
                          
    });      
  }

  } catch (error) {
    
      throw new Error("Payment processing failed!");
  }
}




export const purchaseHistory = (currentUser) => {
  return postData(Url +  '/purchaseHistory', {
       ...currentUser,
       purchaseHistoryTimeStamp:getDateTime()
  });
}






export const login = (user) => {

  let token = tokenGenerator({usename: user.username, password: user.password}, privateKey, { expiresIn: '1h' })

  let loginCount = user?.loginCount;

  if ( loginCount === undefined || loginCount === 0 ) {
    
       loginCount = 1;

  } else {

       loginCount += 1;
        
  }

  return putData(Url + `/users/${ user._id }`, {
    ...user,
    token,
    loginCount
 })

//   return postData(PREFIX + '/login', {
//     ...user,
//     token
//  });
}



export const signUp = (user) => {

  let token = tokenGenerator({usename: user.username, password: user.password}, privateKey, { expiresIn: '1h' })

  return postData(Url + '/users', {
    ...user,
    token
 });
}




export const getUsers = () => {
  return fetch(Url + '/users')
   .then(handleErrors)
     .then(response => response?.json() );
}





export const getLoggedInUsers = () => {
  return fetch(Url + '/login')
   .then(handleErrors)
     .then(response => response?.json() );
}




export const getLastUsersState = ( newUser ) => {

  let lastUsersSessionState =  JSON.parse(localStorage.getItem('lastState'));

     if ( newUser && newUser?.username !== lastUsersSessionState?.username ) {

         lastUsersSessionState = null;

         return lastUsersSessionState;

     } 
       
     return lastUsersSessionState;
      
}


export const getUserByUserName = ( username ) => {
  return fetch(Url + `/users/user?username=${username}`, {
    headers: {
      Authorization: `Bearer ${apiAuthToken}`
    }
  }) 
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

// paymentgateway integration and logic
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
  return postData(Url + '/emails', {
    fromEmail,
    toEmail,
    subject,
    messageBody,
    userId
  });
};




function handleErrors(response){
   
   if ( ! response.ok ){
      
      return response.json()
       .then( error =>  { throw new Error(  error.message ) });
   }
   
   return response;
}
