import { createCourse, getCourses, addLessons, getLessons, updateLessons, removeLessons, login, signUp, getUsers, getLoggedInUsers, updateCurrentUser, purchase, updateUser, approvePayment, purchaseHistory, getDateTime, updateCurrentUserOnPurchase  } from './api';

export const ADD_COURSE_BEGIN = "ADD COURSE BEGIN";
export const ADD_COURSE_SUCCESS = "ADD COURSE SUCCESS";
export const ADD_COURSE_ERROR = "ADD COURSE ERROR";
export const LOAD_COURSES_BEGIN = "LOAD COURSES BEGIN";
export const LOAD_COURSES_SUCCESS = "LOAD COURSES SUCCESS";
export const LOAD_COURSES_ERROR = "LOAD COURSES ERROR";
export const OPEN_NEW_COURSE_MODAL = "OPEN NEW COURSE MODAL";
export const CLOSE_NEW_COURSE_MODAL = "CLOSE NEW COURSE MODAL";
export const ADD_NEW_LESSON_BEGIN = "ADD ßNEW LESSON BEGIN";
export const ADD_NEW_LESSON_SUCCESS = "ADD NEW LESSON SUCCESS";
export const ADD_NEW_LESSON_ERROR = "ADD NEW LESSON ERROR";
export const LOAD_LESSONS_BEGIN = "LOAD LESSONS BEGIN";
export const LOAD_LESSONS_SUCCESS = "LOAD LESSONS SUCCESS";
export const LOAD_LESSONS_ERROR = "LOAD LESSONS ERROR";
export const SAVE_LESSON_BEGIN = "SAVE LESSON BEGIN";
export const SAVE_LESSON_SUCCESS = "SAVE LESSON SUCCESS";
export const SAVE_LESSON_ERROR = "SAVE LESSON ERROR";
export const RESET_LESSON_ERROR = "RESET LESSON ERROR";
export const DELETE_LESSON_SUCCESS = "DELETE LESSON SUCCESS";
export const DELETE_LESSON_BEGIN = "DELETE LESSON BEGIN";
export const DELETE_LESSON_ERROR = "DELETE LESSON ERROR";
export const SET_LESSON_MARKDOWN = "SET LESSON MARKDOWN";
export const TOGGLE_PREVIEW_MODE = "TOGGLE PREVIEW MODE";
export const TOGGLE_BOARD_OR_EDITOR = "TOGGLE BOARD OR EDITOR";
export const LOGIN_BEGIN = "LOGIN BEGIN";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const LOGIN_ERROR= "LOGIN ERROR";
export const SIGN_UP_BEGIN = "SIGN UP BEGIN";
export const SIGN_UP_SUCCESS = "SIGN UP SUCCESS";
export const SIGN_UP_ERROR = "SIGN UP ERROR";
export const STREAMING_SUCCESS = "STREAMING SUCCESS";
export const LOAD_USERS_BEGIN  = "LOAD USERS BEGIN";
export const LOAD_USERS_SUCCESS = "LOAD USERS SUCCESS"; 
export const LOAD_USERS_ERROR = "LOAD USERS ERROR";
export const LOAD_LOGGEDIN_USERS_BEGIN = "LOAD LOGGEDIN USERS BEGIN";
export const LOAD_LOGGEDIN_USERS_SUCCESS = "LOAD LOGGEDIN USERS SUCCESS";
export const LOAD_LOGGEDIN_USERS_ERROR = "LOAD LOGGEDIN USERS ERROR";
export const LOGOUT_SUCCESS = "LOGOUT SUCCESS";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";
export const BUY_COURSE_BEGIN = "BUY COURSE BEGIN";
export const BUY_COURSE_SUCCESS = "BUY COURSE SUCCESS";
export const BUY_COURSE_ERROR = "BUY COURSE ERROR";
export const ADD_TO_SALES_CART = "ADD TO SALES CART";
export const REMOVE_FROM_SALES_CART = "REMOVE FROM SALES CART";
export const PURCHASE_HISTORY_BEGIN = "PURCHASE HISTORY BEGIN";
export const PURCHASE_HISTORY_SUCCESS = "PURCHASE HISTORY SUCCESS";
export const PURCHASE_HISTORY_ERROR = "PURCHASE HISTORY ERROR";
export const RESET_USERS_CART = "RESET USERS CART";
export const LESSON_VIDEO_METADATA = "LESSON VIDEO METADATA";
export const SELECTED_LESSON_URL = "SELECTED LESSON URL";
export const UPLOAD_FILE_SUCCESS = "UPLOAD FILE SUCCESS";


 export const addNewCourse = ( name, price, user ) => {
     return dispatch => {
         
        dispatch({ type: ADD_COURSE_BEGIN })

         return createCourse(name, price, user.id)
         .then(course => {

            user.courses.push(course.id);
            
            updateUser(user)
             
            dispatch({ type: ADD_COURSE_SUCCESS, payload: course })      
          
         })
          .catch(error => { 
              dispatch({ type: ADD_COURSE_ERROR, error })
          })
     }
 }


 export const addToSalesCart = ( course ) => {
    return dispatch => { 
        dispatch({ type: ADD_TO_SALES_CART, payload: course });
    }
 }

 
 export const removeItemFromCart = ( course ) => {
    return dispatch => { 
        dispatch({ type: REMOVE_FROM_SALES_CART, payload: course });
    }
 }



 export const buyCourse = ( currentUser ) => {
    return ( dispatch, getState ) => {

        let resetUsersCartOnError; 
        
        dispatch({ type: BUY_COURSE_BEGIN });

        return purchase(currentUser, getState().users.buy)
        .then(user => {

             dispatch({ type: BUY_COURSE_SUCCESS, payload: user });

             addToPurchaseHistory(user);
     
             updateCurrentUser( user?.userId, user)
              .then(response => { 
            
                dispatch({ type: RESET_USERS_CART, payload: { 
                    response
                    // ...user,
                    // cart: [],
                    // paymentStatus: "",
                    // cartTotal: 0,
                 }   
                }); 
        
                dispatch({ type: LAST_LOGGEDIN_USER, payload: {
                    response 
                 }   
                }); 

             })
               .catch(error => { 

                   console.log( error );

                   resetUsersCartOnError = user;
                
                })
            
                // localStorage.removeItem('currentuser');
                // localStorage.setItem('currentuser', JSON.stringify(user));

        })
         .catch(error => { 

            console.log( error );

             dispatch({ type: RESET_USERS_CART, payload: { 
                ...resetUsersCartOnError,
                paymentStatus: ""
             } 
            }); 
     
            dispatch({ type: LAST_LOGGEDIN_USER, payload: { 
                ...resetUsersCartOnError,
                paymentStatus: ""
             }   
            });    


         });
    }
}



