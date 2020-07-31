import { postData, putData, deleteData } from '../../helpers/serverHelper';
import { tokenGenerator, verifyToken, ensureToken, privateKey} from './authentication';


const PREFIX = "/api";


let apiAuthToken = null;


export const setAuthToken = token => {
  apiAuthToken = token;
}



export const createCourse = ( name, price, createdBy ) => {
   return postData(PREFIX + '/courses', {
     name,
     price: parseFloat(price),
     createdBy
   });
};



export const getCourses = () => {
    return fetch(PREFIX + '/courses')
     .then(handleErrors)
       .then(response => response?.json() );
}



export const addLessons = ( title, courseId ) => {
    return postData(PREFIX + '/lessons', {
        title,
        courseId
    });
};


export const updateLessons = ( lesson ) => {
  return putData(PREFIX + `/lessons/${ lesson.id }`, lesson );
};



export const updateUser = ( currentUser ) => {


    updateCurrentUser(currentUser);

    localStorage.removeItem('currentuser');
    
    localStorage.setItem('currentuser', JSON.stringify(currentUser));

}


export const updateCurrentUser = ( user ) => {
  return putData(PREFIX + `/users/${ user.id }`, 
 {
  ...user,
  cart: [], 
  cartTotal: 0,
  paymentStatus: ""
} 
  );
};


export const updateCurrentUserOnPurchase = ( user ) => {
  return putData(PREFIX + `/users/${ user.userId }`, 
 {
  ...user,
  cart: [], 
  cartTotal: 0,
  paymentStatus: ""
} 
  );
};



export const purchase = (currentUser, currentUserPurchaseHistory ) => {

  let existingPurchase = ( currentUser.id === currentUserPurchaseHistory?.id );
  
  try {

    if ( approvePayment(currentUser)){
            
      currentUser.cart.forEach( course => {
  
          currentUser.courses.push( course.id );
      });


    return ( existingPurchase )   
                      ?  putData(PREFIX + `/buy/${currentUser.id}`, {
                          ...currentUser,
                          courses: currentUser.courses,
                          paymentStatus: "approved"
                          
                        })   
     
                      : postData(PREFIX + '/buy', {
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
  return postData(PREFIX + '/purchaseHistory', {
       ...currentUser,
       purchaseHistoryTimeStamp:getDateTime()
  });
}



export const getLessons = ( courseId ) => {
  return fetch(PREFIX + `/lessons?courseId=${courseId}`, {
    headers: {
      Authorization: `Bearer ${apiAuthToken}`
    }
  }) 
    .then(handleErrors)
     .then(response => response.json());
}






export const removeLessons = lesson => {
  return deleteData(PREFIX + `/lessons/${ lesson.id }`);
}




export const login = (user) => {

  let token = tokenGenerator({usename: user.username, password: user.password}, privateKey, { expiresIn: '1h' })

  return postData(PREFIX + '/login', {
    ...user,
    token
 });
}



export const signUp = (user) => {

  let token = tokenGenerator({usename: user.username, password: user.password}, privateKey, { expiresIn: '1h' })

  return postData(PREFIX + '/users', {
    ...user,
    token
 });
}



// export const getUser = ( username ) => {
//   return fetch(PREFIX + `/users?username=${username}` )
//     .then(handleErrors)
//      .then(response => response.json());
// }



export const getUsers = () => {
  return fetch(PREFIX + '/users')
   .then(handleErrors)
     .then(response => response?.json() );
}



export const getLoggedInUsers = () => {
  return fetch(PREFIX + '/login')
   .then(handleErrors)
     .then(response => response?.json() );
}


export const getLastUsersState = () => {
  return JSON.parse(localStorage.getItem('lastState'));
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


function handleErrors(response){
   
   if ( ! response.ok ){
      
      return response.json()
       .then( error =>  { throw new Error(  error.message ) });
   }
   
   return response;
}
