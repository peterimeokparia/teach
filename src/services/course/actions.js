import { 
createCourse, 
getCourses, 
addLessons, 
getLessons, 
updateLessons, 
removeLessons,
updateCourse,
removeCourse, 
login, 
signUp, 
getUsers, 
getLoggedInUsers, 
updateCurrentUser, 
purchase, 
updateUser, 
approvePayment, 
purchaseHistory, 
getDateTime, 
updateCurrentUserOnPurchase,
updateInvitationUrl,
addMeetings, 
getMeetings, 
updateMeetings, 
removeMeetings,
getUserByUserName,
sendEmail
} from './api';


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
export const ADD_NEW_MEETING_BEGIN = "ADD NEW MEETING BEGIN";
export const ADD_NEW_MEETING_SUCCESS = "ADD NEW MEETING SUCCESS";
export const ADD_NEW_MEETING_ERROR = "ADD NEW MEETING ERROR";
export const LOAD_MEETINGS_BEGIN = "LOAD MEETINGS BEGIN";
export const LOAD_MEETINGS_SUCCESS = "LOAD MEETINGS SUCCESS";
export const LOAD_MEETINGS_ERROR = "LOAD MEETINGS ERROR";
export const SAVE_MEETING_BEGIN = "SAVE MEETING BEGIN";
export const SAVE_MEETING_SUCCESS = "SAVE MEETING SUCCESS";
export const SAVE_MEETING_ERROR = "SAVE MEETING ERROR";
export const DELETE_MEETING_SUCCESS = "DELETE MEETING SUCCESS";
export const DELETE_MEETING_BEGIN = "DELETE MEETING BEGIN";
export const DELETE_MEETING_ERROR = "DELETE MEETING ERROR";
export const SET_LESSON_MARKDOWN = "SET LESSON MARKDOWN";
export const TOGGLE_PREVIEW_MODE = "TOGGLE PREVIEW MODE";
export const TOGGLE_BOARD_OR_EDITOR = "TOGGLE BOARD OR EDITOR";
export const LOGIN_BEGIN = "LOGIN BEGIN";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const LOGIN_ERROR= "LOGIN ERROR";
export const SIGN_UP_BEGINS = "SIGN UP BEGINS";
export const SIGN_UP_SUCCESSS = "SIGN UP SUCCESSS";
export const SIGN_UP_ERRORS = "SIGN UP ERRORS";
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
export const SAVE_COURSE_BEGIN = "SAVE COURSE BEGIN";     
export const SAVE_COURSE_SUCCESS = "SAVE COURSE SUCCESS";
export const SAVE_COURSE_ERROR = "SAVE COURSE ERROR";
export const DELETE_COURSE_SUCCESS = "DELETE COURSE SUCCESS";
export const DELETE_COURSE_BEGIN = "DELETE LESSON BEGIN";
export const DELETE_COURSE_ERROR = "DELETE LESSON ERROR";
export const INVITEES_TO_LEARNING_SESSION = "INVITEES TO LEARNING SESSION";
export const FAILED_INVITATION = "FAILED INVITATION";
export const UPDATE_INVITEE_SESSION_URL = "UPDATE INVITEE SESSION URL";
export const LESSON_IN_PROGRESS = "LESSON IN PROGRESS";
export const UPDATE_INVITEE_LIST = "UPDATE INVITEE LIST";
export const SEND_EMAIL_SUCCESS = "SEND EMAIL SUCCESS";
export const SEND_EMAIL_ERROR = "SEND EMAIL ERROR";



 export const addNewCourse = ( name, price, user ) => {
     return dispatch => {
         
        dispatch({ type: ADD_COURSE_BEGIN })

        return createCourse(name, price, user._id)
         .then(course => {

            user.courses.push(course._id);
            
            updateUser(user)
             
            dispatch({ type: ADD_COURSE_SUCCESS, payload: course })      
          
         })
          .catch(error => { 
              dispatch({ type: ADD_COURSE_ERROR, error })
          })
     }
 }



 export const saveCourse = ( course ) => {
    return dispatch => {
         dispatch({ type: SAVE_COURSE_BEGIN })
         return updateCourse( course )
          .then( course => {  
              dispatch({        
               type: SAVE_COURSE_SUCCESS, payload: course }) 
           }).catch( error => {
               dispatch({ type: SAVE_COURSE_ERROR , error })
           });
         
    };
};