export const addToPurchaseHistory = (currentUser) => {
    return dispatch => {
         dispatch({ type: PURCHASE_HISTORY_BEGIN })
 
        return purchaseHistory(currentUser)
         .then( history => {

            dispatch({ type: PURCHASE_HISTORY_SUCCESS, history})
         })
          .catch( error => {
               dispatch({type: PURCHASE_HISTORY_ERROR, error });
          })
    }
}




export const resetUsersCartAfterPurchase = (currentUser) => {

    return dispatch => {

          dispatch({ type: RESET_USERS_CART, payload: {
              ...currentUser, 
              cart: [],
              cartTotal: 0,
              paymentStatus: "" 
           }
           
        });

          localStorage.removeItem('currentuser');
    }
}



 export const loadCourses = () => {
     return dispatch => {
         dispatch({ type: LOAD_COURSES_BEGIN })
         getCourses()
          .then( course => {
              dispatch({ type: LOAD_COURSES_SUCCESS, payload: course });
          })
            .catch( error => {
                dispatch({ type: LOAD_COURSES_ERROR , error })
            });
     }
 }



 export const loadUsers = () => {
    return dispatch => {
        dispatch({ type: LOAD_USERS_BEGIN })
        getUsers()
         .then( users => {
             dispatch({ type: LOAD_USERS_SUCCESS, payload: users });
         })
           .catch( error => {
               dispatch({ type: LOAD_USERS_ERROR , error })
           });
    }
}



export const loadLoggedInUsers = () => {
    return dispatch => {
        dispatch({ type: LOAD_LOGGEDIN_USERS_BEGIN })
        getLoggedInUsers()
         .then( users => {
             dispatch({ type: LOAD_LOGGEDIN_USERS_SUCCESS, payload: users });
         })
           .catch( error => {
               dispatch({ type: LOAD_LOGGEDIN_USERS_ERROR , error })
           });
    }
}



