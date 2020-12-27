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
purchase, 
updateUser, 
approvePayment, 
purchaseHistory, 
getDateTime, 
updateCurrentUserOnPurchase,
updateInvitationUrl,
addMeetings, 
getMeetingsByUserId, 
updateMeetings, 
removeMeetings,
getUserByUserName,
sendEmail,
getCurrentUserByEmail,
updateUserTest,
uploadUserAvatar,
incrementSession,
decrementSessionCount,
getMeetings,
getSessions,
updateSession,
removeSessions,
autoRenew,
addSession,
addNewCalendarEvent,
getCalendarEvents,
createClassRoom,
getClassRooms,
updateClassRoom,
removeClassRoom,
getCurrentUserById,
operatorSignUp,
createClassRoomNew,
createCourseNew,
getOperators,  
getGradesByStudentId, 
getGrades,
addGrade, 
updateGrade, 
removeGrade,
getById,
get,
add, 
update, 
remove } from './api';

import{ 
NOTIFICATION_PREFIX } from './api';


import { 
newSiteUser } from '../../helpers/pageHelpers';


import { 
sendEmailConfirmation,
sendEmailToAdministrator } from './pages/Packages/coursePackageRenewalHelpers';


export const ADD_COURSE_BEGIN = "ADD COURSE BEGIN";
export const ADD_COURSE_SUCCESS = "ADD COURSE SUCCESS";
export const ADD_COURSE_ERROR = "ADD COURSE ERROR";
export const LOAD_COURSES_BEGIN = "LOAD COURSES BEGIN";
export const LOAD_COURSES_SUCCESS = "LOAD COURSES SUCCESS";
export const LOAD_COURSES_ERROR = "LOAD COURSES ERROR";
export const OPEN_NEW_COURSE_MODAL = "OPEN NEW COURSE MODAL";
export const CLOSE_NEW_COURSE_MODAL = "CLOSE NEW COURSE MODAL";
export const ADD_NEW_LESSON_BEGIN = "ADD NEW LESSON BEGIN";
export const ADD_NEW_LESSON_SUCCESS = "ADD NEW LESSON SUCCESS";
export const ADD_NEW_LESSON_ERROR = "ADD NEW LESSON ERROR";
export const LOAD_LESSONS_BEGIN = "LOAD LESSONS BEGIN";
export const LOAD_LESSONS_SUCCESS = "LOAD LESSONS SUCCESS";
export const LOAD_LESSONS_ERROR = "LOAD LESSONS ERROR";
export const SAVE_LESSON_BEGIN = "SAVE LESSON BEGIN";
export const SAVE_LESSON_SUCCESS = "SAVE LESSON SUCCESS";
export const SAVE_LESSON_ERROR = "SAVE LESSON ERROR";
export const RESET_LESSON_ERROR = "RESET LESSON ERROR";
export const RESET_CLASSROOM_USER_ERROR = "RESET CLASSROOM USER ERROR";
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
export const LOGIN_ERROR = "LOGIN ERROR";
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
export const LAST_LOGGEDIN_USER_ERROR = "LAST LOGGEDIN USER ERROR";
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
export const SET_USER_BIO_MARKDOWN = "SET USER BIO MARKDOWN";
export const SAVE_USER_BEGIN = "SAVE USER BEGIN";
export const SAVE_USER_SUCCESS = "SAVE USER SUCCESS";
export const SAVE_USER_ERROR = "SAVE USER ERROR";
export const DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS = "DECREMENT SESSION COUNT FOR PACKAGE OPTIONS"; 
export const INCREMENT_SESSION_COUNT = "INCREMENT SESSION COUNT";
export const ERROR_DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS = "ERROR DECREMENT SESSION COUNT FOR PACKAGE OPTIONS"; 
export const ERROR_INCREMENTING_SESSION_COUNT = "ERROR INCREMENTING SESSION COUNT";
export const USER_UPDATED = "USER UPDATED";
export const LOAD_SESSIONS_BEGIN = "LOAD SESSIONS BEGIN";
export const LOAD_SESSIONS_SUCCESS = "LOAD SESSIONS SUCCESS";
export const LOAD_SESSIONS_ERROR = "LOAD SESSIONS ERROR";
export const SAVE_SESSION_BEGIN = "SAVE SESSION BEGIN";
export const SAVE_SESSION_SUCCESS = "SAVE SESSION SUCCESS";
export const SAVE_SESSION_ERROR = "SAVE SESSION ERROR";
export const DELETE_SESSION_BEGIN = "DELETE SESSION BEGIN";
export const DELETE_SESSION_SUCCESS = "DELETE SESSION SUCCESS";
export const DELETE_SESSION_ERROR = "DELETE SESSION ERROR";
export const AUTO_RENEW_PACKAGE_SUCCESS = "AUTO RENEW PACKAGE SUCCESS";
export const AUTO_RENEW_PACKAGE_ERROR = "AUTO RENEW PACKAGE ERROR";
export const UPDATE_USER = "UPDATE USER";
export const ADD_NEW_CALENDAR_EVENT = "ADD NEW CALENDAR EVENT";
export const LOAD_CALENDAR_EVENTS = "LOAD CALENDAR EVENTS";
export const LOAD_CALENDAR_EVENTS_BEGIN = "LOAD CALENDAR EVENTS BEGIN";
export const LOAD_CALENDAR_EVENTS_SUCCESS = "LOAD CALENDAR EVENTS SUCCESS";
export const LOAD_CALENDAR_EVENTS_ERROR = "LOAD CALENDAR EVENTS ERROR";
export const TOGGLE_CALENDAR_NEW_EVENT_INPUT = "TOGGLE CALENDAR NEW EVENT INPUT";
export const ADD_CLASSROOM_BEGIN = "ADD CLASSROOM BEGIN";
export const ADD_CLASSROOM_SUCCESS = "ADD CLASSROOM SUCCESS";
export const ADD_CLASSROOM_ERROR = "ADD CLASSROOM ERROR";
export const LOAD_CLASSROOMS_BEGIN = "LOAD CLASSROOMS BEGIN";
export const LOAD_CLASSROOMS_SUCCESS = "LOAD CLASSROOMS SUCCESS";
export const OPEN_NEW_CLASSROOM_MODAL = "OPEN NEW CLASSROOM MODAL";
export const CLOSE_NEW_CLASSROOM_MODAL = "CLOSE NEW CLASSROOM MODAL";
export const LOAD_CLASSROOMS_ERROR = "LOAD CLASSROOMS ERROR";
export const SAVE_CLASSROOM_BEGIN = "SAVE CLASSROOM BEGIN";
export const SAVE_CLASSROOM_SUCCESS = "SAVE CLASSROOM SUCCESS";
export const SAVE_CLASSROOM_ERROR = "SAVE CLASSROOM ERROR";
export const DELETE_CLASSROOM_SUCCESS = "DELETE CLASSROOM SUCCESS";
export const DELETE_CLASSROOM_BEGIN = "DELETE CLASSROOM BEGIN";
export const DELETE_CLASSROOM_ERROR = "DELETE CLASSROOM ERROR";
export const UPDATE_CURRENT_CLASSROOM_TUTOR = "UPDATE CURRENT CLASSROOM TUTOR";
export const OPERATOR_LOGIN_BEGIN = "OPERATOR LOGIN BEGIN";
export const OPERATOR_LOGIN_SUCCESS = "OPERATOR LOGIN SUCCESS";
export const OPERATOR_LOGIN_ERROR = "OPERATOR LOGIN ERROR";
export const OPERATOR_SIGN_UP_BEGINS = "OPERATOR SIGN UP BEGINS";
export const OPERATOR_SIGN_UP_SUCCESSS = "OPERATOR SIGN UP SUCCESSS";
export const OPERATOR_SIGN_UP_ERRORS = "OPERATOR SIGN UP ERRORS";
export const LOAD_OPERATORS_BEGIN = "LOAD OPERATORS BEGIN";
export const LOAD_OPERATORS_SUCCESS = "LOAD OPERATORS SUCCESS";
export const LOAD_OPERATORS_ERROR = "LOAD OPERATORS ERROR";
export const SAVE_OPERATOR_BEGIN = "SAVE OPERATOR BEGIN";
export const SAVE_OPERATOR_SUCCESS = "SAVE_OPERATOR_SUCCESS";
export const SAVE_OPERATOR_ERROR = "SAVE_OPERATOR_ERROR";
export const LOAD_GRADES_BEGIN = "LOAD GRADES BEGIN";
export const LOAD_GRADES_SUCCESS = "LOAD GRADES SUCCESS";
export const LOAD_GRADES_ERROR = "LOAD GRADES ERROR";
export const ADD_NEW_GRADE_BEGIN = "ADD NEW GRADE BEGIN";
export const ADD_NEW_GRADE_SUCCESS = "ADD NEW GRADE SUCCESS"; 
export const ADD_NEW_GRADE_ERROR = "ADD NEW GRADE ERROR";
export const SAVE_GRADE_BEGIN = "SAVE GRADE BEGIN";
export const SAVE_GRADE_SUCCESS = "SAVE GRADE SUCCESS";
export const SAVE_GRADE_ERROR = "SAVE GRADE ERROR";
export const DELETE_GRADE_BEGIN = "DELETE GRADE BEGIN";
export const DELETE_GRADE_SUCCESS = "DELETE GRADE SUCCESS"; 
export const DELETE_GRADE_ERROR = "DELETE GRADE ERROR";
export const TOGGLE_ADD_NEW_GRADE_FORM = "TOGGLE ADD NEW GRADE FORM";
export const LOAD_ATTENDANCE_BEGIN = "LOAD ATTENDANCE BEGIN";
export const LOAD_ATTENDANCE_SUCCESS = "LOAD ATTENDANCE SUCCESS";
export const LOAD_ATTENDANCE_ERROR = "LOAD ATTENDANCE ERROR";
export const MARK_ATTENDANCE_BEGIN = "MARK ATTENDANCE BEGIN";
export const MARK_ATTENDANCE_SUCCESS = "MARK ATTENDANCE SUCCESS";
export const MARK_ATTENDANCE_ERROR = "MARK ATTENDANCE ERROR";
export const SAVE_ATTENDANCE_BEGIN = "SAVE ATTENDANCE BEGIN";
export const SAVE_ATTENDANCE_SUCCESS = "SAVE ATTENDANCE SUCCESS";
export const SAVE_ATTENDANCE_ERROR = "SAVE ATTENDANCE ERROR";
export const DELETE_ATTENDANCE_BEGIN = "DELETE ATTENDANCE BEGIN";
export const DELETE_ATTENDANCE_SUCCESS = "DELETE ATTENDANCE SUCCESS";
export const DELETE_ATTENDANCE_ERROR = "DELETE ATTENDANCE ERROR";
export const NAVIGATION_HISTORY = "NAVIGATION HISTORY";
export const LOAD_PUSH_NOTIFICATION_USERS_BEGIN = "LOAD PUSH NOTIFICATION USERS BEGIN";  
export const LOAD_PUSH_NOTIFICATION_USERS_SUCCESS = "LOAD PUSH NOTIFICATION USERS SUCCESS";
export const LOAD_PUSH_NOTIFICATION_USERS_ERROR = "LOAD PUSH NOTIFICATION USERS ERROR";
export const LOAD_PUSH_NOTIFICATION_USER_BEGIN = "LOAD PUSH NOTIFICATION USER BEGIN";  
export const LOAD_PUSH_NOTIFICATION_USER_SUCCESS = "LOAD PUSH NOTIFICATION USER SUCCESS";
export const LOAD_PUSH_NOTIFICATION_USER_ERROR = "LOAD PUSH NOTIFICATION USER ERROR";
export const ADD_PUSH_NOTIFICATION_USER_BEGIN = "ADD PUSH NOTIFICATION USER BEGIN";
export const ADD_PUSH_NOTIFICATION_USER_SUCCESS = "ADD PUSH NOTIFICATION USER SUCCESS";
export const ADD_PUSH_NOTIFICATION_USER_ERROR = "ADD PUSH NOTIFICATION USER ERROR";
export const UPDATE_PUSH_NOTIFICATION_USER_BEGIN = "UPDATE PUSH NOTIFICATION USER BEGIN";
export const UPDATE_PUSH_NOTIFICATION_USER_SUCCESS = "UPDATE PUSH NOTIFICATION USER SUCCESS";
export const UPDATE_PUSH_NOTIFICATION_USER_ERROR = "UPDATE PUSH NOTIFICATION USER ERROR";
export const DELETE_PUSH_NOTIFICATION_USER_BEGIN = "DELETE PUSH NOTIFICATION USER BEGIN";
export const DELETE_PUSH_NOTIFICATION_USER_SUCCESS = "DELETE PUSH NOTIFICATION USER SUCCESS";
export const DELETE_PUSH_NOTIFICATION_USER_ERROR = "DELETE PUSH NOTIFICATION USER ERROR";



 export const addNewCourse = ( name, price, description, user, operator ) => {
     return dispatch => {
         
        dispatch({ type: ADD_COURSE_BEGIN })

        return createCourse(name, price, description, user?._id, operator?._id)
         .then(course => {

            if ( course?.createdBy === user?._id ) {
                
                 user.courses.push(course._id);
            }

            updateUser(user)
             
            dispatch({ type: ADD_COURSE_SUCCESS, payload: course }) 
            
            dispatch({ type: LAST_LOGGEDIN_USER, payload: user });  
          
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




 export const addToSalesCart = ( 
           course, 
           sessionType, 
           numberOfSessions, 
           totalNumberOfSessions, 
           userId, 
           tutor,
           startDate,
           endDate,
           status, 
           autoRenew,
           autoRenewDates ) => {

    return dispatch => { 

        dispatch({ type: ADD_TO_SALES_CART, payload: { 
            course, 
            sessionType, 
            numberOfSessions, 
            totalNumberOfSessions, 
            userId, 
            tutor,
            startDate,
            endDate,
            status, 
            autoRenew,
            autoRenewDates } });
    }
 }

 

 export const removeItemFromCart = ( course ) => {
    return dispatch => { 
        dispatch({ type: REMOVE_FROM_SALES_CART, payload: course });
    }
 }


// if a session is in progress can we unsubscribe?
// if yes: we offer a refund. 
// partial refund? or full refund?
// student isn't happy with tutor,
// student isn't happy with course content.
// if full video sessions with no tutor then prob not
// if regular session with a tutor...unsubscribe will send an email to the admin, tutor, parent and student

 export const unSubscribeFromCourse = ( currentUser, courseId, sessionId ) => {
    return dispatch => {
      
        let courseList = currentUser?.courses?.filter(id => id !== courseId);
    
         let sessions = currentUser?.sessions?.filter(id => id !== sessionId);

        
        updateUser({ ...currentUser, courses: courseList, sessions: sessions })
         .then( user => {

            dispatch({ type: LAST_LOGGEDIN_USER, payload: user });   

         })
          .catch( error => console.log( error )); 
    }
}



// change name
export const unSubscribe = ( currentUser, itemId ) => {
    return dispatch => {
      
       let classRooms = currentUser.classRooms.filter( classroom => ! classroom.includes(itemId) );

        return updateUser({ ...currentUser, classRooms });
    }
}





export const buyCourse = ( currentUser ) => {

    return ( dispatch, getState ) => {

        let resetUsersCartOnError; 
        
        dispatch({ type: BUY_COURSE_BEGIN });

        return purchase( currentUser )
           .then(user => {

             dispatch({ type: BUY_COURSE_SUCCESS, payload: user });

             //todo: addToPurchaseHistory(user);
              user.cart.forEach(( course ) => {

                addSession({ 
                    courseId: course?.course?._id, 
                    typeOfSession: course?.sessionType,  
                    numberOfSessions: parseInt(course?.numberOfSessions,10), 
                    totalNumberOfSessions: parseInt(course?.totalNumberOfSessions,10), 
                    userId: course?.userId,
                    tutorId: course?.tutor?._id,
                    startDate: Date.now(),
                    status: true,
                    autoRenew: course.autoRenew

              })
               .then(session => {
    
                  user.sessions.push( session?._id );

                  dispatch({ type: BUY_COURSE_SUCCESS, payload: user });

                  updateUser({ ...user, sessions: user?.sessions, cart: [],  cartTotal: 0, paymentStatus: ""})
                  .then( user => {
     
                     resetUsersCartOnError = user;
     
                     dispatch({ type: RESET_USERS_CART, payload: user }); 
     
                     dispatch({ type: LAST_LOGGEDIN_USER, payload : user }); 
                 })
                  .catch( error => console.log( error ) );

                    let tutorSessions = [ ...course?.tutor?.sessions, session?._id ];

                    updateUser({ ...course?.tutor, sessions: tutorSessions })
                    .then(tutor => {

                        dispatch({ type: UPDATE_USER, payload: tutor });
                    })
                     .catch(error => console.log(error))  
               })
                 .catch(error => { 
                  
                   console.log( error );
               });

              });
              
        })
         .catch(error => { 

            console.log( error );

            dispatch({ type: RESET_USERS_CART, payload: { ...resetUsersCartOnError, paymentStatus: "" }}); 
     
            dispatch({ type: LAST_LOGGEDIN_USER, payload: { ...resetUsersCartOnError, paymentStatus: "" }});    

         });
    }
}





export const autoRenewSessionPackages = ( currentUser, session ) => {

    return dispatch => { 
             return autoRenew( currentUser, session )
                .then( response => {

                    dispatch({ type: AUTO_RENEW_PACKAGE_SUCCESS, payload: response.User });

                    sendEmailConfirmation( response.Session, response.User );

                    setAutoRenewPackageStatus( { ...currentUser, paymentStatus:"" } );

                    dispatch({
                        type: LAST_LOGGEDIN_USER, payload: {
                            ...response.User,
                            paymentStatus: ""
                    }
                });

             }).catch( error => {

                sendEmailToAdministrator( currentUser )

                dispatch({ type: AUTO_RENEW_PACKAGE_ERROR, error });

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

        sessionStorage.removeItem('currentuser');
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



 export const loadClassRooms = () => {
    return dispatch => {
        dispatch({ type: LOAD_CLASSROOMS_BEGIN })
        getClassRooms()
         .then( classroom => {
             dispatch({ type: LOAD_CLASSROOMS_SUCCESS, payload: classroom });
         })
           .catch( error => {
               dispatch({ type: LOAD_CLASSROOMS_ERROR , error })
           });
    }
}




export const updateCurrentUser = ( currentUser ) => {
    return dispatch => {

        getCurrentUserById( currentUser?._id )
         .then( user => {
             dispatch({ type: LAST_LOGGEDIN_USER, payload: user} );
         })
          .catch( error => {
              dispatch({ type: LAST_LOGGEDIN_USER_ERROR, payload: error } )
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




export const loadOperators = () => {
    return dispatch => {
        dispatch({ type: LOAD_OPERATORS_BEGIN })
        getOperators()
         .then( users => {
             dispatch({ type: LOAD_OPERATORS_SUCCESS, payload: users });
         })
           .catch( error => {
               dispatch({ type: LOAD_OPERATORS_ERROR , error })
           });
    }
}




export const addNewClassRoom = ( name, description, classRoomUsers,  user, operator ) => {
    return dispatch => {

       user = { ...user,  classRooms: user?.classRooms, operatorId: operator?._id };
        
       dispatch({ type: ADD_CLASSROOM_BEGIN })

       return createClassRoom(name, description, classRoomUsers, user?._id, operator?._id)
        .then(classroom => {

            classRoomUsers.forEach(classroomuser => {

                classroomuser.value.classRooms.push( classroom?._id );

                updateUser( classroomuser?.value );

            });

           user.classRooms.push( classroom?._id ); 
            
           updateUser(user);
            
           dispatch({ type: ADD_CLASSROOM_SUCCESS, payload: classroom }) 
           
           dispatch({ type: LAST_LOGGEDIN_USER, payload: user });  
         
        })
         .catch(error => { 
             dispatch({ type: ADD_CLASSROOM_ERROR, error })
         })
    }
}






export const saveClassRoom = ( classroom ) => {
   return dispatch => {
        dispatch({ type: SAVE_CLASSROOM_BEGIN })
        return updateClassRoom( classroom )
         .then( classroom => {  
             dispatch({        
              type: SAVE_CLASSROOM_SUCCESS, payload: classroom }) 
          }).catch( error => {
              dispatch({ type: SAVE_CLASSROOM_ERROR , error })
          });
        
   };
};




export const deleteClassRoom = classroom => {
   return dispatch => {
       dispatch({ type: DELETE_CLASSROOM_BEGIN })
        return removeClassRoom( classroom )
        .then( () => {
            dispatch({ type: DELETE_CLASSROOM_SUCCESS, payload: classroom });
        })
          .catch( error => {
              dispatch({ type: DELETE_CLASSROOM_ERROR , error })
          });
   }
}





export const loadSessions = () => {
    return dispatch => {
        dispatch({ type: LOAD_SESSIONS_BEGIN })
        getSessions()
         .then( users => {
             dispatch({ type: LOAD_SESSIONS_SUCCESS, payload: users });
         })
           .catch( error => {
               dispatch({ type: LOAD_SESSIONS_ERROR , error })
           });
    }
}




export const saveSession = ( sessionId, session ) => {
    return dispatch => {
        dispatch({ type: SAVE_SESSION_BEGIN })
          return updateSession( sessionId, session )
          .then( session => {  
              dispatch({        
               type: SAVE_SESSION_SUCCESS, payload: session }) 
           }).catch( error => {
               dispatch({ type: SAVE_SESSION_ERROR , error })
           });
         
    };
 };
 
 


 export const deleteSession = session => {
     return dispatch => {
          return removeSessions( session )
          .then( () => {
              dispatch({ type: DELETE_SESSION_SUCCESS, payload: session });
          })
            .catch( error => {
                dispatch({ type: DELETE_SESSION_ERROR , error })
            });
     }
  }





export const loadLoggedInUsers = () => {
    return dispatch => {
        dispatch({ type: LOAD_LOGGEDIN_USERS_BEGIN })
        return getLoggedInUsers()
         .then( users => {
             dispatch({ type: LOAD_LOGGEDIN_USERS_SUCCESS, payload: users });
         })
           .catch( error => {
               dispatch({ type: LOAD_LOGGEDIN_USERS_ERROR , error })
           });
    }
}





export const lastLoggedInUser = ( currentUser ) => {

    let user = JSON.parse(sessionStorage.getItem('currentuser'));
    
    return dispatch  => {

      try{

        if ( currentUser ) {

              dispatch({ type: LAST_LOGGEDIN_USER, payload: currentUser });

        } else {

            if ( user ) {

                dispatch({ type: LAST_LOGGEDIN_USER, payload: user});
            }

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
    sessions,
    timeStarted,
    courseId,
    lessonId,
    courseTitle,
    lessonTitle,
    lessonPlanUrl,
    currentUser, 
    usersWhoJoinedTheMeeting ) => {

    return dispatch => {
            dispatch({ type: ADD_NEW_MEETING_BEGIN })
                return addMeetings( 
                    invitees, 
                    userId,
                    sessions,
                    timeStarted,
                    courseId,
                    lessonId,
                    courseTitle,
                    lessonTitle,
                    lessonPlanUrl,
                    currentUser,
                    usersWhoJoinedTheMeeting
                )
                .then( meeting => { 

                    currentUser.meetings.push(meeting?._id );

                    updateUser({
                        ...currentUser, 
                        meetingId: meeting?._id, 
                        meetings: currentUser.meetings
                    });

                    dispatch({ type: LAST_LOGGEDIN_USER, payload: {
                        ...currentUser, 
                        meetingId: meeting?._id, 
                        meetings: currentUser.meetings
                    }});
                        

                    meeting.invitees.forEach(user => {

                        updateUser({
                            ...user, 
                            meetingId: meeting?._id, 
                            meetings: user.meetings
                        });
                        
                    });
                 


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




export const loadMeetings = () => {
    return dispatch => {
        dispatch({ type: LOAD_MEETINGS_BEGIN })
        getMeetings()
         .then( meeting => {
             dispatch({ type: LOAD_MEETINGS_SUCCESS, payload: meeting });
         })
           .catch( error => {
               dispatch({ type: LOAD_MEETINGS_ERROR , error })
           });
    }
 }





export const loadMeetingsByUserId = ( userId ) => {
   return dispatch => {
       dispatch({ type: LOAD_MEETINGS_BEGIN })
       getMeetingsByUserId( userId )
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




export const loadGrades = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_GRADES_BEGIN })
         return getGrades()
          .then( grades => { 

                   dispatch({ type: LOAD_GRADES_SUCCESS, payload: grades }) 
    
           }).catch( error => {
               dispatch({ type: LOAD_GRADES_ERROR , error })
           });
         
    };
};



export const loadGradesByStudentId = ( studentId ) => {
    return dispatch => {
         dispatch({ type: LOAD_GRADES_BEGIN })
         return getGradesByStudentId( studentId )
          .then( grades => { 
             
                   dispatch({ type: LOAD_GRADES_SUCCESS, payload: grades }) 
    
           }).catch( error => {
               dispatch({ type: LOAD_GRADES_ERROR , error })
           });
         
    };
};






export const addNewGrade = ( grade ) => {
    return ( dispatch, getState ) => {
         dispatch({ type: ADD_NEW_GRADE_BEGIN })

         let grades = Object.values(getState()?.grades?.grades);

         let currentGrades = grades?.filter(grd => grd?.studentId === grade?.studentId && grade?.courseId === grd?.courseId );

         let result, symbol;

         if ( currentGrades ) {

            let previousTestScore = currentGrades[currentGrades?.length -1]?.score;

            let currentTestScore = parseInt(grade?.score, 10);
   
               if ( previousTestScore ) {
   
                       if ( previousTestScore > currentTestScore ) {
   
                           result =  ( ( ( previousTestScore - currentTestScore ) / previousTestScore ) * 100 );
           
                           symbol = "<";
           
                   }
               }
       
               if ( currentTestScore > previousTestScore ) {
       
                       result =  ( ( ( currentTestScore - previousTestScore ) / previousTestScore ) * 100 );
       
                       symbol = ">";
       
               }

         } else {
             
            result = 0;
    
            symbol = "-";
             
         }
         

         

         
         grade = { ...grade, percentChange: result, symbol: symbol } 

         return addGrade( grade )
          .then( grade => { 
                   dispatch({        
                       type: ADD_NEW_GRADE_SUCCESS, payload: grade }) 
    
           }).catch( error => {
               dispatch({ type: ADD_NEW_GRADE_ERROR , error })
           });
         
    };
};





export const saveGrade = ( grade ) => {
   return dispatch => {
        dispatch({ type: SAVE_GRADE_BEGIN })
        return updateGrade( grade )
         .then( grade => {  
             dispatch({        
              type: SAVE_GRADE_SUCCESS, payload: grade }) 
          }).catch( error => {
              dispatch({ type: SAVE_GRADE_ERROR , error })
          });
        
   };
};




export const deleteGrade = grade => {
   return dispatch => {
       dispatch({ type: DELETE_GRADE_BEGIN })
        return removeGrade( grade )
        .then( () => {
            dispatch({ type: DELETE_GRADE_SUCCESS, payload: grade });
        })
          .catch( error => {
              dispatch({ type: DELETE_GRADE_ERROR , error })
          });
   }
}






export const loadAttendance = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_ATTENDANCE_BEGIN })
         return get(`/attendance`)
          .then( attendance => { 

                   dispatch({ type: LOAD_ATTENDANCE_SUCCESS, payload: attendance }) 
    
           }).catch( error => {
               dispatch({ type: LOAD_ATTENDANCE_ERROR , error })
           });
         
    };
};




export const loadAttendanceByStudentId = ( studentId ) => {
    return dispatch => {
         dispatch({ type: LOAD_ATTENDANCE_BEGIN })
         return getById( studentId, `/attendance?studentId=` )
          .then( attendance => { 
             
                   dispatch({ type: LOAD_ATTENDANCE_SUCCESS, payload: attendance }) 
    
           }).catch( error => {
               dispatch({ type: LOAD_ATTENDANCE_ERROR , error })
           });
         
    };
};






export const markAttendance = ( attendance ) => {
    return dispatch  => {

         dispatch({ type: MARK_ATTENDANCE_BEGIN })

         return add( attendance, `/attendance` )
          .then( attendance => { 
                   dispatch({        
                       type: MARK_ATTENDANCE_SUCCESS, payload: attendance }) 
    
           }).catch( error => {
               dispatch({ type: MARK_ATTENDANCE_ERROR , error })
           });
         
    };
};





export const saveAttendance = ( attendance ) => {
   return dispatch => {
        dispatch({ type: SAVE_ATTENDANCE_BEGIN })
        return update( attendance, `/attendance/` )
         .then( attendance => {  
             dispatch({        
              type: SAVE_ATTENDANCE_SUCCESS, payload: attendance }) 
          }).catch( error => {
              dispatch({ type: SAVE_ATTENDANCE_ERROR , error })
          });
        
   };
};




export const deleteAttendance = attendance => {
   return dispatch => {
       dispatch({ type: DELETE_ATTENDANCE_BEGIN })
        return remove( attendance, `/attendance/` )
        .then( () => {
            dispatch({ type: DELETE_ATTENDANCE_SUCCESS, payload: attendance });
        })
          .catch( error => {
              dispatch({ type: DELETE_ATTENDANCE_ERROR , error })
          });
   }
}



export const loadSubscribedPushNotificationUsers = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_PUSH_NOTIFICATION_USERS_BEGIN })
         return get(`/subscribedUsers`, NOTIFICATION_PREFIX)
          .then( pushnotification => { 

                   dispatch({ type: LOAD_PUSH_NOTIFICATION_USERS_SUCCESS, payload: pushnotification }) 
    
           }).catch( error => {
               dispatch({ type: LOAD_PUSH_NOTIFICATION_USERS_ERROR , error })
           });
         
    };
};




export const loadSubscribedPushNotificationUserByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_PUSH_NOTIFICATION_USER_BEGIN })
         return getById( userId, `/subscribedUser?userId=`, NOTIFICATION_PREFIX )
          .then( pushnotification => { 
             
                   dispatch({ type: LOAD_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotification }) 
    
           }).catch( error => {
               dispatch({ type: LOAD_PUSH_NOTIFICATION_USER_ERROR , error })
           });
         
    };
};






export const subscribePushNotificationUser = ( pushNotificationUser ) => {
    return dispatch  => {

         dispatch({ type: ADD_PUSH_NOTIFICATION_USER_BEGIN })

         return add( pushNotificationUser, `/subscribe/user`, NOTIFICATION_PREFIX )
          .then( pushnotificationuser => { 
                   dispatch({        
                       type: ADD_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotificationuser }) 
    
           }).catch( error => {
               dispatch({ type: ADD_PUSH_NOTIFICATION_USER_ERROR , error })
           });
         
    };
};





export const savePushNotificationUser = ( pushNotificationUser ) => {
   return dispatch => {
        dispatch({ type: UPDATE_PUSH_NOTIFICATION_USER_BEGIN })
        return update( pushNotificationUser, `/subscribe/user/`, NOTIFICATION_PREFIX )
         .then( pushnotificationuser => {  
             dispatch({        
              type: UPDATE_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotificationuser }) 
          }).catch( error => {
              dispatch({ type: UPDATE_PUSH_NOTIFICATION_USER_ERROR , error })
          });
        
   };
};



export const deletePushNotificationUser = pushNotificationUser => {
   return dispatch => {
       dispatch({ type: DELETE_PUSH_NOTIFICATION_USER_BEGIN })
        return remove( pushNotificationUser, `/subscribe/user/`, NOTIFICATION_PREFIX )
        .then( pushnotificationuser => {
            dispatch({ type: DELETE_PUSH_NOTIFICATION_USER_SUCCESS, payload: pushnotificationuser });
        })
          .catch( error => {
              dispatch({ type: DELETE_PUSH_NOTIFICATION_USER_ERROR , error })
          });
   }
}




 
 export const openNewCourseModal = () => ({
     type: OPEN_NEW_COURSE_MODAL
 });



 export const closeNewCourseModal = () => ({
    type: CLOSE_NEW_COURSE_MODAL
});


export const openNewClassRoomModal = () => ({
    type: OPEN_NEW_CLASSROOM_MODAL
});



export const closeNewClassRoomModal = () => ({
   type: CLOSE_NEW_CLASSROOM_MODAL
});


export const setLessonInProgressStatus = () => ({
    type: LESSON_IN_PROGRESS
})





export const addNewLesson = ( title, courseId, lessonDate ) => {
     return dispatch => {
          dispatch({ type: ADD_NEW_LESSON_BEGIN })
          return addLessons( title, courseId, lessonDate )
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





export const saveUser = ( user ) => {
    return dispatch => {
        dispatch({ type: SAVE_USER_BEGIN })
         return updateUser( user )
          .then( user => {  
              dispatch({        
               type: SAVE_USER_SUCCESS, payload: user }) 
           }).catch( error => {
               dispatch({ type: SAVE_USER_ERROR , error })
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
export const setMarkDown = ( teachObject, markDown, teachObjectType="", actionType, saveAction  ) => {
    return ( dispatch, getState )  => {

        dispatch({ type: actionType, payload: {   
            teachObject,
            markDown
          }});

        if ( timerHandle ){
            clearTimeout( timerHandle );
        }

        timerHandle = setTimeout(() => {
    
            console.log("...saving markdown text"); 
            const latestTeachObjectData = getState()[teachObjectType][teachObjectType][ teachObject?._id ]; 
            dispatch(saveAction( latestTeachObjectData ));

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
        return login(newUser)
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
     return signUp(newUser)
         .then( user => {

            if ( user === "Bad Server Response.") {

                Promise.reject( "Bad Server Response." );

                dispatch({ type: SIGN_UP_ERRORS , payload: user })

                return;
            }

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
               dispatch({ type: SIGN_UP_ERRORS , payload: error })
           });
    }
}




export const createOperator = (newUser) => {
    return dispatch => {
    dispatch({ type: OPERATOR_SIGN_UP_BEGINS })   
     return operatorSignUp(newUser)
         .then( operator => {
             dispatch({ type: OPERATOR_SIGN_UP_SUCCESSS, payload: operator });

                sendEmail(
                        "teachpadsconnect247@gmail.com",
                        operator?.email, 
                        "Welcome to teach!",
                        `Your credentials: ${operator.email}, ${operator.password}. Your website url:http://localhost:3000/${operator?.businessName}/login`,
                         operator?._id
                )
         })
           .catch( error => {
               dispatch({ type: OPERATOR_SIGN_UP_ERRORS , error })
           });
    }
}




// create change password functionality
export const createUserGeneratePassword = (newUser) => {

    let stubPassword = 'password';

    newUser.password = stubPassword;

    return dispatch => {

    dispatch({ type: SIGN_UP_BEGINS });

    return signUp(newUser)
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
               dispatch({ type: SIGN_UP_ERRORS , payload: error })
           });
    }
}



export const logOut = ( user ) => {
    
    return dispatch => {

        updateUser({
            ...user, 
            userIsValidated: false
        });

        dispatch({ type: LOGOUT_SUCCESS })
    }
    
};




export const getUserByEmail = ( remoteUser ) => {
    
    return dispatch => {

        return getCurrentUserByEmail(remoteUser?.email)
         .then( user => {
            
            if ( user[0]?.password === remoteUser?.password ) {

                return login(user[0])
                 .then( user => {

                      dispatch({ type: LOGIN_SUCCESS, payload: user });

                 });

            } else {

                createUser({
                    ...newSiteUser, 
                    firstname: remoteUser?.firstname, 
                    email: remoteUser?.email, 
                    password: remoteUser?.password, 
                    role: remoteUser?.role
                });
            }  
                
         })
         .catch( error => {
            dispatch({ type: LOGIN_ERROR, error })
        });
    }
}




export const getCreatedUser = (newUser) => {
    
    return dispatch => {

        getUserByEmail(newUser?.email)
         .then( user => {
            dispatch({ type: SIGN_UP_SUCCESSS, payload: user });        
         })
         .catch( error => {
            dispatch({ type: SIGN_UP_ERRORS , payload: error })
        });
    }
}



export const updateCurrentTutor = ( currentTutor ) => {
    return dispatch => {

       dispatch({ type: UPDATE_CURRENT_CLASSROOM_TUTOR, payload: currentTutor });
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



export const uploadAvatarImages = ( selectedFiles, file, url, teachObjectName ) => {
    return dispatch => {

        uploadUserAvatar(selectedFiles, file, url, teachObjectName)
         .then( resp => { 
               
            getUserByEmail(file)

                //update
                   dispatch({  type: USER_UPDATED, payload: resp }) } )
                // dispatch({ type: UPLOAD_FILE_SUCCESS, payload: files})
    }
}




export const decrementSessionCountForPackageOptions = ( session ) => { 
    return dispatch => {
        
            return decrementSessionCount( session )
             .then(resp => {

                dispatch({ type: DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS,  payload: resp });

             })
              .catch(error => {

                 dispatch({ type: ERROR_DECREMENT_SESSION_COUNT_FOR_PACKAGE_OPTIONS,  error });

              })

    }
};




export const incrementSessionCount = ( session ) => { 
    return dispatch => {

        return incrementSession( session )
           .then(resp => {

                 dispatch({ type: INCREMENT_SESSION_COUNT ,  payload: resp });

               })
                 .catch(error => {
      
                   dispatch({ type: ERROR_INCREMENTING_SESSION_COUNT, error })
               })             
    }
}; 



export const setAutoRenewPackageStatus = ( currentUser ) => {
     return dispatch => {

        dispatch({ type: AUTO_RENEW_PACKAGE_SUCCESS, payload: currentUser });
     }
}



export const addCalendarEvent = ( calendarEventInfo, currentUser ) => {

    let eventData = { ...calendarEventInfo, userId: currentUser?._id};

    let userData = { ...currentUser };

    return dispatch => {

       return addNewCalendarEvent(eventData)
        .then(calendarEventData => {

            userData.calendarEvents.push( calendarEventData?._id );

            dispatch({ type: ADD_NEW_CALENDAR_EVENT, payload: calendarEventData});

            updateUser( userData )
             .then(user => { 

                dispatch({ type: LAST_LOGGEDIN_USER, payload: user });

                dispatch({ type: SAVE_USER_SUCCESS, payload: user }) });

        })
        .catch( error => {
            console.log( error );
        })
    }
};




export const loadAllCalendarEvents = () => {
    return dispatch => {

        dispatch({ type: LOAD_CALENDAR_EVENTS_BEGIN });
        
        return getCalendarEvents()
         .then( calendarEvent => {
             dispatch({ type: LOAD_CALENDAR_EVENTS_SUCCESS, payload: calendarEvent });
         })
          .catch( error => {
               dispatch({ type: LOAD_CALENDAR_EVENTS_ERROR , error })
           });
    }
}



export const loginPageError = ( error ) => {
    return dispatch => {

        dispatch({ type: SIGN_UP_ERRORS, payload: error })
    }
}

export const userNavigationHistory = ( timeTravel ) => {
    return dispatch => {

        dispatch({ type: NAVIGATION_HISTORY, payload: timeTravel })
    }
}

export const toggleClassRoomCourseGradeForm = () => ({
    type: TOGGLE_ADD_NEW_GRADE_FORM
});

export const togglePreviewMode = () => ({
   type: TOGGLE_PREVIEW_MODE
});


export const toggleTeachBoardOrEditor = () => ({
    type: TOGGLE_BOARD_OR_EDITOR
});

export const toggleCalendarNewEventForm = () => ({
   type: TOGGLE_CALENDAR_NEW_EVENT_INPUT
});


export const resetLessonError = () => ({
    type: RESET_LESSON_ERROR
  });


  export const resetClassRoomUserError = () => ({
    type: RESET_CLASSROOM_USER_ERROR
  });