export const deleteCourse = course => {
    return dispatch => {
        dispatch({ type: DELETE_COURSE_BEGIN })
         return removeCourse( course )
         .then( () => {
             dispatch({ type: DELETE_COURSE_SUCCESS, payload: course });
         })
           .catch( error => {
               dispatch({ type: DELETE_COURSE_ERROR , error })
           });
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


 export const unSubscribeFromCourse = ( currentUser, courseId ) => {
    return dispatch => {
      
        let courseList = currentUser?.courses?.filter(id => id !== courseId);
        
        updateUser({ ...currentUser, courses: courseList })
         .then( user => {

            dispatch({ type: LAST_LOGGEDIN_USER, payload: user });   

         })
          .catch( error => console.log( error )); 
    }
}



export const buyCourse = ( currentUser ) => {
    return ( dispatch, getState ) => {

        let resetUsersCartOnError; 
        
        dispatch({ type: BUY_COURSE_BEGIN });

        return purchase( currentUser )
        .then(user => {

             dispatch({ type: BUY_COURSE_SUCCESS, payload: user });

            // addToPurchaseHistory(user);
     
             updateCurrentUser( user?._id, user);

                resetUsersCartOnError = user;

                let payload = { 
                    ...user,
                    cart: [],
                    paymentStatus: "",
                    cartTotal: 0,
                 }   

                dispatch({ type: RESET_USERS_CART, 
                    payload
                }); 

                dispatch({ type: LAST_LOGGEDIN_USER,
                    payload
                }); 
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




export const lastLoggedInUser = (currentUser) => {

    return dispatch  => {

      try{
           
        let user = JSON.parse(localStorage.getItem('currentuser'));
        
         if ( user ) {
              
            dispatch({ type: LAST_LOGGEDIN_USER, payload: user});

         } else if ( currentUser ) {

            dispatch({ type: LAST_LOGGEDIN_USER, payload: currentUser});
         } 

      } catch(e){

          dispatch({ type: LOGOUT_SUCCESS })
      } 
    }
}





export const inviteStudentsToLearningSession = ( invitees ) => {

    return dispatch => {

        try {
            
            dispatch({ type: INVITEES_TO_LEARNING_SESSION, payload: invitees });

        } catch (error) {
            
            dispatch({ type: FAILED_INVITATION, error });
        }
         
    }
}




export const updateUserInvitationUrl = (user, inviteeSessionUrl, nameOfLessonInProgress, lessonInProgress) => {

    return dispatch  => {

      try{
           
        updateInvitationUrl( user?._id, {...user, inviteeSessionUrl, nameOfLessonInProgress,  lessonInProgress} )

        dispatch({ type: UPDATE_INVITEE_SESSION_URL, payload: {...user, inviteeSessionUrl, nameOfLessonInProgress, lessonInProgress} }) 

      } catch(error){

         dispatch({ type: FAILED_INVITATION, error });
      } 
    }
}


export const updateInviteeList = () => {

    return dispatch => {
        dispatch({ type: UPDATE_INVITEE_LIST})
    }
}


export const addNewMeeting = (
    invitees, 
    userId,
    timeStarted,
    courseId,
    lessonId,
    courseTitle,
    lessonTitle,
    lessonPlanUrl,
    currentUser) => {

    return dispatch => {
            dispatch({ type: ADD_NEW_MEETING_BEGIN })
                return addMeetings( 
                    invitees, 
                    userId,
                    timeStarted,
                    courseId,
                    lessonId,
                    courseTitle,
                    lessonTitle,
                    lessonPlanUrl,
                    currentUser
                )
                .then( meeting => { 

                    updateUser({...currentUser, meetingId: meeting?._id})

                    dispatch({ type: LAST_LOGGEDIN_USER, payload: {...currentUser, meetingId: meeting?._id}});
                        
                    dispatch({        
                    type: ADD_NEW_MEETING_SUCCESS, payload: meeting }) 
                }).catch( error => {
                    dispatch({ type: ADD_NEW_MEETING_ERROR , error })
                });
                
            };
};





export const saveMeeting = ( meetingId, meeting ) => {
   return dispatch => {
         return updateMeetings( meetingId, meeting )
         .then( meeting => {  
             dispatch({        
              type: SAVE_MEETING_SUCCESS, payload: meeting }) 
          }).catch( error => {
              dispatch({ type: SAVE_MEETING_ERROR , error })
          });
        
   };
};





export const loadMeetings = ( userId ) => {
   return dispatch => {
       dispatch({ type: LOAD_MEETINGS_BEGIN })
       getMeetings( userId )
        .then( meeting => {
            dispatch({ type: LOAD_MEETINGS_SUCCESS, payload: meeting });
        })
          .catch( error => {
              dispatch({ type: LOAD_MEETINGS_ERROR , error })
          });
   }
}



export const deleteMeeting = meeting => {
   return dispatch => {
       dispatch({ type: DELETE_MEETING_BEGIN })
        return removeMeetings( meeting )
        .then( () => {
            dispatch({ type: DELETE_MEETING_SUCCESS, payload: meeting });
        })
          .catch( error => {
              dispatch({ type: DELETE_MEETING_ERROR , error })
          });
   }
}




 
 export const openNewCourseModal = () => ({
     type: OPEN_NEW_COURSE_MODAL
 });



 export const closeNewCourseModal = () => ({
    type: CLOSE_NEW_COURSE_MODAL
});


export const setLessonInProgressStatus = () => ({
    type: LESSON_IN_PROGRESS
})





export const addNewLesson = (name, courseId) => {
     return dispatch => {
          dispatch({ type: ADD_NEW_LESSON_BEGIN })
          return addLessons( name, courseId )
           .then( lesson => { 
              
                  console.log('lesson lesson', lesson);
         
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
            const latestLesson = getState().lessons.lessons[ lesson?._id ]; 
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
    dispatch({ type: SIGN_UP_BEGINS })   
     signUp(newUser)
         .then( user => {
             dispatch({ type: SIGN_UP_SUCCESSS, payload: user });

                sendEmail(
                        "teachpadsconnect247@gmail.com",
                        user?.email, 
                        "Welcome to teach!",
                        `Your credentials: ${user.firstname}, ${user.password}`,
                         user?._id
                )
         })
           .catch( error => {
               dispatch({ type: SIGN_UP_ERRORS , error })
           });
    }
}



export const getCreatedUser = (newUser) => {
    
    return dispatch => {

        getUserByUserName(newUser)
         .then( user => {
            dispatch({ type: SIGN_UP_SUCCESSS, payload: user });        
         })
         .catch( error => {
            dispatch({ type: SIGN_UP_ERRORS , error })
        });
    }
}



export const sendEmails = ( fromEmail, toEmail, subject, messageBody, userId ) => {
    return dispatch => {
        sendEmail( fromEmail, toEmail, subject, messageBody, userId )
         .then( email => {
             dispatch({ type: SEND_EMAIL_SUCCESS, payload: email });
         })
           .catch( error => {
               dispatch({ type: SEND_EMAIL_ERROR , error })
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