export const lastLoggedInUser = () => {

    return dispatch  => {

      try{
           
        let user = JSON.parse(localStorage.getItem('currentuser'));
        
        dispatch({ type: LAST_LOGGEDIN_USER, payload: user})     

      } catch(e){

          dispatch({ type: LOGOUT_SUCCESS })
      } 
    }
}

 
 
 export const openNewCourseModal = () => ({
     type: OPEN_NEW_COURSE_MODAL
 });



 export const closeNewCourseModal = () => ({
    type: CLOSE_NEW_COURSE_MODAL
});




export const addNewLesson = (name, courseId) => {
     return dispatch => {
          dispatch({ type: ADD_NEW_LESSON_BEGIN })
          return addLessons( name, courseId )
           .then( lesson => {  
               dispatch({        
                type: ADD_NEW_LESSON_SUCCESS, payload: lesson }) 
            }).catch( error => {
                dispatch({ type: ADD_NEW_LESSON_ERROR , error })
            });
          
     };
};




export const saveLesson = ( lesson ) => {
    return dispatch => {
         dispatch({ type: SAVE_LESSON_BEGIN })
         return updateLessons( lesson )
          .then( lesson => {  
              dispatch({        
               type: SAVE_LESSON_SUCCESS, payload: lesson }) 
           }).catch( error => {
               dispatch({ type: SAVE_LESSON_ERROR , error })
           });
         
    };
};





export const loadLessons = ( courseId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSONS_BEGIN })
        getLessons( courseId )
         .then( lesson => {
             dispatch({ type: LOAD_LESSONS_SUCCESS, payload: lesson });
         })
           .catch( error => {
               dispatch({ type: LOAD_LESSONS_ERROR , error })
           });
    }
}



export const deleteLesson = lesson => {
    return dispatch => {
        dispatch({ type: DELETE_LESSON_BEGIN })
         return removeLessons( lesson )
         .then( () => {
             dispatch({ type: DELETE_LESSON_SUCCESS, payload: lesson });
         })
           .catch( error => {
               dispatch({ type: DELETE_LESSON_ERROR , error })
           });
    }
}




let timerHandle = null;
export const setLessonMarkDown = ( lesson, markDown ) => {
    return ( dispatch, getState )  => {

        dispatch({ type: SET_LESSON_MARKDOWN, payload: {   
            lesson,
            markDown
          }
        });

        if ( timerHandle ){
            clearTimeout( timerHandle );
        }

        timerHandle = setTimeout(() => {
    
            console.log("...saving markdown text"); 
            const latestLesson = getState().lessons.lessons[ lesson?.id ]; 
            dispatch(saveLesson( latestLesson ));

        }, 2000);  
    };
}


export const getLessonVideoUrl = (videoUrl) => {
    return dispatch => {
        dispatch({ type: SELECTED_LESSON_URL, payload: videoUrl})
    }
}


export const loginUser = (newUser) => {
    return dispatch => {
        dispatch({ type: LOGIN_BEGIN })
        login(newUser)
         .then( user => {
             dispatch({ type: LOGIN_SUCCESS, payload: user });
         })
           .catch( error => {
               dispatch({ type: LOGIN_ERROR , error })
           });
    }
}




export const createUser = (newUser) => {
    return dispatch => {
        dispatch({ type: SIGN_UP_BEGIN })
        signUp(newUser)
         .then( user => {
             dispatch({ type: SIGN_UP_SUCCESS, payload: user });
         })
           .catch( error => {
               dispatch({ type: SIGN_UP_ERROR , error })
           });
    }
}


export const sendVideoMetaData = ( videoMetaData ) => {
    return dispatch => {
          dispatch({ type: LESSON_VIDEO_METADATA, payload: videoMetaData  })
    }
}


export const sendMediaStream = ( mediaStream ) => {
    return dispatch => { 
        dispatch({ type: STREAMING_SUCCESS, payload: mediaStream });
    }
}


export const uploadFiles = ( files ) => {
    return dispatch => {
        dispatch({ type: UPLOAD_FILE_SUCCESS, payload: files})
    }
}


export const togglePreviewMode = () => ({
   type: TOGGLE_PREVIEW_MODE
});


export const toggleTeachBoardOrEditor = () => ({
    type: TOGGLE_BOARD_OR_EDITOR
});


export const resetLessonError = () => ({
    type: RESET_LESSON_ERROR
  });


export const logOut = () => ({
    type: LOGOUT_SUCCESS
});



